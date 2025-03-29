const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API Documentation",
            version: "1.0.0",
            description: "Ecommerce API documentation",
        },
        servers: [
            {
                url: "http://localhost:80",
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        path.join(__dirname, "../docs/*.js"),
        path.join(__dirname, "../routes/*.js")
    ],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
