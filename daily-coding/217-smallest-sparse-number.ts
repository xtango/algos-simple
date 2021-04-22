/**
 *               Problem #217 [Hard] - SMALLEST SPARSE NUMBER
 * 
 * This problem was asked by Oracle.
 * 
 * We say a number is sparse if there are no adjacent ones in its binary representation.
 * For example, 21 (10101) is sparse, but 22 (10110) is not.
 * For a given input N, find the smallest sparse number greater than or equal to N.
 * Do this in faster than O(N log N) time.
 */

/**
 * Works for positive and negative numbers
 * @see https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
 */
const decimalToBin = (n: number): string => (n >>> 0).toString(2);

const isSparse = (str: string): boolean => !str.includes('11');

/**
 * Non optimal, O(N log N) solution
 */
const nextSparse = (n: number): number => {
    let smallest = n + 1;
    while (!isSparse(decimalToBin(smallest))) {
        smallest++;
    }
    return smallest;
}

/**
 * ASSERTIONS
 */
console.log(isSparse('10101'));
console.log(!isSparse('10110'));
console.log(nextSparse(21) === 32); // 100000
