/**
 *                  #100 - MINIMUM STEPS
 * 
 * This problem was asked by Google.
 * 
 * You are in an infinite 2D grid where you can move in any of the 8 directions:
 *  (x,y) to
 *  (x+1, y),
 *  (x - 1, y),
 *  (x, y+1),
 *  (x, y-1),
 *  (x-1, y-1),
 *  (x+1,y+1),
 *  (x-1,y+1),
 *  (x+1,y-1)
 * You are given a sequence of points and the order in which you need to cover
 * the points. Give the minimum number of steps in which you can achieve it.
 * You start from the first point.
 * 
 * Example:
 * Input: [(0, 0), (1, 1), (1, 2)]
 * Output: 2
 * It takes 1 step to move from (0, 0) to (1, 1). It takes one more step to
 * move from (1, 1) to (1, 2). 
 */

type Point = number[];

/**
 *  b  c  d        You can move in any of the 8 directions in 1 step.
 *    \|/          minSteps(pointA, pointB) = 1, where pointB is b | c | d | e | f | g | h | i.
 *  e _a_ f         
 *    /|\          --------------------------------------------------------------------- 
 *  g  h  i        Suprisingly, minSteps = max(pointA.x - pointB.x, pointA.y - pointB.y)
 *          \      ---------------------------------------------------------------------
 *            j    minSteps(a, j) = 2
 *            |
 *            k    minSteps(a, k) = 3
 */
const minSteps = (a: Point, b: Point) => Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));



console.log(minSteps([0,0], [2, 3]) == 3);
