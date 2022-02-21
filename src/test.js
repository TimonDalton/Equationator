
import nerdamer from'nerdamer/nerdamer.core.js';
import 'nerdamer/Solve.js';
import 'nerdamer/Algebra.js';


let scope = {
    'x':1,
    'a':2,
}


var e = nerdamer.solveEquations('y^2=3','y');
console.log(nerdamer(e[0]).evaluate().text('decimal'));

// var g = nerdamer.solveEquations('a-b=3','b-x=1');
// console.log(nerdamer(g.evaluate(scope).text('decimal')));
// //4+x^2


var e = nerdamer('a+b');
console.log(nerdamer('a+b').evaluate(scope).toString());

var sol = nerdamer.solveEquations(['a+b=3','b+c=3','c+d=3','a+d=3',]);
console.log(sol);