import fs from 'fs';
import { parser } from './helpers/parser';

const path = process.argv[4];

fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
        return console.log('You need to pass the file path through the command line. (example: npm start input.txt');
    }
    const tree = parser(data);
    console.log(tree);
});