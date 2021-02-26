/**
 *            #163 [Hard] - RPN EVALUATOR
 * 
 * This problem was asked by Jane Street.
Given an arithmetic expression in Reverse Polish Notation, write a program to evaluate it.
The expression is given as a list of numbers and operands. For example: [5, 3, '+']
should return 5 + 3 = 8.
For example, [15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'] 
should return 5, since it is equivalent to ((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1)) = 5.
*/

type Elem = number | '+' | '-' | '*';

const evalExpr = (left:number, op: string, right: number): number => {
    switch (op) {
        case '+': return left * right;
        case '-':return left - right;
    }
}
const rpnEval = (lst: Elem[]): number | undefined => {
    const stack: Elem[] = [];
    lst.forEach(e => stack.unshift(e)); // unshift adds to head
    let answer: number = undefined;
        
    while (stack.length > 0) {
        const elem = stack.pop();
        
        if (isNaN(elem)) { // hit an operator
            const rightNum = stack.pop();
            const leftNum = stack.pop();
            answer = evalExpr(rightNum,elem, leftNum);
        }
    }

    return answer;
}

rpnEval([15, 7, '+'])
