class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad'); //same as class name 
    }
    preload(){
        this.bar = new Bar({scene: this, x:game.config.width/2, y:game.config.height/2});
        this.progText = this.add.text(game.config.width/2,game.config.height/2, "0%", {color:'#ffffff', fontSize: game.config.width/20} );
        this.progText.setOrigin(0.5,0.5);
        this.load.on('progress', this.onProgress, this);
        
        let pluginPath = ""; //wpa_data.plugin_path;
        this.load.image("title",  pluginPath+ "images/title-blue.png");
        this.load.image("fondo",  pluginPath+"images/fondo.png");
        this.load.image("emoticon1",  pluginPath+"images/emoticon1.jpg");
        this.load.image("emoticon2",  pluginPath+"images/emoticon2.jpg");
        this.load.image("emoticon3",  pluginPath+"images/emoticon3.jpg");
        this.load.image("player1",  pluginPath+"images/player1.jpg");
        this.load.image("player2",  pluginPath+"images/player22.jpg");
        //card's images
        this.load.image("arrowX",  pluginPath+"images/arrowX.png");
        this.load.image("arrowY",  pluginPath+"images/arrowY.png");
        this.load.image("mirrorX",  pluginPath+"images/mirrorX.png");
        this.load.image("mirrorY",  pluginPath+"images/mirrorY.png");
        this.load.image("angle",  pluginPath+"images/angle.png");

        this.load.image("button1",  pluginPath+"images/ui/buttons/2/1.png");
        this.load.image("button2",  pluginPath+"images/ui/buttons/2/2.png");
        this.load.audio('memeAtrapado', [ pluginPath+"audio/memeAtrapado.mp3", pluginPath+"audio/memeAtrapado.ogg"]);
        this.load.audio('backgroundMusic', [ pluginPath+"audio/Greeting_the_Day_with_a_Smile.mp3", pluginPath+"audio/Greeting_the_Day_with_a_Smile.ogg"]);

        this.load.image('toggleBack',  pluginPath+"images/ui/toggles/1.png");
        this.load.image('sfxOff',  pluginPath+"images/ui/icons/sfx_off.png");
        this.load.image('sfxOn',  pluginPath+"images/ui/icons/sfx_on.png");
        this.load.image('musicOn',  pluginPath+"images/ui/icons/music_on.png");
        this.load.image('musicOff',  pluginPath+"images/ui/icons/music_off.png");
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