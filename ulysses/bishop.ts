/**
 * Find the min number of moves for the bishop to attack an immovable piece (target).
 *
 *              1 2 3 4 5 6 7 8
 *          8
 *          7
 *          6
 *          5
 *          4 
 *          3
 *          2
 *          1
 *              A B C D E F G H
 */

/**
 * Returns the color of a square
 */
const color = (x: number, y: number): number => (x + y) % 2

/**
 * A1 -> [1, 1]
 */
const posToXY = (pos: string): number[] => [pos.charCodeAt(0) - 64, parseInt(pos[1])]

/**
 * 45 degrees?
 */
const isOnDiagonal = (x1: number, y1: number, x2: number, y2: number) => Math.abs(x1 - x2) == Math.abs(y1 - y2)

/**
 * Returns the min num of moves for a bishop to attack a target
 */
const minBishopMoves = (bishopPos: string, targetPos: string): number => {
    const [bishopX, bishopY] = posToXY(bishopPos);
    const [targetX, targetY] = posToXY(targetPos);
  
    if (isOnDiagonal(bishopX, bishopY, targetX, targetY)) { // Direct diag -> 1 move
        return 1;
    } else if (color(bishopX, bishopY) === color(targetX, targetY)) { // else same color -> 2 moves
        return 2;
    }
    return 0; // Not possible to attack
}

// do tests pass
console.log(color(1, 1) === color(3, 1))
console.log(posToXY("A1")[0] === 1)
console.log(minBishopMoves("A1", "H8") === 1)
console.log(minBishopMoves("A1", "A3") === 2)
console.log(minBishopMoves("A1", "H7") === 0)
