class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain'); //same as class name 
    }
    preload()
    {
        //load imgs or sounds        
    }
    create() {
        //define objects        
        //this.CreateScoreBox();
        console.log("Ready!");
        emitter = new Phaser.Events.EventEmitter();
        this.DrawGrid();    
        this.handSize = 5;
        this.cardContainer = new CardContainer({scene: this, size: this.handSize});
        this.cardContainer.x = game.config.width/2 - this.cardContainer.boxWidth/2;
        this.cardContainer.y = game.config.height*0.05;
        
        this.deck = new CardDeck({scene:this});
        let cards = this.deck.TakeCards(this.handSize);
        this.cardContainer.RefillContainer(cards);
               
        this.PutApplyButton();
        //let mediaManager = new MediaManager({scene: this});
        //mediaManager.setBackgroundMusic('backgroundMusic');

        let sb = new SoundButtons({scene: this});      
        
    }
    update() {
		//this is running constantly.
	}
    ///buttons
    PutApplyButton(){        
        let textConf = {color:'black', fontSize:30};
        this.applyButton = new FlatButton({scene: this, key: 'button1', text: 'Apply', x:game.config.width*0.85, y: game.config.height*0.4, 
            event:'apply_button_pressed', params:null, textConfig: textConf, scale: 0.8
        });
        //let flatButton2 = new FlatButton({scene: this, key: 'button2', text: 'Destruct!', x:240, y: 300, event:'button_pressed', params:'self_destruct'});
        //Align.scaleToGameW(this.applyButton, 0.1);
        emitter.on('apply_button_pressed', this.ApplyButtonPressed, this);
    }

    ApplyButtonPressed(params){
        //console.log(params);
        this.selectedCards = this.cardContainer.handCards.filter(x=> {return x.isSelected===true});
        this.selectedCards.forEach(c=> {
            let params = c.config.params;
            console.log(params);
            switch(c.config.params.function){
                case 'translate': Transform.TranslateInGrid(this.face, params.x, params.y, this.alignGrid); break;
                case 'rotate': Transform.Rotate(this, this.face, params.angle); break;
            }
            //this.time.addEvent({ delay: G.TWEEN_TIME, callback: , callbackScope: this, loop: true });
            this.cardContainer.RemoveCard(c);
            //Transform.transform(c.config.params);
        });
        this.time.addEvent({ delay: G.TWEEN_TIME, callback: this.RefillHand, callbackScope: this, loop: false });
        //this.scene.start('SceneOver');
    }

    RefillHand(){
        let cards = this.deck.TakeCards(this.selectedCards.length);
        this.cardContainer.RefillContainer(cards);
        this.selectedCards = [];
    }
    //score box
    CreateScoreBox(){        
        controller = new Controller();

        this.sb = new ScoreBox({scene: this});
        this.sb.x = game.config.width/2;
        this.sb.y = 50; //game.config.height/2;

        emitter.emit(G.SET_SCORE,20);
    }

    DrawGrid(){
        console.log(game.config.width, game.config.width*0.8);
        let gridHeight = game.config.height*0.6;
        let gridConfig = {rows:G.GRID_COLS, cols:G.GRID_COLS, scene: this, width: gridHeight, height: gridHeight
            ,isCartesian: true
            ,gridXorigin: game.config.width/2 - gridHeight/2
            ,gridYorigin: game.config.height - 1.1*gridHeight   
        };
        this.alignGrid = new AlignGrid(gridConfig);       
        //alignGrid.showNumbers();
        this.alignGrid.show();
        this.PutRandomTargetEmoticon();        
        
    }

    PutRandomTargetEmoticon(imageKey){
        let images = ["emoticon1"];
        let ranImageIdx = Math.floor( (Math.random() * (images.length-1) ));
        let randomX = Math.floor( (Math.random() *G.GRID_COLS) - (G.GRID_COLS/2) ); //ran -5 to 5
        let randomY = Math.floor( (Math.random() *G.GRID_COLS) - (G.GRID_COLS/2) ); //ran -5 to 5
        this.face = this.add.sprite(0,0,images[ranImageIdx]);               

        console.log("emoticon", images[ranImageIdx], randomX, randomY);
        //alignGrid.placeAt(2,2, this.face);
        //this.alignGrid.placeAt(randomX,randomY, this.face);
        this.alignGrid.placeAt(2,2, this.face);
        //Transform.ReflectXAxis(this.face);
        //Transform.TranslateInGrid(this.face, 2, -3, this.alignGrid);
    }


}