import fs from 'fs';
import { Node } from './models/Node';

const path = process.argv[4];

fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
        return console.log('You need to pass the file path through the command line. (example: npm start input.txt');
    }
    const tree = data
        .split(', ')
        .map((node) => new Node(node[0], node[1], node[2]));
    console.log(tree);
});