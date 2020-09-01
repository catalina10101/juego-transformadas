let game;
let model;
let emitter;
let G;
let controller;
let currScene;
window.onload = function (){

    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

    if (isMobile == -1){//not mobile
        var config = {
            type: Phaser.AUTO, //graphics_mode: Canvas, WebGL, AUTO 
            width: 1280, //window.innerWidth*0.9, //480,
            height: 860, //window.innerHeight*0.9, //640,
            backgroundColor: 0xffffff,  //'0xCD7FF3' (purple),
            parent: 'emoticones-game', //id of element where you want to load the game in the html.
            scene: [SceneLoad, SceneTitle, SceneMain, SceneOver] //[nameOfScene]  class name not file name.
        };
    }
    else {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            parent: 'emoticones-game',
            scene: [SceneLoad, SceneTitle, SceneMain, SceneOver]
        };
    }
   
    model = new Model();
    model.isMobile = isMobile != -1; //true;
    let parentDiv = document.querySelector('#emoticones-game'); //$('#emoticones-game'); 
    if(parentDiv != null){
        game = new Phaser.Game(config);
        G = new Constants();
    }
}