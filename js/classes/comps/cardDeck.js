class CardDeck{

    constructor(config){
        this.scene = config.scene;
        this.deck = [];
        this.orderedDeck = [];
        this.nextID = 0;
        this.BuildDeck();
        this.shuffle();
    }

    BuildDeck(){
        //this.AddTranslationCards([-1, 1,1,1], [-1, 1,1,1]);
        this.AddTranslationCards([-1,-1,-1, 1,1,1,2,2,2,-2,-2,-2, 3,3,3,-3,-3,-3], [-1,-1,-1, 1,1,1,2,2,2,-2,-2,-2, 3,3,3,-3,-3,-3]);//18 x & y cards
        //this.AddTranslationCards([-1,-1, 1,1,2,2,-2,-2, 3,3,-3,-3], [-1,-1, 1,1,2,2,-2,-2, 3,3,-3,-3]);//12x2=24
        //this.AddRotationCards([45,45,45,45,-45,-45,-45,-45, 90,90,90,90,-90,-90,-90,-90, 135,135, 180,180, 225,-225, 270,-270, 315, -315]);//26
        this.AddRotationCards([45,45,45,-45,-45,-45, 90,90,-90,-90, 135, 180, 225, 270,-270, 315, -315]);//21
        this.AddReflectCards("X", 6);
        this.AddReflectCards("Y", 6);
    }

    shuffle(){
        let deckLenght = this.orderedDeck.length;
        this.deck.length = deckLenght;
        for(let i=0; i < deckLenght; i++){
            let random = Math.floor(Math.random()*(deckLenght-i-1));
            this.deck[i] = this.orderedDeck[random];
            this.orderedDeck.splice(random, 1);
        }        
    }
    
    shuffleUsedCards(usedCards){
        this.orderedDeck = usedCards;
        this.shuffle();
    }

    TakeCards(quantity){
        let cards = this.deck.splice(0, quantity);
        // this.ShowCardsInConsole("cards", cards);
        // this.ShowCardsInConsole("deck", this.deck);
        return cards;
    }

    //Build by Card Type
    AddTranslationCards( xTranslations, yTranslations){
        xTranslations.forEach(x=>{
            let cardTranslateX = new Card({scene:this.scene, title: "Translacion X", footer: "Transformada", text1: "X: " + x, imageKey:'arrowX' //, x:game.config.width*0.3, y:20
                , params: { function:'translate', x: x, y:0}
                , ID: this.GetNextID()
            });
            this.orderedDeck.push(cardTranslateX);
        });

        yTranslations.forEach(y=>{
            let cardTranslateY = new Card({scene:this.scene, title: "Translacion Y", footer: "Transformada", text1: "Y: " + y, imageKey:'arrowY' //, x:game.config.width*0.3, y:20
                , params: { function:'translate', x: 0, y:y}
                , ID: this.GetNextID()
            });
            this.orderedDeck.push(cardTranslateY);
        });
    }
    
    AddRotationCards(angles){
        angles.forEach(x=>{
            let cardRotate = new Card({scene:this.scene, title: "Rotacion", footer: "Transformada", text1: x + "°", imageKey:'angle'
                , params: { function:'rotate', angle: x}
                , ID: this.GetNextID()
            });
            this.orderedDeck.push(cardRotate);
        });        
    }

    AddReflectCards(axis, quantity){
        for (let index = 0; index < quantity; index++) {
            let card = new Card({scene:this.scene, title: "Reflejar", footer: "Transformada", text1: axis
                , imageKey: axis.toLowerCase() == "x" ? 'mirrorX': 'mirrorY'
                , params: { function: axis.toLowerCase() == "x" ? 'reflectX':'reflectY' , axis: axis}
                , ID: this.GetNextID()
            });
            this.orderedDeck.push(card);
        }
    }
    //other 
    ShowCardsInConsole(text, cards){
        console.log(text, cards.map(c=> c.config.text1));
    }

    GetNextID(){
        this.nextID++;
        return this.nextID;
    }
}