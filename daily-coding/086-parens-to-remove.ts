/**
 *                  #86 - PARENS TO REMOVE
 *
 * This problem was asked by Google.
 *
 * Given a string of parentheses, write a function to compute the minimum number
 * of parentheses to be removed to make the string valid (i.e. each open 
 * parenthesis is eventually closed).
 * 
 * For example, given the string "()())()", you should return 1. 
 * Given the string ")(", you should return 2, since we must
 * remove all of them.
 */
const parensToRemove = (st: string): number => {
    const stack: string[] = []; // top is at the end
    const pop = () => stack.splice(stack.length - 1, 1);
    const push = (ch: string) => stack.push(ch);

    // Returns true when top is ( and ch is )
    const isMatch = (ch: string): boolean =>
        stack.length > 0
        && stack[stack.length - 1] === '('
        && ch === ')';

    [...st].forEach((ch: string) => {
        if (isMatch(ch)) {
            pop();
        } else {
            push(ch);
        }
        console.log(`${st} : stack`, stack);
    });
    return stack.length;
}

/**
 * ASSERTIONS
 */
console.log(parensToRemove('()') === 0);
console.log(parensToRemove('(()') === 1);
console.log(parensToRemove(')(') === 2);
console.log(parensToRemove('(()') == 1);
console.log(parensToRemove('())') === 1);
console.log(parensToRemove('()())()') === 1);
