const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('Apollo-Server');

const User = require('../../models/User.js');
const { SECRET_KEY } = require('../../config.js');
const {
    validateRegisterInput,
    validateLoginInput,
} = require('../..//util/validators.js');

const getUserToken = (user) =>
    jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

module.exports = {
    Mutation: {
        async register(
            parent,
            { registerInput: { username, email, password, confirmPassword } },
            context,
            info
        ) {
            // TODO: Validation
            const { errors, valid } = validateRegisterInput({
                username,
                email,
                password,
                confirmPassword,
            });
            if (!valid) throw new UserInputError('Error', { errors });
            // TODO: Make sure user isn't already exist
            const user = await User.findOne({ username });
            if (user)
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken',
                    },
                });

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();
            const token = getUserToken(res);

            return {
                ...res._doc,
                id: res._id,
                token,
            };
        },
        async login(parent, { username, password }) {
            const { errors, valid } = validateLoginInput({
                username,
                password,
            });
            if (!valid) throw new UserInputError('Error', { errors });

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = getUserToken(user);

            return {
                id: user._id,
                ...user._doc,
                token,
            };
        },
    },
};
