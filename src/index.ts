import * as xml2js from 'xml2js';
import * as fs from 'fs';

const xml = `<?xml version="1.0" encoding="UTF-8" ?>
            <user id="1">
                <name>John Doe</name>
                <email>john.doe@example.com</email>
                <roles>
                    <role>Member</role>
                    <role>Admin</role>
                </roles>
                <admin>true</admin>
            </user>`;

xml2js
  .parseStringPromise(xml, { mergeAttrs: true })
  .then((result) => {
    const json = JSON.stringify(result, null, 4);
    fs.writeFileSync('user.json', json);
  })
  .catch((err) => console.log(err));
