// frontend/admin-panel/src/utils/security.js
export class SecurityMiddleware {
  static init() {
    this.setSecurityHeaders();
    this.preventXSS();
    this.setupInterceptors();
  }

  static setSecurityHeaders() {
    // Headers de seguridad para todas las requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const [url, options = {}] = args;
      
      options.headers = {
        ...options.headers,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Content-Security-Policy': "default-src 'self' https:; script-src 'self' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;"
      };

      return originalFetch.apply(this, [url, options]);
    };
  }

  static preventXSS() {
    // Sanitizar inputs peligrosos
    document.addEventListener('DOMContentLoaded', () => {
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => {
          e.target.value = this.sanitizeInput(e.target.value);
        });
      });
    });
  }

  static sanitizeInput(input) {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  static setupInterceptors() {
    // Interceptar console logs en producción
    if (process.env.NODE_ENV === 'production') {
      const originalLog = console.log;
      console.log = function(...args) {
        // No loggear información sensible
        const sensitivePatterns = [/token/i, /password/i, /key/i, /secret/i];
        const shouldLog = !args.some(arg => 
          typeof arg === 'string' && sensitivePatterns.some(pattern => pattern.test(arg))
        );
        
        if (shouldLog) {
          originalLog.apply(console, args);
        }
      };
    }
  }
}

// Inicializar seguridad
SecurityMiddleware.init();