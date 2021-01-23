/*jslint node: true*/
/*eslint no-console: ["error", { allow: ["log"] }] */
/*global document*/
"use strict";

if ('serviceWorker' in navigator) { 
    // register service worker 
    navigator.serviceWorker.register('service-worker.js'); 
}

var numCardsPulled = 0;

var player = {
    cards: [],
    score: 0,
    money: 100
};
var dealer = {
    cards: [],
    score: 0
};
var deck = {
    deckArray: [],
    initialize: function () {
        var suitArray, rankArray, s, r;
        suitArray = ["C", "D", "H", "S"];
        rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
        for (s = 0; s < suitArray.length; s += 1) {
            for (r = 0; r < rankArray.length; r += 1) {
                this.deckArray[s * 13 + r] = {
                    rank: rankArray[r],
                    suit: suitArray[s]
                };
            }
        }
    },
    shuffle: function () {
        var temp, i, rnd;
        for (i = 0; i < this.deckArray.length; i += 1) {
            rnd = Math.floor(Math.random() * this.deckArray.length);
            temp = this.deckArray[i];
            this.deckArray[i] = this.deckArray[rnd];
            this.deckArray[rnd] = temp;
        }
    }
};

document.getElementById("bet").oninput = function() {
    document.getElementById("bet-value").innerHTML = this.value;
}

document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
deck.initialize();
deck.shuffle();

function getCardsValue(a) {
    var cardArray = [];
    var sum = 0;
    var i = 0;
    var aceCount = 0;
    cardArray = a;
    for (i; i < cardArray.length; i += 1) {
        if (cardArray[i].rank === "J" || cardArray[i].rank === "Q" || cardArray[i].rank === "K") {
            sum += 10;
        } else if (cardArray[i].rank === "A") {
            sum += 11;
            aceCount += 1;
        } else {
            sum += cardArray[i].rank;
        }
    }
    while (aceCount > 0 && sum > 21) {
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}

function bet(outcome) {
    var playerBet = document.getElementById("bet").valueAsNumber;
    if (outcome === "win") {
        player.money += playerBet;
    }
    else if (outcome === "winOnePointFive") {
        player.money += (playerBet * 1.5);
    }
    else if (outcome === "lose") {
        player.money -= playerBet;
    }
}

function resetGame() {
    numCardsPulled = 0;
    player.cards = [];
    dealer.cards = [];
    player.score = 0;
    dealer.score = 0;
    deck.initialize();
    deck.shuffle();
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("bet").disabled = false;
    document.getElementById("bet").max = player.money;
    document.getElementById("bet-value").innerHTML = document.getElementById("bet").value;
    document.getElementById("new-game-button").disabled = false;
}

function endGame() {
    if (player.score === 21 && dealer.score !== 21 && player.cards.length === 2) {
        document.getElementById("message-board").innerHTML = 'You win! You got BlackJack. Click "Deal" to keep playing';
        bet("win");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    else if (player.score > 21) {
        document.getElementById("message-board").innerHTML = 'You busted! The dealer wins. Click "Deal" to keep playing';
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    else if (dealer.score === 21 && player.score !== 21 && dealer.cards.length === 2) {
        document.getElementById("message-board").innerHTML = 'You lost. Dealer got BlackJack. Click "Deal" to keep playing';
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    else if (dealer.score > 21 && player.score <= 21) {
        document.getElementById("message-board").innerHTML = 'You win! Dealer busted. Click "Deal" to keep playing';
        bet("win");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    else if (player.score > dealer.score && player.score <= 21) {
        document.getElementById("message-board").innerHTML = 'You win! You had the higher score. Click "Deal" to keep playing';
        bet("win");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    else if (player.score < dealer.score && dealer.score <= 21) {
        document.getElementById("message-board").innerHTML = 'You lost. Dealer had the higher score. Click "Deal" to keep playing';
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    else if (player.score > 21 && dealer.score > 21) {
        document.getElementById("message-board").innerHTML = 'You lost. You and Dealer busted. Click "Deal" to keep playing';
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    else if (dealer.score === 21 && player.score === 21 && dealer.cards.length === 2 && player.cards.length > 2) {
        document.getElementById("message-board").innerHTML = 'You lost. Dealer got BlackJack. Click "Deal" to keep playing';
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    else if (player.score === 21 && dealer.score === 21 && player.cards.length === 2 && dealer.cards.length > 2) {
        document.getElementById("message-board").innerHTML = 'You win! You got higher BlackJack (1.5x money). Click "Deal" to keep playing';
        //dealer pays 1.5x in this situation
        bet("winOnePointFive");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money; 
        resetGame();
    }
    else if (player.score === dealer.score) {
        document.getElementById("message-board").innerHTML = 'You tied! Click "Deal" to keep playing';
        resetGame();
    }
    if (player.money <= 0) {
        document.getElementById("new-game-button").disabled = true;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById("message-board").innerHTML = "You lost! You are out of money <button onclick='location.reload();'>New Game</button>";
    }
}

function dealerDraw() {
    dealer.cards.push(deck.deckArray[numCardsPulled]);
    dealer.score = getCardsValue(dealer.cards);
    var dealerCards = document.getElementById("dealer-cards");

    var i = 0;
    var cardImgs = '';
    for (i; i < dealer.cards.length; i += 1) {
        cardImgs += "<img src='images/cards/" + dealer.cards[i].rank + dealer.cards[i].suit + ".png' alt='card'>";
    }
    if (dealer.cards.length < 2) {
        cardImgs += "<img src='images/cards/red_back.png' alt='card'>";
    }
    dealerCards.innerHTML = cardImgs;

    document.getElementById("dealer-score").innerHTML = "Dealer: " + dealer.score;
    numCardsPulled += 1;
}

function newGame() {
    document.getElementById("new-game-button").disabled = true;
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    document.getElementById("bet").disabled = true;
    document.getElementById("message-board").innerHTML = "Hit or Stand?";
    hit();
    hit();
    dealerDraw();
}

function hit() {
    player.cards.push(deck.deckArray[numCardsPulled]);
    player.score = getCardsValue(player.cards);
    var playerCards = document.getElementById("player-cards");
    var i = 0;
    var cardImgs = '';
    for (i; i < player.cards.length; i += 1) {
        cardImgs += "<img src='images/cards/" + player.cards[i].rank + player.cards[i].suit + ".png' alt='card'>";
    }
    playerCards.innerHTML = cardImgs;

    document.getElementById("player-score").innerHTML = "Player: " + player.score;
    numCardsPulled += 1;
    if (player.score > 21) {
        if (dealer.cards.length < 2) {
            dealerDraw();
        }
        endGame();
    }
}

function stand() {
    while (dealer.score < 17) {
        dealerDraw();
    }
    endGame();
}