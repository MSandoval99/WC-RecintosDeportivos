import winston from 'winston';

// Configuración básica para winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: { service: 'api-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log' }),
    ],
});

class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}

class InternalServerError extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, 500, false);
    }
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    const errorDetails = {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
    };

    if (process.env.NODE_ENV === 'production') {
        logger.error(errorDetails);
        
        if (err.isOperational) {
            res.status(statusCode).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Ocurrió un error interno. Intente nuevamente más tarde.' });
        }
    } else {
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
