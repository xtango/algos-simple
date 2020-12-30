/**
*               #58 - INDEX OF ELEM IN ROTATED ARRAY
*
* Good morning! Here's your coding interview problem for today.
* This problem was asked by Amazon.
*
* An sorted array of integers was rotated an unknown number of times.
* Given such an array, find the index of the element in the array in faster
* than linear time. If the element doesn't exist in the array, return null.
*
* For example, given the array [13, 18, 25, 2, 8, 10] and the element 8,
* return 4 (the index of 8 in the array).
* You can assume all the integers in the array are unique.
*
* SOLUTION
* If we start with a sorted array & rotate (shift left) X times, we get:
*       [ 2, 8*, 10, 13, 18, 25]
*    -> [8*, 10, 13, 18, 25,  2]
*    -> [10, 13, 18, 25,  2, 8*]
*    -> [13, 18, 25,  2, 8*, 10] <--- This is the input we are given
*
* The elem 8 will be in either the right or left side
*/

