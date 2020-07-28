class AlignGrid{
    constructor(config) {
        this.config = config;
        if(!config.scene){
            console.log("missing scene");
            return;
        }
        if(!config.rows)
            config.rows = 5;
        if(!config.cols)
            config.cols = 5;
        if(!config.height)
            config.height = game.config.height;
        if(!config.width)
            config.width = game.config.width;
        if(!config.isCartesian)
            config.isCartesian = false;
        if(!config.gridXorigin)
            config.gridXorigin = 0;
        if(!config.gridYorigin)
            config.gridYorigin = 0;
        if(!config.cartesianXorigin)//indexes not pixels
            config.cartesianXorigin = Math.floor(config.cols/2);
        if(!config.cartesianYorigin)
            config.cartesianYorigin = Math.floor(config.rows/2);
        console.log("Grid config", config);
        this.scene = config.scene;
        //cell Width
        this.cw = config.width/config.cols;
        //cell height
        this.ch = config.height/config.rows;

        this.gridContainer = this.scene.add.container();
        this.gridContainer.x = this.config.gridXorigin + (this.config.cartesianXorigin * this.cw);
        this.gridContainer.y = this.config.gridYorigin + (this.config.cartesianYorigin * this.ch);
        this.gridLeft = -this.config.cartesianXorigin * this.cw;
        this.gridRight = (this.config.cols-this.config.cartesianXorigin) * this.cw;
        this.gridUp = -this.config.cartesianYorigin * this.ch;
        this.gridDown = (this.config.rows-this.config.cartesianYorigin) * this.ch;

        
    }

    show(){
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0x777777);//0x00ff00
        this.gridContainer.add(this.graphics);
        
        let xPixels;        

        for (let idx = -this.config.cartesianXorigin; idx <= this.config.cartesianXorigin; idx+= 1) {//vertical lines 
            xPixels = idx * this.cw;           
            this.graphics.moveTo(xPixels,this.gridUp);                       
            this.graphics.lineTo(xPixels, this.gridDown);        
            this.AddXYLabels(xPixels,this.gridUp-10, idx.toString());
            this.AddXYLabels(xPixels,this.gridDown+10, idx.toString());
        }
        let yPixels = 0;
        for (let idx = -this.config.cartesianYorigin; idx <= this.config.cartesianYorigin; idx+=1 ) {//horizontal lines. 
            yPixels = idx * this.ch;
            this.graphics.moveTo(this.gridLeft,yPixels);
            this.graphics.lineTo(this.gridRight, yPixels);     
            this.AddXYLabels(this.gridLeft-10, -yPixels, idx.toString());            
            this.AddXYLabels(this.gridRight+10, -yPixels, idx.toString());
        }
        this.graphics.strokePath();
        
        if(this.config.isCartesian){
            this.DrawXYAxis();
        }
    }

    AddXYLabels(xx, yy, label){
        let number = this.scene.add.text(xx, yy, label, {fontFamily: 'Anton', color:'black', fontSize: '12px'});
        number.setOrigin(0.5,0.5);
        this.gridContainer.add(number);
    }

    DrawXYAxis(){
        this.Axisgraphics = this.scene.add.graphics();
        this.gridContainer.add(this.Axisgraphics);
        this.Axisgraphics.lineStyle(3, 0x00ffff);
        this.Axisgraphics.moveTo(0, this.gridUp);
        this.Axisgraphics.lineTo(0, this.gridDown);
        this.Axisgraphics.moveTo(this.gridLeft,0);
        this.Axisgraphics.lineTo(this.gridRight, 0);  
        this.Axisgraphics.strokePath();
    }

    placeAt(xx, yy, obj){
        let x2 = this.cw * xx; // + this.cw/2;
        let y2 = this.ch * yy; // + this.ch/2;

        obj.x = x2;
        obj.y = -y2;
        this.gridContainer.add(obj);
        obj.setOrigin(0.5,0.5);
        Align.scaleToWidth(obj, 0.9, this.cw);
    }

    placeAtIndex(index, obj){ //lo pone en la celda numero index, contando de izq a der, de arr a abajo.
        let yy = Math.floor(index/ this.config.cols);
        let xx = index -(yy*this.config.cols);

        this.placeAt(xx, yy, obj);
    }

    showNumbers(){
        this.show();
        let count = 0;
        for (let i = 0; i < this.config.rows; i++) {
            for (let c= 0; c < this.config.cols; c++){
                let numText = this.scene.add.text(0,0, count, {color: '#00ff00'});
                numText.setOrigin(0.5,0.5);
                this.placeAtIndex(count, numText);
                count ++;
            }            
        }
    }

    TranslateObj(sprite, xx, yy){
        this.scene.tweens.add({targets: sprite,duration: G.TWEEN_TIME, 
            x: sprite.x + (this.cw * xx) ,
            y: sprite.y + (this.ch * -yy)
        });
    }

    onPointerUp = (pointer) =>{
        console.log("grid clicked", pointer.x, pointer.y);
    }
}