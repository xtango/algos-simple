/**
 *                                       #101 - SUM OF 2 PRIMES
 * 
 * This problem was asked by Alibaba.
 * 
 * Given an even number (greater than 2), return two prime numbers whose sum will be equal to the given number.
 * A solution will always exist. See Goldbach’s conjecture.
 * 
 * Example:
 * Input: 4 
 * Output: 2 + 2 = 4 If there are more than one solution possible, return the lexicographically smaller solution.
 * If [a, b] is one solution with a <= b, and [c, d] is another solution with c <= d, then
 * [a, b] < [c, d]
 * if a < c or a==c and b < d.
 */

/**
 * Return the sequence [0, 1, ... n] instead of true in the pseudocde. This simplifies the filtering.
 */
const sequence = (n: number) => [...Array(n + 1).keys()];

/**
 * Generates primes using the Sieve of Eratoshenes
 * 
 * In pseudocode from Wikipedia:
 *    let A be an array of Boolean values, indexed by integers 2 to n,
 *   initially all set to true.
 *   
 *   for i = 2, 3, 4, ..., not exceeding √n do
 *       if A[i] is true
 *           for j = i^2, i^2+i, i^2+2i, i^2+3i, ..., not exceeding n do
 *               A[j] := false
 *
 *   return all i such that A[i] is true.
 */
const sieveEratoshenes = (n: number): number[] => {
    const primes = sequence(n);
    const sqrt = Math.sqrt(n);
    for (let i = 2; i <= sqrt; i++) {
        if (primes[i] !== 0) {
            for (let j = i * i; j <= n; j += i) {
                primes[j] = 0;
            }
        }
    }
    return primes.filter(x => x > 1);
}

/**
 * Return two prime numbers whose sum will be equal to sumsTo
 */
const sumPrimes = (sumsTo: number): number[] => {
    const primes = sieveEratoshenes(sumsTo);
    for (let i = 0; i <= primes.length; i++) {
        for (let j = 0; j <= primes.length; j++) {
            if ((primes[i] + primes[j]) === sumsTo) {
                return [primes[i], primes[j]];
            }
        }
    }
    return [];
}

/**
 * ASSERTIONS
 */
console.log(sieveEratoshenes(30).join(' ') === '2 3 5 7 11 13 17 19 23 29');
console.log(sumPrimes(10).join(' ') == '3 7');
