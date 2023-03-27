import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

// Import schema.
import typeDefs from './schema/index.js';

// Import data sources.
import WordPressPostAPI from './datasources/index.js';

// Import resolvers.
import resolvers from './resolvers/index.js';

const port = Number.parseInt(process.env.PORT) || 4002;
const login = 'hitbhalodia';
const password = 'XS3K R6Ot KUL9 nZTa VW8m i0qB';

const buff = new Buffer(`${login}:${password}`);
const options = {
	token: 'Basic ' + buff.toString('base64'),
}

const dataSources = () => ({
	WordPressPostAPI: new WordPressPostAPI(options),
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// export const graphqlHandler = startServerAndCreateLambdaHandler(
// 	server,
// 	handlers.createAPIGatewayProxyEventV2RequestHandler(),
// 	{
// 		context: async () => {
// 			return {
// 				dataSources: dataSources(),
// 			};
// 		},
// 	},
// );

const { url } = await startStandaloneServer(server, {
	context: async () => {
		return {
			dataSources: dataSources(),
		};
	},
	listen: { port: port },
});

console.log(`🚀 Apollo Server running at ${url}`);
