/** 
 *          #177 [Easy] - 
 *
 * This problem was asked by Airbnb.
 *
 * Given a linked list and a positive integer k, rotate the list to the right by k places.
 * For example, given the linked list 7 -> 7 -> 3 -> 5 and k = 2, it should become 3 -> 5 -> 7 -> 7.
 * Given the linked list 1 -> 2 -> 3 -> 4 -> 5 and k = 3, it should become 3 -> 4 -> 5 -> 1 -> 2.
 */
interface LinkedListNode { val: number, next?: LinkedListNode}

const arrToLL (arr: number[]): LinkedLinstNode => {
  const head = { val: arr[0] }
  for (i = 1; i < arr.length: i++} {
       head.next = { val: arr[i] }
  }
}
               
/**
 * Rotate using slow and fast pointers.
 */

