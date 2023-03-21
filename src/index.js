import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Import schema.
import typeDefs from './schema/index.js';

// Import data sources.
import WordPressPostAPI from './datasources/index.js';

// Import resolvers.
import resolvers from './resolvers/index.js';

const port = Number.parseInt(process.env.PORT) || 4002;

const dataSources = () => ({
	WordPressPostAPI: new WordPressPostAPI(),
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	context: async () => {
		return {
			dataSources: dataSources(),
		};
	},
	listen: { port: port },
});

console.log(`🚀 Apollo Server running at ${url}`);
