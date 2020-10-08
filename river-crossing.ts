/**
 * River cross   ************* WORK IN PROGRESS *******************
 */
enum Cargo { Farmer = 'FA', Fox = 'FX', Goose = 'GO', Grain = 'GR' }

enum Bank { Left, Right }

const makeStateKey = (state: State) => `${state.location[Bank.Left].sort()}_${state.location[Bank.Right].sort()}`;

const ILLEGAL = {
  [makeStateKey({ location: [[Cargo.Fox, Cargo.Goose], [Cargo.Farmer, Cargo.Grain]], boat: Bank.Right })]: true,
  [makeStateKey({ location: [[Cargo.Fox, Cargo.Goose, Cargo.Grain], [Cargo.Farmer]], boat: Bank.Right })]: true,
  [makeStateKey({ location: [[Cargo.Goose, Cargo.Grain], [Cargo.Farmer, Cargo.Fox]], boat: Bank.Right })]: true,
};


interface State {
  location: Cargo[][]; // who is where, by side
  boat: Bank; // Which side is the boat (& the farmer)
}

type Visited = { [key: string]: boolean };

const START_STATE: State = {
  location: [/* left */[Cargo.Farmer, Cargo.Fox, Cargo.Goose, Cargo.Grain], /* right */[]],
  boat: Bank.Left
}

const pretty = (state: State) => `${state.location[Bank.Left]}_${state.location[Bank.Right]}`

const otherSide = (side: Bank) => side === Bank.Left ? Bank.Right : Bank.Left;

const cloneState = (state: State) => {
  const newState = { ...state };
  newState.location = state.location.map(x => [...x]); // deepCopy
  return newState;
}

const isIllegal = (state: State): boolean => ILLEGAL[makeStateKey(state)];

const leftBehind = (state: State, x: Cargo) => state.location[state.boat].filter(y => y !== x && y !== Cargo.Farmer);

/**
 * Moves and returns the new state
 */
const crossRiver = (state: State, cargoList: Cargo[]): State => {
  const newSide = otherSide(state.boat);
  const newState = cloneState(state);
  newState.boat = newSide;
  newState.location[newSide] = newState.location[newSide].concat(...cargoList).sort(); // add
  newState.location[state.boat] = newState.location[state.boat].filter(x => !cargoList.includes(x)).sort(); // subtract
  return newState;
}

const hasVisited = (state: State, visited: Visited) => visited[makeStateKey(state)] !== undefined;

/**
 * Reducer to get passenger combos, e.g. [[Farmer], [Farmer, Goose]]
 * that would leave those not in the boat (left behind) in a legal state.
 * 
 * @param state The current state
 * @param visited Hash map of states already visited states
 */
const nextStates = (state: State, visited: Visited): State[] => {
  // const reducer = (accum: State[], x: State) => {
  //   const newAccum = !isIllegal(state) // && !visited[makeKey(lb)]
  //     ? [...accum, x === Cargo.Farmer ? [x] : [Cargo.Farmer, x]]
  //     : accum;
  //   // console.log(`combo: [${x}], behind: ${leftBehind}, legal?: ${isLegal(leftBehind)} -> newAcc: ${newAccum}`);
  //   return newAccum;
  // };

  return state
    .location[state.boat] // -> the cargo on a particular bank
    .map(x => crossRiver(state, x === Cargo.Farmer ? [x] : [Cargo.Farmer, x])) // All states after crossing with farmer
    .filter(s => !isIllegal(s) && !hasVisited(s, visited))
}

/**
 * DFS search of paths to move everyone to the right bank of the river.
 */
const search = (initState: State, maxDepth: number) => {
  // Helper function for recursive calls
  const searchHelper = (state: State, depth: number, visited: Visited = {}) => {
    if (depth > maxDepth) return;

    // Moved everthing to the right?
    if (state.location[Bank.Left].length === 0) return;

    const branches = nextStates(state, visited);
    console.log(`[SEARCH] Depth: ${depth}, Q:`, branches.map(x=> pretty(x)));

    branches.forEach(branch => {
      visited[makeStateKey(branch)] = true;

      console.log(`> Cross(${branch})`);
      console.log(`....NewState: ${pretty(branch)}`);
      console.log(`.... Visited: `, visited);
      
      // Recurse
      searchHelper(branch, depth + 1, visited);
    });
  }

  searchHelper(initState, 0, { [makeStateKey(initState)]: true });
}

/**
 * TESTS
 */
console.log('[TEST] Illegal lookup', ILLEGAL['FX,GO,GR_FA'] ? 'Passed' : 'Failed');

const afterCrossings = crossRiver(
  crossRiver(START_STATE, [Cargo.Farmer, Cargo.Goose]), 
    [Cargo.Farmer]);

console.log('[TEST] crossing',
  pretty(afterCrossings)
    === 'FA,FX,GR_GO'
    ? 'Passed'
    : 'Failed');

// // console.log('LegalCombos', legalPassengerCombos(START_STATE));

// search(START_STATE, 2); // Set MAX_DEPTH to avoid infinite recursion
