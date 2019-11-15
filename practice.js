//'normal array'
const tilesOutOfPlace = require('./tilesOutOfPlace');

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class State {
    constructor(n) {
        this.board = n;
        this.star = tilesOutOfPlace.calc(this.board)
    }
}

const swapTile = (n, x, y) => {
    let hole = findHole(n)
    let holex = hole.x
    let holey = hole.y
    let next = [...n];
    next[holex][holey] = next[x][y]
    next[x][y] = 0
    //printer(next)
    return next;
}

let findHole = (n) => {
    let x, y;
    for (let i = 0; i < 3; ++i){
        for (let j = 0; j < 3; ++j){
            if (n[i][j] === 0) {
                x = i;
                y = j;
                break;
            }
        }
    }
    return {x,y}
}

const children = (n, d) => {
    let hole = findHole(n)
    let x = hole.x
    let y = hole.y
    let up = new Coordinate(x, y-1)
    let down = new Coordinate(x, y+1)
    let left = new Coordinate(x - 1, y)
    let right = new Coordinate(x + 1, y)
    
    let swap = []
    let options = [up, down, left, right]
    for (opt of options) {
        if (opt.x >= 0) {
            if (opt.x <= 2) {
                if (opt.y >= 0) {
                    if (opt.y <= 2) {
                        swap.push(opt);
                    }
                }
            }
        }
    }
    let actual = []
    for (test of swap) {
        const newArray = n.map(a => ({...a}));
        let cur = swapTile(newArray, test.x, test.y)
        actual.push(new State(cur))
    }
    return actual
}


const printer = (n) => {
    console.log(n[0][0] + " | " + n[0][1] + " | " + n[0][2])
    console.log("--+---+--")
    console.log(n[1][0] + " | " + n[1][1] + " | " + n[1][2])
    console.log("--+---+--")
    console.log(n[2][0] + " | " + n[2][1] + " | " + n[2][2])
    console.log()
    console.log()
}

const sample = [[1, 8, 2], [0, 4, 3], [7, 6, 5]]
const goal = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]

const visited = []

const valid = (n) => {
    for (v of visited) {
        if (n === v) {
            return false;
        }
    }
    return true;
}

const runner = () => {
    let queue = []
    queue.push(new State(sample))
    while (queue.length > 0) {
        queue = queue.sort((a, b) => {
            return b.star - a.star
        })
        let next = queue.pop();
        let board = next.board;
        console.log(next.star)
        if (next.star == 0) {
            console.log("END")
            break;
        }
        if (valid(board)) {
            for (chil of children(board)) {
                if (valid(chil.board)) {
                    queue.push(chil)
                }
            }
        }
        visited.push(board)
    }
    console.log("printed")
}

runner();
console.log('after');