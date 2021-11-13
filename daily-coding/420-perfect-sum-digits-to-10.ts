/**
 *                      Problem #420 [Easy] - PERFECT NUMBER
 * 
 * This problem was asked by Microsoft.
 * 
 * A number is considered perfect if its digits sum up to exactly 10.
 * Given a positive integer n, return the n-th perfect number.
 * For example, given 1, you should return 19. Given 2, you should return 28.
 */

/**
 * Rather than checking each  positive number after incrementing by 1, 
 * optimize by incrementing by 9 (after the 1st num, 19).
 *
 * Note the the arithmetic progression:
 *                n           num
 *                ==          ===
 *      1st:      1:          19
 * 
 *      The rest: 2: 19 + 9 = 28
 *                3: 28 + 9 = 37
 *                4: 37 + 9 = 46 etc
 */
const nthSumTo10 = (nth: number): number => {
    let [count, num] = [1, 19];
    while (count < nth) {
        num += 9; // See comment above
        if (sumDigit(num) === 10) { // this check may not be needed!
            count++;
        }
    }
    return num;
}
wq
/**
 * Returns the sum of the digits in num.
 * @example sumDigit(91) returns 10
 */
const sumDigit = (num: number): number => {
    const digits = num
        .toString()
        .split('')
        .map(x => parseInt(x));
    return digits.reduce((accum, x) => { return accum + x }, 0)
}

/**
 * ASSERTIONS
 */
console.log(sumDigit(19) === 10);
console.log(sumDigit(129) === 12);
console.log(
    Array.from(Array(5).keys()) // 0, 1, 2, 3, 4
        .map(x => nthSumTo10(x + 1))
        .join(',') === '19,28,37,46,55');
