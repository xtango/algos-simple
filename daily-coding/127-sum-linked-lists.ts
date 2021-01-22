/**
 *                  #127 [Easy] - SUM LINKED LISTS
 * 
 * This problem was asked by Microsoft.
 * 
 * Let's represent an integer in a linked list format by having each node represent a digit in the number.
 * The nodes make up the number in reversed order.
 * For example, the following linked list:
 * 1 -> 2 -> 3 -> 4 -> 5
 * is the number 54321.
 * Given two linked lists in this format, return their sum in the same linked list format.
 */

interface LLNode {
    val: number;
    next?: LLNode;
}

const toNum = (head: LLNode | undefined): number => {
    let node = head;
    let numStr = '';
    while (node) {
        numStr = node.val + numStr
        node = node.next;
    }
    return parseInt(numStr);
}

/**
 * @example toList(983) returns 3 -> 8 -> 9
 */
const toList = (n: number): LLNode => {
    const nAsStr = n.toString();

    let head: LLNode = {
        val: parseInt(nAsStr[0]),
        next: undefined
    }

    for (let i = 1; i < nAsStr.length; i++) {
        const temp = head;
        head = {
            val: parseInt(nAsStr[i]),
            next: temp
        }
    }
    return head;
}

const sumLists = (list1: LLNode, list2: LLNode): LLNode => toList(toNum(list1) + toNum(list2));

/** 
 * ASSERTIONS
 */
const digits1: LLNode = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: undefined
        }
    }
}

const digits2: LLNode = {
    val: 7,
    next: {
        val: 9,
        next: {
            val: 8,
            next: undefined
        }
    }
}

console.log(toNum(digits1) === 321);
console.log(toNum(digits2) === 897);
console.log(toNum(sumLists(digits1, digits2)) === 321 + 897);
