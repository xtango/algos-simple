/**
 *                          #193 [Hard] - MAX PROFIT
 * 
 * This problem was asked by Affirm.
 * 
 * Given a array of numbers representing the stock prices of a company in chronological order,
 * write a function that calculates the maximum profit you could have made from buying and
 * selling that stock. You're also given a number fee that represents a transaction fee for
 * each buy and sell transaction.
 * 
 * You must buy before you can sell the stock, but you can make as many transactions as you like.
 * For example, given [1, 3, 2, 8, 4, 10] and fee = 2, you should return 9, since you could buy
 * the stock at 1 dollar, and sell at 8 dollars, and then buy it at 4 dollars and sell it at 10 dollars.
 * Since we did two transactions, there is a 4 dollar fee, so we have 7 + 6 = 13 profit minus 4 dollars of fees.
 */

const maxProfit = (prices: number[], fee: number): number => {
    /**
     * Helper function for recursive traversal.
     */
    const traverse = (i: number, cumulProfit: number, buyFlag: boolean, depth: number = 0): number => {
        if (i >= prices.length) {
            return cumulProfit;
        }

        // Buy (if prev was sell) or vice versa
        const gain = buyFlag ? -prices[i] - fee : prices[i];
        //console.log(`[depth:${depth}]`, { i, price: prices[i], cumulProfit, buyToggle, gain });
        const act = traverse(i + 1, cumulProfit + gain, !buyFlag, depth + 1);

        // Neither buy nor sell
        const hold = traverse(i + 1, cumulProfit, buyFlag, depth + 1);

        return Math.max(act, hold);
    }

    return traverse(0, 0, true);
}

/**
 * ASSERTIONS
 */
console.log(maxProfit([1, 3, 2, 8], 2) === 5); // (-3 + 8 -2) = 5
console.log(maxProfit([1, 3, 2, 8, 4, 10], 2) === 9);// (-1 + 8 -2) + (-4 + 10 -2)  = 9
