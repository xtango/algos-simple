/**
 *                      #150 [Hard] - NEAREST POINTS    
 * 
 * This problem was asked by LinkedIn.
 * 
 * Given a list of points, a central point, and an integer k, 
 * find the nearest k points from the central point.
 * 
 * For example, given the list of points [(0, 0), (5, 4), (3, 1)],
 * the central point (1, 2), and k = 2, return [(0, 0), (3, 1)].
 */

/**
 *              ^
 *              |   o (x, y) = (1,2)
 *              |  /|    
 *              |/  |
 *         ------------------>
 *              |            
 */
const distance = (from: number[], to: number[]): number =>
    Math.sqrt(
        Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2)
    );

/**
 * Sorts the distances and returns the nearest k ponts from central.
 */
const nearest = (list: number[][], central: number[], k: number): number[][] => {
    const distances = list.map(p => {
        return { point: p, dist: distance(central, p) };
    });
    distances.sort((a, b) => a.dist - b.dist)
    const topK = distances.slice(0, k);
    return topK.map(e => e.point);
}

/**
 * ASSERTIONS
 */
console.log(JSON.stringify(
    nearest(
        [[0, 0], [5, 4], [3, 1]],
        [1, 2],
        2)) === '[[0,0],[3,1]]'
);
