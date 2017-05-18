console.log("Welcome to Console Blackjack");

var table = [];

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
// Durstenfeld shuffle algorithm
function Shuffle(deck){
    for (var i = deck.length - 1; i > 0 ; i--){
        var j = Math.floor(Math.random() *(i +1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp; 
    }
    return deck;
}


function AddPlayer(name){
    table.push(new Player(name))
}

// TODO Ace corner case. 
function PlayerTotal(cards){
    var total = 0;
    for (i = 0; i < cards.length; i++){
        total += cards[i].values[0];
    }
    return total;
} 

function Payout(player){
    //blackjack case
    if (player.cards.length === 2 && PlayerTotal(player.cards) === 21){
        return player.wager + player.wager * 1.5;
    }
    else return player.wager * 2; 
} 

var josh = new Player("Josh");
var bao = new Player("Bao");

bao.cards = [new Card(7), new Card(6)];
josh.cards = [new Card("Ace"), new Card(10)];
josh.wager = 5;
bao.wager = 5;

console.log(Payout(josh));
