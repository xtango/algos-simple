/**
 *                      #256 [Medium] - ALTERNATIVE LOW HIGH
 * 
 * This problem was asked by Fitbit.
 * 
 * Given a linked list, rearrange the node values such that they appear 
 * in alternating low -> high -> low -> high ... form. For example,
 * given 1 -> 2 -> 3 -> 4 -> 5, you should return 1 -> 3 -> 2 -> 5 -> 4
 */

interface LLNode { val: number; next?: LLNode; }

const llToArray = (head: LLNode): number[] => {
    const arr = [];
    let node = head;
    while (node) {
        arr.push(node.val);
        node = node.next
    }
    return arr;
}
/**
 * Returns a new linked list in alternating high-low form
 * 
 * i:    0   1   2   3   4          0   1   2   3   4
 * 
 * val:  1   2   3   4   5      =>  1   3   2   5   4
 *           |___|   |___|   
 */
const alternate = (head: LLNode): LLNode => {
    const arr = llToArray(head).sort();
    let node: LLNode = { val: arr[0] };
    const rearrangedHead = node;
    for (let i = 1; i < arr.length - 1; i++) {
        // Swap every odd i'th elem with elem to the right
        if (i % 2 === 1) {
            node.next = {
                val: arr[i + 1],
                next: { val: arr[i] }
            };
            node = node.next.next;
        }
    }
    return rearrangedHead;
}

/**
 * ASSERTIONS
 */
const LL1 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: { val: 5 }
            }
        }
    }

}
console.log(JSON.stringify(llToArray(LL1)) === '[1,2,3,4,5]');
console.log(JSON.stringify(llToArray(alternate(LL1))) === '[1,3,2,5,4]');
