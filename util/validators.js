const emailValidatorRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
    validateRegisterInput({ username, email, password, confirmPassword }) {
        const errors = {};
        if (!username.trim()) errors.username = 'Username must not be empty';

        if (!email.toLowerCase().match(emailValidatorRegex))
            errors.email = 'Email must be valid email address';

        if (!password.trim()) errors.username = 'Password must not be empty';

        if (confirmPassword !== password)
            errors.confirmPassword = 'Password must match';

        return { errors, valid: Object.keys(errors).length === 0 };
    },

    validateLoginInput({ username, password }) {
        const errors = {};
        if (!username.trim()) errors.username = 'Username must not be empty';

        if (!password.trim()) errors.username = 'Password must not be empty';

        return { errors, valid: Object.keys(errors).length === 0 };
    },
};
