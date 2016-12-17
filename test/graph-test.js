import assert from 'assert';
import { parser } from '../src/helpers/parser';
import { Graph } from '../src/models/Graph';


describe('Graph', () => {
    const graph = new Graph(parser('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7'));

    describe('Calculating the Weight of a given route', () => {
        it('should be the sum of the weights of all the edges in the route or NO SUCH ROUTE if there is none', () => {
            assert.equal(graph.weightOfPath('A-B-C'), 9);
            assert.equal(graph.weightOfPath('A-D'), 5);
            assert.equal(graph.weightOfPath('A-D-C'), 13);
            assert.equal(graph.weightOfPath('A-E-B-C-D'), 22);
            assert.equal(graph.weightOfPath('A-E-D'), 'NO SUCH ROUTE');
        });
    });

    describe('Calculating the number of trips starting and ending at the same place with exactly N stops', () => {
        it('Should be only a fixed amount of routes', () => {
            assert.equal(graph.countTripsWithExactStops('A', 'C', 4), 3);
        });
    });

    describe('Calculating the number of trips starting and ending at the same place with at least N stops', () => {
        it('Should be only a fixed amount of routes', () => {
            assert.equal(graph.countTripsWithLessThanNStops('C', 'C', 3), 2);
        });
    });

    describe('Testing the search algorithm', () => {
        it('Should return 9', () => {
            assert.equal(graph.dijkstra('A', 'C'), 9);
            assert.equal(graph.dijkstra('B', 'E'), 6);
            assert.equal(graph.dijkstra('C', 'C'), 9);
        });
    });
});