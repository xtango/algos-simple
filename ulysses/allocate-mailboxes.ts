/**
 *                    ALLOCATE MAILBOXES (LEETCODE PROBLEM)
 */

/**
 * Input: houses = [1,4,8,10,20], k = 3. Answer: 5
 * 
 * Positions:   1 3 4       8 9 10                20
 *              |   |       |   |                 |
 * Houses:      H   H       H   H                 H
 *                |           |                   |
 * Mailboxes:     M           M                   M
 * 
 * Costs(i,j)   0 1 2 3 4 5 6 7 8 9
 *              ------------------   
 *           0 | 
 *           1 |  
 * 
 *      
 */
const minDistance = (houses: number[], k: number) {
    const n = houses.length;

    houses.sort((a, b) => a - b);

    // Pre-calculate the cost of placing one mailbox for all ranges (i to j)
    const cost = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const medianIndex = Math.floor((i + j) / 2); // Median position
            const medianVal = houses[medianIndex];
            for (let x = i; x <= j; x++) {
                cost[i][j] += Math.abs(houses[x] - medianVal);
            }
        }
    }

    // Initialize DP to infinity
    // dp[i][j] will store the min cost to allocate 'j' mailboxes for houses[0...i]
    const dp = new Array(n).fill(0).map(() => new Array(k + 1).fill(Infinity));

    // Base case: for the first mailbox (j=1), the cost is precalculated
    for (let i = 0; i < n; i++) {
        dp[i][1] = cost[0][i];
    }

    // Fill the DP table
    for (let j = 2; j <= k; j++) { // for each number of mailboxes
        for (let i = j - 1; i < n; i++) { // for houses up to index i
            // Try all possible split points 'p'
            for (let p = 0; p < i; p++) {
                // Cost is (cost for houses[0...p] with j-1 mailboxes) + (cost for houses[p+1...i] with 1 mailbox)
                dp[i][j] = Math.min(dp[i][j], dp[p][j - 1] + cost[p + 1][i]);
            }
        }
    }

    return dp[n - 1][k]; // The result is the min cost to allocate 'k' mailboxes for all houses
};
