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

function Hand(pos){
    var hand = [];
    for (i = 0; i < table[pos].cards.length; i++){
        hand.push(table[pos].cards[i].type)
    }
    var x = hand.join( " ");
    return x;
}


function Main(){
//Table Set up
console.log("Hello! Welcome to console blackjack.")
AddPlayer(window.prompt("What is your name?"));
while(window.confirm("Would you like to add another player?")){
    AddPlayer(window.prompt("Player name?"));
}
AddPlayer("Dealer");


while(window.confirm("Deal?")){
//game 

for(var i = 0; i < table.length - 1; i++){
    table[i].wager = window.prompt(table[i].name + " what is your wager?")
    table[i].total -= table[i].wager;
}

Shuffle(deck);
Deal(2);
for (var i = 0 ; i < table.length; i++){    
    while (table[i].status === 0){
        if ((PlayerTotal(table[i].cards) > 21)){
               console.log("Bust");
               table[i].status = -1;
           }
        else if( window.confirm(table[i].name + " your hand is " + Hand(i) + " would you like to hit it like you can't miss?")){
           var temp = deck.pop();
           table[i].cards.push(temp);
            }
        else if (table[i].cards.length === 2 && PlayerTotal(table[i].cards) === 21){
           console.log("BLACKJACK!");
           table[i].status = 1;
       }
        else table[i].status = 1;
        }

    }
//payouts
for( var i = 0; i < table.length - 1; i++){
    if (PlayerTotal(table[i].cards) > PlayerTotal(table[table.length - 1].cards) && table[i].status === 1){
        console.log(table[i].name + " wins " + Payout(table[i]) + "!")
        table[i].total += Payout(table[i]);
        console.log(table[i].name + " you currently have " + table[i].total + " chips");
    }
    else if(table[i].status === -1){
        console.log("Sorry "  + table[i].name + " you busted.")
        console.log(table[i].name + " you currently have " + table[i].total + " chips");
    }
    else if(PlayerTotal(table[i].cards) === PlayerTotal(table[table.length -1].cards)){
        console.log(table[i].name + " pushes.")
        table[i].total += table[i].wager;
        console.log(table[i].name + " you currently have " + table[i].total + " chips");
    }
    else{ 
        console.log("Sorry " + table[i].name + " you lost.");
        console.log(table[i].name + " you currently have " + table[i].total + " chips");
    }
}
for (var i = 0; i < table.length ; i++){
    table[i].status = 0;
    table[i].cards = [];
}
}
}

Main();