/**
 *                                #187 [Easy] - RECATANGLES OVERLAPP
 * 
 * This problem was asked by Google.
 * 
 * You are given given a list of rectangles represented by min and max
 * x- and y-coordinates. Compute whether or not a pair of rectangles 
 * overlap each other. If one rectangle completely covers another, 
 * it is considered overlapping.
 * 
 * For example, given the following rectangles:
 * {
 *  "top_left": (1, 4),
 *   "dimensions": (3, 3) # width, height
 * },
 * {
 *  "top_left": (-1, 3),
 *  "dimensions": (2, 1)
 * },
 * {
 *  "top_left": (0, 5),
 *  "dimensions": (4, 3)
 * }
 */
interface Rect { top_left: number[], dimensions: number[] }

/**
 * Returns true when r1 overlaps r2, checking left-top and bottom-right.
 */
const isOverlapping = (r1: Rect, r2: Rect): boolean =>
    // Top left should be to the left
    (r1.top_left[0] <= r2.top_left[0])
    // Top left should be higher
    && (r1.top_left[1] >= r2.top_left[1])
    // Bottom right should be to the right
    && (r1.top_left[0] + r1.dimensions[0] >= r2.top_left[0] + r2.dimensions[0])
    // Bottom right should be lower
    && (r1.top_left[1] - r1.dimensions[1] <= r2.top_left[1] - r2.dimensions[1]);

const hasOverlappingRectangles = (rects: Rect[]): boolean => {
    for (let i = 0; i < rects.length; i++) {
        for (let j = 0; j < rects.length; j++) {
            if (i !== j) {
                if (isOverlapping(rects[i], rects[j])) {
                    return true;
                }
            }
        }
    }
    return false;

}

/**
 * ASSERTIONS
 */
const rect1 = {
    "top_left": [1, 4],
    "dimensions": [3, 3] // width, height
};
const rect2 = {
    "top_left": [-1, 3],
    "dimensions": [2, 1]
};
const rect3 = {
    "top_left": [0, 5],
    "dimensions": [4, 3]
};

console.log(isOverlapping(rect1, rect2) === false);
console.log(isOverlapping(rect2, rect1) === false);
//
// Important: The problem description is wrong.
//            The first and third do not overlap.
//
console.log(isOverlapping(rect1, rect3) === false);
console.log(isOverlapping(rect3, rect1) === false);
console.log(hasOverlappingRectangles([rect1, rect2, rect3]) === false);

const rect4 = {
    "top_left": [0, 5],
    "dimensions": [5, 5]
}
console.log(isOverlapping(rect4, rect1) === true);
console.log(isOverlapping(rect1, rect4) === false);
console.log(isOverlapping(rect4, rect2) === false);
console.log(isOverlapping(rect2, rect4) === false);
console.log(hasOverlappingRectangles([rect1, rect2, rect3, rect4]) === true);
