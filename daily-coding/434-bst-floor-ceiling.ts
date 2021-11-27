/**
Problem #434 [Easy]

This problem was asked by Oracle.

Given a binary search tree, find the floor and ceiling of a given integer.
The floor is the highest element in the tree less than or equal to an integer,
while the ceiling is the lowest element in the tree greater than or equal to an integer.

If either value does not exist, return None.
*/

interface BSTNode {
    val: number,
    left?: BSTNode,
    right?: BSTNode
}

const floorCeiling = (n: number): { floor: number, ceiling: number } {
    return ({ floor: -1, ceiling: -1 })

}

/**
 * ASSERTIONS
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
        left: {
            val: 14,
            left: { val: 13 }
        }
    }
}

console.log(bst1);
