/**
 *                        067 - LFU (Least Frequently Used) Cache
 *
 * This problem was asked by Google.
 *
 * Implement an LFU (Least Frequently Used) cache. It should be able to be initialized 
 * with a cache size n, and contain the following methods:
 * 
 *      set(key, value): sets key to value. If there are already n items in the cache 
 *                       and we are adding a new item, then it should also remove
 *                       the least frequently used item. If there is a tie, then the 
 *                       least recently used key should be removed.
 * 
 *      get(key):        gets the value at key. If no such key exists, return null.
 *
 * Each operation should run in O(1) time.
 * 
 * SOLUTION
 * This can be implemented by a MIN HEAP, which handles insertion, deletion, and update 
 * in logarithmic time complexity.
 * @see https://github.com/xtango/data-structures/min-heap.ts
 * 
 * Important:
 * The problem statement asks for 0(1) time for both the set() and get(). Using minHeap,
 * getting the minimum item without removal, is indeed O(1); but modifying 
 * the  heap (e.g. removing the first item), is an O(log n) operation.
 */
