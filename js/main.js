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


////////////////////////////////////////////////////////////////////////////////////////////////
//                                public variable section                                     //

var gameobj = {sittight:0, // counter for sittin tight through game
				 explore:0, // counter to determine number of times explore is choosen
				  upstiars:false, // counter not used yet
				    submitval:'',
				     storyPoint:0,}; // counter to progress game through 'levels'

	//item preload for game use
var amulet = {};
var bodyArmor = {};
var shield = {};
var consumable = {};


				//character initiation
var player = {voice: 'white'};	// active player
var enemy = {};					// Empty monster object, when defeated it empties and allows next monster to populate
var john = {};                  // John character to help you fight boss
var narrator = {voice: 'blue'}; // Narocube narrator to tell you whats happening


//////////////////////////////////////////////////////////////////////////////////////////////////////
//                     level dialoge in object to reference in decision functions                   //
var levelDialoge = {

	start:{
		blah:"",
		blahblah:""
	},
	cageSound:{
		goLook:"",
		goLookyes:"",
		goLookno:"Narocube: ",
		noMonster:""
	},
	doorSound:{
		goLook:"Narocube: The door looks like its been broken, and wont close all the way, seems risky \n Do you want to go through? 'yes' or 'no'",
		goLookyes:"",
		goLookno:"Narocube: Probably better to play it safe.",
		noMonster:"Narocube: Seems as though the door is just broken... huh."
	},
	growlSound:{
		goLook:"Narocube: The noise is around the corner, seems risky \n Do you want to go? 'yes' or 'no' ",
		goLookyes:"",
		goLookno:"Narocube: ",
		noMonster:"Narocube: Must have been farther down the hallway"
	},
	upstairSounds:{
		goLook:"",
		goLookyes:"",
		goLookno:"Narocube: ",
		noMonster:""
	},
	helpJohn:{
		goLook:"",
		goLookyes:"",
		goLookno:"Narocube: ",
		noMonster:""
	}
};


//////////////////////////////////////////////////////////////////////////////////////////////////
// 						    		initiation code                                             //

// set up new background design and initaite game play with story in dialoge box
var main = function() {
 
	$("#start").click(function(){    // initial event to start game
		$('.startOverlay').remove(); // removes start button
		$('.Jumbo-title').remove();	 // removes white text title

		mainLoop(); // initate game loop
	});

	return false;
};

$(document).ready(main); // when document is loaded, start the game sequence


/////////////////////////////////////////////////////////////////////////////////////////////
//                                 main game loop                                          //

function mainLoop() {
	console.log("entered mainloop"); //loop notification
	console.log(gameobj.storyPoint); // level notification
	switch (gameobj.storyPoint) {
		// introduction to game and asigning player id
		case 0: 
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

		// create player object with choosen type
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

		//intro function, John lets you know the set and setting.
		case 2: 
			john = new Companion();

			// would like to find 
			textDialogue(john, "John: Hey" + " " + player.name + " the ship should land in 15 minutes. I have to go up stairs to check on the landing sequence, exploring the ship might bring you some rewards");
			textDialogue(john, "John: This helper bot should help you around the ship.");
			textDialogue(narrator, "Narocube: Hello " + player.name + " I am Narocube, the helper bot John mentioned");
			// textDialogue(john, "John: Oh before I forget, the c command will allow you to use a potion to heal if you have it, not like you would need one anyway.");

			gameobj.storyPoint++;
			mainLoop();
		break;

		//Start game player choices
		case 3:
			textDialogue(narrator, "Narocube: Now that John is gone do you want to: explore, or sit tight");
			formSubmit(start);
		break;
			
		//cage sound causes curiousness, find torn cage
		case 4:
			// insert screeaching sound alert("screeeeeeeach");
			textDialogue(narrator, "Narocube: Hey, whats that sound! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'");
			formSubmit(cageSound);
		break;

		// space door sound alerts player to broken door, first initiation of possible combat
		case 5:
			// insert space door sound alert("sound space doors make"); 
			textDialogue(narrator, "Narocube: Oh what now! \n Do you want to:'go look', 'explore' the ship, or 'sit tight'");
			formSubmit(doorSound);
		break;

		// growling down the hallway implys more monsters on ship. possiblity to initiate combat again
		case 6:
			// insert growling sounds from down the hallway
			textDialogue(narrator, "Narocube: There is a growling sound from down the hallway \n Do you want to:'go look', 'explore' the ship, or 'sit tight'");
			formSubmit(growlSound);
		break;

		// stomping from upstairs also implys more monster, also allows for possible combat ( might require more work with story for going upstairs)
		case 7:
			// alert("Stomping noises from upstairs");
			textDialogue(narrator, "Narocube: Hey listen there must be other people on the ship! \n Do you want to:'go look', 'explore' the ship, or 'sit tight'");
			formSubmit(upstairSounds);
		break;

		// John screams for help upstairs wich also requires upstairs plot point
		case 8:
			// alert("John screams for help from upstairs");
			textDialogue(narrator, "Narocube: What a could his problem be! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'");
			formSubmit(helpJohn);
		break;

		// possibly one more level 

		// vehicle begins to land and queen drops from cieling, potentially if you 'sit tight' hole game the vehicle just lands.
		case 10:
			textDialogue(narrator, "Narocube: vehicle begins to shake uncontrolably \n we must be starting the landing sequence");
			formSubmit(vehicleShaking);
		break;

		// case 10:

		// winning = true;
		// break;
	}
}


/////////////////////////////////////////////////////////////////////////////////////////////
//                                specific level code                                      //


// initiate game sequence
function start(action) {
	
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

	switch (action) {
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
		textDialogue(narrator, "Narocube: It must be some sort of queen animal")
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

//vehicle has landed and you have survived
function winnerWinner() {

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


	// to call april super class, need a better method than keydown
	// $(document).keydown(function(key) {
	// 	if (key == 65){
	// 		id = "april";
	// 		characterChoice (yourName, id);
	// 	}
	// });