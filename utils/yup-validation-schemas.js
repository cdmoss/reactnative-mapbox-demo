import * as Yup from 'yup'

const validations = {
    loginValidations: Yup.object().shape({
        username: Yup
            .string()
            .required("Please provide a username"),
        password: Yup
            .string()
            .required("Please provide a password")
    }),

    registerCredsValidation: Yup.object().shape({
        username: Yup
            .string()
            .required("Please provide a username")
            .min(8, 'Must be between 8 and 25 characters.')
            .max(20, 'Must be 20 characters or less'),
        email: Yup
            .string()
            .required("Please provide an email")
            .min(8, 'Must be between 8 and 25 characters.')
            .max(25, 'Must be between 8 and 25 characters.'),
        password: Yup
            .string()
            .required("Please provide a password")
            .min(8, 'Must be between 8 and 25 characters.')
            .min(22, 'Must be between 8 and 25 characters.'),
        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref('password'), null], "Your passwords don't match."),
    }),

    registerMeasurementsValidation: Yup.object().shape({
        height: Yup
            .number("Please enter a valid number."),
        weight: Yup
            .number("Please enter a valid number.")
    }),
}

export default validations;