import express from 'express';
import GraphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Schema from './data/schema';
import {MongoClient} from 'mongodb';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;


let server = express();

(async() =>{
  let db;
  let schema;

  console.log ('Connecting to db: '+process.env.MONGO_URL);
  MongoClient.connect (process.env.MONGO_URL, (err,database) => {

    if (err) throw err;
    db = database;

    console.log ('Connected to db: '+ database.databaseName +'!!!');
    schema = Schema(db)
    server.use('/',GraphQLHTTP({
      schema,
      graphiql: true
    }));

    server.listen(GRAPHQL_PORT, () => console.log(
      `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
    ));


// Serve the Relay app
  var compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'app.js'),
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          test: /\.js$/,
        }
      ]
    },
    output: {filename: 'app.js', path: '/'}
  });
  var app = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
    publicPath: '/js/',
    stats: {colors: true}
  });
  // Serve static resources
  app.use('/', express.static(path.resolve(__dirname, 'public')));
  app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
  });

  });
})();
