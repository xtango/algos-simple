/**
 *                  Problem #427 [Medium] - SHORTEST ROUTE, START UPHILL END DOWNHILL
 * 
 * This problem was asked by Square.
 * 
 * A competitive runner would like to create a route that starts and ends at his house,
 * with the condition that the route goes entirely uphill at first, and then entirely downhill.
 * 
 * Given a dictionary of places of the form {location: elevation}, and a dictionary mapping paths
 * between some of these locations to their corresponding distances, find the length of the
 * shortest route satisfying the condition above. Assume the runner's home is location 0.
 * 
 * For example, suppose you are given the following input:
 * elevations = {0: 5, 1: 25, 2: 15, 3: 20, 4: 10}
 * paths = {
 *     (0, 1): 10,
 *     (0, 2): 8,
 *     (0, 3): 15,
 *     (1, 3): 12,
 *     (2, 4): 10,
 *     (3, 4): 5,
 *     (3, 0): 17,
 *     (4, 0): 10
 * }
 * In this case, the shortest valid path would be 0 -> 2 -> 4 -> 0, with a distance of 28.
 */

/**
 * 
 *  [2:15]----10--->[4:10]<---------------
 *     ^          /                      |
 *     |         /                       |
 *     8        /                        |  
 *     |      10                         5       SHORTEST PATH
 *     |     /                           |       0->2->4->0
 *     |   v                             |       = 8 + 10 + 10 = 28 
 * HOME[0:5]----10----->[1:25]---12---->[3:20]
 *       ^   |                           ^  |
 *       |   |                           |  | 
 *       |    ------------12-------------   |
 *       |                                  |
 *        ----------------17----------------
 * 
 * APPROACH:
 * This a shortest path problem constrained by the "start uphill, end downhill, end at home" rules.
 * We can solve in recursively. If encounter a path starting downhill or returning uphill we reject it.
 * 
 *           [1] ---12----[3]----17-----[0]     len: 39   
 *          /    
 *        10
 *       /  
 *     [0] --8---[2]--10----[4]---10----[0]     len:29 <--- SHORTEST
 *        \ 
 *         15      --------17-----------[0]    len:32 
 *           \   /
 *           [3]
 *              \
 *                ---5----[4]------10---[0]    len: 30
 * 
 */
