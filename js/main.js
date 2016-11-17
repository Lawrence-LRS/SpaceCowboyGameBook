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
				     storyPoint:0,
				     	helpedJohn: false,}; // counter to progress game through 'levels'

	//item preload for game use
var newAmulet = {};
var newbodyArmor = {};
var newPotions = {};


				//character initiation
var player = {voice: 'white'};	// active player
var enemy = {};					// Empty monster object, when defeated it empties and allows next monster to populate
var john = {};   // John character to help you fight boss
var narrator = {voice: '#00c7ff'}; // Narocube narrator to tell you whats happening


//////////////////////////////////////////////////////////////////////////////////////////////////////
//                    Level Dialogue in object to reference in decision functions                   //
var levelDialogue = {
	start:{
		blah:"",
		blahblah:""
	},
	cageSound:{
		goLook:"",
		goLookyes:"",
		goLookno:"Narocube: ",
		// noMonster:""
	},
	doorSound:{
		goLook:"Narocube: The door looks like its been broken, and wont close all the way, seems risky. Do you want to go through? 'yes' or 'no'",
		goLookyes:"Narocube: You aint afraid of no ghosts!",
		goLookno:"Narocube: Probably better to play it safe.",
		noMonster:"Narocube: Seems as though the door is just broken... huh."
	},
	growlSound:{
		goLook:"Narocube: The noise is around the corner, seems risky. Do you want to go? 'yes' or 'no' ",
		goLookyes:"Narocube: The Hero emerges within, fearless and brave",
		goLookno:"Narocube: yeah you probably right, thats some scary shit",
		noMonster:"Narocube: The noise must have been farther down the hallway"
	},
	footSteps:{
		goLook:"Narocube: Footsetps! sure sure, lets just go bother them at work because you are scared. Do you want to go? 'yes' or 'no' ",
		goLookyes:"Narocube: Yeah, just as I thoguht, be polite, HA!",
		goLookno:"Narocube: Yeah I didn't think so, be polite!",
		noMonster:"Narocube: Oh look, they dont want to deal with you. whatever, you'll get whats coming to you",
	},
	helpJohn:{
		goLook:"Narocube: Arn't you being heroic, go save him but be careful. Do you want to go? 'yes' or 'no' ",
		goLookyes:"Narocube: lets see whats behind door number 1",
		goLookno:"Narocube: probably a safe bet, dont want to be known as a dead hero.",
		noMonster:"Narocube: What was he even complaining about nothing is down here!"
	},
	johnHelpsHimself:{
		goLook:"Narocube: What are you expecting to find, you just are asking for trouble. Do you want to go? 'yes' or 'no' ",
		goLookyes:"Narocube: Dont blame me for whatever you find, you are asking for it.",
		goLookno:"Narocube: Yeah I didn't think so",
		noMonster:"Narocube: Awh, I mean YAY, nothing.",
	}
};


//////////////////////////////////////////////////////////////////////////////////////////////////
// 						    		initiation code                                             //

// set up new background design and initaite game play with story in dialoge box
var main = function() {
 
	$("#start").click(function(){    // initial event to start game
		$('.startOverlay').remove(); // removes start button
		$('.Jumbo-title').remove();	 // removes white text title

		john = new Companion();

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
			textDialogue(narrator, "Welcome to Lawrence Goedrich's Choose your own adventure game!!", 0);

			// call player for name
			textDialogue(narrator, "Warrior, what shall I call you?", 1000);

			(function(){
				$('form').submit(function() {
				    var pass = $('#action').val().toLowerCase();
				    if ( pass !== ""){
				    	//doesn't matter for name, just not empty
				    	player.name = pass;
				    	textDialogue(player, (player.name +": My name is " + pass), 0);
						console.log("player has name");
				    	advanceStory();				    	
				    } else {
				    	textDialogue(narrator, "please choose a real name and not ' '", 0);
				    }
					return false;
				});
			})();
		break;

		// create player object with choosen type
		case 1:
			$( ".overlay" ).toggle();

			textDialogue(narrator, "Please choose a hero class", 500);

			$('.overlay').on('click', function(){
				var chartype = event.target.id;
				var bgurl = $("#" + chartype).css('background-image');
				if (chartype === 'rouge' ||chartype === 'soldier' ||chartype === 'tank') {
					//choose player type and create player object 
					console.log(chartype);
					characterChoice (player.name, chartype);
					console.log(bgurl);
					$('#profile').css("background-image", bgurl);  
					gameobj.storyPoint++;
					mainLoop();
				} else {
					textDialogue(narrator, "Try clicking on one of the images.", 2000);
				}
			}); // choosing player type (rouge, soldier, tank)
		break;

		//intro function, John lets you know the set and setting.
		case 2: 

			// would like to find 
			textDialogue(john, "John: Hey" + " " + player.name + " the ship should land in 15 minutes. I have to go up stairs to check on the landing sequence, exploring the ship might bring you some rewards", 1000);
			textDialogue(john, "John: This helper bot should help you around the ship.", 3000);
			textDialogue(narrator, "Narocube: Hello " + player.name + " I am Narocube, the helper bot John mentioned", 4000);
			textDialogue(john, "John: Oh before I forget, the p command will allow you to use a potion in story or fights, not like you would need one anyway.", 5000);

			gameobj.storyPoint++;
			mainLoop();
		break;

		//Start game player choices
		case 3:
			textDialogue(narrator, "Narocube: Now that John is gone do you want to: explore, or sit tight", 7000);
			formSubmit(start);
		break;
			
		//cage sound causes curiousness, find torn cage
		case 4:
			// insert screeaching sound alert("screeeeeeeach");
			textDialogue(narrator, "Narocube: Hey, whats that sound! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'", 3000);
			formSubmit(cageSound);
		break;

		// space door sound alerts player to broken door, first initiation of possible combat
		case 5:
			// insert space door sound alert("sound space doors make"); 
			textDialogue(narrator, "Narocube: Oh what now! \n Do you want to:'go look', 'explore' the ship, or 'sit tight'", 2000);
			formSubmit(doorSound);
		break;

		// growling down the hallway implys more monsters on ship. possiblity to initiate combat again
		case 6:
			// insert growling sounds from down the hallway
			textDialogue(narrator, "Narocube: There is a growling sound from down the hallway \n Do you want to:'go look', 'explore' the ship, or 'sit tight'", 2000);
			formSubmit(growlSound);
		break;

		// stomping from upstairs also implys more monster, also allows for possible combat ( might require more work with story for going upstairs)
		case 7:
			// alert("Stomping noises from upstairs");
			textDialogue(narrator, "Narocube: Hey listen there must be other people on the ship! \n Do you want to:'go look', 'explore' the ship, or 'sit tight'", 2000);
			formSubmit(footSteps);
		break;

		// John screams for help upstairs wich also requires upstairs plot point
		case 8:
			// alert("John screams for help from upstairs");
			textDialogue(narrator, "Narocube: What a could his problem be! \n Do you want to:'go look' 'explore' the ship, or 'sit tight'", 2000);
			formSubmit(helpJohn);
		break;

		case 9:
			textDialogue(narrator, "Narocube: It sounds like the screaming stopped he must be juuust fine. We should make our way back to the hull.  Do you want to:'go look' 'explore' the ship, or 'sit tight'", 2000);
			formSubmit(johnHelpsHimself);
		break;

		// vehicle begins to land and queen drops from cieling, potentially if you 'sit tight' hole game the vehicle just lands.
		case 10:
			textDialogue(john, "John: Hey thanks for all the help, vehicle should start landing now.", 2000);
			textDialogue(narrator, "Narocube: vehicle begins to shake uncontrolably \n we must be starting the landing sequence", 3000);
			vehicleShaking();
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
				textDialogue(narrator, "Narocube: What are you going to look at??", 1000);
			break;

			case 'explore':
				exploreship(gameobj.explore);
				gameobj.explore++;
			break;

			case 'sit tight':
				textDialogue(narrator, "Narocube: Good choice we should probably wait for John to get back.", 1000);
				gameobj.sittight++;
			break;	
		}
}

// the cage sounds like its being broken
function cageSound(action) {

	switch (action) {
		case 'go look':
			textDialogue(narrator, "Narocube: oh wow this cage has been pulled apart, what could have caused this!", 1000);
		break;

		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, it's probably just cargo shifting", 0);
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, it's probably just cargo shifting, we should probably wait for John to get back... what does this ship haul anyway?", 1000);
			gameobj.sittight++;
		break;
	}
}

// door by the cage opens and doesn't close all the way
function doorSound(action) {

	switch (action) {
		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, it's probably just John or another crew member", 1000);
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, it's probably just John or another crew member, we should probably wait for John to get back... Is there anyone else on the ship?", 1000);
			gameobj.sittight++;
		break;
	}
}

// growling from down the hallway behind that door
function growlSound(action) {

	switch (action) {

		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, it's probably just a crew members dog", 1000);
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, it's probably just a crew members dog, we should probably wait for John to get back... wheres the dog food?", 1000);
			gameobj.sittight++;	
		break;
	}
}


//foot steps from around 
function footSteps(action) {

	switch (action) {
		
		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, it's probably best to keep lookin around, wouldn't want to bother them", 1000);
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Yeah you are probably right, no reason to bother them at work, its not like you're not scared, are you?", 1000);
			gameobj.sittight++;
		break;
	}
}

//John asks for help behind the door
function helpJohn(action) {


	switch (action) {
		case 'explore':
			textDialogue(narrator, "Narocube: Good choice, we can keep stealing stuff, sounds like that will take a while.", 1000);
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, Nothing puts me to sleep like the screems of my friends", 1000);
			gameobj.sittight++;
		break;
	}
}

//John says he's got it and not to worry sarcastically
function johnHelpsHimself(action) {
	switch (action) {
		case 'explore':
			textDialogue(narrator, "Narocube: Who knows sarcasim better than you " + player.name + " Lets take a peak", 1000);
			exploreship(gameobj.explore);
			gameobj.explore++;
		break;

		case 'sit tight':
			textDialogue(narrator, "Narocube: Good choice, Nothing passive aggression like more passive aggression!", 1000);
			gameobj.sittight++;
		break;
	}
}

//vehicle shakes during landing
function vehicleShaking(action) {


	if ( gameobj.sittight >= 6) {

		textDialogue(john,"John: Hey! Hold onto something tight this looks like its going to be a rough ride!", 4000);
		textDialogue(narrator,"SHIP LANDING NOISES!", 5000);

		setTimeout(winnerWinner, 6000);
	} else {
		textDialogue(narrator, "Narocube: Holy shit, what is that, how can something so large be alive", 4000);
		textDialogue(narrator, "Narocube: It must be some sort of queen animal", 5000);
		textDialogue(enemy, (enemy.name + ": I WILL DEVOUR YOUR EVERY BEING"), 6000);
		//if the queen dies you win, if you die you loose
		enemy = new monsterBoss();
		if (queen.health != 0) {
			if (gameobj.helpedJohn === true){
				textDialogue(john,"John: Hey! Let me get the first shot on her!", 7000);

				CRhit = CRhitRoll(john, enemy, 0); //rolls for critical hit. if damage, comes back true

				if( CRhit ) {
					textDialogue(narrator, "Narocube: He got a critical hit, John did 2x damage now!",8000);
					textDialogue(enemy, (enemy.name + ": OUCH YOU LITTLE SHITS, YOU'RE GOING TO PAY"), 9000);
					textDialogue(narrator, ("Narocube:" + enemy.name + "'s new health is " + enemy.health), 10000);
				} else{
					textDialogue(john,"John: Alright, direct hit!", 8000);
					textDialogue(narrator, ("Narocube: Oh wow the queens life is now" + enemy.health), 9000);	
					textDialogue(enemy, (enemy.name + ": OH, I GUESS THAT STINGS"), 10000);
				}

				setTimeout(fightMonster, 11000);

			//John shoots first then you fighter her
			} else {

				setTimeout(fightMonster, 7000);
				setTimeout(winnerWinner, 8000);
			}
			//fight her
		} else {
			textDialogue(narrator, "Narocube: You actually did it! She's DEAD", 1000);
			setTimeout(winnerWinner, 11000);
		}
	}
}

//vehicle has landed and you have survived
function winnerWinner() {

	textDialogue(john, "John: Hey, well that wasn't so bad.", 0);
	textDialogue(player, player.name + ": Yeah I suppose that could have gone worse", 1000);
	textDialogue(john, "John: Looks like its about that time...", 2000);
	textDialogue(player, player.name + ": YEE-HAW", 3000);

	// add firework image and such to signify more than just text
	textDialogue(narrator, "Narocube: Hey, you win! \n Go home... refresh to play again", 5000);
}