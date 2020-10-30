/**
 * TOWERS OF HANOI
 * 
 * Goal: Move disks from Source to Destination tower.
 *    -       |       |  
 *   ---      |       |
 *  ------    |       |
 * Source   Spare   Dest
 * 
 * Approach: Recursion
 * 
  */
enum TowerName { A = 0, B = 1, C = 2 };
type Disks = number[]; // Containing disk numbers. Disk 5 > Disk 4
type State = Disks[];

const range = (n: number) => [...Array(n).keys()];

const pretty = (towers: State): string => towers.map(t => `[${t.toString()}]`).join('...');

/**
 * Moves the top disk to the dest tower
 */
const moveDisk = (state: State, fromTower: TowerName, toTower: TowerName): State => {
    const clone = state.map(x => [...x])
    const popped = clone[fromTower].splice(0, 1);
    clone[toTower] = [...popped, ...clone[toTower]];
    return clone;
}


/**
 * Initial state with all disks on Tower 1, e.g. [0,1,2],[],[]
 */
const initState = (nDisks: number): State => [range(nDisks), [], []];

/**
 * The solver
 * 
 * Step 1: Move all but the largest to Spare
 *    |       |      |
 *    |       -      |
 *  ------   ---     |
 * Source   Spare   Dest
 * 
 * Step 2: Move largest to Dest
 *    |       |      |
 *    |       -      |
 *    |      ---   ------
 * Source   Spare   Dest
 * 
 * Step 3: Move Spare to Dest
 */
const solve = (nDisks: number) => {
    /**
     * Recursive func to move all disks to destination that are >= largestDisk
     */
    const moveDisks = (towers: State, from: TowerName, to: TowerName, spare: TowerName, largestDisk: number): State => {
        // Base cond: move 0th disk to destination
        if (largestDisk === 0) {
            return moveDisk(towers, from, to);
        }

        // Step1: Move all but the largest from source to 
        const step1 = moveDisks(towers, from, to, spare, largestDisk - 1);
        // At this stage the state is: "[2]...[0,1]...[]" 

    }
    
    return moveDisks(initState(nDisks), TowerName.A, TowerName.C, TowerName.B, nDisks);
    
}

// console.log(initTowers(3));
console.log(moveDisk(initState(3), 0, 1));
console.log(solve(initState(3)));
// console.log(pretty(solve(3)));
