/**
 *              FRACTION RECURRING DECIMAL
 * 
 * Returns the string represenation of a fraction with recurring decimals in parentheses.
 *
 * @example 1/2 returns '1.5', no repeating
 *                                           _
 * @example 1/3 returns 1.(3) representing 1.3
 *                                                  ______ 
 * @example 4/7 returns '0.(571428)' representing 0.571428
 *             
 *      '. 5   7   1   4   2   8 ...'   <----str
 * 
 *            5   1   3   2   6   4     <--- rem is carried over
 * 4   4 . 0   0   0   0   0   0   0   
 * - = -----------------------------
 * 7               7
 */

/**
 * @example isNeg(-3, 7) = (-3 > 0) ^ (7 > 0) = 0 xor 1 = 1, which return true
 */
const isNeg = (numerator: number, denominator: number): boolean =>
    ((numerator > 0 ? 1 : 0) ^ (denominator > 0 ? 1 : 0)) === 1;

const integralPart = (numerator: number, denominator: number): string =>
    isNeg(numerator, denominator) 
      ? '-' 
      : '' + Math.floor(numerator / denominator).toString();

const fractionalPart = (numerator: number, denominator: number): string => {
    const MAX_ITER = 10; // Circuit breaker
    let str = '';
    let i = 0;
    const carries: { [key: number]: boolean } = [];
    let rem = Math.abs(numerator) % Math.abs(denominator);
    while (rem !== 0 && i < MAX_ITER) {             // i:  0        1           2
        let x = rem * 10;                           // 40        -> 50       -> 10 
        const divisor = x / Math.abs(denominator);  // 40/7=5    -> 50/7=7   -> 10/7=1
        rem = x % denominator;                      // 40%7=5    -> 50%7=1   -> '10%7'=3

        // Hit a repeating decimal pattern when the carry has already occurred
        if (carries[rem]) {
            return '.(' + str + ')';
        } else {
            str += Math.floor(divisor);     // '.5'      -> '.57'    -> '.571'
            carries[rem] = true;
        }

        i++;
    }
    return str;
}

const recurringDecFraction = (numerator: number, denominator: number) => {
    const integral = integralPart(numerator, denominator);
    return (numerator % denominator === 0) ? integral : integral + fractionalPart(numerator, denominator);
}

/**
 * ASSERTIONS
 */
console.log(recurringDecFraction(4, 7) === '0.(571428)');
console.log(recurringDecFraction(4, -7) === '-.(571428)');
