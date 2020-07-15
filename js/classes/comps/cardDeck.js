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
        this.AddTranslationCards([-1, 1,1,1,2,-2], [-1, 1,1,1,2,-2, 3,-3]);//14 cards
    }

    shuffle(){
        let deckLenght =this.orderedDeck.length;
        this.deck.length = deckLenght;
        for(let i=0; i < deckLenght; i++){
            let random = Math.floor(Math.random()*(deckLenght-i-1));
            this.deck[i] = this.orderedDeck[random];
            this.orderedDeck.splice(random, 1);
        }        
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
            let cardTranslateX = new Card({scene:this.scene, title: "Translacion X", footer: "Transformada", text1: "X: " + x, imageKey:'emoticon1' //, x:game.config.width*0.3, y:20
                , params: { function:'translate', x: x, y:0}
                , ID: this.GetNextID()
            });
            this.orderedDeck.push(cardTranslateX);
        });

        yTranslations.forEach(y=>{
            let cardTranslateY = new Card({scene:this.scene, title: "Translacion Y", footer: "Transformada", text1: "Y: " + y, imageKey:'emoticon1' //, x:game.config.width*0.3, y:20
                , params: { function:'translate', x: 0, y:y}
                , ID: this.GetNextID()
            });
            this.orderedDeck.push(cardTranslateY);
        });
    }
    
    AddRotationCards(){
        // let cardRotate = new Card({scene:this, title: "Rotacion", footer: "Transformada", text1: 45, imageKey:'emoticon1', x:game.config.width*0.6, y:20
        //     , params: { function:'rotate', angle: 45}
        // });
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