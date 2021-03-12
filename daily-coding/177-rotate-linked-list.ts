/** 
 *          #177 [Easy] - 
 *
 * This problem was asked by Airbnb.
 *
 * Given a linked list and a positive integer k, rotate the list to the right by k places.
 * For example, given the linked list 7 -> 7 -> 3 -> 5 and k = 2, it should become 3 -> 5 -> 7 -> 7.
 * Given the linked list 1 -> 2 -> 3 -> 4 -> 5 and k = 3, it should become 3 -> 4 -> 5 -> 1 -> 2.
 */
interface LinkedListNode { val: number, next?: LinkedListNode }

const arrToLL = (arr: number[]): LinkedListNode => {
    const head: LinkedListNode = { val: arr[0] };
    let node = head;
    for (let i = 1; i < arr.length; i++) {
        node.next = { val: arr[i] };
        node = node.next;
    }
    return head;
}

const llLength = (head: LinkedListNode): number {
    let node = head;
    let len = 0;
    while (node) {
        len++;
        node = node.next;
    }
    return len;
}

const pretty = (head: LinkedListNode): string => {
    const accum = [];
    let node = head;
    while (node) {
        accum.push(node.val);
        node = node.next;
    }
    return accum.join('->');
}

/**
 * Rotate using slow and fast pointers.  When k = 2, for example, after advancing we get:
 * [1 -> 2] -> [3 -> 4 -> 5]
 *       ^                ^
 *       slow             fast
 * We then point head to slow.next, so after rotation we get:
 * [3 -> 4 -> 5]->[1->2]
 */
const rotate = (head: LinkedListNode, k: number): LinkedListNode => {
    const len = llLength(head);
    let [slow, fast] = [head, head];

    // Advance both pointers len - k times
    for (let i = 0; i < len - 1; i++) {
        if (i <= k % len) { // Modulus to handle case when k > len
            fast = fast.next;
        } else { // advance both
            [fast, slow] = [fast.next, slow.next];
        }

    }
    // console.log('fast, slow', fast, slow);

    fast.next = head;
    head = slow.next;
    slow.next = undefined;
    return head;
}

/**
 * ASSERTIONS
 */
console.log(llLength(arrToLL([1, 2, 3, 4, 5])) === 5);

console.log(pretty(
    rotate(arrToLL([1, 2, 3, 4, 5]), 2)) === '3->4->5->1->2');
    
// Check k > len    
console.log(pretty(
    rotate(arrToLL([1, 2, 3, 4, 5]), 6)) === '4->5->1->2->3');
