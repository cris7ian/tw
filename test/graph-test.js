import assert from 'assert';
import { parser } from '../src/helpers/parser';
import { Graph } from '../src/models/Graph';


describe('Graph', () => {
    const graph = new Graph(parser('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7'));

    describe('Calculating the Weight of a given route', () => {
        it('should be 9', () => {
            assert.equal(graph.weightOfPath('A-B-C'), 9);
            assert.equal(graph.weightOfPath('A-D'), 5);
            assert.equal(graph.weightOfPath('A-D-C'), 13);
            assert.equal(graph.weightOfPath('A-E-B-C-D'), 22);
            assert.equal(graph.weightOfPath('A-E-D'), 'NO SUCH ROUTE');
        });
    });
});