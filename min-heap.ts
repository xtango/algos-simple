/**
 *          3              3        
 *        /  \             4
 *       4     8           8
 *      / \   / \          9           
 *     9  7  10            7
 *                         10
 */
class MinHeap {
    elems: number[] = []; // stores data

    constructor(elems: number[]) {
        elems.forEach(e => this.insert(e))
    }


    /**
     * Inserts always in teh bottom-left empty node
     */
    insert(data: number) {
        const len = this.elems.push(data);
        const idx = this.elems[len - 1];
        // Bubble up if parent is bigger
        if (idx > 0 && this.parent(idx) > data) {
            console.log('parent bigger - must bubble up');
        }
    }

    parent(idx: number): number {
        return this.elems[(idx - 2) / 2];
    }

    left(idx: number): number {
        return this.elems[(idx * 2) + 1];
    }

    pretty() {
        // print root
        let i = 1;
        console.log(`[0] ${'.'.repeat(16)}${this.elems[0]}`);
        let level = 1;
        while (i < this.elems.length) {
            let s = '.'.repeat(10 - level);
            for (let n = 0; n < level * 2; n++) {   // 0 -> 1, 1 => 2,  2 => 4
                s += (i < this.elems.length ? '.'.repeat(5 - level) + this.elems[i] : '');
                i++;
            }
            console.log(`[${level}] ${s}`);

            level++;
        }
    }
}

const x = new MinHeap([]);
x.elems = [3, 4, 8, 9, 7, 10];

x.pretty();
