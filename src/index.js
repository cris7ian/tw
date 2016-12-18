import fs from 'fs';
import { parser } from './helpers/parser';
import { Graph } from './models/Graph';

const path = process.argv[4];

if (!path) {
    console.log('You need to pass the file path through the command line. (example: npm start input.txt)');
    process.exit(0);
}

fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
        return console.log('Invalid file. :(');
    }
    const nodes = parser(data);
    const graph = new Graph(nodes);
    console.log(`Output #1: ${graph.weightOfPathFromString('A-B-C')}`);
    console.log(`Output #2: ${graph.weightOfPathFromString('A-D')}`);
    console.log(`Output #3: ${graph.weightOfPathFromString('A-D-C')}`);
    console.log(`Output #4: ${graph.weightOfPathFromString('A-E-B-C-D')}`);
    console.log(`Output #5: ${graph.weightOfPathFromString('A-E-D')}`);
    console.log(`Output #6: ${graph.countTripsWithLessThanNStops('C', 'C', 3)}`);
    console.log(`Output #7: ${graph.countTripsWithExactStops('A', 'C', 4)}`);
    console.log(`Output #8: ${graph.findBestPath('A', 'C')}`);
    console.log(`Output #9: ${graph.findBestPath('B', 'B')}`);
    console.log(`Output #10: ${graph.countTripsWithMaximunDistance('C', 'C', 30)}`);
});