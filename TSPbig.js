var cities = [[0, 0],[2, 2],[2,-2],
              [6, 2],[6,-2],[8, 0]];
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

// Create cost vector, map arc to column
// x01 x02 x03 x04 x05 x10 x12 ...
var n = numCities * (numCities-1);
var c = new Array(n);
var col = new Array(), z=0;
for (i = 0; i < numCities; i++) {
	for (j = 0; j < numCities; j++) {
		if (i != j) {
			col[[i,j]] = z;
			c[z] = Cij[i][j];
			z++;
		}
	}
}

// Create each row of A and b
var m = numCities*2;
var A = new Array(m);
var b = new Array(m);
// Outdegree of each city = 1 (no constraint for last city)
for (i = 0; i < numCities; i++) {
	A[i] = new Array(n);
	for (j = 0; j < n; j++) A[i][j] = 0;
	for (j = 0; j < numCities; j++) {
		if (i != j) A[i][col[[i,j]]] = 1;
	}
	b[i] = 1;
}
// Indegree of each city = 1 (no constraint for first city)
for (j = 0; j < numCities; j++) {
	A[j+numCities] = new Array(n);
	for (i = 0; i < n; i++) A[j+numCities][i] = 0;
	for (i = 0; i < numCities; i++) {
		if (i != j) A[j+numCities][col[[i,j]]] = 1;
	}
	b[j+numCities] = 1;
}

// Set variable bounds and type
var xLB = new Array(n);
var xUB = new Array(n);
var xINT = new Array(n);
for (i = 0; i < n; i++) {
	xLB[i] = 0; xUB[i] = 1; xINT[i] = true;
}
console.log(A)
//console.log(b)
//console.log(c)
PrimalSimplex(A, b, c, m, n, xLB, xUB);