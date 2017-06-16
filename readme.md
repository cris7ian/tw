# Requirements

You need [Node](https://nodejs.org/en/). And that's it.

I'm using Babel to run ES2015. :heart: So don't worry, you won't have to read ES5 code.


# Instructions tu Run This

- `npm install` to create a folder full of the most outlandish dependencies.
- `npm run test` will run tests.
- `npm start [filename]` would start a ES7 running version of the code, but we do need to transpile to ES5 for a clean
output.
- `npm run build` will compile to ES5.
- `node dist/index input.txt` is all you need to run the optimizes version of the project. Of course `input.txt` is the
route of your file will run the code and return a clean output.
- If something explodes, don't worry. It's part of the masterplan.

# The Problem / Trains

![](https://media.giphy.com/media/l2Je3kfwO4jTSNM2c/giphy.gif)

The local commuter railroad services a number of towns in Kiwiland.  Because of monetary concerns, all of the tracks are
'one-way.'  That is, a route from Kaitaia to Invercargill does not imply the existence of a route from Invercargill to Kaitaia.  In fact, even if both of these routes do happen to exist, they are distinct and are not necessarily the same distance!

The purpose of this problem is to help the railroad provide its customers with information about the routes.  In
particular, you will compute the distance along a certain route, the number of different routes between two towns,
and the shortest route between two towns.

*Input:*  A directed graph where a node represents a town and an edge represents a route between two towns.  The
weighting of the edge represents the distance between the two towns.  A given route will never appear more than once, and for a given route, the starting and ending town will not be the same town.

*Output:* For test input 1 through 5, if no such route exists, output 'NO SUCH ROUTE'.  Otherwise, follow the route
as given; do not make any extra stops!  For example, the first problem means to start at city A, then travel directly
to city B (a distance of 5), then directly to city C (a distance of 4).
The distance of the route A-B-C.
The distance of the route A-D.
The distance of the route A-D-C.
The distance of the route A-E-B-C-D.
The distance of the route A-E-D.
The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two
such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such
trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
The length of the shortest route (in terms of distance to travel) from A to C.
The length of the shortest route (in terms of distance to travel) from B to B.
The number of different routes from C to C with a distance of less than 30.  In the sample data, the trips are: CDC,
CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.

# The Solution

The problem is very approachable because we're clearly talking about a Graph with weighted edges. So all the magic of
decades of research is fully available four our business and pleasure. The problem is a collection of questions that translate into the following features:

- Measure the weight of a given path.
- Find paths with a fixed or variable amount of stops.
- Find the best path (Our friend Dijkstra will help with this).
- Traverse the graph considering the weight of each node (having a function to measure paths makes it easy to this point).

# Dijkstra

We can use a plain Dijkstra implementation to traverse programmatically our graph with a nice performance
of ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/4fcb7644781d08e9e958d4a430a3107da04bf1b3)

Other conditions are met to use Dijkstra:

- We don't have isolated nodes (all stations are connected, or at least that is the nature of a single railroad system).
- Nodes are connected one-way, altho Dijkstra could be applied to that escenario by just creating duplicated yet
inverted edges.
- We don't have negative weights (trains don't go back).

The only real catch is that Dijkstra doesn't really like cyclic answers, it understands that if you're already at some
place you don' need to go anywhere else. So I did have to kickstart the algorithm for the starting node and its neighbors.

# Recursion

![](https://media.giphy.com/media/iThaM3NlpjH0Y/giphy.gif)

The rest of the questions are solved traversing the graph. Nothing more elaborate than filtering and reducing the
collection of edges that make the graph.

# Why JS?

I wanted to use JavaScript to provide a simple, straightforward and easy-to-read solution to the problem as well as use
the shortcuts of the language to my advantage.

I don't think that JavaScript is the best language in the World (Hell no), but using the right tool for the job is
something I enjoy and ES2015 did give me the tools to showcase a balance between OOP and functional programming, which
I think is the best approach to solve and understand this kind of problems.

I also tried to write the code in the same way the community writes code. The JS code one finds in GH is lean and
easy-to-use. If this code were to be written in Java, the approach would've been totally different, because of the OOP
nature of the language. Same case if I were to do this over again in Haskell, probably it would've been even leaner.

Also, the IO becomes trivial in Node.

# TDD
Writing the tests first is the cornerstone of pretty much every backend implementation I do. So I just wrote what I
wanted the code to be and then began coding. I don't honestly start with 100 cases, just the basic ones that come to mind and from there I try to add some clever ones if I have the time.

# The Code
- `src` has all the sourcefiles.
- `test` has all the tests.
- `src/index.js` is the entry point of the app.
