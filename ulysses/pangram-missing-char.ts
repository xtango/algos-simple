/**
 * Finds missing chars to make a PANGRAM (sentence that has every letter in the alphabet).
 * Ignores case.
 */
const missingCharsPangram = (input: string): string =>
    "abcdefghijklmnopqrstuvwxyz"
        .split('')
        .filter(char => input.indexOf(char.toLowerCase()) === -1)
        .join('');
/**
 * ASSERTIONS
 */
console.log(missingCharsPangram('The quick brown fox jumps over the lazy dog') === '');
console.log(missingCharsPangram('The quick brown fox umps over the lazy dog') === 'j');
