console.log("Welcome to Console Blackjack");

var table = [];

var Player = function(username){
    this.name = username;
    this.cards = [];
    this.status = 0;
    this.wager = 0;
    this.total = 100;
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
 
function PlayerTotal(cards){
    var total = 0;
    var j = 0;
    var n = 0;
    for (i = 0; i < cards.length - n; i++){
        if (cards[i].type==="Ace"){
            var temp = cards[i];
            cards.splice(i,1);
            cards.push(temp);
            i--;
            n++;
        }
    }
    for (i = 0; i < cards.length; i++){
        if (total > 10 && cards[i].type === "Ace"){
            j = 1; 
        }
        total += cards[i].values[j];
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

function Deal(number){
    for(var i = 0; i <table.length; i++){
        if(table[i].status === 0)
        for(var j = 0; j < number; j++){
            var temp = deck.pop();
            table[i].cards.push(temp);
        }
    }
}

AddPlayer("Dealer");
AddPlayer("Josh");
AddPlayer("Bao");

Shuffle(deck);
Deal(2);

console.log(table[1]);
