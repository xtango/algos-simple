/**
 *                                      Problem #221 [Easy] - SEVENISH
 * 
 * This problem was asked by Zillow.
 * Let's define a "sevenish" number to be one which is either a power of 7,
 * or the sum of unique powers of 7. The first few sevenish numbers are 1, 7, 8, 49, and so on. 
 * Create an algorithm to find the nth sevenish number.
 */

/**
 * i       :    0         1        2        3        4       5         6
 * Pow(7^x):  7^0=1    7^1=7             7^2=49            7^3=343       
 * Sums    :   1                1+7=8             8+49=57           57+343
 */
const sevenish = (n: number): number => {
    let [power, sum, x, sevenishVal] = [0, 0, 0, 0];
    for (let i = 0; i <= n; i++) {
        if (i % 2 === 0) { // even 
            power = Math.pow(7, x);
            //console.log('power', power);
            sevenishVal = power;
            x++;
        } else {
            sum += power;
            //console.log('sum', sum);
            sevenishVal = sum;
        }
    }

    return sevenishVal;
}
/**
 * ASSERTIONS
 */
console.log([1, 2, 3, 4, 5, 6, 7]
    .map(x => sevenish(x))
    .join(',') === '1,7,8,49,57,343,400')
