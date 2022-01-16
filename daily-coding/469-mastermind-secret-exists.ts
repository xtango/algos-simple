/**
 *                      Problem #469 [Medium] - MASTERMIND SECRET EXISTS?
 * 
This problem was asked by Facebook.
Mastermind is a two-player game in which the first player attempts to guess the secret code of the second.
In this version, the code may be any six-digit number with all distinct digits.
Each turn the first player guesses some number, and the second player responds by saying how many digits
 in this number correctly matched their location in the secret code. 
 
For example, if the secret code were 123456, then a guess of 175286 would score two, since 1 and 6 were correctly placed.
Write an algorithm which, given a sequence of guesses and their scores, determines whether there exists some secret code that could have produced them.
For example, for the following scores you should return True, since they correspond to the secret code 123456:
    {175286: 2, 293416: 3, 654321: 0}
However, it is impossible for any key to result in the following scores, so in this case you should return False:
    {123456: 4, 345678: 4, 567890: 4}
*/

type ScoreTuple = [string, number];

const missingDigits = (scoreStr: string) =>
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].filter(x => scoreStr.indexOf(x) === -1);

/**
 * Returns the possible secrets. See description in secretCodeExists.
 */
const possibleSecrets = (scoreStr: string): string[] => {
    const missing = missingDigits(scoreStr);
    const possibilities: string[] = [];
    for (let i = 0; i < scoreStr.length; i++) {
        missing.forEach(digit => possibilities.push(strReplaceAt(scoreStr, i, digit)));
    }
    return possibilities;
}

/**
 * Once possible solution is to check every number from 0..999999 (since we have a 6-digit number)
 * However we can significantly reduce the number of checks by constaining the possibilities.
 * Let's take the 1st example: {175286: 2, 293416: 3, 654321: 0}
 *                                           ^
 *      293416 has the highest score so we start with it. 
 *      We know the num of digits incorrectly placed is 6-3=3, but not their positions.
 *      The possibilities are shown below, 
 *         *93416
 *         2*3416
 *         29*416
 *         293*16
 *         2934*6
 *         29341*
 *      where * is [0 | 1 | 5 | 7 | 8], i.e. a digit not in the scored guess.
 */
const secretCodeExists = (guesses: { [guess: number]: number }): boolean => {
    const sortedScoreTuples = sortByHighestScore(guesses);

    // Start with the highest score
    for (let guessIdx = 0; guessIdx < sortedScoreTuples.length; guessIdx++) {
        const [guess, score] = [sortedScoreTuples[guessIdx][0], sortedScoreTuples[guessIdx][1]];
        const possibleSecrets: string[] = possibleSecrets(guess);
        // Search through all possible secrets to find a match. If none we immediately know that
        // the secret is invalid.
        if (!possibleSecrets.find((secret: string) => numMatchingDigits(secret, guess) === score)) {
            return false;
        }
    }
    return true;
}


const strReplaceAt = (str: string, idx: number, replacement: string): string =>
    `${str.substring(0, idx)}${replacement}${str.substring(idx + replacement.length)}`

/**
 * Returns an array of (guess, score) tuples sorted by score, descending.
 */
const sortByHighestScore = (guesses: { [guess: number]: number }): ScoreTuple[] => {
    const tuples: ScoreTuple[] = Object.entries(guesses)
        .map(x => [x[0].padStart(6, '0'), x[1]]);
    return tuples.sort((a, b) => b[1] - a[1]);
}

const numTo6DigitStr = (num: number): string => num.toString().padStart(6, '0');;

/**
 * Returns how many digits in guess correctly matches their location in secret. 
 * @example numMatchingDigits(123456, 175286) returns 2, as digits 1 and 6 match
 */
const numMatchingDigits = (secretStr: string, guessStr: string): number => secretStr
    .split('')
    .reduce(
        (accum, _, idx) => accum += secretStr[idx] === guessStr[idx] ? 1 : 0,
        0);


/**
 * ASSERTIONS
 */
// console.log(numTo6DigitStr(41) === '000041');
// console.log(numMatchingDigits('123456', '175286') === 2);
// console.log(numMatchingDigits('123456', '654321') === 0);
// console.log(sortByHighestScore({ 9: 2, 293416: 3, 654321: 0 })[0][0] === '293416');
// console.log(secretCodeExists({ 9: 2, 293416: 3, 654321: 0 }));
console.log(possibleSecrets('693416'));
