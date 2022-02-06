const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MongoKey } = require('./config.js');
const Post = require('./models/Post.js');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const runServer = async () => {
    await mongoose.connect(MongoKey, { useNewUrlParser: true });

    const { url } = await server.listen({ port: 5000 });
    console.log(`Server is running at ${url}`);
};

runServer();
