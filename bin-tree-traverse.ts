/**
 * BINARY TREE PRE, IN AND POST-ORDER TRAVERSAL
 
 * Remember Pre, In, and Post is with respect to to A, the ROOT node, shown below:
 *      A               Pre  : ABC         ROOT Left Right. This is a depth-first-traversal
 *    /   \             In   : BAC         Left ROOT Right
 *   B     C            Post : BCA         Left Right ROOT
 *
 * For implementation, we can count how many times visited:
 *                                         Print when:
 *            A         Pre  : ABDGHEICFJ  1st time/leaf (Depth-first-traversal)
 *         /    \       In   : GDHBIEACJF  2nd time/leaf
 *        B      C      Post : GHDIEBJFCA  3rd time/leaf
 *      /   \      \
 *     D     E      F
 *    / \   /      /
 *   G  H  I      J
 */
