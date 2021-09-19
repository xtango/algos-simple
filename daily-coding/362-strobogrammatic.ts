/**
 *                 Problem #362 [Easy] - Strobogrammatic
 * 
 * This problem was asked by Twitter.
 * 
 * A strobogrammatic number is a positive number that appears the same after being rotated 180 degrees.
 * For example, 16891 is strobogrammatic.
 * Create a program that finds all strobogrammatic numbers with N digits.
 */

/**
 * By position: 0->0, 1->1, 2->-1, ... 6->9 etc
 * where -1 encodes Not Applicable
 */
const ROTATE = [0, 1, -1, -1, -1, -1, 9, -1, 8, 6];

/**
 *         mid              Flip left and compare with unflipped-right
 *          v               starting from the outer to mid elements.
 * 1    6   8   9   1
 * |    |       |   |
 * |    v       |   |
 * |    9 ------    |
 * v                |
 * 1 ----------------
 */
const isStrobogrammatic = (num: number): boolean => {
    const arr = num.toString().split('');
    let [i, j] = [0, arr.length - 1];
    while (i <= j) {
        if (ROTATE[parseInt(arr[i])] !== parseInt(arr[j])) {
            return false;
        }
        i++;
        j--;
    }
    return true;
}

const findStrobogrammatic = (nDigits: number) => {
    const [min, max] = [nDigits === 1 ? 0 : Math.pow(10, nDigits - 1), Math.pow(10, nDigits) - 1];
    const valid = [];
    for (let i = min; i < max; i++) {
        if (isStrobogrammatic(i)) {
            valid.push(i);
        }
    }
    return valid;
}

/**
 * ASSERTIONS
 */
console.log(!isStrobogrammatic(89));
console.log(isStrobogrammatic(16891));
console.log(findStrobogrammatic(1).join(',') === '0,1,8');
console.log(findStrobogrammatic(2).join(',') === '11,69,88,96');
