/**
 *                  #145 [Easy] - LINKED LIST SWAP EVERY TWO
 *
 * Given the head of a singly linked list, swap every two nodes and return its head.
 * For example, given 1 -> 2 -> 3 -> 4, return 2 -> 1 -> 4 -> 3.
 */

interface SLLNode { val: number; next?: SLLNode; }

/**
 * In place swap of the fist 2 nodes a and b.
 * @example swapPair(a->b->c) returns b->a->c
 */
const swapPair = (head: SLLNode): SLLNode => {
    if (head === undefined || head.next === undefined) {
        return head;
    } else {
        const c = head?.next?.next;
        const a = head;
        const b = head.next;
        if (b) {
            b.next = a;
        }
        a.next = c
        return b;
    }
}

/**
 * Swaps every two nodes. Returns the new head.
 */
const swapEveryTwo = (head: SLLNode): SLLNode => {
    // console.log('SWAP EVERY TWO', pretty(head));
    let pair = swapPair(head); // [2->1]->3->4
    let newList = pair;
    while (pair) {
        let nextPair;
        if (pair.next?.next) {
            nextPair = swapPair(pair.next.next)
            pair.next.next = nextPair; // [2->1]->[4->3]
        }
        // console.log('pair, nextPair', [pair.val, pair.next?.val], [nextPair?.val, nextPair?.next?.val]);
        pair = nextPair;
    }
    return newList;
}

const pretty = (head: SLLNode): string => {
    let node: SLLNode | undefined = head;
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
console.log(pretty(swapPair(
    {
        val: 1,
        next: { val: 2, next: { val: 3 } }
    })) === '2->1->3');

console.log(pretty(swapEveryTwo(
    {
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
    })) === '2->1->4->3');
