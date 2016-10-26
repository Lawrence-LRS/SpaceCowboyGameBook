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

var gameobj = {sittight:0, explore:0, upstiars:false, txtsubmit: false, submitval:''};
	// counter for ignored warnings on deck (if fully ignored game will end in victory)
	// number of opened chests to determine explore order
	// upstairs check

//items
var amulet = {};
var bodyArmor ={};
var shield = {};
var consumable = {};

//character initiation
var player = {voice: 'white'};
var enemy = {};
var john = {};
var narrator = {voice: 'blue'};

// set up new background design and initaite game play with story in dialoge box
var main = function() {
	// dialoge: 
	$("#start").click(function(){
		$('.startOverlay').remove();
		$('.Jumbo-title').remove();

		// Function that passes the input to both display and interact
		$('form').submit(function() {
		    var pass = $('#action').val();
		    if ( pass !== ""){
		    	gameobj.txtsubmit = true;
		    	var low = pass.toLowerCase();
		    	gameobj.submitval = low;
		    	txtsubmit = true;
		    }

		    return false;
		});

		mainLoop();
	});

	return false;
};






$(document).ready(main);






// Function that displays a string which is passed to it
function textDialogue(who, str) {
		var action = $('<p>').text(str);
		action.css('color', who.voice);
		$(action).hide().prependTo('.dialogue').fadeIn('slow');
		$('#action').val("");
}






// Alert player to be ready to play game
function initiateGame() {
	




	// to call april super class, need a better method than keydown
	// $(document).keydown(function(key) {
	// 	if (key == 65){
	// 		id = "april";
	// 		characterChoice (yourName, id);
	// 	}
	// });
}




function mainLoop() {
	var winning = false;
	while (winning = false){

		switch (storypoint){
			case 0: // introduction to game and asigning player id
				textDialogue(narrator, "Welcome to Lawrence Goedrich's Choose your own adventure game!!");

				// call player for name
				textDialogue(narrator, "Warrior, what shall I call you?");

				var yourName = gameobj.submitval;

				$( ".overlay" ).toggle();

				$('.overlay').on('click', function(){
					var id = event.target.id;
					//choose player type and create player object 
					characterChoice (yourName, id);
				});




			break;

			case 1:
				var exit = false;
				while (exit = false){
					exit = intro();
				}
				storypoint++;
			break;

			case 2:
				var exit = false;

					textDialogue(narrator, "Narocube: Now that John is gone do you want to: explore, or sit tight");

				while (exit = false){
					exit = continue1(); //initiate game control
				}

				storypoint++;
			break;
				

			case 3:
				// cageSound();
			break;	

			case 4:
				// doorSound();
			break;

			case 5:
				// growlSound();
			break;

			case 6:
				// upstairSounds();
			break;

			case 10:

			winning = true;
			break;
		}
		
	}

}


  
// have john leave and give control to player
function intro() {
	john = new Companion();

	textDialogue(john, "John: Hey" + " " + player.name + " the ship should land in 15 minutes. I have to go up stairs to check on the landing sequence, exploring the ship might bring you some rewards");
	textDialogue(john, "John: This helper bot should help you around the ship.");
	textDialogue(narrator, "Narocube: Hello " + player.name + " I am Narocube, the helper bot John mentioned");
	// textDialogue(john, "John: Oh before I forget, the c command will allow you to use a potion to heal if you have it, not like you would need one anyway.");
	return true;
}


// initiate game sequence
function continue1() {
	var action = false;

		

		action = gameobj.submitval;
		textDialogue(player, player.name +": I think that I will" + " " + action);

	if (gameobj.txtsubmit == true ) {
		switch (action) {
			case 'explore':
				exploreship(gameobj.explore);
			break;

			case 'sit tight':
				textDialogue(narrator, "Narocube: Good choice we should probably wait for John to get back.");
				gameobj.sittight++;
			break;

			default:
				gameobj.txtsubmit = false;
				textDialogue(narrator, "Narocube: Try again, maybe 'explore', or 'sit tight'");
				continue1();
		}
		gameobj.txtsubmit = false;
		action = true;
	}

	if ( gameobj.txtsubmit == false && action == true){
		action = false;
		return;
	} else {
		setTimeout(continue1, 2000);
	}
}


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

			exploreship(gameobj.explore);
		break;

		case 'sit tight':
			alert("Good choice, it's probably just cargo shifting, we should probably wait for John to get back... what does this ship haul anyway?");
			gameobj.sittight++;
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
				if (Object.getOwnPropertyNames(enemy).length != 0) { // || empty object?
					//fight or flight monster
					fightorflight();
				} else {
					alert("Seems as though the door is just broken, huh.");
				}
			} else {
				alert("Probably better to play it safe.");
			}
		break;

		case 'explore':
			alert("Good choice, it's probably just John or another crew member");

			exploreship(gameobj.explore);
		break;

		case 'sit tight':
			alert("Good choice, it's probably just John or another crew member, we should probably wait for John to get back... Is there anyone else on the ship?");
			gameobj.sittight++;
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
				if (Object.getOwnPropertyNames(enemy).length != 0) { // || empty object?
					//fight or flight monster
					fightorflight();
				} else {
					alert('Must have been farther down the hallway')
				}
			} else {
				alert("Probably better to play it safe.");
			}
		break;


		case 'explore':
			alert("Good choice, it's probably just a crew members dog");

			exploreship(gameobj.explore);
		break;

		case 'sit tight':
			alert("Good choice, it's probably just a crew members dog, we should probably wait for John to get back... wheres the dog food?");
			gameobj.sittight++;
			
		break;

		default:
			alert("Try again, maybe; 'go look', 'explore', or 'sit tight'");
			growlSound();
	}
}


//foot steps from upstairs
function upstairSounds() {

	alert("Stomping noises from upstairs");
	var action = prompt("Hey listen there must be other people on the ship! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look':
			alert("Hey," + " " + player.name + " you found stairs!");
			// action = confirm("Do you want to go upstairs? 'yes' or 'no' ")
			// if (action == true) {
			// 	// stairs1();
			// } 
			action = confirm("The noise is around the corner, seems risky \n Do you want to go?");
			if (action) {
				chestorMonster();
				if (Object.getOwnPropertyNames(enemy).length != 0) { // || empty object?
					//fight or flight monster
					console.log(enemy.damage);
					fightorflight();
				} else {
					alert('Must have been farther down the hallway')
				}
			} else {
				alert("Probably better to play it safe.");
			}

		break;

		case 'explore':
			alert("Good choice, it's probably just a crew members dog");

			exploreship(gameobj.explore);
		break;

		case 'sit tight':
			alert("Yeah you are probably right, no reason to bother them at work");
			gameobj.sittight++;
			helpJohn();
		break;

		default:
			alert("Try again, maybe; 'go look', 'explore', or 'sit tight'");
			upstairSounds();
	}
}


//John asks for help behind the door
function helpJohn() {

	alert("John screams for help from upstairs");
	var action = prompt("What a could his problem be! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look':
			
		break;

		case 'explore':
			alert("Good choice, it's probably just cargo shifting");

			exploreship(gameobj.explore);
		break;

		case 'sit tight':


			gameobj.sittight++;
			console.log(gameobj.sittight);
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

	if ( gameobj.sittight == 6) {
		//John comes throught the door and tells you to hold on tight, the queen doese not emerge and you win
		winnerWinner();
	} else {
		//queen falls through the ceiling, when she gets to 75% heath john will come in and attack with you
		//if the queen falls you win, if you die you loose
		var queen = new monsterBoss();
		if (queen.health != 0) {
			//fight her
		} else {
			winnerWinner();
		}
	}
}

//vehicle has landed
function winnerWinner() {
	// John walks to you and says seems like its about that time, bay doors open and you say YEE-HA
	alert("Hey, you win! \n Go home... refresh to play again");

}




function stairs1() {
	var action = prompt ("Hey, these dont look like the safest stairs! \n do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

}













// //stair case
// 	case 1:
// 		explore.value++;
// 		alert("Hey," + " " + player.name + " you found stairs!");
// 		action = confirm("Do you want to go upstairs? 'yes' or 'no' ")
// 		if (action == true) {
// 			// stairs1();
// 		} 
// 	break