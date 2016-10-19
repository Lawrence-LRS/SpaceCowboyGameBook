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
var sittight = {value:0}; // counter for ignored warnings on deck (if fully ignored game will end in victory)
var explore = {value:0}; // number of opened chests to determine explore order
var player = {};
var enemy = {};
var john = {};
var narrator = {voice: 'white'}

// set up new background design and initaite game play with story in dialoge box
var main = function() {
	// dialoge: 
	$("#start").click(function(){
		$('.startOverlay').remove();
		$('.Jumbo-title').remove();
		initiateGame();
	});

	return false;
};

$(document).ready(main);

// Function that passes the input to both display and interact
// $('form').submit(function() {
//     var pass = $('#action').val();
//     var low = pass.toLowerCase();
//     display(player, pass);
//     return false;
//   });

// Function that displays a string which is passed to it
// function display(who, str) {
//   if(str !== "") {
//     var action = $('<p>').text(str);
//     action.css('color', who.voice);
//     action.prependTo($('.dialogue'));
//     $('#action').val("");
//   }
// }



// Alert player to be ready to play game
function initiateGame() {
	alert("Welcome to Lawrence Goedrich's Choose your own adventure game!!");

	// call player for name
	var yourName = prompt("Warrior, what shall I call you?");

	$( ".overlay" ).toggle();

	$('.overlay').on('click', function(){
		var id = event.target.id;
		//choose player type and create player object 
		characterChoice (yourName, id);
	});

	// to call april super class, need a better method than keydown
	// $(document).keydown(function(key) {
	// 	if (key == 65){
	// 		id = "april";
	// 		characterChoice (yourName, id);
	// 	}
	// });
};




function storyTime(){

	intro();

	continue1(); //initiate game control

	cageSound();

	doorSound();

	growlSound();

	upstairSounds();
}



// have john leave and give control to player
function intro() {
	john = Companion();
	// display(john, "Hey" + " " + player.name + " the ship should land in 15 minutes. I have to go up stairs to check on the landing sequence, exploring the ship might bring you some rewards");
};


// initiate game sequence
function continue1() {

	var action = prompt("Now that John is gone do you want to: explore, or sit tight").toLowerCase();
	switch (action) {
		case 'explore':
			explore.value++;
			alert("Hey," + " " + player.name + " you found a chest!");
			chestW();
		break;

		case 'sit tight':
			alert("Good choice we should probably wait for John to get back.");
			sittight.value++;
		break;

		default:
			alert("Try again, maybe 'explore', or 'sit tight'");
			continue1();
	}
};


// the cage sounds like its being broken
function cageSound() {
	alert("screeeeeeeach");
	var action = prompt("Hey, whats that sound! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look':
			alert("oh wow this cage has been pulled apart, what could have caused this!");
		break;

		case 'explore':
			alert("Good choice, it's probably just cargo shifting");
			switch(explore.value) {
				case 0:
					explore.value++;
					alert("Hey," + " " + player.name + " you found a case!");
					chestW ();

				break;

				case 1:
					explore.value++;
					alert("Hey," + " " + player.name + " you found stairs!");
					action = confirm("Do you want to go upstairs? 'yes' or 'no' ")
					if (action == true) {
						// stairs1();
					} 
				break;
			}	
		break;

		case 'sit tight':
			alert("Good choice, it's probably just cargo shifting, we should probably wait for John to get back... what does this ship haul anyway?");
			sittight.value++;
		break;

		default:
			alert("Try again, maybe; 'go look', 'explore', or 'sit tight'");
			cageSound();
	}
}


// door by the cage opens and doesn't close all the way
function doorSound() {

	alert("sound space doors make");
	var action = prompt("Oh what now! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look':
			action = confirm("The door looks like its been broken, and wont close all the way, seems risky \n Do you want to go through?");
			if (action) {
				chestorMonster();
				if (enemy.health != 0 || "") { // || empty object?
					//fight monster
					fightMonster();
				}
			}
		break;

		case 'explore':
			alert("Good choice, it's probably just John or another crew member");
			switch(explore.value) {
				case 0:
					explore.value++;
					alert("Hey," + " " + player.name + " you found a case!");
					chestW ();
				break;

				case 1:
					explore.value++;
					alert("Hey," + " " + player.name + " you found stairs!");
					action = confirm("Do you want to go upstairs? 'yes' or 'no' ")
					if (action == true) {
						// stairs1();
					} 
				break;

				// case 2:
				// 	// explore up the stairs
				// break;
			}	
		break;

		case 'sit tight':
			alert("Good choice, it's probably just John or another crew member, we should probably wait for John to get back... Is there anyone else on the ship?");
			sittight.value++;
		break;

		default:
			alert("Try again, maybe; 'go look', 'explore', or 'sit tight'");
			doorSound();
	}
}

// growling from down the hallway behind that door
function growlSound() {

	var action = prompt("There is a growling sound from down the hallway \n Do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look':
			action = confirm("The noise is around the corner, seems risky \n Do you want to go?");
			if (action) {
				chestorMonster();
				if (enemy.health != 0 || "") { // || empty object?
					//fight monster
					fightMonster();
				} else {
					alert('Must have been farther down the hallway')
				}
			}
		break;

		case 'explore':
			alert("Good choice, it's probably just a crew members dog");
			switch(explore.value) {
				case 0:
					explore.value++;
					alert("Hey," + " " + player.name + " you found a case!");
					chestW ();
				break;

				case 1:
					explore.value++;
					alert("Hey," + " " + player.name + " you found stairs!");
					action = confirm("Do you want to go upstairs? 'yes' or 'no' ")
					if (action == true) {
						// stairs1();
					} 
				break;

				// case 2:
				// 	// explore up the stairs
				// break;

				// case 3:
				// // more up stairs exploring
				// break;
				}	
		break;

		case 'sit tight':
			alert("Good choice, it's probably just a crew members dog, we should probably wait for John to get back... wheres the dog food?");
			sittight.value++;
			
		break;

		default:
			alert("Try again, maybe; 'go look', 'explore', or 'sit tight'");
			growlSound();
	}
}


//foot steps from upstairs
function upstairSounds(){

alert("Stomping noises from upstairs");
var action = prompt("Hey listen there must be other people on the ship! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look':
			// alert("Hey," + " " + player.name + " you found stairs!");
			// action = confirm("Do you want to go upstairs? 'yes' or 'no' ")
			// if (action == true) {
			// 	// stairs1();
			// } 
		break;

		case 'explore':
			alert("Good choice, it's probably just a crew members dog");
			switch(explore.value) {
				case 0:
					explore.value++;
					alert("Hey," + " " + player.name + " you found a case!");
					chestW ();
				break;

				case 1:
					explore.value++;
					alert("Hey," + " " + player.name + " you found stairs!");
					action = confirm("Do you want to go upstairs? 'yes' or 'no' ")
					if (action == true) {
						// stairs1();
					} 
				break;

				// case 2:
				// 	// explore up the stairs
				// break;

				// case 3:
				// // more up stairs exploring
				// break;

				// case 4:
				// // more up stairs exploring
				// break;
				}	
		break;

		case 'sit tight':
			alert("Yeah you are probably right, no reason to bother them at work");
			sittight.value++;
			helpJohn();
		break;

		default:
			alert("Try again, maybe; 'go look', 'explore', or 'sit tight'");
			upstairSounds();
	}
}


//John asks for help behind the door
function helpJohn(){

alert("John screams for help from upstairs");
var action = prompt("What a could his problem be! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look':
			
		break;

		case 'explore':
		alert("Good choice, it's probably just cargo shifting");

			switch(explore.value) {

				case 0:
					alert("Hey," + " " + player.name + " you found a case!");
					chestW ();
					explore.value++;
				break;

				case 1:
					alert("Hey," + " " + player.name + " you found stairs!");
					stairs1();
				break;
			}

		
		break;

		case 'sit tight':


			sittight.value++;
			console.log(sittight.value);
			vehicleShaking();
		break;

		default:
			alert("Try again, maybe; 'go look', 'explore', or 'sit tight'");
			helpJohn();
	}
}

//vehicle shakes during landing
function vehicleShaking() {

	alert("vehicle begins to shake uncontrolably \n we must be starting the landing sequence");

	if ( sittight.value == 6) {
		//John comes throught the door and tells you to hold on tight, the queen doese not emerge and you win
		winnerWinner();
	} else{
		//queen falls through the ceiling, when she gets to 75% heath john will come in and attack with you
		//if the queen falls you win, if you die you loose
		var queen = new monsterBoss();
		if (queen.health != 0){
			//fight her
		} else {
			winnerWinner();
		}
	}
}

//vehicle has landed
function winnerWinner(){
	// John walks to you and says seems like its about that time, bay doors open and you say YEE-HA
	alert("Hey, you win! \n Go home... refresh to play again");

}




function stairs1(){
var action = prompt("Hey, these dont look like the safest stairs! \n do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

}




































//if you die
function dead() {

alert("It seems as though you have fallen great warrior");
alert("Try again? maybe this time you sit tight or explore more?");

var action = prompt("Would you like to play again, yes, no").toLowerCase();

	switch (action){
		case 'yes':
		initiateGame();
		break;

		case 'no':
			alert("Hope you enjoyed your time anywya.");
		break;

		case 'one more time':
			// heal player to half health and start back where he was
		break;

		default:
			alert("I'll take that as a yes!")
			initiateGame();
	}
}

