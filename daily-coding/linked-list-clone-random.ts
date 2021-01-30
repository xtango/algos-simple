/**
 *      
* This question was asked by Snapchat.
* 
* Given the head to a singly linked list, where each node also has a “random” pointer
* that points to anywhere in the linked list,  deep clone the list.
*/
interface SLLNode { val: number; next?: SLLNode; randomPtr?: SLLNode }
interface SourceClonePair {source:SLLNode, clone: SLLNode, next?: SourceClonePair}

/**
 * Clone keeping an array of source to copy of each node.
 * Then traverse the cloned list and set the randomPtr.
 */
const deepClone = (root: SLLNode): SLLNode => {
    console.log('deepClone: ', pretty(root));
    let clone: SLLNode = { val: root.val }
    let source: SLLNode = { val: root.val, next: root.next };
    let sourceTargetPair: SourceClonePair = {source, clone};
    //const sourceToCloneMap: {[SLLNode]: SLLNode};
    const cloneHead = clone;

    let idx = 0;
    while (source.next) {
        if (source.next) {
            clone.next = { val: source.next.val};
            sourceTargetPair.next = {source, clone} 
            clone = clone.next;
        }
        source = source.next;
        
    }

    // build source
    // while (sourceTargetPair.next) {}
    //     const src = sourceTargetPair.source;
    // }

    return cloneHead;
}

const prettyNode = (node: SLLNode, prefix: string) => `${prefix}[${node.val}]`;

const pretty = (root: SLLNode): string => {
    let node = root;
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
n32.randomPtr = n3; // Important pointing to itself will give a circulr error
const cloned = deepClone(n17);
console.log('cloned', pretty(cloned));
