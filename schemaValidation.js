const joi = require("joi");

module.exports.listingSchemaModel = joi.object({

    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required().min(0),
    location: joi.string().required(),
    country: joi.string().required(),
    image: joi.string().allow("", null)
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().integer().min(1).max(5).required(),
        comment: joi.string().required()
    })
}).required();