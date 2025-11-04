//הגדרת משתנים
let table
let alltd = []
const pieceTypes = ["1", "2", "3", "4", "5", "6", "7"]
const player = {
    pos: { row: 0, column: 0, type: null },
    matrix: null,
}
let arrColor = ['red', 'green', 'blue', 'orange', 'pink', 'white', 'purple']
let shape
let interval
let gameStarted = false
let score
let ft = 0
//game overהסתרת ה
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("gameover").style.display = "none"

})
//מציאת הניקוד הגבוה שנעשה עד כה והופעתו על המסך
let ct = 0
let maxScore1
maxScore1 = +localStorage.getItem('maxscore', maxScore1) || 0
localStorage.setItem('maxscore', maxScore1)
let maxscoreloc = document.getElementById('maxscore')
maxscoreloc.innerText = maxScore1

//שליפת שם המשתמש הנוכחי והופעתו על המסך
function updatePlayerName() {
    let nameUser = JSON.parse(localStorage.getItem('currentUser'));
    if (nameUser) {
        let h3 = document.createElement('h3')
        h3.id = 'location'
        h3.innerText += nameUser
        let loc = document.getElementById('location')
        loc.append(h3)
        h3.style.color = 'pink'
        h3.style.fontSize = 'xx-large'
        h3.style.display = 'block'
    }
   // שליחה להתחלת המשחק
    board()
}

//פונקציה ליצירת הלוח
function board() {

    table = document.createElement('table')
    document.body.append(table);

    for (let index = 0; index < 22; index++) {
        let tr = document.createElement('tr')
        table.append(tr)

        for (let j = 0; j < 14; j++) {
            let td = document.createElement('td')
            td.setAttribute('id', index + "_" + j)
            td.setAttribute('data-no', 1)

            tr.append(td)
        }
        alltd.push(tr.getElementsByTagName('td'))
    }
    table.style.width = '30%'
    table.style.height = '100%'
    table.style.borderCollapse = 'collapse'

}

// פונקציה הנעשת כאשר השחקן לוחץ על התחלת משחק
function startGame() {
    if (!gameStarted) {
        gameStarted = true
        //שולחת לפונקציה הלהופעת הצורות על הלוח
        PieceOnBoard()
    }
}

// פונקציה שגורמת להופעת הצורות על הלוח עי הגרלה 
// setInterval ועי שליחה לפונקציה שיוצרת את הצורות וכן מפעילה את פונקציית 
function PieceOnBoard() {
    let type = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
    player.pos.type = type
    shape = createPiece(type)
    player.pos.row = 0
    player.pos.column = Math.floor((14 - shape[0].length) / 2)
    if (!NextPosition(shape, player.pos.row, player.pos.column)) {
        document.getElementById("gameover").style.display = "block";
        document.getElementById("gameover").style.opacity = "1";


        score = document.getElementById("currentScore").innerText
        if (score > maxScore1)
            maxScore1 = score
        localStorage.setItem('maxscore', maxScore1)
    }
    interval = setInterval(() => {
        //שולחת לפונקציה שמורידה את השורות למטה
        go(shape, type);
    }, 500);
}

//פונקציה של מטריצות הצורות 
function createPiece(type) {
    switch (type) {
        case "1":
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ];
        case "2":
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2]
            ];
        case "3":
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0]
            ];
        case "4":
            return [
                [4, 4],
                [4, 4]
            ];
        case "5":
            return [
                [5, 5, 0],
                [0, 5, 5]
            ];
        case "6":
            return [
                [0, 6, 6],
                [6, 6, 0]
            ];
        case "7":
            return [
                [0, 7, 0],
                [7, 7, 7]
            ];
        default:
            return [];
    }
}

//פונקציה שמורידה את הצורות למטה עי שליחה 
function go(shape, type) {
    ct++;

    if (ct > 500 && ft == 0) {
        alert('!!חבר? התמכרת');
        ft++;
    }
    if (NextPosition(shape, player.pos.row + 1, player.pos.column)) {
        clearBoard();
        player.pos.row++;
        drawPiece(shape, player.pos.row, player.pos.column, type);
    } else {
        placePiece(shape, player.pos.row, player.pos.column, type);
        clearInterval(interval);
        if (player.pos.row === 0) {
            document.getElementById('gameover').style.display = 'block';
            score = document.getElementById("currentScore").innerText;
            if (score > maxScore1) {
                maxScore1 = score;
            }
            localStorage.setItem('maxscore', maxScore1);
            gameStarted = false;
            return;
        }
        checkFullRows();
        PieceOnBoard();
    }
}



//פונקציה הצובעת את המיקומים במטריצה
function drawPiece(shape, row, col, type) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] !== 0) {
                let newRow = row + i
                let newCol = col + j
                alltd[newRow][newCol].style.backgroundColor = arrColor[type - 1];
            }
        }
    }
}

function clearBoard() {
    for (let i = 0; i < alltd.length; i++) {
        for (let j = 0; j < alltd[i].length; j++) {
            if (alltd[i][j].getAttribute('data-no') == 1) {
                alltd[i][j].style.backgroundColor = ''
            }
        }
    }
}



function placePiece(shape, row, col, type) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] !== 0) {
                let newRow = row + i;
                let newCol = col + j;
                alltd[newRow][newCol].setAttribute('data-no', 0);
                alltd[newRow][newCol].style.backgroundColor = arrColor[type - 1];
            }
        }
    }
}

//פונקציה הבודקת אםיש שורות מלאות ואם כן מוחקת אותם
function checkFullRows() {
    let fullRows = [];
    for (let i = 0; i < alltd.length; i++) {
        let rowFull = true;
        for (let j = 0; j < alltd[i].length; j++) {
            if (alltd[i][j].getAttribute('data-no') == 1) {
                rowFull = false;
                break;
            }
        }
        if (rowFull) {
            fullRows.push(i);
        }

        // עכשיו נבדוק אם יש שורות מלאות ונמחק אותן
        if (fullRows.length > 0) {
            for (let i = fullRows.length - 1; i >= 0; i--) {
                let rowIndex = fullRows[i];
                // מחק את השורה מה־DOM
                table.deleteRow(rowIndex)
                document.getElementById("currentScore").innerText =
                    +(document.getElementById("currentScore").innerText) + 100
                // הוסף שורה חדשה בראש הטבלה
                let tr = document.createElement('tr')
                table.insertBefore(tr, table.firstChild)
                // צור שורה חדשה במערך ה־alltd
                let newTdRow = []
                for (let j = 0; j < 14; j++) {
                    let td = document.createElement('td')
                    td.setAttribute('id', (rowIndex + j) + "_" + j)
                    td.setAttribute('data-no', 1);
                    tr.append(td)
                    newTdRow.push(td)
                }
                alltd.splice(rowIndex, 1)
                alltd.unshift(newTdRow)
            }
        }
    }
}

//
function NextPosition(shape, row, col) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] != 0) {
                let newRow = row + i
                let newCol = col + j
                if (
                    newRow >= 22 ||
                    newCol < 0 ||
                    newCol >= 14 ||
                    alltd[newRow][newCol].getAttribute('data-no') == 0
                ) {
                    return false
                }
            }
        }
    }
    return true
}

//פונקציה שעוצרת את הצורה על הלוח כאשר לוחצים על כפתור העצירה
function stopGame() {
 clearInterval(interval)

}




//כאשר מתרחש ארוע לחיצה על החיצים
document.addEventListener('keydown', function (event) {
    if (event.key == 'ArrowLeft') {
        movePieceLeft()
    } else if (event.key === 'ArrowRight') {
        movePieceRight()
    } else if (event.key === 'ArrowDown') {
        movePieceDown()
    } else if (event.key === 'ArrowUp') {
        rotatePiece()
    }
})

//פונקציה שמורידה את הצורה למטה עי שהשחקן לוחץ על החץ התחתון
function movePieceDown() {
    if (NextPosition(shape, player.pos.row + 1, player.pos.column)) {
        clearBoard();
        player.pos.row++;
        drawPiece(shape, player.pos.row, player.pos.column, player.pos.type);
    } else {
        go(shape, player.pos.type);
    }
}

//הוזזת הצורה לצד שמאל
function movePieceLeft() {
    if (NextPosition(shape, player.pos.row, player.pos.column - 1)) {
        clearBoard()
        player.pos.column--
        drawPiece(shape, player.pos.row, player.pos.column, player.pos.type)
    }
}
//הוזזת הצורה לצד ימין
function movePieceRight() {
    if (NextPosition(shape, player.pos.row, player.pos.column + 1)) {
        clearBoard()
        player.pos.column++
        drawPiece(shape, player.pos.row, player.pos.column, player.pos.type)
    }
}


//הפיכת צורות
function rotatePiece() {
    let rotatedShape = rotateMatrix(shape)
    if (NextPosition(rotatedShape, player.pos.row, player.pos.column)) {
        clearBoard()
        shape = rotatedShape
        drawPiece(shape, player.pos.row, player.pos.column, player.pos.type)
    }
}

function rotateMatrix(matrix) {
    const result = []
    for (let i = 0; i < matrix[0].length; i++) {
        result.push([])
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            result[j][matrix.length - 1 - i] = matrix[i][j]
        }
    }
    return result
}
