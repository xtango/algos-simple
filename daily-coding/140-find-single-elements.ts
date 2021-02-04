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
 * Approach C: XOR since we are given that there are exacly 2 elems in occur only once.
 * 
 * @see javascript XOR: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
 *      const a = 5;        // 00000000000000000000000000000101     32 bit representation
 *      const b = 3;        // 00000000000000000000000000000011     32 bit representation
 *      console.log(a ^ b); // 00000000000000000000000000000110     32 bit representation   ->  Output: 6
 *
 * For this problem, it is important to note that XORing a number with itself will give 0.
 */
const onlyOnceC = (arr: number[]): number[] => {
    let xored = arr[0];
    for (let i = 1; i < arr.length; i++) {
        xored ^= arr[i];
    }
    const rightmostSetBit = xored & ~(xored - 1);

    let [a, b] = [0, 0];
    arr.forEach(num => {
        if (num & rightmostSetBit) {
            a ^= num;
        } else {
            b ^= num
        }
    });

    return [a, b]
}

/**
 * ASSERTIONS
 */
const ELEMS = [2, 4, 6, 8, 10, 2, 6, 10]);
console.log(onlyOnceA(ELEMS).join(' ') === '4 8');
console.log(onlyOnceB(ELEMS).join(' ') === '4 8');
console.log(onlyOnceC(ELEMS).join(' ') === '4 8';
