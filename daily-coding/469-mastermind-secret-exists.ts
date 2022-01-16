/**
 *                      Problem #469 [Medium] - MASTERMIND SECRET EXISTS?

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

/**
 * Once possible solution is to check every number from 0..999999 (since we have a 6-digit number)
 * However we can reduce the number checks dramatically. Let's take the 1st example:
 *      {175286: 2, 293416: 3, 654321: 0}
 * 293416: 3 has the highest score so we start with it. 
 * We know that there are 6-3=3 digits incorrect placed, but we don't know where.
 * The possibilities are:
 *      *93416
 *      2*3416
 *      29*416
 *      293*16
 *      2934*6
 *      29341*
 * where * is [0 | 1 | 5 | 7 | 8], i.e. a digit that are not in the scored guess.
 */

const secretCodeExists = (guesses: { [guess: number]: number}): boolean => {
    
    for (let i = 0; i<= 9999999; i++) {
        console.log(numTo6DigitStr(i));
    }
}

const numTo6DigitStr = (num: number): string => num.toString().padStart(6, '0');;


secretCodeExists();
