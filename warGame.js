
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
}

class Deck {
    constructor() {
        this.cards = []; // empty array to store cards in the deck
    }

    initializeDeck() {
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffle() {
        // currentIndex keeps track of the current index in the array
        let currentIndex = this.cards.length;

        // temporaryValue used for temporary storage when swapping cards. randomIndex holds a randomly generated index
        let temporaryValue, randomIndex;

        // loop continues untill currentIndex reaches 0
        while(currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue; // swap cards randomly to shuffle the deck
        }
    }

    deal() {
        return this.cards.pop(); // remove and return the top card from the deck
    }

}

class Player {
    constructor(name) {
        this.name = name; // name of player
        this.score = 0; // inistalize the score to 0
        this.hand = []; // empty arrau to store the cards in the players hands
    }

    playCard() {
        return this.hand.shift(); // remove and return the top card from the players hand
    }

    addCard(card) {
        this.hand.push(card); // add card to the players hand
    }

    addPoint(){
        this.score++; // increments players score by 1
    }
}

let playWarGame = () => {
    // creating the players
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');
    // creats new deck
    const deck = new Deck();

    deck.initializeDeck(); // inistalize deck
    deck.shuffle(); // shuffle deck
    
    // deal card to players untill each has 26 cards in hand
    for(let i = 0; i < 26; i++) {
        player1.addCard(deck.deal()); // deal a card to player 1
        player2.addCard(deck.deal()); // deal cards to player 2
    }

    // players play a card
    while (player1.hand.length > 0) {
        const card1 = player1.playCard();
        const card2 = player2.playCard();

        console.log(`${player1.name} plays ${card1.rank} of ${card1.suit}`);
        console.log(`${player2.name} plays ${card2.rank} of ${card2.suit}`);

        if(card1.rank > card2.rank) {
            player1.addPoint();
            console.log(`${player1.name} wins the round!`);
        } else if (card1.rank < card2.rank) {
            player2.addPoint();
            console.log(`${player2.name} wins the round!`);
        } else {
            console.log("It's a tie!");
        }
    }

    console.log("Game over!")
    console.log(`${player1.name} score: ${player1.score}`);
    console.log(`${player2.name} score: ${player2.score}`);
    
    if(player1.score > player2.score) {
        console.log(`${player1.name} wins the game!`);
    } else if(player1.score < player2.score) {
        console.log(`${player2.name} wins the game!`);
    } else {
        console.log("The game is a tie!")
    }
}

// run the game
playWarGame();