import zod from 'zod';

const userSchema = zod.object({
    name: zod.string({
        invalid_type_error: "Invalid type",
        required_error: "This field is require: name"
    }),
    lastName: zod.string({
        invalid_type_error: "Invalid type",
        required_error: "This field is require: name"
    }),
    email: zod.string({
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

export {
    validateUserSchema,
    validatePartialUserSchema
};