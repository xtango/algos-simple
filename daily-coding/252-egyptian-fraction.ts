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
 * Returns a list of integers representing the denominators of the Egyption fraction
 * represnation of numeration/denominator.
 * 
 * @example 3/4 returns [2, 4] since 3/4 = 1/2 + 1/4
 */
const egyptianFraction = (numerator: number, denominator: number): number[] => {
    const egyptianDenoms: number[] = [];
    let [n, d] = [numerator, denominator];  // [3,4]  

    while (n !== 0) {                       // n/d: 3/4     2/8         0/32
        const ceil = Math.ceil(d / n);      // 4/3=>2       8/2=>4
        egyptianDenoms.push(ceil);          // [2]          [2,4] 
        // Set n/d to the remainder
        [n, d] = [ceil * n - d, ceil * d];  // [2, 8]       [0,32]
    }
    return egyptianDenoms;
}

/**
 * ASSERTIONS
 */
console.log(JSON.stringify(egyptianFraction(3, 4)) === '[2,4]');
console.log(JSON.stringify(egyptianFraction(4, 13)) === '[4,18,468]');
