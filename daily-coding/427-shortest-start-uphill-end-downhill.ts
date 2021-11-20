/**
 *                  Problem #427 [Medium] - SHORTEST ROUTE, START UPHILL END DOWNHILL
 * 
 * This problem was asked by Square.
 * 
 * A competitive runner would like to create a route that starts and ends at his house,
 * with the condition that the route goes entirely uphill at first, and then entirely downhill.
 * 
 * Given a dictionary of places of the form {location: elevation}, and a dictionary mapping paths
 * between some of these locations to their corresponding distances, find the length of the
 * shortest route satisfying the condition above. Assume the runner's home is location 0.
 * 
 * For example, suppose you are given the following input:
 * elevations = {0: 5, 1: 25, 2: 15, 3: 20, 4: 10}
 * paths = {
 *     (0, 1): 10,
 *     (0, 2): 8,
 *     (0, 3): 15,
 *     (1, 3): 12,
 *     (2, 4): 10,
 *     (3, 4): 5,
 *     (3, 0): 17,
 *     (4, 0): 10
 * }
 * In this case, the shortest valid path would be 0 -> 2 -> 4 -> 0, with a distance of 28.
 */

/**
 * 
 *  [2:15]----10--->[4:10]<---------------
 *     ^          /                      |
 *     |         /                       |
 *     8        /                        |  
 *     |      10                         5          SHORTEST PATH
 *     |     /                           |          0->2->4->0 = 8 + 10 + 10 = 28 
 *     |   v                             |          
 * HOME[0:5]----10----->[1:25]---12---->[3:20]
 *       ^   |                           ^  |
 *       |   |                           |  | 
 *       |    ------------12-------------   |
 *       |                                  |
 *        ----------------17----------------
 * 
 * APPROACH:
 * This a shortest path problem constrained by the "start uphill, end downhill, end at home" rules.
 * We can solve in recursively. If encounter a path starting downhill or returning uphill we reject it.
 * 
 *           [1] ---12----[3]----17-----[0]         Len: 39   
 *          /    
 *        10
 *       /  
 *     [0] --8---[2]--10----[4]---10----[0]         Len: 28 (SHORTEST)
 *        \ 
 *         15      --------17-----------[0]         Len: 32 
 *           \   /
 *           [3]
 *              \
 *                ---5----[4]------10---[0]         Len: 30
 */
type PathDictionary = { [key: string]: number };

type Place = { elevation: number, paths: { toPlaceId: number, distance: number }[] };

const shortestRoute = (elevations: number[], paths: PathDictionary) => {
    const places = toPlaceArray(elevations, paths);
    console.log(places)
}

const toPlaceArray = (elevations: number[], paths: PathDictionary): Place[] => {
    const places: Place[] = elevations.map(elev => { return { elevation: elev, paths: [] } });
    Object.entries(paths).forEach(([k, distance]) => {
        const parts = k.split('_');
        const [from, toPlaceId] = [parseInt(parts[0]), parseInt(parts[1])];
        places[from].paths.push({ toPlaceId, distance });
    })
    return places;
}


const ELEVATIONS = [5, 25, 15, 20, 10]
const PATHS = {
    '0_1': 10,
    '0_2': 8,
    '0_3': 15,
    '1_3': 12,
    '2_4': 10,
    '3_4': 5,
    '3_0': 17,
    '4_0': 10
}

shortestRoute(ELEVATIONS, PATHS)
