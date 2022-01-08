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
 * General solver using using a bottoms-up, dynamic programming appoach.
 * 
 * We store the min num of coins in array m, that "memoizes"
 * the min num of coins to reach nCents. We fill m from left to right.
 * 
 * @example denominations = [1, 5, 10], nCents = 16
 *
 * After initialization:
 *   cents    0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16
 *          ---------------------------------------------------------------------- 
 *     m    | 0  Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf |
 *          ----------------------------------------------------------------------
 *                | 
 *                |  
 * i = 1     minCoins to make change for 1 cent.  Try every coin 1, 5, 10
 *           starting from coin 1: rem: 1-1=0, m[0] + 1 = 0 + 1 = 1
 *           "+ 1" because we use the coin.
 *                |
 *                v
 *    cents   0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16
 *          --------------------------------------------------------------------- 
 *      m   | 0   1  Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf Inf |
 *          ---------------------------------------------------------------------
 * 
 */
// Bottoms up approach
const minCoins = (nCents: number, denominations: number[]): number => {
    const denomsAsc = denominations.sort((a, b) => a - b);
    const m = blankMemo(nCents);
    for (let cents = 1; cents <= nCents; cents++) {
        // Try each coin that that could work
        const possibleCoins = denomsAsc.filter(c => c <= cents);
        possibleCoins.forEach((coin) => {
            const rem = cents - coin;
            // "+ 1" because we use the coin.
            m[cents] = Math.min(m[rem] + 1, m[cents]);
            console.log(`m[${cents}] [Try ${coin}¢] rem: ${rem} -> min: ${m[cents]}`);
        });
    }
    return m[nCents];
}

const blankMemo = (nCents: number): number[] => {
    const m = new Array(nCents + 1).fill(Number.POSITIVE_INFINITY);
    m[0] = 0; // The min num of coins to reach 0cents is 0
    return m;
}

/**
 * ASSERTIONS
 */
// I. Test canononic coin system
const US_COINS = [25, 10, 5, 1]; // An example of a canonical coin system
// Test greedy solution
console.log(minCoinsGreedy(0, US_COINS) === 0);
console.log(minCoinsGreedy(1, US_COINS) === 1);
console.log(minCoinsGreedy(7, US_COINS) === 3);
console.log(minCoinsGreedy(16, US_COINS) === 3);
console.log(minCoinsGreedy(45, US_COINS) === 3);
console.log(minCoinsGreedy(46, US_COINS) === 4);
// Test general solution
console.log(minCoins(16, US_COINS) === 3);

// II. Test non-canonical coin system
const NON_CANONICAL = [1, 3, 4];
console.log(minCoinsGreedy(6, NON_CANONICAL) === 3); // Greedy is sub-optimal
console.log(minCoins(6, NON_CANONICAL) === 2); // Optimal
