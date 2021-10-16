/**
 *                  Problem #391 [Hard] - LONGEST COMMON CONTIGUOUS 
 * 
 * This problem was asked by Facebook.
 * 
 * We have some historical clickstream data gathered from our site anonymously using cookies.
 * The histories contain URLs that users have visited in chronological order.
 * 
 * Write a function that takes two users' browsing histories as input and returns the longest
 * contiguous sequence of URLs that appear in both.
 * 
 * For example, given the following two users' histories:
 *      user1 = ['/home', '/register', '/login', '/user', '/one', '/two']
 *      user2 = ['/home', '/red', '/login', '/user', '/one', '/pink']
 * You should return the following: ['/login', '/user', '/one']
 */

/**
 * APPROACH
 * This is similar to the Longest Common Substring problem, with words instead of characters.
 * Note: The Longest Common Subsequencem, which does not have to be contiguous, requires a 
 *       different solution.
 */
