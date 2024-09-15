import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const connectWithRetry = () => {
    mongoose.connect('mongodb://mongo:27017/graphql')
    .then(() => {
        console.log('Mongo connected');
    })
    .catch((err) => {
        console.log('Failed to connect to Mongo, retrying in 5 seconds...', err);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`server ready at ${url}`)
})