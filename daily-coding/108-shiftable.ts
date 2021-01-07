/**
 *                          Problem #108 [Easy] - SHIFTABLE
 *
 * This problem was asked by Google.
 * Given two strings A and B, return whether or not A can be shifted some number of times to get B.
 * For example, if A is abcde and B is cdeab, return true. If A is abc and B is acb, return false.
 */

const rotateLeft = (a: string): string => a.slice(1) + a[0];

const canShift = (a: string, b: string): boolean => {
    if (a.length === b.length && a.length > 1) {
        let rotated = a;
        for (let i = 0; i < a.length; i++) {
            rotated = rotateLeft(rotated);
            if (rotated === b) {
                return true;
            }
        }
    }
    return false;
}

/**
 * ASSERTIONS
 */
console.log(rotateLeft('abc') === 'bca');
console.log(canShift('abcde', 'cdeab') === true);
console.log(canShift('abcde', 'deabc') === true);
console.log(canShift('a', 'b') === false);
console.log(canShift('ab', 'b') === false);
console.log(canShift('abc', 'acb') === false);
