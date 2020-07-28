class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
        // this.load.image("title", "images/title.png");
        // this.load.image("button1", "images/ui/buttons/2/1.png");
        // this.load.image("button2", "images/ui/buttons/2/5.png");
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller= new Controller();
        
        let fondo = this.add.image(0,0, 'fondo');
        fondo.setOrigin(0,0);
        Align.scaleToGameW(fondo, 1);

        this.alignGrid = new AlignGrid({rows:11, cols:11, scene: this});
        //this.alignGrid.showNumbers();

        let title = this.add.image(0,0, 'title');
        this.alignGrid.placeAtIndex(60, title);
        Align.scaleToGameW(title, 0.8);

        let btnStart = new FlatButton({scene: this, key: 'button2', text:'Iniciar', event:'start_game', textConfig: {color: G.COLOR_2_0x, fontSize:25} });
        // this.applyButton = new FlatButton({scene: this, key: 'button1', text: 'Jugar', x:game.config.width*0.85, y: game.config.height*0.7, 
        //     event:'apply_button_pressed', params:null, textConfig: textConf, scale: 0.8
        // });
        this.alignGrid.placeAtIndex(93, btnStart);        

        emitter.on('start_game', this.startGame, this );
    }
    update() {}

    startGame(){
        this.scene.start('SceneMain');
    }
}