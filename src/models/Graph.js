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
    };

    countTripsWithExactStops(location, goal, stops) {
        return this.countTrips([], location, goal, stops, (trip, ceiling) => trip.length === ceiling);
    }

    countTripsWithLessThanNStops(location, goal, stops) {
        return this.countTrips([], location, goal, stops + 1, (trip, ceiling) => trip.length < ceiling  && trip.length > 1);
    }
}