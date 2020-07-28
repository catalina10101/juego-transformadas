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
        this.TWEEN_TIME = 1000;
        this.POINTS_TO_WIN = 3;
        this.COLOR_1_0x = 0x00FFFF;//aguamarina
        this.COLOR_2_0x = 0x8000FF;
        this.COLOR_2 = "#8000FF";//morado
    }
}