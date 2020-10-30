/**
 * TOWERS OF HANOI
 * 
 * Goal: Move disks from Tower A to Tower C with the help of spare Tower B.
 * 
 *    -       |       |  
 *   ---      |       |
 *  ------    |       |
 *    A       B       C
 * 
 * Approach: Recursion
 */

enum Tower { A = 0, B = 1, C = 2 };
type Disks = number[]; // Containing disk numbers. Disk 5 > Disk 4
type State = Disks[];

const range = (n: number) => [...Array(n).keys()];

const pretty = (towers: State): string => towers.map(t => `[${t.join(' ')}]`).join('...');

/**
 * Moves the top disk to the dest tower
 */
const moveTop = (state: State, from: Tower, to: Tower): State => {
    const clone = state.map(x => [...x])
    const popped = clone[from].splice(0, 1);
    clone[to] = [...popped, ...clone[to]];
    return clone;
}

/**
 * Initial state with all disks on Tower 0, e.g. [0,1,2],[],[]
 */
const initState = (nDisks: number): State => [range(nDisks), [], []];

/**
 * The solver
 * 
 * Step 1: Move all but the largest to Spare
 *    A       B      C
 * 
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
const solve = (nDisks: number): State => {
    /**
     * Recursive func to move all disks to destination that are <= largestDisk
     * The call tree for N = 2 (where s is state) looks like this:
     *
     *              ----------    move(s, A, B, C, 2) --------
     *              |                                         |   
     * STEP 1: Src-> Spare                           STEP 3: Spare -> Dest
     *   move(s, A, B, C, 1)                              move(s, A, C, B, 1)
     *     move(s, A, B, C, 0)                              move(s, A, C, B, 0)
     *        moveTop(s, A, B)                                 moveTop(s, A, C)
     */
    const move = (
        state: State,
        from: Tower,
        to: Tower,
        spare: Tower,
        largest: number, // Move disks >= largest disk
        recurDepth: number = 0): State => {

        console.log(`[Depth ${recurDepth}] move(${Tower[from]}->${Tower[to]}, ${largest})`);

        // Base cond: move smallest to destination
        if (largest === 0) {
            return moveTop(state, from, to);
        }

        // 1. Move all but the largest: source -> spare. This is Step 1 in the func comments.
        const state1 = move(state, from, spare, to, largest - 1, recurDepth + 1);
        console.log(`[Depth ${recurDepth}]    After step 1:  src -> spare: ${pretty(state1)}`);
        // At this stage the state when nDisk = 3 should be: [2], [0, 1], []

        // 2. Move largest to destination
        const state2 = moveTop(state1, from, to);
        console.log(`[Depth ${recurDepth}]    After step 2: lrgst -> dest: ${pretty(state2)}`);

        // 3. Move spare to destination
        const state3 = move(state2, spare, to, from, largest - 1, recurDepth + 1);
        console.log(`[Depth ${recurDepth}]    After step 3: spare -> dest: ${pretty(state3)}`);

        return state3;
    }

    return move(initState(nDisks), Tower.A, Tower.C, Tower.B, nDisks);

}

// console.log(initTowers(3));
console.log(moveTop(initState(3), 0, 1));
console.log(`FINAL: ${pretty(solve(3))}`);
