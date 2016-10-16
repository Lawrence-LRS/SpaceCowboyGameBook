/*
Title: Space Cowboy adventure game
-----------------------------------
The name of the game is to clear the ship of the escaped monsters, collecting items, and wait
for your friend to come back while the ship lands and escape.


A Lawrence Goedrich Original!

--------------
--------------
GAME WORLD
--------------
--------------


Wins and Losses
----------------
- Win: Stay alive and walk out the ship with John
- Lose: Get eaten
*/

//initiate game and start adventure



// public variable section
var sittight = 0; // counter for ignored warnings on deck (if fully ignored game will end in victory)

// set up new background design and initaite game play with story in dialoge box
var main = function() {
	// dialoge: 
	$("#start").click(function(){
		$('.startOverlay').remove();
		initiateGame();
	});

	return false;
};

$(document).ready(main);

// Alert player to be ready to play game
function initiateGame() {
	
	alert("Welcome to Lawrence Goedrich's Choose your own adventure game!!");

	// call player for name
	var yourName = prompt("Warrior, what shall I call you?");

	$( ".overlay" ).toggle();
	//choose player type and create player object
	var player = characterChoice (yourName);

	//starting the story
	storyTime(player);
};

function storyTime(player){

	intro(player);

	continue1();

}






// have john leave and give control to player
function intro(player) {
	alert("John: Hey" + " " + player.name + " the ship should land in 15 minutes. I have to go up stairs to check on the landing sequence");
};

function continue1(){

	var action = prompt("Now that John is gone do you want to: explore, or sit tight").toLowerCase();
	switch (action) {
		case 'explore':
			alert("Hey," + player.name + " you found a case!");
			chestW (player.type);
			alert("screeeeeeeach")
			cagesound();
		break;

		case 'sit tight':
			alert("Good choice we should probably wait for John to get back.");
			sittight++;
			alert("screeeeeeeach")
			cagesound();
		break;
		default:
			alert("Try again")
			continue1();
	}
};

function cageSound(){
	var action = prompt("Hey, whats that sound! \n do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look'
			alert("oh wow this cage has been pulled apart, what could have caused this!")
			alert("sound space doors make")
			doorSound();
		break;

		case 'explore':
			alert("Hey," + player.name + " you found stairs!");
			stairs1();
		break;

		case 'sit tight':
			alert("Good choice, it's probably just cargo shifting, we should probably wait for John to get back... what does this ship haul anyway?");
			sittight++;
			alert("sound space doors make")
			doorsound();
		break;
		default:
			alert("Try again")
			cageSound();
	}

}
function stairs1(){


}


function doorSound(){
var action = prompt("Hey, whats that sound! \n do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look'
			alert("oh wow this cage has been pulled apart, what could have caused this!")
			alert("sound space doors make")
			doorSound();
		break;

		case 'explore':
			alert("Hey," + player.name + " you found stairs!");
			stairs1();
		break;

		case 'sit tight':
			alert("Good choice, it's probably just John or another crew member, we should probably wait for John to get back... Is there anyone else on the ship?");
			sittight++;
			alert("sound space doors make")
			doorsound();
		break;
		default:
			alert("Try again")
			doorSound();
	}


}