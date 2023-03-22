## WordPress REST API and Apollo Server Connection

- This repository contains the connection of apollo server schema's with rest API endpoints provided by WordPress(default). We can use this rest endpoints and fetch the results as need or also can create posts as needed.
- This repository uses local WP setup and its rest API endpoints as of now.
- You can see `src/schema/index.js` for `Schema` being created for graphql that we can fire a graphql query so we get result what we needed.
- You can see `src/datasources/index.js` for `Rest API` connection with Apollo server. This repository used `RESTDataSource` package to use `REST API` seamlessly without writing any extra code to fetch data such as `axios` for `fetch` functions.
- You can see `src/resolvers/index.js` for all the resolvers used to resolve schema and return the final result.
- You can start with main `src/index.js` file which created the server connection and pass `schema` and `resolvers` with our `dataSource` that is rest API endpoint.