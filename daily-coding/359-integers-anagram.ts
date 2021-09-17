/**
 *                              Problem #359 [Easy]
 * 
 * This problem was asked by Slack.
 * 
 * You are given a string formed by concatenating several words
 * corresponding to the integers zero through nine and then anagramming.
 * For example, the input could be 'niesevehrtfeev', which is an anagram
 * of 'threefiveseven'. Note that there can be multiple instances of each integer.
 * Given this string, return the original integers in sorted order. 
 * In the example above, this would be 357.
 */

/**
 * Returns a 26 element array with a frequency count (a..z) of each char in word.
 * @example digitFreq('abcaa') returns
 *          [3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
 */
const charFrequency = (word: string): number[] => {
    const freq = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);
    for (let i = 0; i < word.length; i++) {
        const c = word.charCodeAt(i) - aCode;
        freq[c] = freq[c] + 1;
    }
    return freq;
}

/**
 * Returns a new array of a[i] - b[i]. Assumes a and b equal in length.
 */
const subtractFrequency = (a: number[], b: number[]): number[] => {
    const clone = [...a];
    for (let i = 0; i < b.length; i++) {
        clone[i] -= b[i];
    }
    return clone;
}

/**
 * Returns the string "digit" representation of input.
 */
const originalIntegers = (input: string): string => {
    const original: number[] = [];
    let inputFreq = charFrequency(input.toLowerCase());

    ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
        .forEach((speltDigit, idx) => {
            const wordFreq = charFrequency(speltDigit)
            let diff = subtractFrequency(inputFreq, wordFreq);

            // Check for an anagram match, looping for multiple occurences of the same word
            while (diff.every(x => x >= 0)) { // An anagram match
                // console.log(`${speltDigit} is a match. Counts after minus: `, diff);
                original.push(idx)
                inputFreq = diff;
                diff = subtractFrequency(inputFreq, wordFreq);
            }
        })
    return original.join('');
}

/**
 * ASSERTIONS
 */
// The result of subtraction should be zeros.
console.log(
    subtractFrequency(charFrequency('cats'), charFrequency('tacs'))
        .every(x => x === 0));

// Test single instance matches
console.log(originalIntegers('niesevehrtfeev') === '357');
console.log(originalIntegers('niesevehrtfeevzero') === '0357');

// Test multiple instance matches
console.log(originalIntegers('niesevehrtfeevthree') === '3357');

// Test no matches
console.log(originalIntegers('ninx') === '');
