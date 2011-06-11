var cities = [[0, 0],[2, 2],[2,-2],
              [8, 2],[8,-2],[10, 0]];
var numCities = 6;
var Cij = new Array(numCities);
for (i = 0; i < numCities; i++) {
	Cij[i] = new Array(numCities);
	for (j = 0; j < numCities; j++) {
		Cij[i][j] = Math.sqrt( (cities[i][0] - cities[j][0]) * (cities[i][0] - cities[j][0])
		                      +(cities[i][1] - cities[j][1]) * (cities[i][1] - cities[j][1]))
		if (i==j) Cij[i][j] = 10000;
	}
}

var tsp = new Object();

// Create cost vector, map arc to column
// x00 x01 x02 x03 x04 x05 x10 x11 ...
tsp.n = (numCities)*(numCities-1)/2;
tsp.c = new Array(tsp.n);
var col = new Array(), z=0;
for (i = 0; i < numCities; i++) {
	for (j = i+1; j < numCities; j++) {
		col[[i,j]] = z;
		col[[j,i]] = z;
		tsp.c[z] = Cij[i][j];
		z++;
	}
}

// Create each row of A and b
tsp.m = numCities;
tsp.A = new Array(tsp.m);
tsp.b = new Array(tsp.m);
// Degree of each city = 1 (no constraint for last city)
for (i = 0; i < numCities; i++) {
	tsp.A[i] = new Array(tsp.n);
	for (j = 0; j < tsp.n; j++) tsp.A[i][j] = 0;
	for (j = 0; j < numCities; j++) {
		if (i!=j) tsp.A[i][col[[i,j]]] = 1;
	}
	tsp.b[i] = 2;
}

// Set variable bounds and type
tsp.xLB = new Array(tsp.n);
tsp.xUB = new Array(tsp.n);
tsp.xINT = new Array(tsp.n);
for (i = 0; i < tsp.n; i++) {
	tsp.xLB[i] = 0; tsp.xUB[i] = 1; tsp.xINT[i] = true;
}
//console.log(tsp.A)
//console.log(tsp.b)
//console.log(tsp.c)
PrimalSimplex(tsp);

// Add subtour elimination constraint
// Need a new variable for the slack
tsp.n += 1;
tsp.xLB.push(0);
tsp.xUB.push(Infinity);
tsp.c.push(0);
tsp.b.push(2);
for (i = 0; i < numCities; i++) tsp.A[i].push(0);
tsp.m += 1;
tsp.A.push(new Array());
tsp.A[numCities] = [1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1]
PrimalSimplex(tsp);