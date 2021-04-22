/**
 *                        TRIANGULUM
 *
 *                         (0,0)              Circle Row 0
 *                         /   \
 *    Triangle Row 0      /     \       
 *                       / t:0,0 \
 *                    (1,0)-------(1,1)       Circle Row 1
 *                     /  \t:1,1 /  \
 *    Triangle Row 1  /    \    /    \
 *                   / t:1,0\  /t:1,2 \
 *               (2,0)-----(2,1)------(2,1)   Circle Row 2
 */

interface Coordinate { row: number, col: number }

class StackedTriangles {
    // Values inside circles are stored in a 1D array & addressed by circleIndex()
    circleValues: number[];

    // Likewise, values inside triangles t:0,0..t:1,2 in the diagram above)
    // are also stored in a 1D array
    triangleValues: number[]

    constructor(readonly nLevels: number) {
        const circlesLength = nLevels * (nLevels + 1) / 2;
        this.circleValues = new Array(circlesLength).fill(0);

        const trianglesLength = (nLevels - 1) * (nLevels - 1);
        this.triangleValues = new Array(trianglesLength).fill(0);
        return this;
    }

    circleIndex({ row, col }: Coordinate): number {
        return row * (row + 1) / 2 + col;
    }

    triangleIndex(row: number, i: number): number {
        return row * (row + 1) + i;
    }


    /**
     *_\/_
     * /\
     */
    adjacentCoordinates(loc: Coordinate) {
        // WIP: const OFFSETS = [[0, -1], [-1, -1], [1,1] ]
    }

    setCircles(vals: number[]) {
        this.circleValues = [...vals];
        return this;
    }

    setTriangles(vals: number[]) {
        this.triangleValues = [...vals];
    }

    setCircle(loc: Coordinate, val: number) {
        this.circleValues[this.circleIndex(loc)] = val;
        return this;
    }

    getCircleVal(loc: Coordinate) {
        const idx = this.circleIndex(loc);
        return this.circleValues[idx];
    }


    pretty(): string {
        let str = '';
        for (let r = 0; r < this.nLevels; r++) {
            str += '.'.repeat(this.nLevels - r);
            for (let i = 0; i < r + 1; i++) {
                const loc: Coordinate = { row: r, col: i };
                str += this.getCircleVal(loc) + '  '; // .repeat(this.nLevels - r);
            }
            str += '\n';
        }
        return str;
    }
}


const triangles = new StackedTriangles(5);
triangles.setCircles([
    /*      */ 1,
    /*    */ 0, 2,
    /*   */ 2, 0, 0,
    /*  */ 0, 0, 0, 0,
    /**/ 4, 1, 0, 0, 0])
    .setTriangles([
    /*      */ 0,
    /*    */ 0, 0, 0,
    /*  */ 0, 0, 8, 0, 0,
    /**/ 0, 0, 0, 0, 0, 8, 0
    ])
console.log(triangles.pretty());
console.log(triangles.getCircleVal({ row: 1, col: 1 }));
