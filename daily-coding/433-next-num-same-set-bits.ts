/**
 *     Problem #433 [Medium] - NEXT NUMBER WITH SAME NUMBER OF SET-BITS
 * 
 * This problem was asked by Facebook.
 * 
 * Given an integer n, find the next biggest integer with the same number of 1-bits on.
 * For example, given the number 6 (0110 in binary), return 9 (1001).
 */

const countSetBits = (binStr: string) => (binStr.match(/1/g) || []).length;

const toBinStr = (num: number) => BigInt(num).toString(2);

/**
 * Brute force implementation, returning the next greater number
 * whose binary represenation has the same number of set-bits as input.
 */
const nextSameNumSetBitsNaive = (input: number): number => {
    const countOnesInput = countSetBits(toBinStr(input));
    const CIRCUIT_BREAKER = input + 100;
    let [i, countOnes] = [input + 1, 0];
    do {
        countOnes = countSetBits(toBinStr(i))
        console.log(i, toBinStr(i), countOnes);
        i++;
    } while ((countOnes !== countOnesInput) && i < CIRCUIT_BREAKER)
    return i - 1;
}
/**
 * ASSERTIONS
 */
console.log(countSetBits(toBinStr(6)) === 2);
console.log(nextSameNumSetBitsNaive(6) === 9);
