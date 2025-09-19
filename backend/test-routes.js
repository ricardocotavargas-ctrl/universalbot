const axios = require('axios');

const BASE_URL = 'https://universalbot-backend.onrender.com';

async function testRoutes() {
  try {
    console.log('🧪 Probando rutas del backend...');
    
    // Test health endpoint
    console.log('\n1. Probando /api/health:');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health:', healthResponse.data);
    
    // Test API root
    console.log('\n2. Probando /api:');
    const apiResponse = await axios.get(`${BASE_URL}/api`);
    console.log('✅ API Root:', apiResponse.data);
    
    // Test root
    console.log('\n3. Probando /:');
    const rootResponse = await axios.get(BASE_URL);
    console.log('✅ Root:', rootResponse.data);
    
    console.log('\n🎉 ¡Todas las rutas funcionan correctamente!');
    
  } catch (error) {
    console.error('❌ Error probando rutas:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('URL:', error.response.config.url);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testRoutes();
