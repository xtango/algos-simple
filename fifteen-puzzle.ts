/**
 * FIFTEEN PUZZLE SOLVER
 */

type Grid = number[][];

interface State {
    grid: Grid
    cost: number;
}

const GOAL = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0], // 0 Represents empty
];

/**
 * Costing func. The number of out-of-place numbers.
 */
const cost = (g: Grid): number => {
    let cost = 0;
    for (let y = 0; y < g.length; y++) {
        for (let x = 0; x < g.length; x++) {
            cost += g[y][x] !== GOAL[y][x] ? 1 : 0;
        }
    }
    return cost;
}



