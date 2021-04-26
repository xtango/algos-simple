/**
 *                                      Problem #221 [Easy] - SEVENISH
 * 
 * This problem was asked by Zillow.
 * Let's define a "sevenish" number to be one which is either a power of 7,
 * or the sum of unique powers of 7. The first few sevenish numbers are 1, 7, 8, 49, and so on. 
 * Create an algorithm to find the nth sevenish number.
 */

/**
 * i       :    0         1        2        3        4       5         6
 * Pow(7^x):  7^0=1    7^1=7             7^2=49            
 * Sums    :   1                1+7=8               1+49=50  7+49=56  1+7+49=57
 */
const genPower7s = (n: number) => [...Array(n).keys()].map(x => Math.pow(7, x))

/**
 * Returns the powerset of arr
 */
const subsets = (arr: number[]): number[][] => {
    const subs = [[]];

    // For 1, 2, 3
    // Start with subs = []            []
    // concat 1 to each subset      -> [], [1]
    // concat 2 to each subset      -> [], [1], [2], [1, 2]
    // concat 3 to each subset      -> [], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2 ,3]
    for (const el of arr) {
        const last = subs.length - 1;
        for (let i = 0; i <= last; i++) {
            subs.push([...subs[i], el]);
        }
    }

    return subs;
}

/**
 * Non-performant solutions
 */
const sevenish = (n: number): number => {
    const power7s = genPower7s(n);
    const power7Subsets = subsets(power7s);
    const sums = power7Subsets.map(s => s.reduce((accum, x) => accum + x, 0));
    return sums[n];
}

/**
 * ASSERTIONS
 */

// First 10 sevenish nums
console.log(
    [...Array(10).keys()]
        .map(x => sevenish(x + 1))
        .join(',') === '1,7,8,49,50,56,57,343,344,350'
);
