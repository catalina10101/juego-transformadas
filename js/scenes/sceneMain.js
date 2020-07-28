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
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        this.player1 = this.add.sprite(0,0,"player1"); //create 1st so it appears below meme when catched.
        this.player2 = this.add.sprite(0,0,"player2");
        this.DrawGrid();                   
        this.alignGrid.placeAt(-2, 2, this.player1); 
        this.alignGrid.placeAt(-2, -2, this.player2);    
        //this.ShowSpriteParams("player", this.player1);
        this.currPlayer = this.player1;
        this.otherPlayer = this.player2;
        this.targetEmoticons = this.player1Targets;
        this.moveSprite = null;
        this.sprites = [].concat(this.player1Targets, this.player2Targets, [this.player1, this.player2]);
        //this.sprites = [this.player1];
        this.handSize = 5;
        this.cardContainer = new CardContainer({scene: this, size: this.handSize});
        this.cardContainer.x = game.config.width/2 - this.cardContainer.boxWidth/2;
        this.cardContainer.y = game.config.height*0.05;
        
        this.deck = new CardDeck({scene:this});
        let cards = this.deck.TakeCards(this.handSize);
        this.cardContainer.RefillContainer(cards);
        this.removedCards = [];               

        this.bigTextSize = model.isMobile==true? 30 : 45;
        this.smallTextSize = model.isMobile==true? '14px' : '18px';
        this.PutApplyButton();
        this.PutDeleteButton();
        this.playerText = this.add.text(game.config.width*0.85, game.config.height*0.4, "Jugador 1", {color: G.COLOR_2 , fontSize: this.bigTextSize});
        this.playerText.setOrigin(0.5,0.5);
        this.instrucciones = this.add.text(game.config.width*0.85, game.config.height*0.53, "Elige que cartas usar, y juegalas o eliminalas.", 
            {color:'black', fontSize: this.smallTextSize, wordWrap: { width: model.isMobile==true? 180 : 230 }});
        this.instrucciones.setOrigin(0.5,0.5);
        this.instrError = this.add.text(game.config.width*0.85, game.config.height*0.6, "que no sea el del otro jugador!", 
            {color:'red', fontSize: this.smallTextSize, wordWrap: { width: model.isMobile==true? 180 : 230 }});
        this.instrError.setOrigin(0.5,0.5);
        this.instrError.scale = 0;
        this.mediaManager = new MediaManager({scene: this});
        this.mediaManager.setBackgroundMusic('backgroundMusic');

        let sb = new SoundButtons({scene: this});          
        this.CreateScoreBox();            
        this.input.on('pointerup', this.onPointerUp, this);

        this.gameModel = {
            currPlayer: this.currPlayer,
            step: gameSteps.SELECT_CARDS, //'selectCard', //
        }

        currScene = this;
    }
    update() {
		//this is running constantly.
	}
    ///aply button
    PutApplyButton(){        
        let textConf = {color:'black', fontSize:30};
        this.applyButton = new FlatButton({scene: this, key: 'button1', text: 'Jugar', x:game.config.width*0.85, y: game.config.height*0.7, 
            event:'apply_button_pressed', params:null, textConfig: textConf, scale: 0.8
        });
        emitter.on('apply_button_pressed', this.ApplyButtonPressed, this);
    }

    ApplyButtonPressed(params){         
        this.instrucciones.setText("Elige que emoticon mover...");
        this.gameModel.step = gameSteps.SELECT_EMOTICON;
    }

    onPointerUp = (pointer) => {
        if(this.gameModel.step == gameSteps.SELECT_EMOTICON){                       
            this.moveSprite = this.GetClickedSprite(pointer.x, pointer.y);            
            if(this.moveSprite != null){
                if(this.moveSprite == this.otherPlayer) {
                    this.instrError.scale = 1;
                }
                else {
                    this.instrError.scale = 0;
                    this.instrucciones.setText("Moviendo emoticon..."); 
                    this.gameModel.step = gameSteps.PLAY_CARDS;            
                    this.PlayCards();
                }
            }
        }
    }

    GetClickedSprite = (xx, yy) => {
        let index=0;
        let found = false;
        let clickedSprite = null;
        let x = xx - this.alignGrid.gridContainer.x;
        let y = yy - this.alignGrid.gridContainer.y;
        let spriteWHalf = this.player1.displayWidth/2;
        let spriteHHalf = this.player1.displayHeight/2;
        while(!found && index < this.sprites.length)
        {
            let sprite = this.sprites[index];
            //console.log("sprite", index, "gridX", x, "gridY", y, "distX", Math.abs(x-sprite.x), "distY", Math.abs(y-sprite.y), "width/2",spriteWHalf, "height/2", spriteHHalf );
            if( Math.abs(x-sprite.x) < spriteWHalf && Math.abs(y-sprite.y) < spriteHHalf){
                found = true;
                clickedSprite = sprite;
            }
            index++;
        }
        //this.sprites
        return clickedSprite;
    }

    PlayCards =() =>{
        this.selectedCards = this.cardContainer.handCards.filter(x=> {return x.isSelected===true});
        this.playingCardIdx = 0;        
        this.PlayCard(); 
    }

    PlayCard(){
        if(this.playingCardIdx > 0){
            let lastCard = this.selectedCards[this.playingCardIdx-1];
            this.cardContainer.RemoveCard(lastCard);
            this.removedCards.push(lastCard);
        }
        if(this.playingCardIdx < this.selectedCards.length){
            let c = this.selectedCards[this.playingCardIdx];
            let params = c.config.params;
            switch(c.config.params.function){
                case 'translate': Transform.TranslateInGrid(this.moveSprite , params.x, params.y, this.alignGrid); break;
                case 'rotate': Transform.Rotate(this, this.moveSprite, params.angle); break;
                case 'reflectX': Transform.ReflectXAxis(this, this.moveSprite); break;
                case 'reflectY': Transform.ReflectYAxis(this, this.moveSprite); break;
            }
            this.playingCardIdx++;
            this.time.addEvent({ delay: G.TWEEN_TIME+10, callback: this.ValidateCatch, callbackScope: this, loop: false });
        }
        else
        {
            this.time.addEvent({ delay: G.TWEEN_TIME+10, callback: this.RefillHand, callbackScope: this, loop: false });
        }
    }

    ValidateCatch(){
        let memeCatched = false;
        // this.ShowSpriteParams("meme", this.face);
        // this.ShowSpriteParams("player", this.currPlayer);
        
        let playerModel = this.BuildSpriteModel(this.currPlayer);
        let index=0;
        let emoticon;

        while(!memeCatched && index < this.targetEmoticons.length)
        //for(index=0; index < this.targetEmoticons.length; index++)//check all, in case 2 are in the same position.
        {
            emoticon = this.targetEmoticons[index];
            let memeModel = this.BuildSpriteModel(emoticon);
            memeCatched = this.DidPlayerCatchEmoticon(playerModel, memeModel);
            if(memeCatched===true)
                this.catchedEmoticon = emoticon;
            index++;
        }

        if(memeCatched){
            //animation
            this.mediaManager.playSound("memeAtrapado");
            emitter.emit(G.UP_POINTS,{player: (this.currPlayer== this.player1? 1:2), points:1 });
            Transform.memeCatched(this, this.catchedEmoticon, this.currPlayer);
            this.time.addEvent({ delay: G.TWEEN_TIME*2+20, callback: this.memeCatchedAnimFinished, callbackScope: this, loop: false });        
        }
        else 
            this.PlayCard();
    }

    DidPlayerCatchEmoticon = (playerModel, memeModel)=>{
        let memeCatched = true;
        if(memeModel.reflectedOnY != playerModel.reflectedOnY)
            memeCatched = false;
  
        let angleDiff = Math.abs(memeModel.angle - playerModel.angle) % 350;//in case diff is 355 degrees
        if( angleDiff > 20)
            memeCatched = false;

        if( Math.abs(memeModel.x - playerModel.x) > 10 || Math.abs(memeModel.y - playerModel.y) > 10)
            memeCatched = false;
        return memeCatched;
    }

    memeCatchedAnimFinished(){
        this.catchedEmoticon.scale = 1;
        this.catchedEmoticon.angle= 0;
        this.PlaceSpriteInGrid(this.catchedEmoticon);

        if(model.winner != null)
            this.scene.start("SceneOver");
        else
            this.ValidateCatch(); //in case 2 emoticons are in the same position.
            //this.PlayCard();
    }

    BuildSpriteModel(sprite){
        let model = {x: sprite.x, y:sprite.y };
        let angle = sprite.angle;
        let reflectedOnX = sprite.scaleY < 0? true: false;
        let reflectedOnY = sprite.scaleX < 0? true: false;
        if(reflectedOnX ==true && reflectedOnY==true)   
        {    
            angle += 180;
            reflectedOnX = false;
            reflectedOnY = false;
        }
        if(reflectedOnX ==true && reflectedOnY==false){
            angle += 180;
            reflectedOnX = false;
            reflectedOnY = true;
        }
        model.angle = angle % 360;
        model.reflectedOnY = reflectedOnY;
        return model;
    }

    ShowSpriteParams(txt, sprite){
        console.log(txt );
        console.log("x: ", sprite.x);
        console.log("y: ", sprite.y);
        console.log("angle: grados: " + sprite.angle);
        console.log("scaleX: ", sprite.scaleX);
        console.log("scaleY: ", sprite.scaleY);
        console.log("scale: ", sprite.scale);
        console.log("-----------");
    }
    //delete bttn
    PutDeleteButton(){        
        let textConf = {color:'black', fontSize:30};
        this.applyButton = new FlatButton({scene: this, key: 'button1', text: 'Eliminar', x:game.config.width*0.85, y: game.config.height*0.9, 
            event:'delete_button_pressed', params:null, textConfig: textConf, scale: 0.8
        });
        emitter.on('delete_button_pressed', this.DeleteButtonPressed, this);
    }

    DeleteButtonPressed(params){
        //console.log(params);
        this.selectedCards = this.cardContainer.handCards.filter(x=> {return x.isSelected===true});
        this.selectedCards.forEach(c=> {                  
            this.cardContainer.RemoveCard(c);
            this.removedCards.push(c);       
        });
        this.time.addEvent({ delay: G.TWEEN_TIME+20, callback: this.RefillHand, callbackScope: this, loop: false });
        //this.scene.start('SceneOver');
    }        
    //
    RefillHand(){        
        let remainingDeckCards = this.deck.deck.length ;
        let neededCards = this.selectedCards.length;
        let cards=[];
        
        if(remainingDeckCards > neededCards)
            cards = this.deck.TakeCards(neededCards);
        else{
            cards = this.deck.TakeCards(remainingDeckCards);
            this.deck.shuffleUsedCards(this.removedCards);
            // this.deck.ShowCardsInConsole("deck", this.deck.deck);
            // this.deck.ShowCardsInConsole("removed", this.removedCards);
            let otherCards = this.deck.TakeCards(neededCards - remainingDeckCards);
            cards = [].concat(cards, otherCards);
        }
        
        this.cardContainer.RefillContainer(cards);
        this.selectedCards = [];
        this.EndTurn();
    }
    EndTurn(){
        if(this.currPlayer == this.player1){
            this.currPlayer = this.player2;
            this.otherPlayer = this.player1;
            this.playerText.setText("Jugador 2");
            this.targetEmoticons = this.player2Targets;           
        }
        else{
            this.currPlayer = this.player1;
            this.otherPlayer = this.player2;
            this.playerText.setText("Jugador 1");
            this.targetEmoticons = this.player1Targets;
        }
        this.gameModel.currPlayer = this.currPlayer;
        this.gameModel.step = gameSteps.SELECT_CARDS;
        this.instrucciones.setText("Elige que cartas usar, y juegalas o eliminalas.");  
    }
    //score box
    CreateScoreBox(){                
        this.sb = new ScoreBox({scene: this, player1imgKey:'player1', player2imgKey:'player2'});
        this.sb.x = game.config.width*0.025;
        this.sb.y = game.config.height*0.4; //game.config.height/2;

        model.setPlayerScore(1, 0);
        model.setPlayerScore(2, 0);
        model.winner = null;
    }

    DrawGrid(){        
        let gridHeight = game.config.height*0.6;
        let gridConfig = {rows:G.GRID_COLS, cols:G.GRID_COLS, scene: this, width: gridHeight, height: gridHeight
            ,isCartesian: true
            ,gridXorigin: game.config.width/2 - gridHeight/2
            ,gridYorigin: game.config.height - 1.08*gridHeight   
        };
        this.alignGrid = new GameGrid(gridConfig);       
        //alignGrid.showNumbers();
        this.alignGrid.show();
        
        this.emoticon1_1 = this.add.sprite(0,0,"emoticon1");  
        this.emoticon1_2 = this.add.sprite(0,0,"emoticon1");  
        this.emoticon2_1 = this.add.sprite(0,0,"emoticon2");  
        this.emoticon2_2 = this.add.sprite(0,0,"emoticon2");  
        this.player1Targets = [this.emoticon1_1, this.emoticon1_2];
        this.player2Targets = [this.emoticon2_1, this.emoticon2_2];
        // this.alignGrid.placeAt(0,2, this.emoticon1_1);
        // this.alignGrid.placeAt(0,-2, this.emoticon2_1);
        this.PlaceSpriteInGrid(this.emoticon1_1);
        this.PlaceSpriteInGrid(this.emoticon2_1);
        this.PlaceSpriteInGrid(this.emoticon2_2);
        this.PlaceSpriteInGrid(this.emoticon1_2);
        //this.PutRandomTargetEmoticon();                
    }

    PutRandomTargetEmoticon(){
        let images = ["emoticon1", "emoticon2", "emoticon3", "emoticon4", "emoticon5", "emoticon6"];
        let ranImageIdx = Math.floor( (Math.random() * (images.length-1) ));
        let imageKey = images[ranImageIdx];
        this.face = this.add.sprite(0,0,imageKey);        
        this.PlaceSpriteInGrid(this.face);
        //this.alignGrid.placeAt(1, 1, this.face);    
    }

    PlaceSpriteInGrid(sprite){
        let randomX = Math.floor( (Math.random() *G.GRID_COLS) - (G.GRID_COLS/2) ); //ran -5 to 5
        let randomY = Math.floor( (Math.random() *G.GRID_COLS) - (G.GRID_COLS/2) ); //ran -5 to 5                    
        this.alignGrid.placeAt(randomX,randomY, sprite);    
        let ranBool1 = Math.random() > 0.5 ? true : false;
        let ranBool2 = Math.random() > 0.5 ? true : false;
        if(ranBool1 === true && ranBool2 === false) //if both were true, that's equivalent to +180 degrees.
            Transform.ReflectXAxis(this, sprite);
        if(ranBool2 === true && ranBool1 === false)
            Transform.ReflectYAxis(this, sprite);
        
        let ranAngleMultiplier = Math.floor( Math.random() *8);
        sprite.angle = ranAngleMultiplier*45;
        //console.log("place sprite", randomX, randomY);
    }

}

const gameSteps = {
    SELECT_CARDS: 'selectCard',
    SELECT_EMOTICON: 'selectEmoticon',
    PLAY_CARDS: 'playCards'
}