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

var gameobj = {sittight:0, explore:0, upstiars:false, txtsubmit: false, submitval:'', storyPoint:0,};
	// counter for ignored warnings on deck (if fully ignored game will end in victory)
	// number of opened chests to determine explore order
	// upstairs check

	//item preload for game use
var amulet = {};
var bodyArmor ={};
var shield = {};
var consumable = {};

	//character initiation
// active player
var player = {voice: 'white'};
// Empty monster object, when defeated it empties and allows next monster to populate
var enemy = {};
// John character to help you fight boss
var john = {};
// Narocube narrator to tell you whats happening
var narrator = {voice: 'blue'};

// set up new background design and initaite game play with story in dialoge box
var main = function() {
	// dialoge: 
	$("#start").click(function(){    // initial event to start game
		$('.startOverlay').remove(); // removes start button
		$('.Jumbo-title').remove();	 // removes white text title

		mainLoop(); // initate game loop
	});

	return false;
};

$(document).ready(main); // when document is loaded, start the game sequence

	// to call april super class, need a better method than keydown
	// $(document).keydown(function(key) {
	// 	if (key == 65){
	// 		id = "april";
	// 		characterChoice (yourName, id);
	// 	}
	// });

// main game loop
function mainLoop() {
	console.log("entered mainloop"); //loop notification
	console.log(gameobj.storyPoint); // level notification
	switch (gameobj.storyPoint) {
		case 0: // introduction to game and asigning player id
			textDialogue(narrator, "Welcome to Lawrence Goedrich's Choose your own adventure game!!");

			// call player for name
			textDialogue(narrator, "Warrior, what shall I call you?");

			(function(){
				$('form').submit(function() {
				    var pass = $('#action').val().toLowerCase();
				    if ( pass !== ""){
				    	//doesn't matter for name, just not empty
				    	player.name = pass;
				    	textDialogue(player, player.name +": My name is " + pass);
						console.log("player has name");
				    	gameobj.storyPoint++;
				    	$('form').unbind();
				    	mainLoop();					    	
				    } else {
				    	textDialogue(narrator, "please choose a real name and not ' '");
				    }
					return false;
				});
			})();
		break;

		case 1:
			$( ".overlay" ).toggle();

			textDialogue(narrator, "Please choose a hero class");

			$('.overlay').on('click', function(){
				var chartype = event.target.id;
				if (chartype === 'rouge' ||chartype === 'soldier' ||chartype === 'tank') {
					//choose player type and create player object 
					console.log(chartype);
					characterChoice (player.name, chartype);
					gameobj.storyPoint++;
					mainLoop();
				} else {
					textDialogue(narrator, "Try clicking on one of the images.");
				}
			}); // choosing player type (rouge, soldier, tank)
		break;

		case 2: //intro function, John lets you know the set and setting.
			john = new Companion();

			// would like to find 
			textDialogue(john, "John: Hey" + " " + player.name + " the ship should land in 15 minutes. I have to go up stairs to check on the landing sequence, exploring the ship might bring you some rewards");
			textDialogue(john, "John: This helper bot should help you around the ship.");
			textDialogue(narrator, "Narocube: Hello " + player.name + " I am Narocube, the helper bot John mentioned");
			// textDialogue(john, "John: Oh before I forget, the c command will allow you to use a potion to heal if you have it, not like you would need one anyway.");

			gameobj.storyPoint++;
			mainLoop();
		break;

		case 3:
			textDialogue(narrator, "Narocube: Now that John is gone do you want to: explore, or sit tight");
			formSubmit(continue1);
		break;
			

		case 4:
			// insert screeaching sound alert("screeeeeeeach");
			textDialogue(narrator, "Narocube: Hey, whats that sound! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'");
			formSubmit(cageSound);
		break;

		case 5:
			// insert space door sound alert("sound space doors make"); 
			textDialogue(narrator, "Narocube: Oh what now! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'");
			formSubmit(doorSound);
		break;

		case 6:
			// insert growling sounds from down the hallway
			textDialogue(narrator, "Narocube: Oh what now! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'");
			formSubmit(growlSound);
		break;

		case 7:
			// alert("Stomping noises from upstairs");
			textDialogue(narrator, "Narocube: Hey listen there must be other people on the ship! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'");
			formSubmit(upstairSounds);
		break;

		// case 7:
		
		// 	formSubmit(upstairSounds);
		// break;

		case 10:
			textDialogue(narrator, "Narocube: vehicle begins to shake uncontrolably \n we must be starting the landing sequence");
			formSubmit(vehicleShaking);
		break;

		// case 10:

		// winning = true;
		// break;
	}
}


// initiate game sequence
function continue1(action) {
	
		switch (action) {
			case 'go look':
				textDialogue(narrator, "Narocube: What are you going to look at??")
			break;

			case 'explore':
				exploreship(gameobj.explore);
				gameobj.explore++;
			break;

			case 'sit tight':
				textDialogue(narrator, "Narocube: Good choice we should probably wait for John to get back.");
				gameobj.sittight++;
			break;	
		}
}

// the cage sounds like its being broken
function cageSound(action) {

	switch (action) {
		case 'go look':
			textDialogue(narrator, "Narocube: oh wow this cage has been pulled apart, what could have caused this!");
		break;

		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, it's probably just cargo shifting");
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, it's probably just cargo shifting, we should probably wait for John to get back... what does this ship haul anyway?");
			gameobj.sittight++;
		break;
	}
}


// door by the cage opens and doesn't close all the way
function doorSound(action) {

	switch (action) {
		case 'go look':
			textDialogue(narrator, "Narocube: The door looks like its been broken, and wont close all the way, seems risky \n Do you want to go through?");
			action = confirm("");
			if (action) {
				chestorMonster();
				if (Object.getOwnPropertyNames(enemy).length != 0) { // || empty object?
					//fight or flight monster
					fightorflight();
				} else {
					textDialogue(narrator, "Narocube: Seems as though the door is just broken... huh.");
				}
			} else {
				textDialogue(narrator, "Narocube: Probably better to play it safe.");
			}
		break;

		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, it's probably just John or another crew member");
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, it's probably just John or another crew member, we should probably wait for John to get back... Is there anyone else on the ship?");
			gameobj.sittight++;
		break;
	}
}

// growling from down the hallway behind that door
function growlSound(action) {

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
					textDialogue(narrator, "Narocube: Must have been farther down the hallway");
				}
			} else {
				textDialogue(narrator, "Narocube: Probably better to play it safe.");
			}
		break;


		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, it's probably just a crew members dog");
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, it's probably just a crew members dog, we should probably wait for John to get back... wheres the dog food?");
			gameobj.sittight++;
			
		break;
	}
}


//foot steps from upstairs
function upstairSounds(action) {

	switch (action) {
		case 'go look':
			textDialogue(narrator, "Narocube: Hey," + " " + player.name + " you found stairs!");
			// action = confirm("Do you want to go upstairs? 'yes' or 'no' ")
			// if (action == true) {
			// 	// stairs1();
			// } else {
			// 	break;
			// }
			// action = confirm("The noise is around the corner, seems risky \n Do you want to go?");
			// if (action) {
			// 	chestorMonster();
			// 	if (Object.getOwnPropertyNames(enemy).length != 0) { // || empty object?
			// 		//fight or flight monster
			// 		console.log(enemy.damage);
			// 		fightorflight();
			// 	} else {
			// 		textDialogue(narrator, "Narocube: Must have been farther down the hallway");
			// 	}
			// } else {
			// 	textDialogue(narrator, "Narocube: Probably better to play it safe.");
			// }

		break;

		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, it's probably best to keep lookin around, wouldn't want to bother them");
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Yeah you are probably right, no reason to bother them at work, its not like you're not scared, are you?");
			gameobj.sittight++;
		break;
	}
}


//John asks for help behind the door
function helpJohn(action) {

	alert("John screams for help from upstairs");
	var action = prompt("What a could his problem be! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'").toLowerCase();

	switch (action) {
		case 'go look':
			
		break;

		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, we can keep stealing stuff, sounds like that will take a while.");
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, Nothing puts me to sleep like the screems of my friends");
			gameobj.sittight++;
		break;
	}
}

//vehicle shakes during landing
function vehicleShaking() {


	if ( gameobj.sittight == 6) {
		//John comes throught the door and tells you to hold on tight, the queen doese not emerge and you win
		winnerWinner();
	} else {
		textDialogue(narrator, "Narocube: Holy shit, what is that, how can something so large be alive");
		textDialouge(narrator, "Narocube: It must be some sort of queen animal")
		//queen falls through the ceiling, when she gets to 75% heath john will come in and attack with you
		//if the queen dies you win, if you die you loose
		var queen = new monsterBoss();
		if (queen.health != 0) {
			if (helpjohn === true){

			} else if (queen.health <= (.75*queen.maxhp)) {

			}

			//fight her
			
		} else {
			textDialogue(narrator, "Narocube: You did it she's DEAD");
			winnerWinner();
		}
	}
}

//vehicle has landed
function winnerWinner() {
	// John walks to you and says seems like its about that time, bay doors open and you say YEE-HA

	textDialogue(john, "John: Hey, well that wasn't so bad.");
	textDialogue(player, player.name + ": Yeah I suppose that could have gone worse");
	textDialogue(john, "John: Looks like its about that time...");
	textDialogue(player, player.name + ": YEE-HAW");

	// add firework image and such to signify more than just text
	textDialogue(narrator, "Narocube: Hey, you win! \n Go home... refresh to play again");
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