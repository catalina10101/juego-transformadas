class Card extends Phaser.GameObjects.Container{

    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        this.isSelected = false;
        this.ID = config.ID;
        if(!config.color)
            config.color = 0x00ffff;
        if(!config.width)
            config.width = G.CARD_WIDTH;
        if(!config.height)
            config.height = G.CARD_HEIGHT;
        if(!config.title)
            config.title = "Title";
        if(!config.footer)
            config.footer = "Footer";

        this.config = config;               
        this.cardTitleTxtSize = model.isMobile==true? '7px' : '10px';
        this.cardText1TxtSize = model.isMobile==true? '15px': '24px';
        //center in container
        // this.graphics.x = -config.width/2;
        // this.graphics.y = -config.height/2;

        if(config.x)
            this.x = config.x;
        if(config.y)
            this.y = config.y;

        this.setSize(this.config.x, this.config.y);    
        this.graphics = this.scene.add.graphics();    
        this.add(this.graphics);

        this.alreadyBuilt = false;
        //this.scene.add.existing(this);
        // this.setInteractive();
        // this.on('pointerdown', this.cardClicked);
    }

    Show(){
        if(!this.alreadyBuilt) {
            this.AddImage();   
            this.AddTexts(); 
            this.DrawCardBorder();
            this.scaleX= 0;
            this.scaleY= -1;
            this.alreadyBuilt = true;            
        }
        else {
            this.DrawCardBorder();            
        }
    }

    cardClicked(){
        this.isSelected =  !this.isSelected;
        this.DrawCardBorder();
    }

    DrawCardBorder(){
        let color = this.isSelected? 0x119544 : 0x000000;
        this.graphics.lineStyle(3, color);
        this.graphics.strokeRect(0,0, this.config.width, this.config.height);    
    }

    AddTexts(){
        this.title = this.scene.add.text(this.config.width*0.5, this.config.height*0.05, this.config.title, {fontFamily: 'Anton', color:'#000000', fontSize: this.cardTitleTxtSize});
        this.title.setOrigin(0.5,0.5);  
        this.footer = this.scene.add.text(this.config.width*0.5, this.config.height*0.9, this.config.footer, {fontFamily: 'Anton', color:'black', fontSize: this.cardTitleTxtSize});           
        this.footer.setOrigin(0.5,0.5);  
        this.add(this.title);
        this.add(this.footer);

        if(this.config.text1){
            this.text1 = this.scene.add.text(this.config.width *0.95, this.config.height*0.2, this.config.text1, {fontFamily: 'Anton', backgroundColor:"white" ,  color:'black', fontSize: this.cardText1TxtSize });
            this.text1.setOrigin(1,0);
            this.add(this.text1);
        }
    }

    AddImage(){
        if(this.config.imageKey){
            this.image = this.scene.add.image(this.config.width*0.5, this.config.height*0.5, this.config.imageKey);
            this.image.setOrigin(0.5,0.5);    
            Align.scaleToWidth(this.image, 1, this.config.width);
            this.image.setInteractive();
            this.image.on('pointerdown', this.cardClicked, this);
            this.add(this.image); 
        }
    }

    Delete(){
        this.isSelected = false;
        this.DrawCardBorder();
        this.scene.tweens.add({targets: this, duration: G.TWEEN_TIME, 
            scaleX: 0,
            scaleY: -1
        });
       // this.time.addEvent({ delay: G.TWEEN_TIME, callback: this.DeleteCardObj, callbackScope: this, loop: false });
    }

    DeleteCardObj(){
       // this.Delete();
    }
}