/**
 *                  Problem #427 [Medium] - SHORTEST START UPHILL END DOWNHILL
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
 * This amounts to a shortest cycle problem constrained by the
 * start up and end down rule
 */

