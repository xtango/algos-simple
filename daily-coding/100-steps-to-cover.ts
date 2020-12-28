/**
 *                  #100 - MINIMUM STEPS TO COVER
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
 * 
 * You are given a sequence of points and the order in which you need to cover
 * the points. Give the minimum number of steps in which you can achieve it.
 * You start from the first point.
 * 
 * Example:
 * Input: [(0, 0), (1, 1), (1, 2)]
 * Output: 2
 * It takes 1 step to move from (0, 0) to (1, 1). It takes one more step to
 * move from (1, 1) to (1, 2). 
 *
 * SOLUTION
 * Aspects that make this a trivial geometry problem rather than a search problem:
 * 1. You are already given the order in which you need to cover the points. 
 *    (Had the problem not given you the order, you would have to search 
 *    for the optimal path).
 * 2. The minimum number of steps from point A to B is a strikingly simple formula.
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
const minStepsFromTo = (a: Point, b: Point) => Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));

const prettyPoint = (p: Point): string => `(${p[0]}, ${p[1]})`

const minStepsToCover = (points: Point[]) => {
    /**
     * @param point The current point.
     * @param remaining The rest of the points.
     * @param accumSteps, accumPath The accumulated number of steps and path (for debugging),
     * @parama depth Recursion depth.
     */
    const helper = (
        point: Point,
        remaining: Point[], accumSteps: number,
        accumPath: string,
        depth: number = 0): number => {
        const path = accumPath + '->' + prettyPoint(point);
        //console.log(`[depth: ${depth}] curr: ${prettyPoint(point)}, cumul steps: ${accumSteps}\n\tpath: ${path}`);

        // Base case
        if (remaining.length === 0) {
            return accumSteps;
        }

        const minSteps = minStepsFromTo(point, remaining[0]);
        return helper(remaining[0], remaining.slice(1), accumSteps + minSteps, path, depth + 1);
    }

    console.log(`\n${'_'.repeat(30)}\nMIN STEPS ${points.map(p => prettyPoint(p))}`);
    return helper(points[0], points.slice(1), 0, '');
}

/**
 * TESTS: (x, y)
 * ----------------------
 * (0,0)    (1,0)   (2,0)
 *       
 * (0,1)    (1,1)   (2,1)
 * 
 * (0,2)    (1,2)   (2,2)
 * 
 * (0,3)    (1,3)   (2,3)
 * ----------------------
 */
console.log(minStepsFromTo([0, 0], [2, 3]) == 3);
console.log(minStepsToCover([[0, 0], [1, 1], [1, 2]]) == 2);
console.log(minStepsToCover([[0, 0], [1, 2], [1, 3]]) == 3);
console.log(minStepsToCover([[0, 0], [1, 3], [1, 2]]) == 4); 
