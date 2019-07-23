// make a list of all memory card elements
// and store them in constant variables
const cards = document.querySelectorAll(".card");
const scoreBoard = document.querySelector("#scoreDisplay");

// the game should keep track of and display the number of times a card has flipped over
let score = 0;
scoreBoard.innerText = score;
// bonus = store the lowest scoring games in local storage, and display the list of best scores

let card1, card2;
let flipped = false; // used for determining if it's card1 or card2
let glueCard = false; // used for preventing double clicks

cards.forEach(card => card.addEventListener("click", flipCard))

alert("@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + "\n" + 
	  "@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + "\n" + 
	  "@@@                           Welcome!                            @@@" + "\n" +
	  "@@@              Pick the matching cards.                @@@" + "\n" +
	  "@@@   To make this easier, turn on your audio.  @@@" + "\n" +
	  "@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + "\n" + 
	  "@@@@@@@@@@@@@@@@@@@@@@@@@@@@"); 

function playSound(kanaSound) {
	let audio = new Audio('./sounds/' + kanaSound + '.mp3');
	audio.play();
}

function flipCard() {
	// if glueCard is on (aka true), flipCard won't be executed
	if (glueCard) return; 

	// can't click the same card twice. move along, now
	if (this === card1) return; 

	// if it's there, delete the 'flip' class. If not, then add it.
	this.classList.toggle("flip"); 

	// play the sound of the kana
	playSound(this.dataset.kana);

	// if it is the first click...
	if (flipped === false) { 
		flipped = true; // 
		card1 = this; // call this the first card
		return; // make sure to move on
	} 
	// else...
	// flipped = false;
	card2 = this;

	matchCheck();
}

function matchCheck() {
	if (card1.dataset.kana === card2.dataset.kana) {
		// if the two selected cards match...
		// make it so they can't flip anymore.
		disableCards();
	} else {
		// if not a match...
		unflipCards();
		setTimeout(() => {
			score++; // increase the score
			scoreBoard.innerText = score;
		}, 1000);
	}
}

function disableCards() { 
	// If they are a match, disable event listeners to prevent future clicks 
	// they should stay flipped over, and not flip over when clicked
	card1.removeEventListener("click", flipCard);
	card2.removeEventListener("click", flipCard);
	// fail();
	resetFlippedCards(); // unflip, unglue (make them clickable), reset vars
}

function unflipCards() {
	glueCard = true;
	setTimeout(() => {
			card1.classList.remove("flip");
			card2.classList.remove("flip");
			resetFlippedCards();
		}, 1000);
}

function resetFlippedCards() { 
// after each round, flip over the wrong cards
flipped = false;

// then make it possible to click (flip) them again
glueCard = false;

// and reset the cards to have no value, as when first declared
card1 = null;
card2 = null;
}

// IIFE -- must always be placed at the end?
(function shuffle() { // Immediately invoked function expression -- 
	// function will be executed right after its definition
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 90);
		card.style.order = randomPos;
	});
})();

//##################  Wish List  ######################\\

// add a text file to parent folder with best (lowest) score

// Write a score function
// 1. Determine when the last card is flipped
// 2. Compare the score to the best score in the other file
// 3. Change the other file if your score is lower
// 4. Import the score
// 5. Assign it to a variable, and add it to info-box


// I want there to be a visual cue when the cards don't match
function fail() {
	// cards.classList.add("fail");  cards is undefined 
}
// or maybe another colorful effect when the cards are correct

// reset the game with a button ?

// an introductory message overlaid onto board?

// create all the HTML card elements by looping through an array



