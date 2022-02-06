const postsResolvers = require('./posts.js');
const userResolvers = require('./users.js');

module.exports = {
    Query: {
        ...postsResolvers.Query,
        ...userResolvers.Query,
    },
    Mutation: {
        ...postsResolvers.Mutation,
        ...userResolvers.Mutation,
    },
};
