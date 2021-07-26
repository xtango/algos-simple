/**
 * Index of largest tree in forest. The forest contains one or more disconnected trees.
 */

type ChildToParent = number[];
interface TreeNode { id: number, children: TreeNode[] }
type ParentToChildDict = { [key: number]: number[] };
interface Forest {
    parentToChildDict: ParentToChildDict;
    roots: number[]; // indices of root nodes
}

/**
 * Converts [child, parent] pairs to parent-children-dictionary.
 */
const toForest = (childToParentList: ChildToParent[]): Forest => {
    const parentToChildDict: ParentToChildDict = {};
    const children = childToParentList.map(x => x[0]);
    const rootSet = new Set<number>();

    childToParentList.forEach(childToParent => {
        const [child, parent] = [childToParent[0], childToParent[1]];
        if (parentToChildDict[parent] === undefined) {
            parentToChildDict[parent] = [];
        }
        parentToChildDict[parent].push(child);
        // Root when parent not in children list
        if (!children.includes(parent)) {
            rootSet.add(parent);
        }
    });

    const forest = {
        parentToChildDict,
        roots: [...rootSet]
    };
    ///console.log(forest);
    return forest;
}
/**
 * Returns the number of nodes in a tree specificed by forest and rootindex.
 * @example For the forest illustrated below and rootIndex of 1 treeSize() returns 3.
 *          1
 *         2  3
 */
const treeSize = (forest: Forest, rootIndex: number): number {
    //console.log('treesize forst', forest);
    let count = 1;
    const q: number[] = [rootIndex];
    while (q.length > 0) {
        const idx = q.pop();
        const children = forest.parentToChildDict[idx];
        if (children !== undefined) {
            children.forEach(child => {
                q.push(child)
                count++;
            });
        }
    }
    return count;
}

const largestIdx = (childToParentList: ChildToParent[]): number => {
    const forest = toForest(childToParentList);
    let [maxSize, maxSizeRootIdx] = [0, 0];
    forest.roots.forEach(idx => {
        const size = treeSize(forest, idx);
        if (size > maxSize) {
            [maxSize, maxSizeRootIdx] = [size, idx];
        }
    });
    return maxSizeRootIdx;
}

/**
 *          1
 *         2  3
 */
const CHILD_PARENT_1 = [
    [2, 1],
    [3, 1]]
console.log(toForest(CHILD_PARENT_1).roots.length === 1);
console.log(treeSize(toForest(CHILD_PARENT_1), 1) === 3);
console.log(largestIdx(CHILD_PARENT_1) === 1);

/**
 *      1       4
 *     2        5
 *    3
 */
const CHILD_PARENT_2 = [
    [2, 1],
    [3, 2],
    [5, 4]]
console.log(toForest(CHILD_PARENT_2).roots.length === 2);
console.log(treeSize(toForest(CHILD_PARENT_2), 4) === 2);
console.log(largestIdx(CHILD_PARENT_2) === 1);
