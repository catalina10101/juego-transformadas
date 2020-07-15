class Constants
{
    constructor(){
        this.SET_SCORE = "setScore";
        this.UP_POINTS = "upPoints";
        this.SCORE_UPDATED = "scoreUpdated";
        this.PLAY_SOUND = "playSound";
        this.MUSIC_CHANGED = "musicChanged";
        this.TOGGLE_SOUND = "toggleSound";
        this.TOGGLE_MUSIC = "toggleMusic";
        this.GRID_COLS = 10;//must be pair
        this.CARD_WIDTH = game.config.width/12;
        this.CARD_HEIGHT = this.CARD_WIDTH*1.3;
        this.TWEEN_TIME = 2000;
    }
}