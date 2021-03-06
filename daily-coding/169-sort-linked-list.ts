/**
 *            #169 [Medium] - SORT LINKED LIST
 *
 * This problem was asked by Google.
 * 
 * Given a linked list, sort it in O(n log n) time and constant space.
 * For example, the linked list 4 -> 1 -> -3 -> 99 should become -3 -> 1 -> 4 -> 99.
 */

interface LLNode { val: number, next?: LLNode }

const copyList = (node: LLNode): LLNode => {
    let [copyHead, copyPtr] = [undefined, undefined];
    let sourcePtr: LLNode | undefined = node;
    while (sourcePtr) {
        const copy = { val: sourcePtr.val };
        if (copyHead === undefined) {
            copyPtr = copy;
            copyHead = copyPtr;
        } else {
            copyPtr.next = copy;
            copyPtr = copy;
        }

        sourcePtr = sourcePtr.next;
    }
    return copyHead;
}

const merge = (left: LLNode, right: LLNode): LLNode | undefined => {
    let [mergedPtr, mergedHead] = [undefined, undefined];
    let [leftPtr, rightPtr] = [left, right];
    let newNode;
    while (leftPtr && rightPtr) {
        if (leftPtr.val < rightPtr.val) {
            newNode = { val: leftPtr.val, next: leftPtr.next };
            leftPtr = leftPtr.next;
        } else {
            newNode = { val: rightPtr.val, next: rightPtr.next };
            rightPtr = rightPtr.next;
        }

        if (mergedPtr === undefined) {
            mergedPtr = newNode;
            mergedHead = mergedPtr;
        } else {
            mergedPtr.next = newNode;
            mergedPtr = newNode;
        }
    }

    // Leftover elems
    mergedPtr.next = copyList(leftPtr === undefined ? rightPtr : leftPtr);

    return mergedHead;
}

const pretty = (head: LLNode | undefined) => {
    let [str, node] = ['', head];
    while (node) {
        str += `${node.val}${node.next ? ' -> ' : ''}`;
        node = node.next;
    }
    return str;
}

/**
 * ASSERTIONS
 */
console.log(pretty({ val: 1, next: { val: 3 } }) === '1 -> 3');
console.log(pretty(copyList({ val: 8, next: { val: 99 } })) === '8 -> 99');
console.log(pretty(merge(
    { val: 1, next: { val: 8 } },
    { val: 5, next: { val: 6 } })) === '1 -> 5 -> 6 -> 8');
