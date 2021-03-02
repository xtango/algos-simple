/**
 *                      #166 [Medium] - 2D ITERATOR
 *
 * This problem was asked by Uber.
 *
 * Implement a 2D iterator class. It will be initialized with an array of arrays, and should implement the following methods:
 *
 * next(): returns the next element in the array of arrays. If there are no more elements, raise an exception.
 * has_next(): returns whether or not the iterator still has elements left.
 * For example, given the input [[1, 2], [3], [], [4, 5, 6]], calling next() repeatedly should output 1, 2, 3, 4, 5, 6.
 *
 * Do not use flatten or otherwise clone the arrays. Some of the arrays can be empty.
*/

interface RowCol { row: number, col: number }

class Iterator2D {
    current: RowCol = { row: -1, col: -1 }; // Row, col of current non-empty elem
    last: RowCol = { row: -1, col: -1 }; // Row, col of the last non-empty elem
    nonEmpty: number[][] = []; // References to non-empty arrays

    constructor(readonly input: number[][]) {
        this.nonEmpty = input.filter(r => r.length > 0);
        this.last = {
            row: this.nonEmpty.length - 1,
            col: this.nonEmpty[this.nonEmpty.length - 1].length - 1
        };
    }

    hasNext(): boolean {
        const next = this.nextRowCol(this.current);
        return next.row <= this.last.row && next.col <= this.last.col;
    }

    nextRowCol(curr: RowCol): RowCol {
        let next;
        if (curr.row === -1 && curr.col === -1) {
            next = { row: 0, col: 0 }
        } else {
            const isLastColInRow = curr.col === this.nonEmpty[curr.row].length - 1;
            next = isLastColInRow
                ? { row: curr.row + 1, col: 0 }
                : { row: curr.row, col: curr.col + 1 }
        }
        return next;
    }

    next(): number {
        if (this.hasNext()) {
            this.current = this.nextRowCol(this.current);
        } else {
            throw 'No more elems'
        }
        return this.nonEmpty[this.current.row][this.current.col];;
    }
}

/**
 * ASSERTIONS
 */
const iter = new Iterator2D([[1, 2], [3], [], [4, 5, 6]]);
const accum = []
while (iter.hasNext()) {
    accum.push(iter.next());
}
console.log(JSON.stringify(accum) === '[1,2,3,4,5,6]');
