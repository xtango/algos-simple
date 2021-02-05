/**
 *              #141 [Hard] - 3 STACKS USING SINGLE list
 * 
 * This problem was asked by Microsoft.
 * Implement 3 stacks using a single list:
 * class Stack:
 *    def __init__(self):
 *        self.list = []
 *    def pop(self, stack_number):
 *        pass
 *    def push(self, item, stack_number):\
 *        pass
 */

interface StackIdx { top: number; bottom: number };

/**
 * In-place update of list.
 */
const update = (list: number[], stackIndices: StackIdx[], stackNum: number, item: number) => {
    const incr = stackNum === 2 ? -1 : 1;
    list[stackIndices[stackNum].top + incr] = item;
    stackIndices[stackNum].top += incr;
}

/**                     
 *                    third
 * ---------------------------------------------------
 * |  STACK 0 -->      | STACK 1 -->     <-- STACK 2 |
 * ---------------------------------------------------
 * ^            ^      ^           ^     ^           ^
 * bottom0    top0    bottom1    top1  top2      bottom2
 */
class Stack {
    list: number[];
    indices: StackIdx[]; // The indices b0, t0, b1, t1 pictured above

    constructor(readonly initSize = 20) {
        this.list = new Array(this.initSize);
        this.indices = this.nextIndices(this.list.length);
    }

    nextIndices(len: number) {
        const third = Math.floor((len - 1) / 3);
        return [
            { top: -1, bottom: -1 }, // one past to the left
            { top: third, bottom: third },
            { top: len, bottom: len }] // one past to the right
    }

    pop(stackNum: number): number | undefined {
        if (!this.isEmpty(stackNum)) {
            const topIdx = this.indices[stackNum].top;
            const item = this.list[topIdx];
            const incr = stackNum < 2 ? -1 : 1;
            this.indices[stackNum].top += incr;
            return item;
        } else {
            return undefined;
        }
    }

    canPush(stackNum: number): boolean {
        if (stackNum === 0) {
            return this.indices[0].top < this.indices[1].bottom - 1;
        } else {
            return this.indices[1].top < this.indices[2].top - 1;
        }
    }

    push(item: number, stackNum: number): Stack {
        // console.log('push stackNum, item', stackNum, item);
        if (!this.canPush(stackNum)) {
            console.log('resizing');
            const cloned = this.cloneList(this.list.length + this.initSize);
            this.list = cloned.newList;
            this.indices = cloned.newIndices;
            console.log('after resize', this.list);
        }
        update(this.list, this.indices, stackNum, item);
        return this;
    }

    isEmpty(stackNum: number): boolean {
        return this.indices[stackNum].top === this.indices[stackNum].bottom
    }

    /**
     * Clones the list to a new size
     */
    cloneList(size: number): { newList: number[], newIndices: StackIdx[] } {
        console.log('clone to new list of size', size);
        const newList = new Array(size);
        const newIndices = this.nextIndices(size);

        // // Copy to new list
        // [0, 1, 2].forEach(stackNum => {
        //     while (hasMore(stackNum)) {
        //         const incr = stackNum < 2 ? 1 : -1;
        //         const val = this.list[newIndices[stackNum].top + incr];
        //         update(newList, newIndices, stackNum, val);
        //     }
        // });

        return { newList, newIndices };
    }

    prettyList = () => this.list.join(' ');
}

/**
 * ASSERTIONS
 */
const STACK_RANGE = [0, 1, 2];
const st = new Stack(15);

// Test correct initialization
console.log(st.prettyList() === ' '.repeat(15 - 1));
// Assert all empty
STACK_RANGE.forEach(stackNum => console.log('should be empty', st.isEmpty(stackNum)));

// Test push (without resize)
for (let i = 0; i < 4; i++) {
    STACK_RANGE.forEach(stackNum => st.push(i, stackNum));
}
console.log(st.prettyList() === "0 1 2 3  0 1 2 3   3 2 1 0");

// Test pop
STACK_RANGE.forEach(stckNum => {
    const arr = [];
    while(!st.isEmpty(stckNum)) {
        arr.push(st.pop(stckNum));
    }
    console.log(arr.join(' ') === '3 2 1 0');
});
// Assert all empty
STACK_RANGE.forEach(stackNum => console.log('should be empty', st.isEmpty(stackNum)));

// Test push (with resize)
const stackForResize = new Stack(10);
for (let i = 0; i < 7; i++) {
    STACK_RANGE.forEach(stackNum => stackForResize.push(i, stackNum));
}
console.log(stackForResize.prettyList());

//console.log(st.list, st.indices);

// st.push(7, 2); // test resize
