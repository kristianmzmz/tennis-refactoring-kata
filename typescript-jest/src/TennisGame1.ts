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
        let score: string = '';
        let tempScore: number = 0;
        if (this.havePlayersSameScore()) {
            return this.sameScoresResult();
        }

        if (this.hasOneOfThePlayerAdvantage()) {
            const minusResult: number = this.currentScorePlayer1 - this.currentScorePlayer2;
            if (this.hasOnePlayerOnePointMoreThanTheOther(minusResult)) {
                return this.playerWithAdvantage(minusResult);
            }

            return this.playerWinner(minusResult);
        }

        for (let i = 1; i < 3; i++) {
            if (i === 1) tempScore = this.currentScorePlayer1;
            else {
                score += '-';
                tempScore = this.currentScorePlayer2;
            }
            switch (tempScore) {
                case 0:
                    score += 'Love';
                    break;
                case 1:
                    score += 'Fifteen';
                    break;
                case 2:
                    score += 'Thirty';
                    break;
                case 3:
                    score += 'Forty';
                    break;
            }
        }
        return score;
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
