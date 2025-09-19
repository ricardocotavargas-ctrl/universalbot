const Product = require('../../models/Product'); // Modelo centralizado

class EcommerceService {
    constructor(config) {
        this.config = config || {};
        // ¡NO creamos nueva conexión! Usamos el modelo Product que ya usa la conexión centralizada.
    }

    async handleProductInquiry(customerId, message, entities) {
        try {
            console.log(`🛒 handleProductInquiry llamado con:`, { customerId, message, entities });

            const businessId = this.config?.business_id || 1;
            console.log(`🏪 Business ID: ${businessId}`);

            if (!businessId) {
                throw new Error('Business ID not configured in EcommerceService');
            }

            const productModel = new Product();
            let products = [];

            // 1. Búsqueda por COLOR primero (si se detectó)
            if (entities.color && entities.color.length > 0) {
                const targetColor = entities.color[0];
                console.log(`🎨 Búsqueda por color: ${targetColor}`);
                products = await productModel.searchProducts(businessId, targetColor, null, 10);
                console.log(`📦 Productos encontrados por color: ${products.length}`);
            }
            
            // 2. Búsqueda por texto en el mensaje (si no encontró por color)
            if (products.length === 0) {
                // Extraer palabras clave del mensaje
                const searchKeywords = this.extractSearchKeywords(message);
                console.log(`🔎 Búsqueda por keywords: ${searchKeywords}`);
                products = await productModel.searchProducts(businessId, searchKeywords, null, 10);
                console.log(`📦 Productos encontrados por keywords: ${products.length}`);
            }

            if (products.length === 0) {
                console.log('❌ No se encontraron productos');
                return "No encontré productos que coincidan con tu búsqueda. ¿Podrías intentar con otras características?";
            }

            // 3. Filtrar adicionalmente por otros atributos
            if (entities.color && entities.color.length > 0 && products.length > 0) {
                const targetColor = this.stemmer.stem(entities.color[0]);
                console.log(`🎨 Filtrando por color: ${targetColor}`);
                products = products.filter(p => {
                    const attrs = typeof p.attributes === 'string' ? JSON.parse(p.attributes) : p.attributes;
                    const productColor = attrs.color ? this.stemmer.stem(attrs.color) : null;
                    return productColor === targetColor;
                });
                console.log(`📦 Productos después de filtro de color: ${products.length}`);
            }

            const response = this.formatProductResponse(products);
            console.log(`📤 Respondiendo con: ${response.substring(0, 100)}...`);
            return response;

        } catch (error) {
            console.error('❌ Error handling product inquiry:', error);
            return "Lo siento, estoy teniendo problemas para buscar productos. Por favor, intenta nuevamente.";
        }
    }

    // Agrega este método nuevo a la clase:
    extractSearchKeywords(message) {
        // Eliminar palabras comunes y mantener palabras clave
        const commonWords = ['hola', 'quiero', 'comprar', 'busco', 'tengo', 'necesito', 'para', 'de', 'en', 'con'];
        const words = message.toLowerCase().split(' ');
        
        return words.filter(word => 
            word.length > 3 && !commonWords.includes(word)
        ).join(' ');
    }

    async handleReturnRequest(customerId, message, entities) {
        try {
            // SOLUCIÓN TEMPORAL: Usar business_id = 1 si no está configurado
            const businessId = this.config?.business_id || 1;
            console.log(`🛒 Buscando productos para business: ${businessId}`);
            
            let products = [];
            
            if (entities.product_type && entities.product_type.length > 0) {
            // Search by product type
            const productModel = new Product();
            products = await productModel.searchProducts(businessId, entities.product_type[0], entities.product_type[0], 10);
            }

            const reason = this.extractReturnReason(message);
            const returnId = await this.createReturnRequest(customerId, order.id, reason);

            return `✅ Solicitud de devolución #${returnId} creada exitosamente. ¿Te gustaría programar la recogida a domicilio o prefieres llevarlo a un punto de entrega?`;

        } catch (error) {
            console.error('Error handling return request:', error);
            return "Lo siento, estoy teniendo problemas para procesar tu devolución. Por favor, intenta nuevamente.";
        }
    }

    // --- Métodos de Base de Datos (Temporales - Serán reemplazados por modelos) ---
    async getOrderStatus(customerId, orderNumber) {
        // MOCK: Esto será reemplazado por el modelo Order
        console.log(`[MOCK] Getting status for order ${orderNumber} from customer ${customerId}`);
        return {
            id: 1,
            order_number: orderNumber,
            status: 'en camino',
            total_amount: '59.99',
            created_at: new Date()
        };
    }

    async verifyOrder(customerId, orderNumber) {
        // MOCK: Esto será reemplazado por el modelo Order
        console.log(`[MOCK] Verifying order ${orderNumber} for customer ${customerId}`);
        return { id: 1 };
    }

    async createReturnRequest(customerId, orderId, reason) {
        // MOCK: Esto será reemplazado por el modelo Return
        console.log(`[MOCK] Creating return for order ${orderId} with reason: ${reason}`);
        return Math.floor(Math.random() * 1000); // Mock return ID
    }
    // --- Fin de Métodos Temporales ---

    // --- Utilidades de Procesamiento de Lenguaje (Mantenidas) ---
    extractOrderNumber(message) {
        const orderMatch = message.match(/(orden|pedido|order)\s*(#|num|numero)?\s*(\d+)/i);
        return orderMatch ? orderMatch[3] : null;
    }

    extractReturnReason(message) {
        if (/(talla|size|grande|pequeño|aprieta)/i.test(message)) return "Problema de talla";
        if (/(color|tono|diferente|esperaba)/i.test(message)) return "Color diferente";
        if (/(dañado|roto|defectuoso)/i.test(message)) return "Producto dañado";
        if (/(no gustó|arrepentido|cambié)/i.test(message)) return "Cambio de opinión";
        return "Otro motivo";
    }

    formatProductResponse(products) {
        if (!products || products.length === 0) {
            return "No encontré productos que coincidan con tu búsqueda.";
        }

        let response = `Encontré ${products.length} producto(s):\n\n`;
        
        products.forEach((product, index) => {
            response += `*${index + 1}. ${product.name}* - $${product.price}\n`;
            // Manejar descripción que puede ser null o muy larga
            const description = product.description ? 
                product.description.substring(0, 60) + '...' : 
                'Sin descripción';
            response += `   ${description}\n`;

            // Mostrar atributos clave como color o talla si existen
            const attributes = typeof product.attributes === 'string' ? 
                JSON.parse(product.attributes) : product.attributes;
            if (attributes && attributes.color) {
                response += `   Color: ${attributes.color}\n`;
            }
            if (attributes && attributes.size) {
                response += `   Talla: ${attributes.size}\n`;
            }
            response += '\n'; // Espacio entre productos
        });

        response += "¿Te gustaría más información sobre alguno de estos productos? Responde con el número.";
        return response;
    }

    // Stemmer para comparar colores y categorías consistentemente
    stemmer = {
        stem: (word) => {
            if (!word) return '';
            // Implementación simple de stemmer en español
            return word.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remover acentos
                .replace(/s$/, ''); // Remover 's' final (ej: "zapatos" -> "zapato")
        }
    };
}

module.exports = EcommerceService;