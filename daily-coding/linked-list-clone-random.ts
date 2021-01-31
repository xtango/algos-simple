/**
 *      
* This question was asked by Snapchat.
* 
* Given the head to a singly linked list, where each node also has a “random” pointer
* that points to anywhere in the linked list,  deep clone the list.
*/
interface SLLNode {
    val: number;
    next?: SLLNode;
    randomPtr?: SLLNode;

    sourcePtr?: SLLNode; // For a clone this points to its source.
    clonePtr?: SLLNode // For source, this points to its clone.
}

/**
 * Clone keeping an array of source to copy of each node.
 * Then traverse the cloned list and set the randomPtr.
 */
const deepClone = (root: SLLNode): SLLNode => {
    const copy = (node: SLLNode): SLLNode =>  { return { val: node.val } } ;

    const EMPTY = {val: -1};
    console.log('Source', pretty(root));
    let source: SLLNode = root;
    let head: SLLNode = EMPTY;
    let tail: SLLNode = EMPTY;

    while (source) {
        // Special case for head
        if (head === EMPTY) {
            head = copy(source);
            tail = head;
        } else {
            tail.next = copy(source);
            tail = tail.next;
        }
        source = source.next;

        // source.clonePtr = clone;
        // clone.sourcePtr = source;
        // clone = clone.next;
    }

    // swivelRandom(cloneHead);

    return head;
}

const swivelRandom = (clone: SLLNode): void => {
    let node: SLLNode = clone;
    console.log('swivel clone blank rands: ', pretty(clone));
    while (node) {
        const srcRandom = node.sourcePtr?.randomPtr;
        console.log(`swivel rand: [${node.val}] srcPtr: ${node?.sourcePtr?.val}, srcRand: ${srcRandom?.val}, cloneRand: ${srcRandom?.clonePtr?.val}`);
        node.randomPtr = srcRandom?.clonePtr;
        node = node.next;
    }
}

const prettyNode = (node: SLLNode, prefix: string) => `${prefix}[${node.val} rand:${node.randomPtr?.val}]`;

const pretty = (root: SLLNode): string => {
    let node: SLLNode = root;
    let s = '';
    while (node) {
        s += prettyNode(node, node === root ? '' : '->');
        node = node.next;
    }
    return s;
}


/**
 * ASSERTIONS
 */

//   -------    -----
//   v    |     |   |
// [17]->[3]->[32]<--
//   |         ^
//   ----------|
const n17: SLLNode = { val: 17 };
const n3: SLLNode = { val: 3 };
const n32: SLLNode = { val: 32 };
n17.next = n3;
n17.randomPtr = n32;
n3.next = n32;
n3.randomPtr = n17;
n32.randomPtr = n32;
const cloned = deepClone(n17);
console.log('cloned', pretty(cloned));
