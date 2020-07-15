let game;
let model;
let emitter;
let G;
let controller;
window.onload = function (){

    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

    if (isMobile == -1){//not mobile
        var config = {
            type: Phaser.AUTO, //graphics_mode: Canvas, WebGL, AUTO 
            width: window.innerWidth, //480,
            height: window.innerHeight, //640,
            backgroundColor: '0xCD7FF3',
            parent: 'phaser-game', //id of element where you want to load the game in the html.
            //scene: [SceneLoad, SceneTitle, SceneMain, SceneOver] //[nameOfScene]  class name not file name.
            scene: [SceneLoad, SceneMain, SceneOver]
        };
    }
    else {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [SceneLoad, SceneTitle, SceneMain, SceneOver]
        };
    }
   
    model = new Model();
    model.isMobile = isMobile;
    game = new Phaser.Game(config);
    G = new Constants();
}