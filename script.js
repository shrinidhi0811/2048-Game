var board;
var score = 0;
var rows = 4;
var columns = 4;

// onload is the event handler property that listens to the event "load"
// once load is done, onload gets triggered
// it checks if we have specified any functions for the sam
// if yes, it performs the function
// if not, nothing is done
window.onload = function () {
    setGame ();
}

function setGame () {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // this loop creates a div tile like <div id="0-0"></div>
            let tile = document.createElement ("div");
            tile.id = r.toString () + "-" + c.toString ();
            let num = board [r][c];
            updateTile (tile, num);
            document.getElementById ("board").appendChild (tile);
        }
    }

    setTwo ();
    setTwo ();
}

function hasEmptyTile () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board [r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo () {
    if (!hasEmptyTile ()) {
        return;
    }

    let found = false;
    while (!found) {
        // random r, c value
        // Math.random () gives a value between 0 and 1
        let r = Math.floor (Math.random () * rows);
        let c = Math.floor (Math.random () * columns);

        if (board [r][c] == 0) {
            board [r][c] = 2;
            let tile = document.getElementById (r.toString () + "-" + c.toString ());
            tile.innerText = "2";
            tile.classList.add ("x2");
            found = true;
        }
    }
}

function updateTile (tile, num) {
    tile.innerText = ""; // clear the text in the tile
    tile.classList.value = ""; // clear the tile classlist like "tile x2 x4 x8"
    tile.classList.add ("tile");

    if (num > 0) {
        tile.innerText = num;
        if (num <= 1024) {
            tile.classList.add ("x" + num.toString ());
        }
        else {
            tile.classList.add ("x4096");
        }
    }
}

// GAME FUNCTIONALITY BEGINS HERE
function filterZero (row) {
    // creates a new array without zeros
    return row.filter (num => num != 0);
}

function slide (row) {
    // [0, 2, 2, 2]
    row = filterZero (row); // [2, 2, 2]
    
    // slide
    for (let i = 0; i < row.length - 1; i++) {
        //check every 2
        if (row [i] == row [i + 1]) {
            row  [i] *= 2;
            row [i + 1] = 0;
            score += row [i];
        }
    } // [4, 0, 2]

    row = filterZero (row); // [4, 2]
    while (row.length < columns) {
        row.push (0);
    } // [4, 2, 0, 0]

    return row;
}

function slideLeft() {
    // applies to the javascript part
    for (let r = 0; r < rows; r++) {
        let row = board [r];
        row = slide (row);
        board [r] = row;
    }

    // update in the html after modifications
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById (r.toString () + "-" + c.toString ());
            let num = board [r][c];
            updateTile (tile, num);
        }
    }
}

// when the array is reversed and slid left and reversed back
function slideRight() {
    // applies to the javascript part
    for (let r = 0; r < rows; r++) {
        let row = board [r];
        row.reverse ();
        row = slide (row);
        row.reverse ();
        board [r] = row;
    }

    // update in the html after modifications
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById (r.toString () + "-" + c.toString ());
            let num = board [r][c];
            updateTile (tile, num);
        }
    }
}

function slideUp () {
    for (let c = 0; c < columns; c++) {
        let row = [board [0][c], board [1][c], board [2][c], board [3][c]];
        row = slide (row);
        board [0][c] = row [0];
        board [1][c] = row [1];
        board [2][c] = row [2];
        board [3][c] = row [3];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = document.getElementById (r.toString () + "-" + c.toString ());
                let num = board [r][c];
                updateTile (tile, num);
            }
        }
    }
}

function slideDown () {
    for (let c = 0; c < columns; c++) {
        let row = [board [0][c], board [1][c], board [2][c], board [3][c]];
        row.reverse ();
        row = slide (row);
        row.reverse ();
        board [0][c] = row [0];
        board [1][c] = row [1];
        board [2][c] = row [2];
        board [3][c] = row [3];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = document.getElementById (r.toString () + "-" + c.toString ());
                let num = board [r][c];
                updateTile (tile, num);
            }
        }
    }
}

// keyup denotes that the functionality is applied after the up arrow is pressed and released
document.addEventListener ("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft ();
        setTwo ();
    }
    else if (e.code == "ArrowRight") {
        slideRight ();
        setTwo ();
    }
    else if (e.code == "ArrowUp") {
        slideUp ();
        setTwo ();
    }
    else if (e.code == "ArrowDown") {
        slideDown ();
        setTwo ();
    }
    document.getElementById ("score").innerText = score;
})