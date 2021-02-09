/**
 *          #145 [Easy] - LINKED LIST SWAP EVERY TWO
 *
 * Given the head of a singly linked list, swap every two nodes and return its head.
 * For example, given 1 -> 2 -> 3 -> 4, return 2 -> 1 -> 4 -> 3.
 */

interface SLLNode { val: number; next?: SLLNode; }

/**
 * In place swap of the fist 2 nodes a and b in a single linked list
 * a->b->c returns b->a->c
 */
const swapPair = (head: SLLNode): SLLNode => {
    const c = head?.next?.next;
    const a = head;
    const b = head.next;
    if (b) {
        b.next = a;
    }
    a.next = c
    return b;
}

const swapEveryTwo = (head: SLLNode): SLLNode => {
    if (head.next === undefined) {
        return head;
    }

    let node: SLLNode | undefined = head;
    let newList: SLLNode | undefined = undefined;
    while (node && node.next) {
        const prev = node;
        const swapped = swapPair(node); // iter1: 2->1->3->4, iter2: 2->1->4->3
        if (newList === undefined) {
            newList = swapped; // first change
            console.log('assigned first time ', newList.val);
        }
        console.log('prev, swapped', prev.val, swapped);
        node = swapped.next?.next; // every 2nd
    }

    console.log(newList);
    return newList;
}

const pretty = (head: SLLNode): string => {
    let node = head;
    let s = '';
    while (node) {
        s += node.val.toString() + (node.next ? '->' : '');
        node = node.next;

    }
    return s;
}


/**
 * ASSERTIONS
 */
const test1 = {
    val: 1,
    next: { val: 2, next: { val: 3 } }
};
console.log(pretty(swapPair(test1)) === '2->1->3');

const test2: SLLNode = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4
            }
        }
    }
};
console.log(pretty(swapEveryTwo(test2))); //  === '2->1->4->3');
