/**
 *      
* This question was asked by Snapchat.
* 
* Given the head to a singly linked list, where each node also has a “random” pointer
* that points to anywhere in the linked list,  deep clone the list.
*/
interface SLLNode { val: number; next?: SLLNode; randomPtr?: SLLNode}

/**
 * First attempt is to clone without cloingin the random
 */
const deepClone = (root: SLLNode): SLLNode => {
    let clone: SLLNode = {val: root.val}
    let node: SLLNode = root;
    let cloneHead: SLLNode = clone;
    
    while (node.next) {
        console.log('node: ', node);
        if (node.next) {
            clone.next = {val: node.next.val};
            clone = clone.next;
        }
        node = node.next;
    }
    return cloneHead;
}

/**
 * ASSERTIONS
 */

//   -----------         ------
//   v         |         |    |
// ------    -----    ------  |
// | 17 | -> | 3 | -> | 32 | <-
// ------    -----    ------
//   |                   ^
//   --------------------|
const n17: SLLNode = { val: 17};
const n3: SLLNode = { val: 3 };
const n32: SLLNode = { val: 32 };
n17.next = n3;
n17.randomPtr = n32;
n3.next = n32;
n3.randomPtr = n17;
n32.randomPtr = n32; // points to itself

console.log(deepClone(n17));
