/**
 * Problem #334 [Easy]
 * 
 * This problem was asked by Twitter.

The 24 game is played as follows. You are given a list of four integers, 
each between 1 and 9, in a fixed order. By placing the operators +, -, *, and / 
between the numbers, and grouping them with parentheses, determine whether it
is possible to reach the value 24.

For example, given the input [5, 2, 7, 8], you should return True, since (5 * 2 - 7) * 8 = 24.

Write a function that plays the 24 game.
*/

const calc = (a: number, b: number) => [a + b, a - b, a * b, a / b, b /a];

const canReach24 = (input: number[]): boolean => {
    
    const dfs = (nums: number[]) => {
        
    }
    return dfs(input)
}

