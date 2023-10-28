import dotenv from 'dotenv';
dotenv.config();
// Importaciones de módulos necesarios
import express from 'express';
import { pool } from './config/db.js';
import morgan from 'morgan';
import routes from './routes/index.routes.js';
import cors from 'cors';
import { errorHandler, AppError } from './utils/error.handle.js';

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
        if (process.env.NODE_ENV === 'production') {
            console.error('Error al conectar a la base de datos');
            throw new AppError('Error de servidor', 500);
        } else {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        }
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
