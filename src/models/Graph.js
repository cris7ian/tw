import find from 'lodash/find';

export class Graph {
    constructor(nodes) {
        this.nodes = nodes;
    }

    weightOfPath(route) {
        const map = route.split('-');
        let distance = 0;
        for (let index = 0; index < map.length - 1; index++) {
            const start = map[index];
            const end = map[index+1];
            const way = find(this.nodes, (node) => node.start === start && node.end === end);
            if (!way) {
                distance = 'NO SUCH ROUTE';
                break;
            } else {
                distance += way.weight;
            }
        }
        return distance;
    }
}