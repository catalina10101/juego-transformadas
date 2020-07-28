class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad'); //same as class name 
    }
    preload(){
        this.bar = new Bar({scene: this, x:game.config.width/2, y:game.config.height/2});
        this.progText = this.add.text(game.config.width/2,game.config.height/2, "0%", {color:'#ffffff', fontSize: game.config.width/20} );
        this.progText.setOrigin(0.5,0.5);
        this.load.on('progress', this.onProgress, this);
        
        this.load.image("title", "images/title-blue.png");
        this.load.image("fondo", "images/fondo.png");
        this.load.image("emoticon1", "images/emoticon1.jpg");
        this.load.image("emoticon2", "images/emoticon2.jpg");
        this.load.image("emoticon3", "images/emoticon3.jpg");
        this.load.image("emoticon4", "images/emoticon4.jpg");
        this.load.image("emoticon5", "images/emoticon5.jpg");
        this.load.image("emoticon6", "images/emoticon6.jpg");
        this.load.image("player1", "images/player1.jpg");
        this.load.image("player2", "images/player22.jpg");
        //card's images
        this.load.image("arrowX", "images/arrowX.png");
        this.load.image("arrowY", "images/arrowY.png");
        this.load.image("mirrorX", "images/mirrorX.png");
        this.load.image("mirrorY", "images/mirrorY.png");
        this.load.image("angle", "images/angle.png");

        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("button2", "images/ui/buttons/2/2.png");
        this.load.audio('memeAtrapado', ["audio/memeAtrapado.mp3","audio/memeAtrapado.ogg"]);
        this.load.audio('backgroundMusic', ["audio/Greeting_the_Day_with_a_Smile.mp3","audio/Greeting_the_Day_with_a_Smile.ogg"]);

        this.load.image('toggleBack', "images/ui/toggles/1.png");
        this.load.image('sfxOff', "images/ui/icons/sfx_off.png");
        this.load.image('sfxOn', "images/ui/icons/sfx_on.png");
        this.load.image('musicOn', "images/ui/icons/music_on.png");
        this.load.image('musicOff', "images/ui/icons/music_off.png");
    }
    create(){
        this.scene.start("SceneTitle");
        //this.scene.start("SceneOver");// SceneOver SceneMain
    }

    onProgress(value){
        //console.log(value);
        this.bar.setPercent(value);
        let per = Math.floor(value*100);
        this.progText.setText(per + "%");
    }
}