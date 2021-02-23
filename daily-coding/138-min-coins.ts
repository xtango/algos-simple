
/**
 *                 #138 [Hard] - MIN NUM OF COINS
 * 
 * This problem was asked by Google.
 * Find the minimum number of coins required to make n cents.
 * You can use standard American denominations, that is, 1¢, 5¢, 10¢, and 25¢.
 * For example, given n = 16, return 3 since we can make it with a 10¢, a 5¢, and a 1¢.
 */

const DENOMS = [25, 10, 5, 1];

const minCoins = (nCents: number): number => {
    let [remCents, idx, accumCoins] = [nCents, 0, 0];
    while (remCents > 0 && idx < DENOMS.length) {
        const coins = Math.floor(remCents / DENOMS[idx]);
        remCents -= coins * DENOMS[idx];
        //console.log(`${DENOMS[idx]} X ${coins} rem: ${remCents}`);
        idx++;
        accumCoins += coins;
    }
    return accumCoins;
}

/**
 * ASSERTIONS
 */
console.log(minCoins(0) === 0);
console.log(minCoins(1) === 1);
console.log(minCoins(7) === 3);
console.log(minCoins(16) === 3);
console.log(minCoins(45) === 3);
console.log(minCoins(46) === 4);
