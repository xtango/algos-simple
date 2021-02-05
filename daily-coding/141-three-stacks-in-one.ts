
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

/**                     
 *                    mid
 * ---------------------------------------------------
 * |  STACK 0 -->      | STACK 1 -->     <-- STACK 2 |
 * ---------------------------------------------------
 * ^            ^      ^           ^     ^           ^
 * b0          t0      b1         t1     t2         b2
 */
class Stack {
    list: number[];
    stack: { top: number; bottom: number }[];

    constructor(readonly initSize = 20) {
        this.list = new Array(this.initSize);
        this.stack = this.nextState(this.list.length);
    }

    nextState(len: number) {
        const mid = Math.floor(len / 2);
        return [
            { top: -1, bottom: -1 }, // one past to the left
            { top: mid, bottom: mid },
            { top: len, bottom: len }] // one past to the right

    }

    pop(stackNum: number): number {

    }

    canPush(stackNum: number): boolean {
        if (stackNum === 0) {
            return this.stack[0].top < this.stack[1].bottom - 1;
        } else {
            return this.stack[1].top < this.stack[2].top - 1;
        }
    }

    push(item: number, stackNum: number): Stack {
        const add = () => {
            const incr = stackNum === 2 ? -1 : 1;
            this.list[this.stack[stackNum].top + incr] = item;
            this.stack[stackNum].top += incr;
        }

        console.log('push stackNum, item', stackNum, item);
        if (!this.canPush(stackNum)) {
            this.resize();
        }
        add();
        return this;
    }

    resize() {
        console.log('resize under construction');
    }
}

/**
 * ASSERTIONS
 */
const st = new Stack();
st.push(1, 0).push(2, 0).push(3, 0);
st.push(1, 1).push(2, 1).push(3, 1);
for (let i = 1; i < 7; i++) {
    st.push(i, 2);
}
st.push(7, 2); // test resize
console.log(st.list, st.stack);
