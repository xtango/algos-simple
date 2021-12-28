/**
 *              Problem #465 [Easy] - REVERSE SINGLY-LINKED-LIST IN PLACE
 * 
 * This problem was asked by Google.
 * Given the head of a singly linked list, reverse it in-place.
 */

interface SLLNode {
    val: number;
    next?: SLLNode;
}

/**
 *    head  node 
 *      |    | 
 *      1 -> 2 -> 3 -> END
 *      |
 *    prev
 */
const reverseSinglyLinkedList = (head: SLLNode | undefined) => {
    if (!head || !head.next) {
        return head;
    }

    let [prev, node] = [head, head.next];
    head.next = undefined; // Point head to 'end'
    while (node) {
        const tempNext = node.next;
        node.next = prev;
        prev = node;
        node = tempNext;
    }
    return prev;
}

const prettyPrint = (head: SLLNode | undefined): string => {
    let [node, st] = [head, ''];
    while (node) {
        st += `${node.val}->`;
        node = node.next;
    }
    return st + 'END';
}

/**
 * ASSERTIONS
 */
const SLL_1: SLLNode = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: undefined
        }
    }
}
console.log(prettyPrint(SLL_1) === '1->2->3->END');
console.log(prettyPrint(reverseSinglyLinkedList(SLL_1)) === '3->2->1->END');
