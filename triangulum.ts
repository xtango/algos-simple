/**
 *          TRIANGULUM
 */

/**
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
class StackedTriangles {
    // Values inside circles are stored in a 1D array & addressed by circleIndex()
    circleValues: number[];

    // Likewise, values inside triangles t:0,0..t:1,2 in the diagram above)
    // are also stored in a 1D array
    triangleValues: number[]

    constructor(readonly nLevels: number) {
        const circlesLength = nLevels * (nLevels + 1) / 2;
        this.circleValues = new Array(circlesLength).fill(0);
        return this;
    }

    circleIndex(row: number, i: number): number {
        return (row) * (row + 1) / 2 + i;
    }

    setCircle(row: number, i: number, val: number) {
        this.circleValues[this.circleIndex(row, i)] = val;
        return this;
    }

    getCircle(row: number, i: number) {
        const idx = this.circleIndex(row, i);
        console.log({ row, i, idx });
        return this.circleValues[idx];
    }

    pretty(): string {
        let str = '';
        for (let r = 0; r < this.nLevels; r++) {
            str += '.'.repeat(this.nLevels  - r);
            for (let i = 0; i < r + 1; i++) {
                str += this.getCircle(r, i)  + '  '; // .repeat(this.nLevels - r);
            }
            str += '\n';
        }
        return str;
    }
}


const triangles = new StackedTriangles(5);
triangles.setCircle(0, 0, 1).setCircle(1, 1, 2);
console.log(triangles.pretty());
