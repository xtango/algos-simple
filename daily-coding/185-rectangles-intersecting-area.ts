/**
 *           #185 [Easy] - AREA OF INTERSECTION OF 2 RECTANGLES
 *
 * Given two rectangles on a 2D graph, return the area of their intersection.
 * If the rectangles don't intersect, return 0.
 * 
 * For example, given the following rectangles:
 * {
 *  "top_left": (1, 4),
 *  "dimensions": (3, 3) # width, height
 * }
 * and
 * {
 *  "top_left": (0, 5),
 *  "dimensions": (4, 3) # width, height
 * }
 * return 6.
 */

interface RectangleProps { top_left: number[], dimensions: number[] }

/**
 *           Intersecting                        Non-Intersecting
 * 
 *    x1, y1                              x1, y1          
 *       ---------------                    -----------     ---------
 *       |             |                    |         |     |       |
 *       | x2, y2      |                    |         |     |       |
 *       |    ---------|-----               -----------     ---------
 *       |    |        |    |
 *       ---------------    |                    ----------
 *            |             |                    |        |
 *            ---------------                    ----------
 */

class Rectangle {
    topLeft: number[];
    topRight: number[];
    bottomLeft: number[];
    bottomRight: number[];

    constructor(props: RectangleProps) {
        this.topLeft = props.top_left;
        this.topRight = [props.top_left[0] + props.dimensions[0], props.top_left[1]];
        this.bottomLeft = [props.top_left[0], props.top_left[1] - props.dimensions[1]];
        this.bottomRight = [props.top_left[0] + props.dimensions[0], props.top_left[1] - props.dimensions[1]];
    }

    // todo!
    isIntersecting(other: Rectangle): boolean {
        return (this.topRight[0] < other.topLeft[0] || this.topRight[0] < other.topLeft[0]);
    }

    intersectingWidth(other: Rectangle): number {
        return this.topLeft[0] < other.topLeft[0]
            ? this.topRight[0] - other.topLeft[0]
            : other.topRight[0] - this.topLeft[0];
    }

    intersectingHeight(other: Rectangle): number {
        return this.topLeft[1] > other.topLeft[1]
            ? other.topLeft[1] - this.bottomLeft[0]
            : this.topLeft[1] - other.bottomLeft[0];
    }

    intersectingArea(other: Rectangle): number {
        return !this.isIntersecting(other)
            ? 0
            : this.intersectingWidth(other) * this.intersectingHeight(other);
    }

    static areaOfIntersection(r1Props: RectangleProps, r2Props: RectangleProps): number {
        return new Rectangle(r1Props).intersectingArea(new Rectangle(r2Props));
    }
}

/**
 * ASSERTIONS
 */
const R1 = {
    "top_left": [1, 4],
    "dimensions": [3, 3] // width, height
};
const R2 = {
    "top_left": [0, 5],
    "dimensions": [4, 3] // width, height
};
const R3 = {
    "top_left": [10, 10],
    "dimensions": [5, 5] // width, height
}
console.log(Rectangle.areaOfIntersection(R1, R2) === 6);
console.log(Rectangle.areaOfIntersection(R2, R1) === 6);
console.log(Rectangle.areaOfIntersection(R1, R3));
