import assert from 'assert';
import { parser } from '../src/helpers/parser';


describe('Parser', () => {
    const graph = parser('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

    describe('Parsing a string into a collection of nodes', () => {
        it('should read 9 elements', () => {
            assert.equal(graph.length, 9);
        });
    });
});