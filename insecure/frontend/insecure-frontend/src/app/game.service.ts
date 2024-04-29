import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

interface MoveResponse {
    success: boolean;
    message: string;
}

interface BoardResponse {
    board: string[];
}

@Injectable()
class GameService {
    private serverUrl: string;

    constructor() {
        this.serverUrl = 'http://localhost:3000';
    }

    async startGame(): Promise<string | null> {
        try {
            const response: AxiosResponse = await axios.post(`${this.serverUrl}/start`);
            if (response.status === 200) {
                return response.data.game_id;
            } else {
                console.error("Failed to start a new game.");
                return null;
            }
        } catch (error) {
            console.error(`Error starting a new game: ${error}`);
            return null;
        }
    }

    async makeMove(gameId: string, player: string, position: number): Promise<[boolean, string]> {
        try {
            const payload = { game_id: gameId, player, position };
            const response: AxiosResponse<MoveResponse> = await axios.post(`${this.serverUrl}/move`, payload);
            if (response.status === 200) {
                return [true, response.data.message];
            } else {
                return [false, "Failed to make a move."];
            }
        } catch (error) {
            console.error(`Error making a move: ${error}`);
            return [false, "Failed to make a move due to an error."];
        }
    }

    async getBoard(gameId: string): Promise<string[] | null> {
        try {
            const response: AxiosResponse<BoardResponse> = await axios.get(`${this.serverUrl}/board/${gameId}`);
            if (response.status === 200) {
                return response.data.board;
            } else {
                console.error("Failed to retrieve the game board.");
                return null;
            }
        } catch (error) {
            console.error(`Error retrieving the game board: ${error}`);
            return null;
        }
    }
}

export default GameService;
