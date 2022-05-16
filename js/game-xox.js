class Game 
{
    constructor(document) {
        this.document = document
        this.turn = "X"
        this.score = {
            x: 0,
            o: 0
        }
        this.winTable = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        this.board = new Array(9).fill(null)
        
        this.document.querySelectorAll('.xoxSquare').forEach(xoxSquare => {
            xoxSquare.addEventListener('click', () => {
                    this.move(xoxSquare)
            })
        });

        this.TurnToScreen()
        console.info('Game Loaded!')
    }

    nextTurn() {
        this.turn = this.turn === 'X' ? 'O' : 'X'
        this.TurnToScreen()
    }

    move(xoxSquare) {
        if (this.board[xoxSquare.dataset.i] === null) {
            this.board[xoxSquare.dataset.i] = this.turn
            this.drawBoard()
            this.checkWinner()
        }
    }

    drawBoard() {
        this.board.forEach((value, i) => {
            this.document.querySelector(`.xoxSquare[data-i="${i}"]`).innerText = value
        })
    }

    TurnToScreen() {
        this.document.getElementById('turn').innerText = this.turn
    }

    ScoreToScreen() {
        this.document.querySelector('.score').innerText = `${this.score.x} - ${this.score.o}`
    }

    checkWinner() {
        let winner = null

        this.winTable.forEach((combination) => {
            const [c1, c2, c3] = combination
            if (this.board[c1] === 'X' && this.board[c2] === 'X' && this.board[c3] === 'X'){
                winner = 'x'
            } else if (this.board[c1] === 'O' && this.board[c2] === 'O' && this.board[c3] === 'O'){
                winner = 'o'
            }
        })
        if (winner) {
            this.score[winner]++
            this.ScoreToScreen()
            alert(`!! Tur Kazananı : ${winner.toUpperCase()} !!`)
            this.restartGame()
        } else {
            this.checkDraw()
        }
    }

    checkDraw() {
        if (!this.board.includes(null)) {
            alert(`Berabere!..`)
            this.restartGame()
        } else {
            this.nextTurn()
        }
    }

    restartGame() {
        this.board = new Array(9).fill(null)
        this.turn = "X"
        this.TurnToScreen()
        this.drawBoard()
    }

}
let game = new Game(document)