//model controller

class Model{
    constructor(){
        this._scores = [];
        this.winner = null;
        this.soundOn = true;
        this._musicOn = false;
    }

    set musicOn(val){
        this._musicOn = val;
        emitter.emit(G.MUSIC_CHANGED);
    }

    get musicOn(){
        return this._musicOn;
    }

    setPlayerScore(playerIdx, newScore){
        this._scores[playerIdx] = newScore;
        if(newScore == G.POINTS_TO_WIN)
            this.winner = playerIdx;
        emitter.emit(G.SCORE_UPDATED);
    }

    getPlayerScore(playerIdx){
        return this._scores[playerIdx];
    }

    // set scorePlayer1(val){
    //     this._scorePlayer1 = val;
    //     emitter.emit(G.SCORE_UPDATED, {player:1});
    // }

    // get scorePlayer1(){
    //     return this._scorePlayer1;
    // }

    // set scorePlayer2(val){
    //     this._scorePlayer2 = val;
    //     emitter.emit(G.SCORE_UPDATED, {player:2});
    // }

    // get scorePlayer2(){
    //     return this._scorePlayer2;
    // }
}
