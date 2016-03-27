import {Schema} from '../data/schema'
import {graphql} from 'graphql'
import {introspectionQuery} from 'graphql/utilities';
import fs from 'fs';
import path from 'path';

//To update the schema use: npm run update-schema


//Generate the schema.
console.log ('Generating schema...');
  (async () => {
    var result = await (graphql(Schema, introspectionQuery));
    if (result.errors) {
      console.error(
          'ERROR introspecting schema: ',
          JSON.stringify(result.errors, null, 2)
      );
    } else {
      console.log ('Schema generated !!!');

      let destinationFile = path.join(__dirname, '../data/schema.json');
      console.log ('writing schema to : ' + destinationFile);

      let jsonSchema = JSON.stringify(result, null, 2);
      fs.writeFile(destinationFile, jsonSchema, (err) => {
            if (err) throw err;
          console.log ('Schema writed (Press Ctrl+C to finish) !!!');
          }
        );
    }
})();
