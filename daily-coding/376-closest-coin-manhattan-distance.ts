/**
 *                          Problem #376 [Easy] - CLOSEST COIN IN MANHATTAN DISTANCE
 * 
 * This problem was asked by Google.
 * 
 * You are writing an AI for a 2D map game. You are somewhere in a 2D grid, and there are coins strewn about over the map.
 * Given the position of all the coins and your current position, find the closest coin to you in terms of Manhattan
 * distance. That is, you can move around up, down, left, and right, but not diagonally. If there are multiple possible
 * closest coins, return any of them.
 * 
 * For example, given the following map, where you are x, coins are o, and empty spaces are. (top left is 0, 0):
 *      ---------------------
 *      | . | . | x | . | o |
 *      ---------------------
 *      | o | . | . | . | . |
 *      ---------------------
 *      | o | . | . | . | o |
 *      ---------------------
 *      | . | . | o | . | . |
 *      ---------------------
 * return (0, 4), since that coin is closest. This map would be represented in our question as:
 *      Our position: (0, 2)
 *      Coins: [(0, 4), (1, 0), (2, 0), (3, 2)]
 */

type Position = number[];

/**
 *              0   1   2   3   4
 *              ---------------------       
 * 0                        o (y1,x1)
 * 1                        |               Manhattan Distance = |x1-x2| + |y1-y2|
 * 2   (y2,x2)  o<-----------
 * 
 */
const manhattanDistance = (a: Position, b: Position) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const closestCoin = (pos: Position, coins: Position[]): Position => {
    let [minDist, minCoin] = [Number.POSITIVE_INFINITY, pos];
    coins.forEach(coin => {
        const dist = manhattanDistance(pos, coin);
        if (dist < minDist) {
            [minDist, minCoin] = [dist, coin];
        }
    })
    return minCoin;
}

/**
 * ASSERTIONS
 */
console.log(manhattanDistance([0, 3], [0, 3]) === 0);
console.log(manhattanDistance([0, 3], [2, 0]) === 5);
console.log(closestCoin(
    [0, 2],
    [[0, 4], [1, 0], [2, 0], [3, 2]]
).join(',') === '0,4');
