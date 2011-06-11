
function TestPrimalSimplex() {
    var test = new Object();
    test.A = [[ 2, 1, 1, 0],
              [20, 1, 0, 1]];
    test.b = [40, 100];
    test.c = [-10, -1, 0, 0];
    test.m = 2;
    test.n = 4;
    test.xLB = [2, 0, 0, 0];
    test.xUB = [3, Infinity, Infinity, Infinity];
    SimplexJS.PrimalSimplex(test);
	console.log(test.x, test.z);
    // Should be 3, 34, 0, 6
}

function TestBandB() {
    var test = new Object();
    test.A = [[ 1, 1, 0, 1, 0, 0],
              [ 0, 1, 1, 0, 1, 0],
			  [.5,.5, 1, 1, 0, 1]];
    test.b =  [ 1, 1, 1];
    test.c =  [-1,-1,-1, 0, 0, 0];
    test.m = 3;
    test.n = 6;
    test.xLB = [0, 0, 0, 0, 0, 0];
    test.xUB = [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity];
	test.xINT = [true, true, true, false, false, false];
    SimplexJS.SolveMILP(test);
	console.log(test.x, test.z);
    // Should be 1, 0, 0, 0, 1, 0.5, z=-1
	//        or 0, 1, 0, 0, 0, 0.5, z=-1
}
console.log("Testing Primal");
TestPrimalSimplex();
console.log("Should be 3, 34, 0, 6");

console.log("Testing Branch and Bound");
TestBandB();
console.log(" Should be 1, 0, 0, 0, 1, 0.5, z=-1");
console.log("        or 0, 1, 0, 0, 0, 0.5, z=-1");