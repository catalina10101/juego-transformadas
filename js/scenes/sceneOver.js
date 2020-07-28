class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        this.load.image("title", "images/title.png");
        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("button2", "images/ui/buttons/2/5.png");
    }
    create() {        

        console.log("SceneOver!");
        let fondo = this.add.image(0,0, 'fondo');
        fondo.setOrigin(0,0);
        Align.scaleToGameW(fondo, 1);

        this.alignGrid = new AlignGrid({rows:11, cols:11, scene: this});
        //this.alignGrid.showNumbers();

        let title = this.add.image(0,0, 'title');
        this.alignGrid.placeAtIndex(49, title);
        Align.scaleToGameW(title, 0.5);

        this.winnerTitle = this.add.text(0,0, "GANADOR", {color:'red', fontSize:55});
        this.winnerTitle.setOrigin(0.5,0.5);
        this.alignGrid.placeAtIndex(60, this.winnerTitle);

        // this.winnerTxt = this.add.text(0,0, model.winner == 1? "Jugador 1": "Jugador 2", {color:'black', fontSize:45});
        // this.winnerTxt.setOrigin(0.5,0.5);
        // this.alignGrid.placeAtIndex(71, this.winnerTxt);

        this.winnerImg = this.add.image(0,0,  model.winner == 1? "player1": "player2");
        this.winnerImg.setOrigin(0.5,0.3);
        Align.scaleToGameW(this.winnerImg, 0.1);
        this.alignGrid.placeAtIndex(71, this.winnerImg);

        let btnStart = new FlatButton({scene: this, key: 'button2', text:'Jugar', event:'start_game' });
        this.alignGrid.placeAtIndex(93, btnStart);//104

        if(emitter)
            emitter.on('start_game', this.startGame, this );
    }
    update() {}

    startGame(){
        this.scene.start('SceneMain');
    }
}