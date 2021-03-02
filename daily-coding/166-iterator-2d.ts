/**

This problem was asked by Uber.

Implement a 2D iterator class. It will be initialized with an array of arrays, and should implement the following methods:

next(): returns the next element in the array of arrays. If there are no more elements, raise an exception.
has_next(): returns whether or not the iterator still has elements left.
For example, given the input [[1, 2], [3], [], [4, 5, 6]], calling next() repeatedly should output 1, 2, 3, 4, 5, 6.

Do not use flatten or otherwise clone the arrays. Some of the arrays can be empty.
*/

class Iterator2D {
    curr = { row: 0, col: 0 }
    last = { row: -1, col: -1 }
    nonEmpty: number[][] = [];

    constructor(readonly input: number[][]) {
        this.nonEmpty = input.filter(r => r.length > 0);
        this.last = {
            row: this.nonEmpty.length - 1,
            col: this.nonEmpty[this.nonEmpty.length - 1].length - 1
        };
    }

    hasNext(): boolean {
        return !(this.curr.row === this.last.row && this.curr.col === this.last.col);
    }

    next(): number | undefined {
        if (!this.hasNext()) {
            throw 'No more elems';
        }

        const lastColInRow = this.curr.col === this.nonEmpty[this.curr.row].length - 1;
        if (lastColInRow) {
            this.curr.col = 0;
            this.curr.row++;
        } else {
            this.curr.col++;
        }
        return this.nonEmpty[this.curr.row][this.curr.col];
    }
}

const iter = new Iterator2D([[1, 2], [3], [], [4, 5, 6]]);
console.log(iter.next() == 1)
