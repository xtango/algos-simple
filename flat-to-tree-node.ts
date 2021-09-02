/**
 * Flattens [{id, parentId}, ..] to a tree structure { id : { children: [{ id}, {}...]}}
 */
const flatToTree = (flat) => {
    const recurHelper = (node) => {
        console.log('visiting ', node.id);
        const flatChildren = flat.filter(n => n.parentId === node.id)
        flatChildren.forEach(flatChild => {
            const childNode = recurHelper(flatChild);
            if (node.children === undefined) {
                node.children = [];
            }
            node.children.push(childNode);
        });
        return node;
    }

    // Start
    return recurHelper(flat.find(x => x.id === 1));
}

/**
 * TESTS
 *              1   
 *            /   \
 *           2     3
 *                /
 *               4    
 */
console.log(flatToTree([
    { id: 1, parentId: -1 }, // root
    { id: 2, parentId: 1 },
    { id: 3, parentId: 1 },
    { id: 4, parentId: 3 },
]))
