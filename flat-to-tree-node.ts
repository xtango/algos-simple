/**
 * Converts a flat structure [{id, parentId}, ..] to the 
 * tree structure { id : { children: [{ id}, {}...]}}
 */
const flatToTree = (flat, rootId = -1) => {
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
    return recurHelper(flat.find(x => x.parentId === rootId));
}

/**
 * TESTS
 * node
 *              1   
 *            /   \
 *           2     3      
 *                /
 *               4    
 */
const node = flatToTree([
    { id: 1, parentId: -1 }, // root
    { id: 2, parentId: 1 },
    { id: 3, parentId: 1 },
    { id: 4, parentId: 3 },
])
console.log(node)
