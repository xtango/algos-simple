/**
 *        #140 [Medium] FIND ELEMS THAT APPEAR ONLY ONCE
 *
 * This problem was asked by Facebook.
 *
 * Given an array of integers in which two elements appear exactly once and all other elements appear
 * exactly twice, find the two elements that appear only once.
 * For example, given the array [2, 4, 6, 8, 10, 2, 6, 10], return 4 and 8. The order does not matter.
 * 
 * Follow-up: Can you do this in linear time and constant space?
 * 
 * SOLUTIONS: Three solutions, the last (using bit operations) uses linear time and constant space.
 */

/**
 * Approach A: Use a frequency dictionary and filter.
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
 * Approach C: Bit operations. Linear time and constant space
 *             XOR since we are given that there are exacly 2 elems that occur only once.
 * 
 * @see javascript XOR: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
 *                          // 32 bit representation
 *      const a = 5;        // 00000000000000000000000000000101     
 *      const b = 3;        // 00000000000000000000000000000011
 *      console.log(a ^ b); // 00000000000000000000000000000110 ->  Output: 6
 *
 * For this problem, it is important to note that XORing a number with itself will give 0.
 */
const onlyOnceC = (arr: number[]): number[] => {
    return find2Elems(arr, xorEachElem(arr));
}

/**
 * Returns an XOR of each element of the arr.
 */
const xorEachElem = (arr: number[]): number => {
    let xored = arr[0];
    for (let i = 1; i < arr.length; i++) {
        xored ^= arr[i];
    }
    return xored;
}

/**
 * Finds the 2 elems in arr using bit operations given xored (see above).
 */
const find2Elems = (arr: number[], xored: number) => {
    const setBit = rightmostSetBit(xored);
    console.log('xored, setBit', decimalToBinStr(xored), decimalToBinStr(setBit));

    // Set 2 numbers, a and b, as a function of whether the 
    // "rightmost set bit" is 1 or 0. Each number's XOR is the target.
    let [a, b] = [0, 0];
    arr.forEach(num => {
        const anded = num & setBit;
        if (anded) {
            a ^= num;
        } else {
            b ^= num
        }
        console.log(`[${num}] ${decimalToBinStr(num)} AND setBit:${decimalToBinStr(setBit)} = ${decimalToBinStr(anded)} -> ${[a,b]}`);
    });
    return [a, b]
}

/**
 *  Find the first bit from the right with different values (one has 0 other has 1)
 *  @example '1100' -> '100' 
 */
const rightmostSetBit = (num: number): number => num & ~(num - 1);

/**
 * Return a bin string of x, where x is a postive integer.
 */
const decimalToBinStr = (x: number): string => x.toString(2);

/**
 * Retrun the decimal equivalent of s.
 */
const binStrToDecimal = (s: string): number => parseInt(s, 2);

/**
 * ASSERTIONS
 */
const ELEMS = [2, 4, 6, 8, 10, 2, 6, 10];
console.log(onlyOnceA(ELEMS).join(' ') === '4 8');
console.log(onlyOnceB(ELEMS).join(' ') === '4 8');
console.log(onlyOnceC(ELEMS).join(' ') === '4 8');
//
// Bit op tests related to Approach C
//
console.log(decimalToBinStr(binStrToDecimal('11')) === '11');
console.log(decimalToBinStr(xorEachElem([2, 3])) === '1') // 0010 ^ 0011 -> 0001
console.log(decimalToBinStr(rightmostSetBit(binStrToDecimal('0110'))) === '10');
console.log(decimalToBinStr(rightmostSetBit(binStrToDecimal('0100'))) === '100');
console.log(decimalToBinStr(rightmostSetBit(binStrToDecimal('0001'))) === '1');
console.log(decimalToBinStr(rightmostSetBit(binStrToDecimal('1001'))) === '1');
console.log(decimalToBinStr(rightmostSetBit(binStrToDecimal('0010'))) === '10');
console.log(decimalToBinStr(xorEachElem(ELEMS)) === '1100');
// Return the elem that occurs just once
console.log(decimalToBinStr(xorEachElem([2, 3, 2])) === '11'); // (0010 ^ 0011) ^ 0010 -> 0001 ^ 0010 -> 011
