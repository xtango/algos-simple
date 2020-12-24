/**
 * MIN HEAP
 * 
 * A binary tree where:
 * 1. the data of each node <= node's children.
 * 2. the binary tree is complete (no gaps)
 */

/**
 * We use an array to store the elements of the heap.
 * In the example below, #n represents the idx into elems
 * and the (x) represents the data value.
 *                                        Array Store
 *            MIN HEAP                    -----------
 *                                        Idx   Value
 *             #0 (3)                     0     3        
 *             /      \                   1     4
 *        #1 (4)       #2 (8)             2     8
 *        /  \        /     \             3     9           
 *   #3 (9)  #4 (7)  #5 (10)  null        4     7
 *                                        5     10
 */
class MinHeap {
    elems: number[] = []; // stores data

    constructor(elems: number[]) {
        elems.forEach(e => this.insert(e))
    }


    /**
     * Inserts always in the bottom-left empty node
     */
    insert(data: number) {
        console.log('[insert] data', data);
        const len = this.elems.push(data);
        let currentIdx = len - 1; // bottom
        let parentIdx = this.parent(currentIdx);
        console.log('[insert] parent idx', parentIdx);
        // Bubble up if parent is bigger
        while (parentIdx > -1 && this.elems[parentIdx] > this.elems[currentIdx]) {
            console.log('[insert] parent bigger, bubbling up');
            // swap
            this.elems[currentIdx] = this.elems[parentIdx];
            this.elems[parentIdx] = data;
            currentIdx = parentIdx;
            parentIdx = this.parent(currentIdx);
        }
        console.log(`[insert] elems: ${this.elems.join(' ')}`);
    }

    /**
     * @example parent(0) -> -1
     * @example parent(1) -> -1/2 = -.5 -> 0
     * @example parent(2) -> 0/2 = 0.5 -> 0
     */
    parent(idx: number): number {
        return Math.round( (idx - 2) / 2); 
    }

    left(idx: number): number {
        return (idx * 2) + 1;
    }

    pretty() {
        let line = `\nMin Heap\n[0]${'.'.repeat(16)}${this.elems[0]}\n`; // root
        let i = 1;
        let level = 1;
        while (i < this.elems.length) {
            let s = '.'.repeat(10 - level);
            for (let n = 0; n < level * 2; n++) {   // 0 -> 1, 1 => 2,  2 => 4
                s += '.'.repeat(7 - level * 2) + (i < this.elems.length ? + this.elems[i] : '_');
                i++;
            }
            line += `[${level}]${s}\n`;
            level++;
        }
        return line;
    }
}

const heap1 = new MinHeap([3, 4, 8, 10, 9, 7]);
console.log(heap1.elems.join(' ') == '3 4 7 10 9 8');
console.log(heap1.pretty());
