/**
 *          TRIANGULUM
 */
 
 /**
 * 
 *                   (0, 0) O                Row 0
 *                         / \
 *                        /   \       
 *               (1, 0)  O-----O (1, 1)      Row 1
 *                      / \   / \
 *                     /   \ /   \
 *                    O-----O-----O          Row 2
 *                (2,0)   (2,1)  (2,2)
 */
class StackedTriangles {
    // Values inside circles are stored in a 1D array & addressed by circleIndex()
    circles: number[];

    constructor(readonly nLevels: number) {
        const circlesLength = nLevels * (nLevels + 1) / 2;
        this.circles = new Array(circlesLength).fill(0);
        return this;
    }

    circleIndex(row: number, i: number): number {
        return (row) * (row + 1) / 2 + i;
    }

    setCircle(row: number, i: number, val: number) {
        this.circles[this.circleIndex(row, i)] = val;
        return this;
    }

    getCircle(row: number, i: number) {
        const idx = this.circleIndex(row, i);
        console.log({ row, i, idx });
        return this.circles[idx];
    }

    pretty(): string {
        let str = '';
        for (let r = 0; r < this.nLevels; r++) {
            str += '.'.repeat(this.nLevels - r);
            for (let i = 0; i < r + 1; i++) {
                str += this.getCircle(r, i) + ' ';
            }
            str += '\n';
        }
        return str;
    }
}


const triangles = new StackedTriangles(5);
triangles.setCircle(0, 0, 1).setCircle(1, 1, 2);
console.log(triangles.pretty());

