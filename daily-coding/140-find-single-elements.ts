/**
 *        #140 [Medium] FIND ELEMS THAT APPEAR ONLY ONCE
 *
 * This problem was asked by Facebook.
 *
 * Given an array of integers in which two elements appear exactly once and all other elements appear
 * exactly twice, find the two elements that appear only once.
 * For example, given the array [2, 4, 6, 8, 10, 2, 6, 10], return 4 and 8. The order does not matter.
 * Follow-up: Can you do this in linear time and constant space?
 */

/**
 * Approach A: Using a frequency map
 */
const onlyOnceA = (arr: number[]): number[] => {
    const freq: { [key: number]: number } = {};
    arr.forEach(elem => {
        if (freq[elem] === undefined) {
            freq[elem] = 1;
        } else {
            freq[elem] = freq[elem] + 1;
        }
    });

    const freqArr: [string, number][] = Object.entries(freq);
    const singles = freqArr.reduce((accum: number[], e: [string, number]) => {
        if (e[1] === 1) {
            accum.push(parseInt(e[0]));
        }
        return accum;
    }, [])

    return singles;
}

/**
 * Approach B: Sort and traverse from left to right.
 */
const onlyOnceB = (arr: number[]): number[] => {
    const sorted = [...arr];
    sorted.sort((a, b) => a - b);

    const singles = [];
    let count = 1; // Start with the 2nd num
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] !== sorted[i - 1]) {
            if (count === 1) { // We've hit a new number
                singles.push(sorted[i - 1]);
            }
            count = 1;
        } else {
            count++;
        }
    }
    return singles;
}

/**
 * ASSERTIONS
 */
console.log(onlyOnceA([2, 4, 6, 8, 10, 2, 6, 10]).join(' ') === '4 8');
console.log(onlyOnceB([2, 4, 6, 8, 10, 2, 6, 10]).join(' ')  === '4 8');
