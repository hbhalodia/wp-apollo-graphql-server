import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
// import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

// Import schema.
import typeDefs from './schema/index.js';

// Import data sources.
import WordPressPostAPI from './datasources/index.js';

// Import resolvers.
import resolvers from './resolvers/index.js';

const login = 'hitbhalodia';
const password = 'XS3K R6Ot KUL9 nZTa VW8m i0qB';

const buff = new Buffer(`${login}:${password}`);
const options = {
	token: 'Basic ' + buff.toString('base64'),
}

const dataSources = () => ({
	WordPressPostAPI: new WordPressPostAPI(options),
});

// const server = new ApolloServer({
// 	typeDefs,
// 	resolvers,
// });

// // export const graphqlHandler = startServerAndCreateLambdaHandler(
// // 	server,
// // 	handlers.createAPIGatewayProxyEventV2RequestHandler(),
// // 	{
// // 		context: async () => {
// // 			return {
// // 				dataSources: dataSources(),
// // 			};
// // 		},
// // 	},
// // );

// const { url } = await startStandaloneServer(server, {
// 	context: async ({ res, req }) => {
// 		return {
// 			dataSources: dataSources(),
// 		};
// 	},
// 	listen: { port: port },
// 	cors: {
// 		exposedHeaders: ['X-WP-Total', 'X-WP-TotalPages'],
// 	},
// });
// console.log('yese');
// console.log(`🚀 Apollo Server running at ${url}`);

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
	],
});

await server.start();

app.use(
	'/',
	cors({
		credentials: true,
		origin: [ 'http://localhost:3000', 'https://apollo-react-wp.netlify.app', 'http://localhost:3005' ],
		exposedHeaders: '*',
	}),
	bodyParser.json(),
	expressMiddleware(server, {
		context: async ({ req, res }) => {
			return {
				dataSources: dataSources(),
				res: res,
				req: req,
				responseHeaders: {}
			}
		},
	}),
);

await new Promise((resolve) => httpServer.listen({ port: 4002 }, resolve));

console.log(`🚀 Server ready at http://localhost:4002/`);
