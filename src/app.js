// Importaciones de módulos necesarios
import express from 'express';
import { pool } from './config/db.js';
import morgan from 'morgan';
import routes from './routes/index.routes.js';
import cors from 'cors';
import { errorHandler } from './utils/error.handle.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

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

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
};

(async () => {
    try {
        await initializeDatabaseConnection();
        startServer();
    } catch (error) {
        console.error('Error al iniciar la aplicacion:', error);
    };
})();