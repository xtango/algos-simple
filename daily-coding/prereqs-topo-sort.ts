/**
 *                                       COURSE PREREQS (Topological Ordering)
 * Problem #92 [Hard]
 * This problem was asked by Airbnb.
 *
 * We're given a hashmap associating each courseId key with a list of courseIds values, which represents
 * that the prerequisites of courseId are courseIds. Return a sorted ordering of courses such that
 * we can finish all courses. Return null if there is no such ordering.
 *
 * For example, given
 * {
 *  'CSC300': ['CSC100', 'CSC200'], 
 *  'CSC200': ['CSC100'], 
 *  'CSC100': []
 * }, should return ['CSC100', 'CSC200', 'CSCS300']
 * 
 * SOLUTION
 * The required ordering is a simple TOPOLOGICAL SORT of a Directed Acyclical Graph.
 * CS100 -> CS200 -> CSC300
 *   |                 ^
 *   ------------------|
 *
 * So what's the catch? Typically we're give an adjacency list  with vertex to an OUT vertices. 
 * Here, however, we're given the  reverse, vertex to IN vertices. Hence func toOutgoing() below.
 * 
 * Pseudocode:
 * Init inDegrees (in the example: {CSC300: 2, CSC200: 1, CSC100: 0})
 * while remaing vertices
 *      current = Find first vertex with inDegree 0
 *      Reduce inDegree of all outVertices(current) // equivalent of removing from G
 *      Reduce current.inDegree (will now be -1, which means visited)
 */
interface G {[key:string]: string[]}
/**
 * Coverts to the Outgoing vertices.
 * @param g Graph with Incoming vertices.
 * @example outVertices(example in header) returns 
 *  { CS100: ['CSC300', 'CS200'], ...}
 */
const toOutgoing = (g: G): G => {
    const out: G = {};
    Object.keys(g).forEach(x => {
        if (!out[x]) {
            out[x] = [];
        }
        g[x].forEach(y => {
            if (!out[y]) {
                out[y] = [];
            }
            out[y].push(x);
        })
    })
    return out;
}

/**
 * Tests
 */
const preReqs1 = {
  'CSC300': ['CSC100', 'CSC200'], 
  'CSC200': ['CSC100'], 
  'CSC100': []
}
console.log(toOutgoing(preReqs1)['CSC100'].join(',') === "CSC300,CSC200");
