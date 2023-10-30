import winston from 'winston';

/**
 * Configuración básica para winston
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: { service: 'api-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log' }),
    ],
});

/**
 * Clase base para manejar errores personalizados
 * @extends {Error}
 */
class AppError extends Error {
    /**
     * @param {string} message - Mensaje del error
     * @param {number} [statusCode=500] - Código de estado HTTP
     * @param {boolean} [isOperational=true] - Si el error es operacional (esperado) o no
     */
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Clase para manejar errores de tipo BadRequest (400)
 * @extends {AppError}
 */
class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

/**
 * Clase para manejar errores de tipo Unauthorized (401)
 * @extends {AppError}
 */
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

/**
 * Clase para manejar errores de tipo NotFound (404)
 * @extends {AppError}
 */
class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

/**
 * Clase para manejar errores de tipo Conflict (409)
 * @extends {AppError}
 */
class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}

/**
 * Clase para manejar errores de tipo InternalServerError (500)
 * @extends {AppError}
 */
class InternalServerError extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, 500, false);
    }
}

/**
 * Manejador de errores global para la aplicación
 * @param {Error} err - El error capturado
 * @param {import('express').Request} req - El objeto de solicitud HTTP
 * @param {import('express').Response} res - El objeto de respuesta HTTP
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    const errorDetails = {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
    };

    // Registro y respuesta en modo de producción
    if (process.env.NODE_ENV === 'production') {
        logger.error(errorDetails);
        
        if (err.isOperational) {
            res.status(statusCode).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Ocurrió un error interno. Intente nuevamente más tarde.' });
        }
    } else {
        // Respuesta detallada en modo de desarrollo
        res.status(statusCode).json(errorDetails);
    }
};

export { 
    AppError, 
    BadRequestError, 
    UnauthorizedError, 
    NotFoundError, 
    ConflictError, 
    InternalServerError, 
    errorHandler 
};
