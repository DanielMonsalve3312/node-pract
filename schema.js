const z = require('zod');

const userSchema = z.object({
    name: z.string({
        invalid_type_error: "Invalid type",
        required_error: "This field is require: name"
    }),
    lastName: z.string({
        invalid_type_error: "Invalid type",
        required_error: "This field is require: name"
    }),
    email: z.string({
        required_error: "This field is require: name"
    }).email({
        message: "Invalid format"
    }),
})

function validateUserSchema (object) {
    return userSchema.safeParse(object)
}

function validatePartialUserSchema (object) {
    return userSchema.partial().safeParse(object)
}

module.exports = {
    validateUserSchema,
    validatePartialUserSchema
};