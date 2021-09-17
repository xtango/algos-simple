/**
 *                              Problem #359 [Easy]
 * 
 * This problem was asked by Slack.
 * 
 * You are given a string formed by concatenating several words
 * corresponding to the integers zero through nine and then anagramming.
 * For example, the input could be 'niesevehrtfeev', which is an anagram of 'threefiveseven'. 
 * Note that there can be multiple instances of each integer.
 * Given this string, return the original integers in sorted order. 
 * In the example above, this would be 357.
 */

/**
 * Returns a 26 element array represting a..z with frequency counts of the chars in word.
 */
const digitFreq = (word: string): number[] => {
    const freq = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);
    for (let i = 0; i < word.length; i++) {
        const c = word.charCodeAt(i) - aCode;
        freq[c] = freq[c] + 1;
    }
    return freq;
}

const subtractFreq = (a: number[], b: number[]): number[] => {
    const clone = [...a];
    for (let i = 0; i < b.length; i++) {
        clone[i] -= b[i];
    }
    return clone;
}

const allPositive = (a: number[]) => a.every(x => x >= 0);

const originalIntegers = (input: string): string => {
    let original: number[] = [];
    let inputFreq = digitFreq(input);

    ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
        .forEach((speltDigit, idx) => {
            const wordFreq = digitFreq(speltDigit)
            let diff = subtractFreq(inputFreq, wordFreq);

            // Loop for multiple instances of the same digit
            while (allPositive(diff)) { // There's a match. 
                console.log(`${speltDigit} matches. After minus: `, diff);
                original.push(idx)
                inputFreq = diff;
                diff = subtractFreq(inputFreq, wordFreq);
            }
        })
    return original.join('');
}

/**
 * ASSERTIONS
 */
console.log(allPositive(subtractFreq(digitFreq('cats'), digitFreq('tac'))) === true);
console.log(originalIntegers('niesevehrtfeev') === '357')
