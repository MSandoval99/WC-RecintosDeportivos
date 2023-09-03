// Importaciones de módulos necesarios
import express from 'express'; // Framework web para crear la API
import { pool } from './config/db.js'; // Conexión a la base de datos
import morgan from 'morgan'; // Middleware de registro para solicitudes HTTP
import routes from './routes/index.routes.js'; //Importando el enrutador
import cors from 'cors'; // Middleware para permitir peticiones desde otros dominios

// Inicializa la aplicación Express
const app = express();
// Define el puerto del servidor, ya sea desde una variable de entorno o el valor predeterminado 3000
const PORT = process.env.PORT || 3000;

// Configura Morgan para registrar las solicitudes HTTP en un formato adecuado para el desarrollo
app.use(morgan('dev'));

// Configura CORS para permitir peticiones desde otros dominios
app.use(cors());

// Middleware para permitir que Express pueda interpretar los datos enviados en el cuerpo de las solicitudes HTTP
app.use(express.json());

// Montar el enrutador en la aplicación
app.use(routes);

/**
 * Intenta establecer una conexión a la base de datos.
 * Una vez establecida la conexión, la libera inmediatamente.
 * Esta función sirve principalmente para comprobar que la conexión a la base de datos es válida al iniciar la aplicación.
 */
const initializeDatabaseConnection = async() => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexion exitosa a la base de datos');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
};

/**
 * Inicia el servidor Express, escuchando en el puerto definido.
 */
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
};

// Función autoinvocada para iniciar la aplicación
(async () => {
    try {
        // Primero, intenta inicializar la conexión a la base de datos
        await initializeDatabaseConnection();
        // Si la conexión a la base de datos tiene éxito, inicia el servidor
        startServer();
    } catch (error) {
        // Si ocurre algún error al iniciar la aplicación, regístralo y termina el proceso
        console.error('Error al iniciar la aplicacion:', error);
        process.exit(1); // Termina el proceso con un código de salida que indica error
    };
})();