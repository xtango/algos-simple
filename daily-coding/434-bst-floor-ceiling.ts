/**
 *
 *                  Problem #434 [Easy] - BST FLOOR AND CEILING OF N
 *
 * This problem was asked by Oracle.
 *
 * Given a binary search tree, find the floor and ceiling of a given integer.
 * The floor is the highest element in the tree less than or equal to an integer,
 * while the ceiling is the lowest element in the tree greater than or equal to an integer.
 * If either value does not exist, return None.
 */

interface BSTNode { val: number, left?: BSTNode, right?: BSTNode }

/**
 * A BST is a sorted tree where each node stores a val > all the values
 * in the node’s left subtree and < those in its right subtree.
 * @see https://en.wikipedia.org/wiki/Binary_search_tree
 * 
 * APPROACH
 * In the diagram below, the Inorder List IS 1, 3, 4, 6, 7, 8, 10, 13, 14.
 *                                                   ^
 *                                                   5   
 * The (floor, ceiling) of N is the (prev, next) value enveloping N in Inorder List. 
 * @example When N: 5, the (floor, ceiling) is (4, 6).
 *                                         
 *           8         -------------------- E X A M P L E S ------------------------------
 *        /    \                            N  FLOOR  CEIL
 *       3      10                         --  -----  ----
 *     /  \       \     Case 1: N = root    8      8     8   
 *   1     6       14   Case 2: N < root    5      4     6  Search left subtree
 *        / \      /            N < root    0     -1     1  Search left subtree, no floor
 *       4   7    13    Case 3: N > root   11     10    13  Search right subtree
 *                              N > root   15     14    -1  Search right, no ceil
 *                      ------------------------------------------------------------------
 */
const bstFloorCeil = (root: BSTNode, n: number): number[] => {
    let [floor, ceil] = [-1, -1];
    let node: BSTNode | undefined = root;
    while (node) {
        if (n === node.val) {
            return [n, n];
        } else if (n < node.val) {
            // Search left subtree
            ceil = node.val
            node = node.left;
        } else {
            // Search right subtree
            floor = node.val;
            node = node.right;
        }
    }

    return [floor, ceil];
}

/**
 * ASSERTIONS
 */
const BST: BSTNode = {
    val: 8,
    left: {
        val: 3,
        left: {
            val: 1
        },
        right: {
            val: 6,
            left: {
                val: 4
            },
            right: {
                val: 7
            }
        }
    },
    right: {
        val: 10,
        right: {
            val: 14,
            left: { val: 13 }
        }
    }
}

Object.entries(
    // Expected [floor, ceil] values for N
    { 8: [8, 8], 5: [4, 6], 0: [-1, 1], 11: [10, 13], 15: [14, -1] }
)
    .map(([n, expected]) => {
        const [floor, ceil] = bstFloorCeil(BST, parseInt(n));
        console.log(floor === expected[0] && ceil === expected[1])
    });
