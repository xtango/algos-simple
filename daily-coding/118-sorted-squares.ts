/**
 *                  #118 [Easy] - SORTED SQUARES
 * 
 * This problem was asked by Google.
 * Given a sorted list of integers, square the elements and give the output in sorted order.
 * For example, given [-9, -2, 0, 2, 3], return [0, 4, 4, 9, 81].
 * 
 * SOLUTION
 * We use 2 pointers that traverse from outermost-left and outermost-right until they meet inside.
 * Move the appropriate pointer if the number squared is larger.
 */
const sortedSquares = (input: number[]): number[] => {
    let [left, right] = [0, input.length - 1];
    const answer = [];

    while (left <= right) {
        const leftSquared = input[left] * input[left];
        const rightSquared = input[right] * input[right];
        
        if (leftSquared < rightSquared) {
            answer.unshift(rightSquared); // insert at start
            right--;
        } else {
            answer.unshift(leftSquared);  // insert at start
            left++;
        }
    }
    return answer;
}


/**
 * ASSERTIONS
 */
console.log(JSON.stringify(sortedSquares([-9, -2, -1])) === '[1,4,81]');
console.log(JSON.stringify(sortedSquares([-9, -2, 0, 2, 3])) === '[0,4,4,9,81]');
console.log(JSON.stringify(sortedSquares([0, 2, 4])) === '[0,4,16]');
