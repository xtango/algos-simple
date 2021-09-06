/**
 *              Problem #348 [Easy] - TERNARY SEARCH TREE
 * 
 * This problem was asked by Zillow.

A ternary search tree is a trie-like data structure where each node may have up to three children.
Here is an example which represents the words code, cob, be, ax, war, and we.

       c
    /  |  \
   b   o   w
 / |   |   |
a  e   d   a
|    / |   | \ 
x   b  e   r  e  
The tree is structured according to the following rules:

left child nodes link to words lexicographically earlier than the parent prefix
right child nodes link to words lexicographically later than the parent prefix
middle child nodes continue the current word
For instance, since code is the first word inserted in the tree, and cob lexicographically 
precedes cod, cob is represented as a left child extending from cod.

Implement insertion and search functions for a ternary search tree.
 */
interface TSTNode {
    data: string;
    left?: TSTNode;
    mid?: TSTNode;
    right?: TSTNode;
}

const newTSTNode = (char: string): TSTNode => {
    return {
        data: char,
        left: undefined,
        mid: undefined,
        right: undefined
    }
}

/**
 * Create blank tree
 */
const tstMakeTree = (): { root: TSTNode | undefined } => {
    return {
        root: undefined
    }
}

/**
 * In-place insertion of root in the ternary tree
 */
const tstInsert = (tree, char: string) => {
    const insertNode = (node: TSTNode | undefined) => {
        console.log('insertNode', node, char);
        if (node === undefined) {
            node = newTSTNode(char);
        } else {
            if (char < node.data) {
                insertNode(node.left);
            } else if (char === node.data) {
                insertNode(node.mid);
            } else {
                insertNode(node.right);
            }
        }
    }

    if (tree.root === undefined) {
        tree.root = newTSTNode(char);
    } else {
        insertNode(tree.root);
    }
}

/**
 * ASSERTIONS
 */
const words = ['code', 'cob', 'be', 'ax', 'war', 'we']
const tree = tstMakeTree();
words.forEach(word => word.split('').forEach(c => tstInsert(tree, c)))
console.log('tern tree', tree); ''
