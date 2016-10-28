// Game controller, for form sections, character actions, monster creation, chest openings and fight controls



//////////////////////////////////////////////////////////////////////////////////////////
//                       Forum submitions and text boxes                                //

// Function that displays a string which is passed to it
function textDialogue(who, str) {
		var action = $('<p>').text(str);
		action.css('color', who.voice);
		$(action).hide().prependTo('.dialogue').fadeIn('slow');
		$('#action').val("");
}

// A forum submition callback for players to choose explore, sit tight and go look.
function formSubmit(callback){
	$('form').submit(function() {	//initiate submit listener
		var pass = $('#action').val().toLowerCase(); // grab the value of the submit forum in lowercase

	    if ( pass !== ""){
	    	if (pass === "explore" || pass === "sit tight" ) {
	    		textDialogue(player, player.name +": I think that I will" + " " + pass);
	    		callback(pass);

	    		gameobj.storyPoint++;
	    		$('form').unbind();
	    		mainLoop();	

	    	} else if ( pass === "go look" ) {
	    		if(gameobj.storyPoint <= 4 ) { // missions less than level 4 dont initiate combat 
	    			textDialogue(player, player.name +": I think that I will" + " " + pass);
		    		callback(pass);

		    		gameobj.storyPoint++;
		    		$('form').unbind();
		    		mainLoop();	

	    		} else {
					textDialogue(player, player.name +": I think that I will" + " " + pass);
					textDialogue(narrator, levelDialoge.callback.goLook); //array of asking if they want to check out the thing yes no
					goLookandFight(callback);
	    		}
	    		
	    	} else {
				textDialogue(narrator, "Narocube: Try again, maybe 'go look', 'explore', or 'sit tight'");
	    	}

	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '");	
	    }

	    return false;
	});
}

// A forum sbmition call back to replace confirm functions. inputs are either a Yes or no
function goLookandFight(callback){
	$('form').unbind();

	$('form').submit(function() {	
		var pass = $('#action').val().toLowerCase();

	    if ( pass !== "") {
	    	//doesn't matter for name, just not empty
	   //  	if (pass == "yes") {
	   //  		textDialogue(player, (player.name + ": " + pass + " I will."));
	   //  		textDialogue(narrator, levelDialoge.callback.goLookyes); // snarky comments

				// chestorMonster();

				// if (Object.getOwnPropertyNames(enemy).length != 0) { // || empty object?
				// 	//fight or flight monster
				// 	fightorflight();




				// } else {
				// 	textDialogue(narrator, levelDialoge.callback.noMonster); // array of compasion saying it was probably a good idea
				// 	gameobj.storyPoint++;
	   //  			$('form').unbind();
	   //  			mainLoop();	
				// }

	   //  	} else if (pass == "no") {
	   //  		textDialogue(player, (player.name + ": " + pass + " thank you."));
				// textDialogue(narrator, levelDialoge.callback.goLookno);
				// gameobj.storyPoint++;
    // 			$('form').unbind();
    // 			mainLoop();	

	   //  	} else {
				// textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ");
	   //  	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '");	
	    }
	    return false;
	});
}

// A forum sbmition call back to replace prompt attack functions. inputs are either a fight or run
function fightSubmit(callback){
	// $('form').unbind();

	// $('form').submit(function() {	
	// 	var pass = $('#action').val().toLowerCase();

	//     if ( pass !== ""){
	//     	//doesn't matter for name, just not empty
	//     	if (pass === "fight") {
	//     		textDialogue(player, player.name + ": " pass + " I will.");



	//     		callback(pass);
	//     		mainLoop();	
	//     	} else if (pass === "run"){
	//     		textDialogue(player, player.name + ": " pass + " thank you.");




	//     	}else {
	// 			textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ");
	//     	}
	//     } else {
	//     	textDialogue(narrator, "Narocube: Please choose an action to take not ' '");	
	//     }
	//     return false;
	// });
}


//////////////////////////////////////////////////////////////////////////////////////////
//                       Character specific functions                                   //

// bring up character selection and images
function characterChoice (name, chartype) {

	switch(chartype){

		case 'rouge':
			textDialogue(narrator, "You have choosen the rouge,\n be as cunning as a fox!");
		break;

		case 'soldier':
			textDialogue(narrator, "You have choosen the soldier,\nstay your distance to stay alive!");
		break;

		case 'tank':
			textDialogue(narrator, "You have choosen the tank,\nGET UP IN THERE!");
		break;

	}
		// case 'april':
		// 	alert("You have choosen a goddess,\n be gental!");
		// break;

	player = new character(name, chartype);
	console.log( "player generated");
	$( ".overlay" ).remove();
	$(document).off('keydown');

	// $(document).keydown(function(key) {
	// 	if (key == 67) {
	// 		alert("Your health is" + " " + player.health);
	// 		var use = confirm("would you like to use a consumable");
	// 		if (use == true){
	// 			useConsume();
	// 			player.consumable = {};
	// 		} else {
	// 			return;
	// 		}

	// 	}
	// });
};

// explore function for player choices
function exploreship(){
	switch(gameobj.explore) {
		case 0:			
			textDialogue(narrator, "Narocube: Hey," + " " + player.name + " you found a Weapons Chest!");
			setTimeout(chestW, 1000);
		break;

		case 1:
			textDialogue(narrator, "Narocube: Hey," + " " + player.name + " you found a Items Chest!");
			chestI();
		break;

		case 2:
			textDialogue(narrator, "Narocube: Hey," + " " + player.name + " you found a Consumables Chest!");
			chestC();
		break;

		case 3:
			textDialogue(narrator, "Narocube: Hey," + " " + player.name + " you found a Random Chest!");
			chestR();
		break;

		case 4:
			// gameobj.explore++;
		break;

		case 5:
			// gameobj.explore++;
		break;
	}
}

//checks current weapon and replaces with new
function weaponCheck (newWeapon) {
	if (player.weapon.name == "FIST OF FURRY") {
		player.weaponUpdate(newWeapon);

		textDialogue(narrator, "Narocube: You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.damage + "damage");
	} else {
		textDialogue(narrator, "Narocube: You already have " + " " + player.weapon.name + "with" + player.weapon.damage + "\n do you wish to replace it with" + newWeapon.name + "with" + newWeapon.damage + "?");
		var replacepWeapon = confirmSubmit();

		if (replacepWeapon == true) {
			player.weaponUpdate(newWeapon);
			textDialogue(narrator, "Narocube: You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage+  "damage");
		} else {
			return;
		}
	} 
}

// uses potion
function useConsume() {

	if (player.consumable != null) {
		player.health = player.health + player.consumable.life;
		player.consumable = null;

		if (player.health > player.hpmax) {
			player.health = player.hpmax;
		} else {
			return;
		}

	} else {
		textDialogue(narrator, "Narocube: You do not have anything to consume");
	}
}

// If you die
function dead(){

	textDialogue(narrator, "Narocube: It seems as though you have fallen great warrior");
	textDialogue(narrator, "Narocube: Try again? maybe this time you sit tight or explore more?");

	var action = prompt("Would you like to play again, yes, no").toLowerCase();

	switch (action) {
		case 'yes':
		initiateGame();
		break;

		case 'no':
			textDialogue(narrator, "Narocube: Hope you enjoyed your time anyway.");
			// $('.gameover').toggle();
			//end game, idk how
		break;

		case 'one more time':
			// heal player to half health and start back where he was
			player.health = player.hpmax/2;
			return;
		break;
				
		default:
			textDialogue(narrator, "Narocube: I'll take that as a yes!");

			////////////////////////////////////////////////////////////////////////////////////////////////////
			//					  					RESTARTING variables								   	//
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
				var narrator = {voice: 'blue'};

				// wait 5 seconds and rerun initial game.
				setTimeout(mainLoop,5000);
	}
}


//////////////////////////////////////////////////////////////////////////////////////////
//                      chest and item specific functions                              //

// opens random chest
function chestR() {
	textDialogue(narrator, "Narocube: Would you like to open this Random chest?");
	var open = confirmSubmit();

	var random = randomRoll(10,0);

	if (open == true) {
		if (random >=9) {					 // 20% chance
			chestW();
		} else if (random < 9 && random >=5){//50% chance
			chestI();
		} else {							 //30% chance
			chestC();
		}

	} else {
		// gives players a second chance.
		textDialogue(narrator, "Narocube: Are you sure?");
		open = confirmSubmit();

		if (open == true) {
			textDialogue(narrator, "Narocube: oookay");
			return;
		} else {
			chestR();
		}
	}
}

// opens weapons chest
function chestW () {
	textDialogue(narrator, "Narocube: Would you like to open this weapons chest?");


	var open = confirmSubmit();
	if (open == true) {
		// weapon(0) = fist
		switch(player.type) 
		{
		    case "rouge":
			// weapons dual = 1,2
		 	  	var newWeapon = new weapons(randomRoll(2,1));
		 	  	weaponCheck(newWeapon);
		    break;

		    case "soldier":
		    // weapons dual = 5,6
				var newWeapon = new weapons(randomRoll(6,5));
				weaponCheck(newWeapon);
		     break;

		    case "tank":
			// weapons dual = 5,6
				var newWeapon = new weapons(randomRoll(4,3));
				weaponCheck(newWeapon);
		     break;
		     // unable to activate this character
		   //  case "april":
		   // god class, all weapons
			  //   var newWeapon = new weapons(Math.floor(Math.random()*(6 - 1 + 1)) + 1);
			  // weaponCheck(newWeapon);
		   //   break;
		}		
		return;
	} else {
		// gives players a second chance.
		textDialogue(narrator, "Narocube: Are you sure?");
		open = confirmSubmit();

		if (open == true) {
			textDialogue(narrator, "Narocube: oookay");
			return;
		} else {
			chestW();
		}
	}
}

// opens item chest
function chestI () {
	textDialogue(narrator, "Narocube: would you like to open this Item chest?");

	var open = confirm("would you like to open this Item chest?");
	
	if (open == true) {
		if (player.type == 'rouge') {
			type = randomRoll(2,0);
		} else {
			type = randomRoll(1,0);
		}
		
		switch (type) {
			case 0:
				textDialogue(narrator, "Narocube: The Chest had an Amulet in it!");
				items.amulet = new Amulet(randomRoll(3,0));
				if (Object.getOwnPropertyNames(player.amulet).length = 0) {
					player.amulet = newAmulet;
					textDialogue(narrator, "Narocube: You have just recieved the" + player.amulet.name + "amulet \nwhich gives you" +player.amulet.bonus*100 + "% bonus");
				} else {
					var replaceAmulet = confirm("You already have a" + " " + player.amulet.name + "\n do you wish to replace it with" + newAmulet.name + "with" + newAmulet.bonus*100 + "% bonus");
					if ( replaceAmulet == true) {
						player.amulet = newAmulet;
						textDialogue(narrator, "Narocube: You have just recieved the" + player.amulet.name + "amulet \nwhich gives you" + player.amulet.bonus*100 + "% bonus");
					} else {
						return;
					}
				} 
			break;


			case 1:
				alert("The Chest had Armor in it!");
				items.bodyArmor = new Armor(randomRoll(2,1));
				if (player.bodyArmor.length = 0) {
					player.bodyArmor = items.bodyArmor;
					textDialogue(narrator, "Narocube: You have just recieved the" + player.bodyArmor.name + "Armor \n which gives you" + player.bodyArmor.duration + "duration");
				} else {	
					var replaceArmor = confirm("You already have the " + player.bodyArmor.name + "\nDo you wish to replace it with " + newbodyarmor.name + " with " + newbodyarmor.duration+ " duration ?");
					if ( replaceArmor == true) {
						player.bodyArmor = newbodyarmor;
						textDialogue(narrator, "Narocube: You have just recieved the" + player.bodyArmor.name + " \nwhich gives you " + player.bodyArmor.duration + " duration");
					} else {
						return;
					}
				} 
			break;


			case 2:
				alert("The Chest had an shield in it!");
				if (Object.getOwnPropertyNames(player.shield).length = 0) {
					player.shield = new Armor(0);
					textDialogue(narrator, "Narocube: You have just recieved the" + player.shield.name + "shield \n which gives you" + player.shield.duration + "hp duration");
				} else {
					textDialogue(narrator, "Narocube: Sorry, you already had a shield \n better luck next time!");
					return;
				}
			break;
		}

	} else {
		// gives players a second chance.
		textDialogue(narrator, "Narocube: Are you sure?");
		open = confirmSubmit();

		if (open == true) {
			textDialogue(narrator, "Narocube: oookay");
			return;
		} else {
			chestI();
		}
	}
}

// opens consumable chest
function chestC () {
	// confirm opening the chest
	var open = confirm("would you like to open this consumables chest?");
	if (open == true) {
		// random roll for consumable item
		var newPotion = new Consumables(randomRoll(2,0));
		if (Object.getOwnPropertyNames(player.consumable).length != 0) {
			// keep the potion you have?
			var keepPotion = confirm("You already have a" + " " + player.consumable.name + " with " + player.consumable.life + "hp" + "\n do you wish to replace it with" + newPotion + "with" + newPotion.life + "?");
			if ( keepPotion == true) {
				// replaces consumable with new potion
				player.consumable = newPotion;
			} else {
				return;
			}
		} else {
			player.consumable = newPotion;
			textDialogue(narrator, "Narocube: Congradulations you just recieved a " + player.consumable.name + "\nWhich can heal you " + player.consumable.life + " health");
		}
	} else {
		// gives players a second chance.
		textDialogue(narrator, "Narocube: Are you sure?");
		open = confirmSubmit();

		if (open == true) {
			textDialogue(narrator, "Narocube: oookay");
			return;
		} else {
			chestC();
		}
	}
}


//////////////////////////////////////////////////////////////////////////////////////////
//                       monster / fight control functions                              //

//roll for monster or chest
function chestorMonster(){
	var random = randomRoll(10,0);
	
	if ( random >= 2){
		monsterRoll();
	} else{
		chestR();
	}
}

//roll for which monster monster
function monsterRoll(){
	var random = randomRoll(2,0);
	enemy = new Monster(random);
}

//decide whether to run or fight monsters
function fightorflight(){
	var action = prompt("You have ran across the deadly" + " " + enemy.name + " Do you want to 'fight' or 'run'?").toLowerCase();
	if (action == 'fight'){
		fightMonster();
	} else if (action == 'run') {
		alert("You right, that shits scary yo. Lets RUN!");
		if (player.mvspeed > enemy.mvspeed){
			alert("You're fast enough to loose the" +" " + enemy.name);
			enemy = {};
			return;
		} else {
			alert("You have to stay and fight the" + " " + enemy.name);
			fightMonster();
		}
	
	} else {
		alert("Stop tryin to break this game! \n we're all soldiers now!")
		fightMonster();
	}
}

// If faced with a monster
function fightMonster(){

	//global variables
	var attackorder;
	var method;
	var CRhit;
	var sucess;

	alert("It's fight time. Be brave" + " " + player.name +".");
	while(enemy.health > 0 && player.health > 0){
		attackorder = 0;

		if (attackorder == 0){
			if (player.ranged == true){
				var method = prompt("You have ranged abilities do you want to use them or melee: 'ranged' or 'melee'").toLowerCase();
			} else {
				var method = prompt("Sorry you do not have ranged abilities, get in there and cut em up: 'melee'").toLowerCase();
			}


			CRhit = CRhitRoll(player, enemy); //rolls for critical hit. if damage, comes back true

			if(CRhit == false) {
				// player attacking enemy
				sucess = attack(player, enemy);
					if (sucess == true){
						alert("You have struck " + " " + enemy.name);
						alert(enemy.name + "'s new health is" + " " + enemy.health);
					} else {
						alert("oh no, you missed!");
					}
				attackorder++;
			} else {
				textDialogue(narrator, "Narocube: You got a critical hit, you will do 2x damage now!");
				alert(enemy.name + "'s new health is" + " " + enemy.health);
				attackorder++;
			}
		} else {

			// enemy attacks on odd turns, enemy has much lower chance for CR and player has higher evade
			CRhit = CRhitRoll(enemy, player); //rolls for critical hit and does damage, no further damage needed


			if(CRhit == false) {
			// enemy attacking player
				sucess = attack(enemy, player);
					if (sucess == true){
						alert("Oh no, the" + " " + enemy.name + " has attacked you!");
						textDialogue(narrator, "Narocube: Watch out your new health is" + player.health);
					} else {
						textDialogue(narrator, "Narocube: It missed you!");
					}
				attackorder++;

			} else {
				alert(enemy.name + " got a critical hit! you will recieve 2x damage now!");
				textDialogue(narrator, "Narocube: Watch out your new health is" + player.health);
				attackorder++;
			}
		}
	}

	// Enemy dead
	if(enemy.health <= 0) {

		alert("You've defeated the" + " " + enemy.name +"! Onwards!");
		enemy = {};
		return;
	// You dead
	} else if (player.health <= 0) {
		dead();
		return;//secret way for zombies to get back in the fight, we're all soldiers now.
	}
}

// attacks rolls for attack chance, accounts for evasion chance and deals damamge. 
// returns true if hit
function attack(atkobj, defobj) {
	var hitchance = randomRoll(10,1);

	// if (player.amulet.type == 'evasion') {
			
	// } else {

	// }


	if ( hitchance >= 1 + defobj.evasion) {
		
		if (player.amulet.type == 'damage') {
			defobj.health -= (atkobj.damge * atkobj.amulet.bonus);
		} else {
			defobj.health -= atkobj.damge;
		}

		return true;

	} else {

		return false;
	}
}

// checks to see if you get a chritical hit, and does damage
// returns true if hit
function CRhitRoll(atkobj, defobj) {
	var criticalChance = randomRoll(10,1);
	var CRbonus = 2;

	// if (player.amulet.type == 'critical') {
			
	// } else {
		
	// }

	if (criticalChance <= 1 + atkobj.criticalHit) { //criticalHit is a %likely to land

		if (player.amulet.type == 'damage') {
			defobj.health -= (atkobj.damge * atkobj.amulet.bonus * CRbonus);
		} else {
			defobj.health -= atkobj.damge * CRbonus ;
		}
		return true;

	} else {
		return false;

	}
}


//////////////////////////////////////////////////////////////////////////////////////////
//                            custom math functions                                     //

// Math.floor(Math.random() * (max - min +1)) + min	
function randomRoll(max, min){
	var num = Math.floor(Math.random() * (max - min +1)) + min;
	return num;
}