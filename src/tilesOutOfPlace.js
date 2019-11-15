const tilesOutOfPlace = (n) => {
    const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    let count = 0;
    for (let i = 0; i < 3; ++i){
        for (let j = 0; j < 3; ++j){
            if (n[i][j] !== arr[i][j] && arr[i][j] !== 0) {
                count++;
            }
        }
    }
    return count;
}

module.exports = {
    calc: tilesOutOfPlace
}