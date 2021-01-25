/**
 *              Problem #130 [Medium] MAX PROFIT FROM K BUY-SELLS
 * 
 * Given an array of numbers representing the stock prices of a company in chronological
 * order and an integer k, return the maximum profit you can make from k buys and sells.
 * You must buy the stock before you can sell it, and you must sell the stock before you 
 * can buy it again.
 * For example, given k = 2 and the array [5, 2, 4, 0, 1], you should return 3.
 * 
 * CONCEPTUAL MODEL
 * At each change in price, recursively get the max of the cummulative profit
 * for Buy/Sell versus Wait.
 */
const maxProfit = (
    k: number,
    prices: number[],
    MAX_DEPTH = 10 // To stop run-away recursion
): number => {
    
    const profitHelper = (
        idx: number,
        profitAccum: number,
        buyCount: number,
        sellCount: number,
        depth = 0): number => {

        console.log(`[depth ${depth}, idx: ${idx}] -> profitAcum: ${profitAccum}`);

        if (sellCount >= k || idx >= prices.length || depth > MAX_DEPTH) {
            return profitAccum;
        }

        const tradeAccum = (buyCount === sellCount)
            // Can buy when buyCount same as sellCount.
            ? profitHelper(idx + 1, profitAccum - prices[idx], buyCount + 1, sellCount, depth + 1)
            // Otherwise sell.
            : profitHelper(idx + 1, profitAccum + prices[idx], buyCount, sellCount + 1, depth + 1);

        // Wait in the case of buy opportunity or hold in the case of sell opportunity
        const waitAccum = profitHelper(idx + 1, profitAccum, buyCount, sellCount, depth + 1);

        // Max Buy/Sell profit vs Wait profit
        const max = tradeAccum > waitAccum ? tradeAccum : waitAccum;
        console.log(`...price: ${prices[idx]}, waitAccum: ${waitAccum}, tradeAccum: ${tradeAccum} => MAX: ${max}`)
        return max;
    }

    return profitHelper(0, 0, 0, 0);
}

/**
 * ASSERTIONS
 */
console.log(maxProfit(2, [5, 2, 4, 0, 1]) === 3);
