console.log("Welcome to Console Blackjack");
var Player = function(username){
    this.name = username;
    this.cards = [];
    this.status = 0;
    this.wager = 0;
    this.total = 0;
}

var Card = function(type, suit){
    this.type = type; 
    this.suit = suit;
    this.values = [];
    if (typeof(type) === "number"){
        this.values.push(type);
    }
    else if (typeof(type) === "string" && type !== "Ace"){
        this.values.push(10);
    }
    else {
        this.values.push(11);
        this.values.push(1);
    }
}
var deck = [];
for (var suit = 1; suit <= 4; suit++) {
    var suitName;
    switch (suit) {
        case 1:
            suitName = "Hearts";
            break;
        case 2:
            suitName = "Spades";
            break;
        case 3:
            suitName = "Clubs";
            break;
        case 4:
            suitName = "Diamonds";
            break;
    }
    for ( var i = 2; i <15; i++){
        var card;
        switch (i){
            case 11:
                card = "Jack";
                break;
            case 12: 
                card = "Queen";
                break;
            case 13:
                card = "King";
                break;
            case 14:
                card = "Ace";
                break;
            default:
                card = i; 
        }
        
        deck.push(new Card(card, suitName))
    }
}

var player1 = new Player(window.prompt("User name"))

console.log(deck)