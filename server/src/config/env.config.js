process.loadEnvFile('./.env'); 

const appHost = process.env.APP_HOST; 
const appPort = process.env.APP_PORT;
const mongoUri = process.env.MONGO_URI;
const jwtAccessSecretKey = process.env.JWT_ACCESS_SECRET_KEY;
const clientUrl = process.env.CLIENT_URL;
export {
    appHost, 
    appPort, 
    mongoUri, 
    jwtAccessSecretKey, 
    clientUrl
}