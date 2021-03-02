/**
*         #131 [Medium] CLONE A LINKED LIST CONTAINING RANDOM POINTER
*
* This question was asked by Snapchat.
* 
* Given the head to a singly linked list, where each node also has a “random” pointer
* that points to anywhere in the linked list, deep clone the list.
*/

interface SLLNode { val: number; next?: SLLNode; randomPtr?: SLLNode; }
type NodeToIndex = WeakMap<SLLNode, number>;

/**
 * Dummy node
 */
const NULL_NODE = { val: -1 };

/**
 * Return a node to the index of the map
 */
const getNodeToIndex = (node: SLLNode): NodeToIndex => {
    let i = 0;
    let nodeMap: WeakMap<SLLNode, number> = new WeakMap();
    while (node !== NULL_NODE) {
        nodeMap.set(node, i);
        node = node.next || NULL_NODE;
        i++;
    }
    return nodeMap;
}

/**
 * Return a copy of a node.
 */
const copy = (node: SLLNode): SLLNode => { return { val: node.val } };

/**
 * Returns the index of node's randomPtr
 */
const getRandIdx = (sourceNodeToIndex: NodeToIndex, node: SLLNode): number => {
    let randIdx = -1;
    if (node.randomPtr) {
        const found = sourceNodeToIndex.get(node.randomPtr);
        randIdx = found == undefined ? -1 : found;
    }
    return randIdx
}


/**
 * Clone. Keeps an array of the cloned nodes.
 * Then traverse the cloned list and set the randomPtr.
 */
const deepClone = (root: SLLNode): SLLNode => {
    let source: SLLNode = root;
    let cloneHead: SLLNode = NULL_NODE;
    let cloneTail: SLLNode = NULL_NODE;

    const sourceNodeToIndex: NodeToIndex = getNodeToIndex(root);
    const indexToRandIndex: (number)[] = [];
    const indexToCloneNode: SLLNode[] = [];

    while (source) {
        indexToRandIndex.push(getRandIdx(sourceNodeToIndex, source));
        // Special case for head
        if (cloneHead === NULL_NODE) {
            cloneHead = copy(root);
            cloneTail = cloneHead;
        } else {
            cloneTail.next = copy(source);
            cloneTail = cloneTail.next;
        }

        indexToCloneNode.push(cloneTail);
        source = source.next;
    }

    // Set each random pointer in the cloned list
    for (let i = 0; i < indexToCloneNode.length; i++) {
        const randIdx = indexToRandIndex[i];
        if (randIdx > -1) {
            indexToCloneNode[i].randomPtr = indexToCloneNode[randIdx];;
        }
    }

    return cloneHead;
}

const prettyNode = (node: SLLNode, prefix: string) => `${prefix}[val: ${node.val}, rand:${node.randomPtr?.val}]`;

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
 * 
 *   -------      -------
 *   v      |     |     |
 * [17] -> [3] -> [32]<--
 *   |              ^
 *   ---------------|
 */
const n17: SLLNode = { val: 17 };
const n3: SLLNode = { val: 3 };
const n32: SLLNode = { val: 32 };
n17.next = n3;
n17.randomPtr = n32;
n3.next = n32;
n3.randomPtr = n17;
n32.randomPtr = n32; // Points to itself

console.log(getNodeToIndex(n17).get(n32) === 2);
console.log(pretty(deepClone(n17)) === pretty(n17)); // Cloned should equal source
