const validateSchema = (schema, type = 'body') => {
    return (req, res, next) => {
        let dataToValidate;

        // Choose the part of the request to validate (body, params, or both)
        if (type === 'body') {
            dataToValidate = req.body;
        } else if (type === 'params') {
            dataToValidate = req.params;
        } else if (type === 'both') {
            const bodyError = schema.validate(req.body, { abortEarly: false });
            const paramsError = schema.validate(req.params, { abortEarly: false });

            if (bodyError.error || paramsError.error) {
                const errorMessages = [
                    ...(bodyError.error ? bodyError.error.details.map((err) => err.message) : []),
                    ...(paramsError.error ? paramsError.error.details.map((err) => err.message) : []),
                ];
                return res.status(400).json({ errors: errorMessages });
            }
            return next();
        }

        // Validate the specified part (body or params)
        const { error } = schema.validate(dataToValidate, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }
        next();
    };
};

module.exports = {
    validateSchema: validateSchema,
};
