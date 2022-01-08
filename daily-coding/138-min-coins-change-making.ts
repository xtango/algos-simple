/**
 *                 #138 [Hard] - MIN NUM OF COINS
 * 
 * This problem was asked by Google.
 * Find the minimum number of coins required to make n cents.
 * You can use standard American denominations, that is, 1¢, 5¢, 10¢, and 25¢.
 * For example, given n = 16, return 3 since we can make it with a 10¢, a 5¢, and a 1¢.
 */

/**
 * Greedy method (quoted from https://en.wikipedia.org/wiki/Change-making_problem#Greedy_method)
 * 
 *      For the so-called canonical coin systems, like those used in the US and many other countries,
 *      a greedy algorithm of picking the largest denomination of coin which is not greater than the
 *      remaining amount to be made will produce the optimal result. 
 *      This is not the case for arbitrary coin systems, though. For instance, if the coin denominations
 *      were 1, 3 and 4, then to make 6, the greedy algorithm would choose three coins (4,1,1) 
 *      whereas the optimal solution is two coins (3,3). 
 */
const minCoinsGreedy = (nCents: number, denominations: number[]): number => {
    let [remCents, idx, accumCoins] = [nCents, 0, 0];
    const denomsSorted = denominations.sort((a, b) => b - a);
    while (remCents > 0 && idx < denomsSorted.length) {
        const coins = Math.floor(remCents / denomsSorted[idx]);
        remCents -= coins * denomsSorted[idx];
        // console.log(`[${denomsSorted.join(' ')}] ${denomsSorted[idx]} X ${coins} rem: ${remCents}`);
        idx++;
        accumCoins += coins;
    }
    return accumCoins;
}

/**
 * TODO: General solver using recursion (or dynamic programming for effeciency)
 */
const minCoins = (nCents: number, denominations: number[]): number => {
}

/**
 * ASSERTIONS
 */
const US_COINS = [25, 10, 5, 1]; // An example of a canonical coin system
console.log(minCoinsGreedy(0, US_COINS) === 0);
console.log(minCoinsGreedy(1, US_COINS) === 1);
console.log(minCoinsGreedy(7, US_COINS) === 3);
console.log(minCoinsGreedy(16, US_COINS) === 3);
console.log(minCoinsGreedy(45, US_COINS) === 3);
console.log(minCoinsGreedy(46, US_COINS) === 4);
