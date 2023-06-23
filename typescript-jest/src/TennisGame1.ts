import {TennisGame} from './TennisGame';

const PLAYER_ONE = 'player1';

export class TennisGame1 implements TennisGame {
    private currentScorePlayer1: number = 0;
    private currentScorePlayer2: number = 0;

    constructor() {
    }

    wonPoint(playerName: string): void {
        if (this.isPlayerOne(playerName))
            this.currentScorePlayer1 += 1;
        else
            this.currentScorePlayer2 += 1;
    }

    private isPlayerOne(playerName: string) {
        return playerName === PLAYER_ONE;
    }

    getScore(): string {
        if (this.havePlayersSameScore()) {
            return this.sameScoresResult();
        }

        if (this.hasOneOfThePlayerAdvantage()) {
            const pointsDifference: number = this.currentScorePlayer1 - this.currentScorePlayer2;
            if (this.hasOnePlayerOnePointMoreThanTheOther(pointsDifference)) {
                return this.playerWithAdvantage(pointsDifference);
            }

            return this.playerWinner(pointsDifference);
        }

        return `${this.playerScore(this.currentScorePlayer1)}-${this.playerScore(this.currentScorePlayer2)}`;
    }

    private playerScore(tempScore: number) {
        switch (tempScore) {
            case 0:
                return 'Love';
            case 1:
                return 'Fifteen';
            case 2:
                return 'Thirty';
            default:
                return 'Forty';
        }
    }

    private playerWinner(minusResult: number) {
        if (minusResult >= 2) {
            return 'Win for player1';
        }
        return 'Win for player2';
    }

    private playerWithAdvantage(minusResult: number) {
        if (minusResult === 1) {
            return 'Advantage player1';
        }

        return 'Advantage player2';
    }

    private hasOnePlayerOnePointMoreThanTheOther(minusResult: number) {
        return minusResult === 1 || minusResult === -1;
    }

    private hasOneOfThePlayerAdvantage() {
        return this.currentScorePlayer1 >= 4 || this.currentScorePlayer2 >= 4;
    }

    private sameScoresResult() {
        switch (this.currentScorePlayer1) {
            case 0:
                return 'Love-All';
            case 1:
                return 'Fifteen-All';
            case 2:
                return 'Thirty-All';
            default:
                return 'Deuce';
        }
    }

    private havePlayersSameScore() {
        return this.currentScorePlayer1 === this.currentScorePlayer2;
    }
}
