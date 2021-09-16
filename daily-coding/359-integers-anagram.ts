/**
 *                              Problem #359 [Easy]

This problem was asked by Slack.

You are given a string formed by concatenating several words corresponding to the integers zero through nine and then anagramming.

For example, the input could be 'niesevehrtfeev', which is an anagram of 'threefiveseven'. Note that there can be multiple instances of each integer.

Given this string, return the original integers in sorted order. In the example above, this would be 357.
*/

type Frequencies = { [digit: string]: number };
type SpeltDigitDict = { [digit: string]: { speltDigit: string, digitFreq: Frequencies } };

const getCharFrequencies = (word: string): Frequencies => {
    const dict: Frequencies = {};
    word.split('').forEach(c => {
        if (dict[c] === undefined) {
            dict[c] = 0;
        }
        dict[c] = dict[c] + 1;
    })
    return dict;
}

const getSpeltDigitDict = () => {
    const dict: SpeltDigitDict = {};
    ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
        .forEach((speltDigit, digit) => dict[digit] = {
            speltDigit,
            digitFreq: getCharFrequencies(speltDigit)
        });

    return dict;
}

const matchChars = (digitFreq: Frequencies, inputDigitFreq: Frequencies): number => {
    console.log('match ', digitFreq);
    const digits = Object.keys(digitFreq).map(digit => [digit, digitFreq[digit]]);
    for (let i = 0; i < digits.length; i++) {
        const [requiredChar, requiredCount] = [digits[i][0], digits[i][1]];
        const actualCount = inputDigitFreq[requiredChar.toString()];
        if (actualCount === undefined || requiredCount > actualCount) {
            return 0
        }
    }
    return 1;
}
const originalIntegers = (input: string) => {
    const speltDigitDict = getSpeltDigitDict();
    const inputDigitFreq = getCharFrequencies(input);
    for (let digit = 0; digit < 10; digit++) {
        const { digitFreq } = speltDigitDict[digit.toString()];
        const matches = matchChars(digitFreq, inputDigitFreq);
        console.log(`\t${speltDigitDict[digit].speltDigit} -> ${matches > 0 ? 'YES' : 'NO'}`);

        // STOPPED HERE
    }
}


console.log(getCharFrequencies('niesevehrtfeev'));
originalIntegers('niesevehrtfeev');


