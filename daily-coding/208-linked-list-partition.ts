/**
 *                       #208 [Medium] - PARTITION LINKED LIST
 * 
 *  This problem was asked by LinkedIn.
 * 
 * Given a linked list of numbers and a pivot k, partition the linked list
 * so that all nodes less than k come before nodes greater than or equal to k.
 * 
 * For example, given the linked list 5 -> 1 -> 8 -> 0 -> 3 and k = 3, 
 * the solution could be 1 -> 0 -> 5 -> 8 -> 3.
 */

interface LinkedListNode { val: number, next?: LinkedListNode }
const EMPTY: LinkedListNode = { val: -1, next: undefined }

const partition = (ll: LinkedListNode, k: number): LinkedListNode => {
    let [node, smaller, smallerHead, largerOrEq, largerOrEqHead] = [ll, EMPTY, EMPTY, EMPTY, EMPTY];

    while (node) {
        if (node.val < k) {
            if (smaller === EMPTY) {
                smaller = { val: node.val };
                smallerHead = smaller;
            } else {
                smaller.next = { val: node.val };
                smaller = smaller.next;
            }
        } else {
            if (largerOrEq === EMPTY) {
                largerOrEq = { val: node.val };
                largerOrEqHead = largerOrEq;
            } else {
                largerOrEq.next = { val: node.val };
                largerOrEq = largerOrEq.next;
            };
        }
        node = node.next;
    }
    // Point smaller's last node to head of larger
    smaller.next = largerOrEqHead;
    return smallerHead;
}

const pretty = (ll: LinkedListNode): string => {
    let [node, s] = [ll, ''];
    while (node) {
        s += ` -> ${node.val}`;
        node = node.next;
    }
    return s.substring(4);
}

/**
 * ASSERTIONS
 */
console.log(pretty(partition(
    {
        val: 5,
        next: {
            val: 1,
            next: {
                val: 8,
                next: {
                    val: 0,
                    next: {
                        val: 3
                    }
                }
            }
        }
    },
    3)) === '1 -> 0 -> 5 -> 8 -> 3');
