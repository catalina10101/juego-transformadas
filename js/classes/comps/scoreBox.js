class ScoreBox extends Phaser.GameObjects.Container{

    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        //        

        if(!config.width){
            config.width = game.config.width*0.23;
        }
        if(!config.height){
            config.height = config.width*1;
        }
        if(!config.backgroundColor){
            config.backgroundColor = 0xffffff;
        }

        this.textSize = model.isMobile==true? '10px' : '14px';

        if(config.x){
            this.x = config.x;
        }
        if(config.x){
            this.y = config.y;
        }
        this.config = config;
        
        this.scene.add.existing(this);
        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
        this.DrawBox();
    }

    scoreUpdated(){
        this.scorePlayer1.setText(model.getPlayerScore(1));
        this.scorePlayer2.setText(model.getPlayerScore(2));
    }

    DrawBox(){
        this.AddBackground();
        this.AddPlayerTexts();
        this.AddPlayersImg();
        this.AddScores();
    }

    AddScores(){
        this.scorePlayer1 = this.scene.add.text(this.config.width/4, this.config.height*0.8, 
            "0", {color:'black', fontSize:'30px'});
        this.scorePlayer1.setOrigin(0.5,0.5);
        this.scorePlayer2 = this.scene.add.text(this.config.width*0.75, this.config.height*0.8, 
            "0", {color:'black', fontSize:'30px'});
        this.scorePlayer2.setOrigin(0.5,0.5);
        this.add(this.scorePlayer1);
        this.add(this.scorePlayer2);
    }

    AddPlayersImg(){
        this.Player1Img = this.scene.add.image(this.config.width/4, this.config.height*0.4, this.config.player1imgKey);
        this.Player1Img.setOrigin(0.5,0.5);
        this.add(this.Player1Img);
        Align.scaleToWidth(this.Player1Img, 0.35, this.config.width);
        this.Player2Img = this.scene.add.image(this.config.width*0.75, this.config.height*0.4, this.config.player2imgKey);
        this.Player2Img.setOrigin(0.5,0.5);
        this.add(this.Player2Img);
        Align.scaleToWidth(this.Player2Img, 0.35, this.config.width);
    }

    AddPlayerTexts(){
        this.Player1Txt = this.scene.add.text(this.config.width/4, this.config.height*0.1, 
            "Jugador 1", {color: G.COLOR_2, fontSize:this.textSize});
        this.Player1Txt.setOrigin(0.5,0.5);
        this.add(this.Player1Txt);
        this.Player2Txt = this.scene.add.text(this.config.width*0.75, this.config.height*0.1, 
            "Jugador 2", {color: G.COLOR_2, fontSize:this.textSize});
        this.Player2Txt.setOrigin(0.5,0.5);
        this.add(this.Player2Txt);
    }

    AddBackground(){        
        this.graphics = this.scene.add.graphics();    
        this.add(this.graphics);
        this.graphics.lineStyle(3, 0x000000);
        this.graphics.fillStyle(this.config.backgroundColor, 1);//color, transparency
        this.graphics.fillRect(0,0, this.config.width, this.config.height);
        this.graphics.strokeRect(0,0, this.config.width, this.config.height);
        this.graphics.moveTo(this.config.width/2, 0);
        this.graphics.lineTo(this.config.width/2, this.config.height);
        this.graphics.stroke();
    }   

}