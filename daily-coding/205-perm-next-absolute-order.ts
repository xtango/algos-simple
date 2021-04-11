/**
 *                #205 [Easy] - NEXT PERMUTATION OF NUM
 *
 * Good morning! Here's your coding interview problem for today.
 * 
 * This problem was asked by IBM.
 * Given an integer, find the next permutation of it in absolute order.
 * For example, given 48975, the next permutation would be 49578.
 */


const numToArr = (num: Number): number[] => num.toString().split('').map(x=> parseInt(x));

/**
 * From right to left we find the digit that's not desc sorted. This 
 * is the index of the candidate digit to replace to possibly make the perm larger.
 * 
 * @example findTailIndex(4321) -> 0 as there's no larger perm
 * @example findTailIndex(4312) -> 3 // as the number 2 is a replacement candidate. Replacing 2 with 1 gives 4321
 */
const findTailIndex = (numStr: string): number => {
    let i = numStr.length - 1;
    while(i > 0 &&  numStr[i-1] > numStr[i]) {
        i--;
    }
    return i;
}

const nextLargerPerm = (num: number): number => {
    const numStr = num.toString();
    const tailIdx = findTailIndex(numStr);
    if (tailIdx === 0) {
        return num;
    }
    
    // For '4312' tailIdx is 3, pointing to '2'. rhs = 12 (include the left char)
    if (tailIdx > 0) {
        const rhs = numStr.substring(tailIdx -1)

    }
    return num;
}

/**
 * ASSERTIONS
 */
console.log(numToArr(1234).join(' ') === '1 2 3 4')
console.log(findTailIndex('4321') === 0);
console.log(findTailIndex('4312') === 3);
//console.log(nextLargerPerm(NUM2));
