
import nerdamer from'nerdamer/nerdamer.core.js';
import 'nerdamer/Solve.js';
import 'nerdamer/Algebra.js';





var e = nerdamer.solveEquations('y^2=x', 'y');
console.log(e[0].args);
//4+x^2

var sol = nerdamer.solveEquations(['x+y=1', '2*x=6', '4*z+y+w=6','w=x^2']);
console.log(sol);