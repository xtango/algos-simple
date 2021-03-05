/**
 *            #169 [Medium] - SORT LINKED LIST
 *
 * This problem was asked by Google.
 * 
 * Given a linked list, sort it in O(n log n) time and constant space.
 * 
 * For example, the linked list 4 -> 1 -> -3 -> 99 should become -3 -> 1 -> 4 -> 99.
 */

interface LLNode { val: number, next?: LLNode }

const NULL_NODE = { val: -1 }

const copyList = (node: LLNode): LLNode => {
    let copyPtr: LLNode = { val: node.val}; 
    const copyHead = copyPtr;
    let sourcePtr: LLNode | undefined = node;
    while(sourcePtr) {
        const newNode = { val: sourcePtr.val};
        copyPtr.next = newNode;
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
    const remaining = copyList(leftPtr === undefined ? rightPtr : leftPtr);
    console.log('rem', remaining);
    mergedPtr.next = remaining;
  
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

//console.log(pretty({ val: 1, next: { val: 3 } }) === '1 -> 3');
console.log('copy', copyList({ val: 8, next: { val: 99}}))
// console.log(
//     merge({ val: 1, next: { val: 8 } },
//         { val: 5, next: { val: 6 } }));
