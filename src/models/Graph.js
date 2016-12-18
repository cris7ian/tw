import find from 'lodash/find';
import pull from 'lodash/pull';
import min from 'lodash/min';

export class Graph {
    constructor(nodes) {
        this.nodes = nodes;
        this.vertexes = [];
        nodes.map((node) => {
            if (this.vertexes.indexOf(node.start) == -1) this.vertexes.push(node.start);
            if (this.vertexes.indexOf(node.end)  == -1) this.vertexes.push(node.end);
        });
    }

    dijkstra(source, goal) {
        const dist = {};
        const prev = {};
        let queue = [];

        this.vertexes.map((vertex) => {
            dist[vertex] = Infinity;
            prev[vertex] = null;
            queue.push(vertex);
        });

        dist[source] = 0;

        while(queue.length > 0) {
            let tempVal = Infinity;
            let vertex = null;
            for (let index = 0; index < queue.length; index++) {
                if (dist[queue[index]] < tempVal) {
                    vertex = queue[index];
                    tempVal = dist[queue[index]];
                }
            }
            if (vertex === goal)  {
                break;
            }
            queue = pull(queue, vertex);
            this.nodes
                .filter((node) => node.start === vertex)
                .map((node) => {
                    const alt = dist[vertex] + node.weight;
                    if (alt < dist[node.end]) {
                        dist[node.end] = alt;
                        prev[node.end] = vertex;
                    }
                });
        }
        return dist[goal];
    }

    findBestPath(beginning, end) {
        return min(
            this.nodes
            .filter((node) => node.start === beginning)
            .map((node) => node.weight + this.dijkstra(node.end, end))
        );
    }

    weightOfPathFromString(str) {
        return this.weightOfPath(str.split('-'));
    }

    weightOfPath(map) {
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

    countTrips(trip, location, goal, ceiling, comparator) {
        const soFar = [...trip, location];
        if (comparator(trip, ceiling) && location === goal)  {
            return 1;
        } else if (trip.length >= ceiling) {
            return 0;
        } else {
            return [...this.nodes]
                .filter((node) => node.start === location)
                .reduce((sum, node) => sum + this.countTrips(soFar, node.end, goal, ceiling, comparator), 0);
        }
    }

    measureTrips(trip, location, goal, distanceAllowed) {
        const soFar = [...trip, location];
        const distanceSoFar = this.weightOfPath(soFar);
        if (distanceSoFar < distanceAllowed && location === goal && soFar.length > 1)  {
            return 1 + [...this.nodes]
                            .filter((node) => node.start === location)
                            .reduce((sum, node) => sum + this.measureTrips(soFar, node.end, goal, distanceAllowed), 0);
        } else if (distanceSoFar >= distanceAllowed) {
            return 0;
        } else {
            return [...this.nodes]
                        .filter((node) => node.start === location)
                        .reduce((sum, node) => sum + this.measureTrips(soFar, node.end, goal, distanceAllowed), 0);
        }
    }

    countTripsWithExactStops(source, goal, stops) {
        return this.countTrips(
            [],
            source,
            goal,
            stops,
            (trip, ceiling) => trip.length === ceiling
        );
    }

    countTripsWithLessThanNStops(source, goal, stops) {
        return this.countTrips(
            [],
            source,
            goal,
            stops + 1,
            (trip, ceiling) => trip.length < ceiling && trip.length > 1
        );
    }

    countTripsWithMaximunDistance(source, goal, distance) {
        return this.measureTrips(
            [],
            source,
            goal,
            distance
        );
    }
}