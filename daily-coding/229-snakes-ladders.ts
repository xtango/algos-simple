/**
 *                      #229 [Medium] - SNAKES AND LADDERS
 * 
 * This problem was asked by Flipkart.
 * 
 * Snakes and Ladders is a game played on a 10 x 10 board, the goal of which is get from square 1 to square 100. 
 * On each turn players will roll a six-sided die and move  forward a number of spaces equal to the result. If
 * they land on a square that represents a snake or ladder, they will be transported ahead or behind, respectively,
 * to a new square.
 * 
 * Find the smallest number of turns it takes to play snakes and ladders.
 *
 * For convenience, here are the squares representing snakes and ladders, and their outcomes:
 * snakes = {16: 6, 48: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78}
 * ladders = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100}
 */

type Outcomes = { [square: number]: number }
interface SnLNode { square: number, turns: number }

/** 
 * Breadth first traversal to reach or exceed square #100.
 */
const minTurns = (snakes: Outcomes, ladders: Outcomes): number {
    const nextSquare = (current: number, roll: number): number {
        const newSquare = current + roll;
        return snakes[newSquare] !== undefined
            ? snakes[newSquare]
            : ladders[newSquare] !== undefined
                ? ladders[newSquare]
                : newSquare;
    }

    const q: SnLNode[] = [{ square: 0, turns: 0 }]; // Start from Square 0
    const visited: { [square: number]: boolean } = {};

    while (q.length > 0) {
        const node = q.shift(); // pop front
        // console.log(node);
        for (let roll = 6; roll > 0; roll--) {
            const newNum = nextSquare(node.square, roll)
            if (newNum >= 100) {
                return node.turns + 1;
            } else {
                if (!visited[newNum]) {
                    visited[newNum] = true;
                    q.push({ square: newNum, turns: node.turns + 1 })
                }
            }
        }
    }
    return -1;
}

/**
 * ASSERTIONS
 */
const snakes = { 16: 6, 48: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };
console.log(minTurns(snakes, ladders) === 7);
