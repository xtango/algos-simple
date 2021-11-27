/**
 *
 *                  Problem #434 [Easy] - BSS FLOOR AND CEILING
 *
 * This problem was asked by Oracle.
 *
 * Given a binary search tree, find the floor and ceiling of a given integer.
 * The floor is the highest element in the tree less than or equal to an integer,
 * while the ceiling is the lowest element in the tree greater than or equal to an integer.
 * If either value does not exist, return None.
 */
interface BSTNode {
    val: number,
    left?: BSTNode,
    right?: BSTNode
}

const floorCeiling = (root: BSTNode, n: number): { floor: number, ceil: number } => {
    const getFloor = (): number => {
        let node: BSTNode | undefined = root;
        while (node.left !== undefined) {
            node = node.left;
        }
        return node.val;
    }

    const getCeil = (): number => {
        let node: BSTNode | undefined = root;
        while (node.right !== undefined) {
            node = node.right;
        }
        return node.val;
    }

    return ({ floor: getFloor(), ceil: getCeil() })
}

/**
 * ASSERTIONS
 */

/**
 *                      8
 *                  3       10
 *              1               14
 *                          13
 */
const bst1: BSTNode = {
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

console.log(floorCeiling(bst1, ));
