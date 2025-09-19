const natural = require('natural');
const industries = require('../../config/industries.json');
const templates = require('../../config/default-templates.json');
const { pool } = require('../core/database'); // Usamos la conexión centralizada

class UniversalBotService {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.stemmer = natural.PorterStemmer;
    this.classifier = new natural.BayesClassifier();

    this.industryHandlers = {
      ecommerce: this.handleEcommerce.bind(this),
      healthcare: this.handleHealthcare.bind(this),
      education: this.handleEducation.bind(this),
      restaurant: this.handleRestaurant.bind(this),
      realestate: this.handleRealEstate.bind(this),
      other: this.handleGeneric.bind(this)
    };

    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      await this.loadIndustryModules();
      this.trainClassifier();
      this.initialized = true;
      console.log('✅ UniversalBotService initialized');
    } catch (error) {
      console.error('❌ Error initializing UniversalBotService:', error);
      throw error;
    }
  }

  async loadIndustryModules() {
    try {
      // Carga dinámica de módulos de industria
      const modules = {
        ecommerce: '../modules/ecommerce/EcommerceService',
        healthcare: '../modules/healthcare/HealthcareService',
        education: '../modules/education/EducationService',
        restaurant: '../modules/restaurant/RestaurantService'
      };

      for (const [industry, path] of Object.entries(modules)) {
        try {
          this[`${industry}Service`] = require(path);
          console.log(`✅ ${industry} module loaded`);
        } catch (error) {
          console.warn(`⚠️ ${industry} module not available:`, error.message);
        }
      }
    } catch (error) {
      console.warn('⚠️ Some industry modules could not be loaded:', error.message);
    }
  }

  trainClassifier() {
    // Entrenar con intenciones comunes
    Object.entries(industries.common_intents).forEach(([intent, patterns]) => {
      patterns.forEach(pattern => {
        this.classifier.addDocument(pattern, intent);
      });
    });

    // Entrenar con intenciones específicas de la industria
    Object.entries(industries.industries).forEach(([industry, config]) => {
      if (config.intents) {
        config.intents.forEach(intent => {
          this.classifier.addDocument(`quiero ${intent}`, intent);
          this.classifier.addDocument(`necesito ${intent}`, intent);
          this.classifier.addDocument(`información sobre ${intent}`, intent);
        });
      }
    });

    this.classifier.train();
  }

  async processMessage(businessId, customerId, message, platform = 'whatsapp') {
    try {
      if (!this.initialized) await this.initialize();

      // 1. Obtener configuración del negocio (USANDO la conexión centralizada)
      const business = await this.getBusinessConfig(businessId);
      if (!business) {
        throw new Error(`Business with ID ${businessId} not found`);
      }

      // 2. Asegurar que business tenga config object
      if (typeof business.config === 'string') {
        business.config = JSON.parse(business.config);
      } else if (!business.config) {
        business.config = {};
      }

      // 3. Clasificar la intención y extraer entidades (¡ESTAS LÍNEAS FALTABAN!)
      const intent = await this.classifyIntent(message, business.industry);
      const entities = await this.extractEntities(message, business.industry);

      console.log(`🔍 Mensaje: "${message}" | Intención: ${intent} | Entidades:`, entities);

      // 4. Manejar según la industria
      const handler = this.industryHandlers[business.industry] || this.industryHandlers.other;
      const response = await handler(business, customerId, message, intent, entities);

      return response;

    } catch (error) {
      console.error('❌ Error processing message:', error);
      return this.getErrorMessage(businessId);
    }
  }

  async handleEcommerce(business, customerId, message, intent, entities) {
    try {
      if (this.ecommerceService) {
        const ecommerceHandler = new this.ecommerceService({
          business_id: business.id,  // ← ¡AGREGA ESTA LÍNEA!
          ...(business.config || {}) // ← y cualquier otra configuración existente
        });
        
        switch (intent) {
          case 'product_inquiry':
            return await ecommerceHandler.handleProductInquiry(customerId, message, entities);
          case 'order_status':
            return await ecommerceHandler.handleOrderStatus(customerId, message, entities);
          case 'return_request':
            return await ecommerceHandler.handleReturnRequest(customerId, message, entities);
          default:
            return await this.handleGenericBusiness(business, customerId, message, intent);
        }
      } else {
        return await this.handleGenericBusiness(business, customerId, message, intent);
      }
    } catch (error) {
      console.error('Error in ecommerce handler:', error);
      return await this.handleGenericBusiness(business, customerId, message, intent);
    }
  }

  async handleHealthcare(business, customerId, message, intent, entities) {
    try {
      if (this.healthcareService) {
        const healthcareHandler = new this.healthcareService(business.config);
        
        switch (intent) {
          case 'appointment':
            return await healthcareHandler.handleAppointment(customerId, message, entities);
          case 'prescription':
            return await healthcareHandler.handlePrescription(customerId, message, entities);
          case 'emergency':
            return await healthcareHandler.handleEmergency(customerId, message, entities);
          default:
            return await this.handleGenericBusiness(business, customerId, message, intent);
        }
      }
      return await this.handleGenericBusiness(business, customerId, message, intent);
    } catch (error) {
      console.error('Error in healthcare handler:', error);
      return await this.handleGenericBusiness(business, customerId, message, intent);
    }
  }

  async handleEducation(business, customerId, message, intent, entities) {
    return await this.handleGenericBusiness(business, customerId, message, intent);
  }

  async handleRestaurant(business, customerId, message, intent, entities) {
    return await this.handleGenericBusiness(business, customerId, message, intent);
  }

  async handleRealEstate(business, customerId, message, intent, entities) {
    return await this.handleGenericBusiness(business, customerId, message, intent);
  }

  async handleGeneric(business, customerId, message, intent, entities) {
    return await this.handleGenericBusiness(business, customerId, message, intent);
  }

  async handleGenericBusiness(business, customerId, message, intent) {
    // Buscar plantilla para la intención
    const industryTemplates = templates.templates[business.industry];
    if (industryTemplates && industryTemplates[intent]) {
      return this.formatTemplate(industryTemplates[intent], {
        business_name: business.name,
        customer_id: customerId
      });
    }

    // Respuesta genérica de fallback
    return industryTemplates?.fallback || templates.templates.generic?.fallback || 'Lo siento, no entendí tu mensaje. Por favor, intenta reformularlo.';
  }

  async classifyIntent(message, industry) {
    // Primero, verificar intenciones comunes
    const commonIntent = this.classifier.classify(message);
    if (commonIntent !== 'unknown') {
      return commonIntent;
    }

    // Luego verificar intenciones específicas de la industria
    const industryConfig = industries.industries[industry];
    if (industryConfig && industryConfig.intents) {
      for (const intent of industryConfig.intents) {
        const patterns = industries.intent_patterns?.[intent] || [];
        for (const pattern of patterns) {
          if (new RegExp(pattern, 'i').test(message)) {
            return intent;
          }
        }
      }
    }

    return 'unknown';
  }

  async extractEntities(message, industry) {
    const entities = {};
    const tokens = this.tokenizer.tokenize(this.preprocessText(message));
    
    // Extracción de entidades específicas por industria
    switch (industry) {
      case 'ecommerce':
        entities.product_type = this.extractProductTypes(tokens);
        entities.color = this.extractColors(tokens);
        entities.size = this.extractSizes(tokens);
        entities.price_range = this.extractPriceRange(message);
        break;
      case 'healthcare':
        entities.service_type = this.extractServiceTypes(tokens);
        entities.date = this.extractDates(message);
        entities.time = this.extractTimes(message);
        break;
    }

    return entities;
  }

  // Métodos auxiliares para extracción de entidades (MANTENIDOS)
  extractProductTypes(tokens) {
    const productTypes = ['vestido', 'camisa', 'zapatos', 'producto', 'item', 'articulo'];
    return tokens.filter(token => productTypes.includes(this.stemmer.stem(token)));
  }

  extractColors(tokens) {
    const colors = ['rojo', 'azul', 'verde', 'negro', 'blanco', 'amarillo'];
    return tokens.filter(token => colors.includes(this.stemmer.stem(token)));
  }

  extractPriceRange(text) {
    const priceMatch = text.match(/(\d+)\s*(?:a|\-)\s*(\d+)/);
    return priceMatch ? { min: parseInt(priceMatch[1]), max: parseInt(priceMatch[2]) } : null;
  }

  // Métodos de base de datos (USANDO LA CONEXIÓN CENTRAL)
  async getBusinessConfig(businessId) {
    const query = 'SELECT * FROM businesses WHERE id = $1 AND status = $2';
    try {
      const result = await pool.query(query, [businessId, 'active']);
      return result.rows[0];
    } catch (error) {
      console.error('Error getting business config:', error);
      throw error;
    }
  }

  preprocessText(text) {
    return text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  formatTemplate(template, variables) {
    return template.replace(/{(\w+)}/g, (match, key) => {
      return variables[key] !== undefined ? variables[key] : match;
    });
  }

  getErrorMessage(businessId) {
    return 'Lo siento, estoy experimentando dificultades técnicas. Por favor, intenta nuevamente en unos minutos.';
  }

  // Métodos de extracción de entidades (placeholders)
  extractSizes(tokens) {
    const sizes = ['s', 'm', 'l', 'xl', 'pequeño', 'mediano', 'grande'];
    return tokens.filter(token => sizes.includes(this.stemmer.stem(token)));
  }

  extractServiceTypes(tokens) {
    const services = ['consulta', 'emergencia', 'cita', 'appointment', 'urgencia'];
    return tokens.filter(token => services.includes(this.stemmer.stem(token)));
  }

  extractDates(text) {
    const dateMatch = text.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    return dateMatch ? `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}` : null;
  }

  extractTimes(text) {
    const timeMatch = text.match(/(\d{1,2}):(\d{2})/);
    return timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : null;
  }
}

module.exports = UniversalBotService;