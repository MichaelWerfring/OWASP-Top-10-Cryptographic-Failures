class Game{
    public readonly gameId: string;
    private board: string[] = ["", "", "", "", "", "", "", "", ""];
    private turn: string = "X";
    constructor() {    
        this.gameId = Math.random().toString(36).substr(2, 9);
    }

    public makeMove(gameId:string, index:number, turn:string) {
        
        if (this.gameId != gameId || turn != this.turn) {
            return;
        }

        if (index < 0 || index > 8) {
            return;
        }

        this.board[index] = turn;
        this.turn = this.turn === "X" ? "O" : "X";
    }

    public getGame(gameId:string) {
        if (this.gameId != gameId) {
            return;
        }

        return {
            gameId: this.gameId,
            board: this.board,
            turn: this.turn,
            winner: this.getWinner()
        };
    }

    public getWinner(){
        const winConditions: number[][] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }

        if (this.board.every(cell => cell !== '')) {
            return "Draw";
        }

        return "";
    }
}