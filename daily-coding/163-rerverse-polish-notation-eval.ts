/**
 *            #163 [Hard] - RPN EXPRESSION EVALUATOR
 * 
 * This problem was asked by Jane Street.
 * 
 * Given an arithmetic expression in Reverse Polish Notation, write a program to evaluate it.
 * The expression is given as a list of numbers and operands. 
 * For example: [5, 3, '+'] should return 5 + 3 = 8.
 * For example, [15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'] 
 * should return 5, since it is equivalent to ((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1)) = 5.
*/

type Operator =  '+' | '-' | '*' | '/';
type Elem = number | Operator;

/**
 * Evaluates <left number> OPERATOR <right number>
 * If op is not recognized returns NEGATIVE_INFINITY.
 * @example evalExpr(-5, '*', 10) returns -50
 */
const evalExpr = (left: number, op: Operator, right: number): number => {
    if (op === '+') {
        return left + right;
    } else if (op == '-') {
        return left - right;
    } else if (op === '*') {
        return left * right;
    } else if (op === '/') {
        return left / right;
    }
    return Number.NEGATIVE_INFINITY;
}

const rpnExprEval = (rpnExpression: Elem[]): number => {
    const stack: number[] = []; // contains numbers
    rpnExpression.forEach(elem => {
        // Push when a number
        if (typeof elem === 'number') {
            stack.push(elem);
        } else { // Pop 2 numbers when an operator is hit
            const right = stack.pop();
            const left = stack.pop();
            stack.push(evalExpr(left, elem, right));
        }
    });
    return stack[0];
}
/**
 *  ASSERTIONS
 */
console.log(evalExpr(-5, '*', 10) === -50);
console.log(evalExpr(-5, '~', 10) === Number.NEGATIVE_INFINITY);
console.log(rpnExprEval([15, 7, '+']) == 22);
console.log(rpnExprEval([15, 7, '-']) === 8);
console.log(rpnExprEval([14, 7, '/']) === 2);
console.log(rpnExprEval([14, 7, '*']) === 98);
console.log(
    rpnExprEval([15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-']) === 5
);
