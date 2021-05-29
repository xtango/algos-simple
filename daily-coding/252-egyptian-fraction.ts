/**
 *                  #252 [Easy] - EGYPTIAN FRACTION
 * 
 * This problem was asked by Palantir.
 * 
 * The ancient Egyptians used to express fractions as
 * a sum of several terms where each numerator is one.
 * For example, 4 / 13 can be represented as 1 / 4 + 1 / 18 + 1 / 468.
 * Create an algorithm to turn an ordinary fraction a / b,
 * where a < b, into an Egyptian fraction.
 */


/**
 * Returns a list of integers representing the denominators of the Egption fraction of frac.
 * 3/4 = 1/2 + 1/4
 */

const MAX_ITER = 5;

const egyptianFraction = (numerator: number, denominator: number): number[] => {
    const egyptianDenoms: number[] = [];
    let [numer, denom] = [numerator, denominator];
    let i = 0;
    while (numer !== 0 && i < MAX_ITER) {
        const ceil = Math.ceil(numer / denom);
        egyptianDenoms.push(ceil);
        numer = (ceil * numer) - denominator;
        denom *= ceil;
        i++;
    }
    return egyptianDenoms;
}
console.log(egyptianFraction(3, 4));
