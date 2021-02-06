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
const update = (list: number[], indices: StackIdx[], stackNum: number, item: number): void => {
    const incr = stackNum === 2 ? -1 : 1;
    list[indices[stackNum].top + incr] = item;
    indices[stackNum].top += incr;
}

/**                     
 *                     1/3
 *  ---------------------------------------------------
 *  |  STACK 0 -->      | STACK 1 -->     <-- STACK 2 |
 *  ---------------------------------------------------
 * ^             ^     ^            ^     ^            ^
 * bottom0     top0    bottom1    top1  top2        bottom2
 */
class Stack {
    STACKS = [0, 1, 2];
    list: number[];
    indices: StackIdx[];

    constructor(readonly initSize = 20) {
        this.list = new Array(this.initSize);
        this.indices = this.nextIndices(this.list.length);
    }

    prettyList = () => this.list.join(' ');

    nextIndices(len: number) {
        const oneThird = Math.floor((len - 1) / 3);
        return [
            { top: -1, bottom: -1 }, // one before array start
            { top: oneThird, bottom: oneThird },
            { top: len, bottom: len }] // one after array end
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

    popBottom(stackNum: number): number | undefined {
        if (!this.isEmpty(stackNum)) {
            const incr = stackNum < 2 ? 1 : -1;
            const itemIdx = this.indices[stackNum].bottom + incr;
            const item = this.list[itemIdx];
            this.indices[stackNum].bottom += incr;
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
        if (!this.canPush(stackNum)) {
            // console.log('resizing');
            const cloned = this.cloneList(this.list.length + this.initSize);
            this.list = cloned.newList;
            this.indices = cloned.newIndices;
        }
        update(this.list, this.indices, stackNum, item);
        return this;
    }

    isEmpty(stackNum: number): boolean {
        return this.indices[stackNum].top === this.indices[stackNum].bottom
    }

    /**
     * Returns a copy of the list. The copy will be of length 'size'.
     */
    cloneList(size: number): { newList: number[], newIndices: StackIdx[] } {
        // console.log('clone src', this.list)
        const newList = new Array(size);
        const newIndices = this.nextIndices(size);
        this.STACKS.forEach(stackNum => {
            while (!this.isEmpty(stackNum)) {
                update(newList,
                    newIndices,
                    stackNum,
                    this.popBottom(stackNum) as number);
            }
        })
        // console.log('clone tgt', newList);
        return { newList, newIndices };
    }
}

/**
 * ASSERTIONS
 */

//
// Test correct initialization
//
const st = new Stack(15);
console.log(st.prettyList() === ' '.repeat(15 - 1));

// Assert each stack is empty
st.STACKS.forEach(stackNum => console.log(st.isEmpty(stackNum)));

//
// Test push/pop (without resize)
//
const pushTester = new Stack();
for (let i = 0; i < 4; i++) {
    pushTester.STACKS.forEach(stackNum => pushTester.push(i, stackNum));
}
console.log(pushTester.prettyList() === '0 1 2 3    0 1 2 3      3 2 1 0');

// Test pop
pushTester.STACKS.forEach(stckNum => {
    const arr = [];
    while (!pushTester.isEmpty(stckNum)) {
        arr.push(pushTester.pop(stckNum));
    }
    console.log(arr.join(' ') === '3 2 1 0');
});

// Assert each stack is empty
pushTester.STACKS.forEach(stackNum => console.log(st.isEmpty(stackNum)));

//
// Test auto resizing
//
const resizeTester = new Stack(10);
for (let i = 0; i < 6; i++) {
    resizeTester.STACKS.forEach(stackNum => resizeTester.push(i, stackNum));
}
console.log(resizeTester.prettyList() === '0 1 2 3 4 5  0 1 2 3 4 5  5 4 3 2 1 0');
