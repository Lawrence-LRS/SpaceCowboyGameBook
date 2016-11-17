// Game controller, for form sections, character actions, monster creation, chest openings and fight controls



//////////////////////////////////////////////////////////////////////////////////////////
//                       Forum submitions and text boxes                                //

// Function that displays a string which is passed to it
function textDialogue(who, str, intv) {
	setTimeout(function(){
		var action = $('<p>').text(str);
		action.css('color', who.voice);
		$(action).hide().prependTo('.dialogue').fadeIn('slow');
		$('#action').val("");
	}, intv);	
}

// A forum submition callback for players to choose explore, sit tight and go look.
function formSubmit(callback){
	$('form').submit(function() {	//initiate submit listener
		var pass = $('#action').val().toLowerCase(); // grab the value of the submit forum in lowercase

	    if ( pass !== ""){

	    	switch (pass) {
	    		case 'sit tight':
					textDialogue(player, (player.name +": I think that I will" + " " + pass), 0);
		    		callback(pass);

		    		advanceStory();
	    		break;

	    		case 'explore':
		    		textDialogue(player, (player.name +": I think that I will" + " " + pass), 0);
		    		callback(pass);
	    		break;

	    		case 'go look':
	    			if(gameobj.storyPoint <= 4 ) { // missions less than level 4 dont initiate combat 
		    			textDialogue(player, (player.name +": I think that I will" + " " + pass), 0);
			    		callback(pass);
			    		advanceStory();
			    	// } else if ( ){

		    		} else {
						textDialogue(player, (player.name + ": I think that I will" + " " + pass), 0);

						textDialogue(narrator, levelDialogue[callback.name].goLook, 1000); //array of asking if they want to check out the thing yes no
						goLookandFight(callback);
		    		}
	    		break;

	    		case 'p':
	    			useConsume();
	    			textDialogue(narrator, "Narocube: Now that that is taken care of, maybe try 'go look', 'explore', or 'sit tight'", 1000);
	    		break;

	    		default:
	    			textDialogue(narrator, "Narocube: Try again, maybe 'go look', 'explore', or 'sit tight'", 0);
	    	
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
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
	    	if (pass == "yes") {
	    		textDialogue(player, (player.name + ": " + pass + " I will."), 0);
	    		textDialogue(narrator, levelDialogue[callback.name].goLookyes, 1000); // snarky comments

	    		if (callback.name == "helpJohn" ){
	    			gameobj.helpedJohn = true
				}

				chestorMonster(callback);

				if (Object.getOwnPropertyNames(enemy).length != 0) { // || empty object?
					//fight or flight monster
					fightorflight();
				} else {
					textDialogue(narrator, levelDialogue[callback.name].noMonster, 000);
				}

	    	} else if (pass == "no") {
	    		textDialogue(player, (player.name + ": " + pass + " thank you."), 0);
				textDialogue(narrator, levelDialogue[callback.name].goLookno, 1000);
				advanceStory();

	    	} else if ( pass == 'p') {
    			useConsume();
    			textDialogue(narrator, "Narocube: Now that that is taken care of, maybe try 'go look', 'explore', or 'sit tight'", 1000);
	    	}else {
				textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 0);
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }
	    return false;
	});
}


//////////////////////////////////////////////////////////////////////////////////////////
//                       Character specific functions                                   //
 
// bring up character selection and images
function characterChoice (name, chartype) {

	switch(chartype){

		case 'rouge':
			textDialogue(john, "John: Oh thats right you are a rouge,\n be as cunning as a fox!");
		break;

		case 'soldier':
			textDialogue(john, "John: Oh thats right you are a soldier,\nstay your distance to stay alive!");
		break;

		case 'tank':
			textDialogue(john, "John: Oh thats right you are a tank,\nGET UP IN THERE!");
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
	// 		var use = confirm("would you like to use a Potion");
	// 		if (use == true){
	// 			useConsume();
	// 			player.Potion = {};
	// 		} else {
	// 			return;
	// 		}

	// 	}
	// });
};

// explore function for player choices
function exploreship(){
	switch(gameobj.explore) {
		case 3:
		case 0:			
			textDialogue(narrator, "Narocube: Hey, " + player.name + " you found a Weapons Chest!", 1000);
			chestW();
		break;

		case 4:
		case 1:
			textDialogue(narrator, "Narocube: Hey, " + player.name + " you found a Items Chest!", 1000);
			chestI();
		break;

		case 5:
		case 2:
			textDialogue(narrator, "Narocube: Hey, " + player.name + " you found a Potions Chest!", 1000);
			chestP();
		break;

		default:
			textDialogue(narrator, "Narocube: Hey, " + player.name + " you found a Random Chest!", 1000);
			chestR();
		break;
	}
}

// uses potion
function useConsume() {

	if ( isEmpty(player, 'potion') ){
		textDialogue(narrator, "Narocube: You do not have anything to consume", 0);		
	} else {
		player.health = player.health + player.potion.life;
		textDialogue(narrator, ("Narocube: You're new health is " + player.health), 0);
		player.potion = {};

		if (player.health > player.hpmax) {
			player.health = player.hpmax;
		} else {
			return;
		}
	}
}

// If you die
function dead(){

	textDialogue(narrator, "Narocube: It seems as though you have fallen great warrior", 0);
	textDialogue(narrator, "Narocube: Try again? maybe this time you sit tight or explore more?", 1000);

	$('form').unbind();

	$('form').submit(function() {	
		var pass = $('#action').val().toLowerCase();

	    if ( pass !== "") {
	    	if (pass == "yes") {
	    		resetgame();
	    	} else if (pass == "no") {
	    		textDialogue(narrator, "Narocube: Hope you enjoyed your time anyway.",0);
	    		$('form').unbind();
				// $('.gameover').toggle(); // some game over text 

			} else if ( pass === "one more time"){
				// heal player to half health and start back where he was
				player.health = player.hpmax/2;
				$('form').unbind();
				mainLoop();
	    	} else {
				textDialogue(narrator, "Narocube: I'll take that as a yes!",0);
				resetgame();
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }
	    return false;
	});
}


//////////////////////////////////////////////////////////////////////////////////////////
//                      chest and item specific functions                              //

// opens random chest
function chestR() {
	textDialogue(narrator, "Narocube: Would you like to open this Random chest?", 2000);
	var random = randomRoll(10,0);

	$('form').unbind();

	$('form').submit(function(random) {	
		var pass = $('#action').val().toLowerCase();
		
	    if ( pass !== "") {
	    	if (pass == "yes") {
				if (random >=9) {					 // 20% chance
					textDialogue(narrator, "Narocube: Hey, " + player.name + " This chest had Weapons!", 1000);
					setTimeout(chestW, 1000);
				} else if (random < 9 && random >=5){//50% chance
					textDialogue(narrator, "Narocube: Hey, " + player.name + " This chest had Items!", 1000);
					setTimeout(chestI, 1000);
				} else {							 //30% chance
					textDialogue(narrator, "Narocube: Hey, " + player.name + " This chest had Potions!", 1000);
					setTimeout(chestP, 1000);
				}	

	    	} else if (pass == "no") {
	    		// gives players a second chance.
	    		setTimeout(chestNoSubmit(chestR),1000);

	    	} else {
				textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 0);
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }
	    return false;
	});
}

// opens weapons chest
function chestW () {
	textDialogue(narrator, "Narocube: Would you like to open this weapons chest?", 2000);

	$('form').unbind();

	$('form').submit(function() {	
		var pass = $('#action').val().toLowerCase();

	    if ( pass !== "") {
	    	if (pass == "yes") {
				// weapon(0) = fists ( always replaced )
				switch(player.type) {
				    case "rouge":
					// weapons dual = 1,2
				 	  	var newWeapon = new Weapons(randomRoll(2,1));
				 	  	weaponCheck(newWeapon);
				    break;

				    case "soldier":
				    // weapons dual = 5,6
						var newWeapon = new Weapons(randomRoll(6,5));
						weaponCheck(newWeapon);
				     break;

				    case "tank":
					// weapons dual = 5,6
						var newWeapon = new Weapons(randomRoll(4,3));
						weaponCheck(newWeapon);
				     break;
				     // unable to activate this character
				     //  case "april":
				     // god class, all weapons
					  //   var newWeapon = new weapons(Math.floor(Math.random()*(6 - 1 + 1)) + 1);
					  // weaponCheck(newWeapon);
				   //   break;
				}	

	    	} else if (pass == "no") {
	    		// gives players a second chance.
	    		setTimeout(chestNoSubmit(chestW),1000);
	    	} else {
				textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 0);
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }
	    return false;
	});
}

//checks current weapon and replaces with new
function weaponCheck (newWeapon) {
	if (player.weapon.name == "FIST OF FURRY") {
		player.weaponUpdate(newWeapon);

		textDialogue(narrator, ("Narocube: You have just recieved the " + player.weapon.name + " weapon, which gives you " + player.damage + " damage"), 0);

		advanceStory();

	} else {
		textDialogue(narrator, ("Narocube: You already have " + " " + player.weapon.name + " with " + player.weapon.damage + " do you wish to replace it with " + newWeapon.name + " with " + newWeapon.damage + "?"), 0);
		$('form').unbind();

		$('form').submit(function() {	
			var pass = $('#action').val().toLowerCase();

		    if ( pass !== "") {
		    	if (pass == "yes") {
		    		textDialogue(narrator, "Narocube: oookay", 0);

		    		player.weaponUpdate(newWeapon);
					textDialogue(narrator, ("Narocube: You have just recieved the " + player.weapon.name + " weapon, which gives you " + player.weapon.damage + " damage"), 1000);

		    		advanceStory();	

		    	} else if (pass == "no") {
		    		textDialogue(narrator, "Narocube: Okay, not changing weapons this time.", 0);

		    		advanceStory();	
		    	} else {
					textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 0);
		    	}
		    } else {
		    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
		    }
		    return false;
		});
	} 
}

// opens item chest
function chestI () {
	textDialogue(narrator, "Narocube: would you like to open this Item chest?", 2000);

	$('form').unbind();

	$('form').submit(function() { 
		var pass = $('#action').val().toLowerCase();
		var items;

		if ( pass !== "") {
			if (pass == "yes") {
				if (player.type == 'rouge') {
					items = randomRoll(2,0);
				} else {
					items = randomRoll(1,0);
				}

				switch (items) {
					case 0:
						textDialogue(narrator, "Narocube: The Chest had an Amulet in it!", 0);
						newAmulet = {};
						newAmulet = new Amulets(randomRoll(3,0));

						if ( isEmpty(player, 'amulet') ) {
							player.amulet = newAmulet;
							textDialogue(narrator, ("Narocube: You have just recieved the " + player.amulet.name + " amulet which gives you " + player.amulet.bonus*100 + " % bonus"), 1000);
							advanceStory();

						} else {
							textDialogue(narrator, ("Narocube: You already have a " + player.amulet.name + " do you wish to replace it with " + newAmulet.name + " with " + newAmulet.bonus*100 + " % bonus"), 1000);
							
							$('form').unbind();

							$('form').submit(function() {	
								var pass = $('#action').val().toLowerCase();

							    if ( pass !== "") {
							    	if (pass == "yes") {
										player.amulet = newAmulet;
										textDialogue(narrator, ("Narocube: You have just recieved the " + player.amulet.name + " amulet which gives you " + player.amulet.bonus*100 + " % bonus"), 1000);
										advanceStory();
							    	} else if (pass == "no") {
							    		textDialogue(narrator, "Narocube: Okay, not changing Items this time.", 1000);
							    		advanceStory();
							    	} else {
										textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 1000);
							    	}
							    } else {
							    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 1000);
							    }
							    return false;
							});
						}
					break;

					case 1:
						textDialogue(narrator, "Narocube: The Chest had Armor in it!", 0);
						newbodyArmor = {};
						newbodyArmor = new Armors(randomRoll(2,1));

						if ( isEmpty(player, 'bodyArmor') ) {
							player.bodyArmor = newbodyArmor;
							textDialogue(narrator, ("Narocube: You have just recieved the " + player.bodyArmor.name + " which gives you " + player.bodyArmor.duration + " duration"), 1000);
							advanceStory();

						} else {	
							textDialogue(narrator, ("Narocube: You already have the " + player.bodyArmor.name + " Do you wish to replace it with " + newbodyarmor.name + " with " + newbodyarmor.duration + " duration?"), 1000);
							
							$('form').unbind();

							$('form').submit(function() {	
								var pass = $('#action').val().toLowerCase();

							    if ( pass !== "") {
							    	if (pass == "yes") {
										player.bodyArmor = newbodyarmor;
										textDialogue(narrator, ("Narocube: You have just recieved the " + player.bodyArmor.name + " which gives you " + player.bodyArmor.duration + " duration"), 1000);
										advanceStory();
							    	} else if (pass == "no") {
							    		textDialogue(narrator, "Narocube: Okay, not changing Armor this time.", 1000);
							    		advanceStory();
							    	} else {
										textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 1000);
							    	}
							    } else {
							    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 1000);
							    }
							    return false;
							}); 
						}
					break;

					case 2:
						textDialogue(narrator, "Narocube: The Chest had an shield in it!", 0);

						if ( isEmpty(player, 'shield') ) {
							player.shield = {};
							player.shield = new Armors(0);
							textDialogue(narrator, ("Narocube: You have just recieved the " + player.shield.name + " shield which gives you " + player.shield.duration + " hp duration"), 1000);
							advanceStory();
						} else {
							textDialogue(narrator, "Narocube: Sorry, you already had a shield better luck next time!", 1000);
							advanceStory();
						}

					break;
				}

	    	} else if (pass == "no") {
	    		// gives players a second chance.
	    		setTimeout(chestNoSubmit(chestI),1000);
	    	} else {
				textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 0);
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }
	    return false;
	});
}
			
// opens Potion chest
function chestP () {
	textDialogue(narrator, "Narocube: Would you like to open this Potions chest?", 2000);

	$('form').unbind();

	$('form').submit(function() {
		var pass = $('#action').val().toLowerCase();

	    if ( pass !== "") {
	    	if (pass == "yes") {
				// random roll for Potion item
				newPotions = {};
				newPotions = new Potions(randomRoll(2,0));

				if ( isEmpty(player, 'potion') ) {
					player.potion = newPotions;
					textDialogue(narrator, ("Narocube: Congradulations you just recieved a " + player.potion.name + " Which can heal you " + player.potion.life + " health."), 0);
					advanceStory();

				} else {
					// keep the potion you have?
					textDialogue(narrator, ("Narocube: You already have a " + player.potion.name + " with " + player.potion.life + " hp do you wish to replace it with " + newPotions.name + " with " + newPotions.life + "?"), 0);
					
					$('form').unbind();

					$('form').submit(function() {
						var pass = $('#action').val().toLowerCase();

					    if ( pass !== "") {
					    	if (pass == "yes") {
								player.potion = newPotions;
								textDialogue(narrator, ("Narocube: Congradulations you just recieved a " + player.potion.name + " Which can heal you " + player.potion.life + " health."), 0);
								advanceStory();
					    	} else if (pass == "no") {
					    		textDialogue(narrator, "Narocube: Okay, not changing Potions this time.", 0);
					    		advanceStory();
					    	} else {
								textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 0);
					    	}
					    } else {
					    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
					    }
					    return false;
					});
				}
			} else if (pass == "no") {
	    		// gives players a second chance.
	    		setTimeout(chestNoSubmit(chestP),1000);
	    	} else {
				textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 0);
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }
	    return false;
	});
}

//checks to seee if they are sure and if yes thye continue if not they rerun current function
function chestNoSubmit(callback){
	textDialogue(narrator, "Narocube: Are you sure?", 0);
	$('form').unbind();

	$('form').submit(function() {	
		var pass = $('#action').val().toLowerCase();

	    if ( pass !== "") {
	    	if (pass == "yes") {
	    		textDialogue(narrator, "Narocube: oookay", 0);

	    		advanceStory();

	    	} else if (pass == "no") {
	    		callback();

	    	} else {
				textDialogue(narrator, "Narocube: Try again, maybe a 'yes' or 'no' ", 0);
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }
	    return false;
	});
}

//////////////////////////////////////////////////////////////////////////////////////////
//                       monster / fight control functions                              //

//roll for monster or chest
function chestorMonster(callback){
	var random = randomRoll(10,0);
	
	if ( random >= 2){
		monsterRoll();

	} else{
		textDialogue(narrator, "Narocube: Hey," + " " + player.name + " you found a Random Chest!", 1000);
		chestR();
	}
}

//roll for which monster monster
function monsterRoll(){
	var random = randomRoll(2,0);
	enemy = {};
	enemy = new Monster(random);
}

//decide whether to run or fight monsters
function fightorflight(){
	textDialogue(narrator, ("Narocube: You have ran across the deadly " + enemy.name + " Do you want to 'fight' or 'run'?"),2000);
	
	$('form').unbind();

	$('form').submit(function() {	
		var pass = $('#action').val().toLowerCase();

	    if ( pass !== "") {
	    	if (pass == "fight") {
	    		textDialogue(player, (player.name + ": Lets kill it!! kill it with fire!!!"), 0);
				fightMonster();

	    	} else if (pass == "run") {
	    		textDialogue(narrator, "Narocube: You right, that shits scary yo. Lets RUN!", 0);

	    		if (player.mvspeed >= enemy.mvspeed){
					textDialogue(narrator, ("Narocube: You're fast enough to loose the " + enemy.name), 1000);
					enemy = {};
					advanceStory();
				} else {
					textDialogue(narrator, ("Narocube: You have to stay and fight the " + enemy.name), 1000);
					fightMonster();
				}
	    	// } else if ( pass === 'c') {
	    	// 
	    	// 	textDialogue(narrator, "Narocube: Now that that is taken care of, maybe try 'go look', 'explore', or 'sit tight'", 0);
	    	}else {
				textDialogue(narrator, "Narocube: Stop tryin to break this game! \n we're all soldiers now!", 0)
				fightMonster();
	    	}
	    } else {
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }
	    return false;
	});
}

// If faced with a monster
function fightMonster(){

	if (enemy.health > 0 && player.health > 0){
			fight();
	} else if(enemy.health <= 0) {
	// Enemy dead
		textDialogue(narrator, "Narocube: Holy shit you kicked its ass! I mean well done! Onwards!", 0);
		enemy = {};

		advanceStory();
	// You dead
	} else if (player.health <= 0) {
		dead();//secret way for zombies to get back in the fight, we're all soldiers now.
	}
}


function fight(atkorder){
	//global variables
	var atkorder = 2;
	var CRhit;
	var sucess;

	if (player.ranged == true) {
		textDialogue(narrator, "Narocube: You have ranged abilities do you want to use them or melee: 'melee' or 'melee'", 2000);
	} else {
		textDialogue(narrator, "Narocube: Sorry you do not have ranged abilities, get in there and cut em up: 'melee'", 2000);
	}

	$('form').unbind();

	$('form').submit(function() {
		var pass = $('#action').val().toLowerCase();

		if ( pass !== "") {
	    	if (pass == "melee") {
	    		bosscheck();

	    		if (atkorder%2 == 0) {
	
					CRhit = CRhitRoll(player, enemy, atkorder); //rolls for critical hit. if damage, comes back true

					if( CRhit ) {
						textDialogue(narrator, "Narocube: You got a critical hit, you will do 2x damage now!", 0);
						textDialogue(narrator, (enemy.name + "'s new health is " + enemy.health), 1000);
						atkorder++;

					} else {
						// player attacking enemy
						sucess = attack(player, enemy, atkorder);

						if ( sucess ){
								textDialogue(narrator, ("You have struck " + enemy.name), 0);
								textDialogue(narrator, (enemy.name + "'s new health is " + enemy.health), 1000);								
						} else {
							textDialogue(narrator, "oh no, you missed!", 0);
						}
						atkorder++;
					}	
				}

				if(enemy.health <= 0){
					fightMonster();
				}

				if (atkorder%2 != 0 && enemy.health > 0) {
					// enemy attacks on odd turns, enemy has much lower chance for CR and player has higher evade
					CRhit = CRhitRoll(enemy, player, atkorder); //rolls for critical hit and does damage, no further damage needed

					if( CRhit ) {
						textDialogue(narrator, (enemy.name + ": got a critical hit! you will recieve 2x damage now!"), 2000);
						textDialogue(narrator, ("Narocube: Watch out your new health is " + player.health), 3000);
						atkorder++;
						fightMonster();
					} else {
						// enemy attacking player
						sucess = attack(enemy, player, atkorder);

						if ( sucess ) {
							textDialogue(narrator, ("Oh no, the " + enemy.name + " has attacked you!"), 2000);
							textDialogue(narrator, ("Narocube: Watch out your new health is " + player.health), 3000);
						} else {
							textDialogue(narrator, "Narocube: It missed you!", 2000);
						}
						atkorder++;
						fightMonster();
					}
				}

	//  	} else if (pass == "ranged") {
    // 		if (player.ranged == true) {

				// if (enemy.health > 0 && player.health > 0) {
				// 	atkorder = 2;

				// 	if (atkorder%2 == 0) {
			
				// 		CRhit = CRhitRoll(player, enemy, atkorder); //rolls for critical hit. if damage, comes back true

				// 		if( CRhit ) {
				// 			textDialogue(narrator, "Narocube: You got a critical hit, you will do 2x damage now!", 0);
				// 			textDialogue(narrator, (enemy.name + "'s new health is " + enemy.health), 0);
				// 			atkorder++;

				// 		} else {
				// 			// player attacking enemy
				// 			sucess = attack(player, enemy, atkorder);

				// 			if ( sucess ){
				// 					textDialogue(narrator, ("You have struck " + enemy.name), 0);
				// 					textDialogue(narrator, (enemy.name + "'s new health is " + enemy.health) ,0);								
				// 			} else {
				// 				textDialogue(narrator, "oh no, you missed!", 0);
				// 			}
				// 			atkorder++;
				// 		}	
				// 	} else if (atkorder%2 != 0 && enemy.health > 0) {
				// 		// enemy attacks on odd turns, enemy has much lower chance for CR and player has higher evade
				// 		CRhit = CRhitRoll(enemy, player, atkorder); //rolls for critical hit and does damage, no further damage needed

				// 		if( CRhit ) {
				// 			textDialogue(narrator, (enemy.name + ": got a critical hit! you will recieve 2x damage now!"), 0);
				// 			textDialogue(narrator, ("Narocube: Watch out your new health is " + player.health), 0);
				// 			atkorder++;
				// 		} else {
				// 			// enemy attacking player
				// 			sucess = attack(enemy, player, atkorder);

				// 			if ( sucess ) {
				// 				textDialogue(narrator, ("Oh no, the " + enemy.name + " has attacked you!"), 0);
				// 				textDialogue(narrator, ("Narocube: Watch out your new health is " + player.health), 0);
				// 			} else {
				// 				textDialogue(narrator, "Narocube: It missed you!", 0);
				// 			}
				// 			atkorder++;
				// 		}
				// 	}

				// 	// Enemy dead
				// 	if(enemy.health <= 0) {
				// 		textDialogue(narrator, "Narocube: Holy shit you kicked its ass! I mean well done! Onwards!", 0);
				// 		enemy = {};
				// 		advanceStory();
				// 	// You dead
				// 	} else if (player.health <= 0) {
				// 		dead();//secret way for zombies to get back in the fight, we're all soldiers now.
				// 	}
				// }
    // 		} else {
    // 			textDialogue(narrator, "Narocube: Sorry you do not have ranged abilities, get in there and cut em up: 'melee'", 0);
    // 		}
	    	} else {
	    		textDialogue(narrator,  "Narocube: Try again, maybe 'melee', or 'melee'", 0);
	    	}
	    } else{
	    	textDialogue(narrator, "Narocube: Please choose an action to take not ' '", 0);
	    }

		return false;
	});

}


function bosscheck(){
	if (enemy.name == "THE DEMIGORGON" && enemy.health <= (.5 * enemy.maxhp) && johnfirst){
		textDialogue(john,"John: Hey! Let me get a shot on her!", 0);
		enemy.health -= john.damage;
		textDialogue(john,"John: Alright, direct hit!", 8000);
		textDialogue(narrator, ("Narocube: Oh wow the queens life is now" + enemy.health), 9000);	
		textDialogue(enemy, (enemy.name + ": OH, I GUESS THAT STINGS"), 10000);
		john.johnfirst = false;
	}
}
								

// attacks rolls for attack chance, accounts for evasion chance and deals damage. 
// returns true if hit
function attack(atkobj, defobj, atkorder) {
	var hitchance = randomRoll(10,1);

	switch(atkorder%2){
		case 0: //player attack

			if (atkobj.amulet.type == 'damage'){
				var atkdmg = atkobj.damage * atkobj.amulet.bonus;
			} else {
				var atkdmg = atkobj.damage;
			}

			if ( hitchance >= 1 + defobj.evasion) {
				defobj.health -= atkdmg;
				return true;
			} else {
				return false;
			}
		break;

		case 1: // monster attack

			if (player.amulet.type == 'evasion') {
				var defeva = defobj.evasion * defobj.amulet.bonus;
			} else {
				var defeva = defobj.evasion;
			}

			if ( hitchance >= 1 + defeva) {
				defobj.health -= atkobj.damage;
				return true;
			} else {
				return false;
			}
		break;
	}
}


// checks to see if you get a chritical hit, and does damage
// returns true if hit
function CRhitRoll(atkobj, defobj, atkorder) {
	var criticalChance = randomRoll(10,1);
	var hitchance = randomRoll(10,1);
	var CRbonus = 2;

	switch(atkorder%2){
		case 0: //player attack
			var atkdmg = atkobj.damage;
			var atkcrh = atkobj.criticalHit;

			if (player.amulet.type === 'damage'){
				atkdmg = atkobj.damage * atkobj.amulet.bonus;
			} else if (player.amulet.type === 'critical'){
				atkcrh = atkobj.criticalHit * atkobj.amulet.bonus;
			}

			if (criticalChance <= (1 + atkcrh) && hitchance >= (1 + defobj.evasion)) { //criticalHit is a %likely to land
				defobj.health -= atkdmg * CRbonus ;
				return true;
			} else {
				return false;
			}
		break;

		case 1: // monster attack
			var defeva = defobj.evasion;
			if (player.amulet.type == 'evasion') {
				defeva = defobj.evasion * defobj.amulet.bonus;
			}  


			if (criticalChance <= (1 + atkobj.criticalHit) && hitchance >= (1 + defeva)) {
				defobj.health -= atkobj.damage*CRbonus;
				return true;
			} else {
				return false;
			}
		break;
	}
}


//////////////////////////////////////////////////////////////////////////////////////////
//                            custom math functions                                     //

// Math.floor(Math.random() * (max - min +1)) + min	
function randomRoll(max, min){
	var num = Math.floor(Math.random() * (max - min +1)) + min;
	return num;
}

// function that determines if an object inside another object is empty
function isEmpty(obj, propName) {
   return Object.keys(obj[propName]).length == 0;
}

///////////////////////////////////////////////////////////////////////////////////////////
// 									Game level dynamics									//


function resetgame(){//RESTARTING variables

	gameobj = {sittight:0, // counter for sittin tight through game
					 explore:0, // counter to determine number of times explore is choosen
					  upstiars:false, // counter not used yet
					    submitval:'',
					     storyPoint:0,}; // counter to progress game through 'levels'

		//item preload for game use
	amulet = {};
	bodyArmor = {};
	shield = {};
	Potion = {};


					//character initiation
	player = {voice: 'white'};	// active player
	enemy = {};					// Empty monster object, when defeated it empties and allows next monster to populate
	john = {};                  // John character to help you fight boss
	narrator = {voice: 'blue'};

	// wait 3 seconds and rerun initial game.
	setTimeout(mainLoop, 3000);
}

function advanceStory(){
	gameobj.storyPoint++;
	$('form').unbind();
	mainLoop();
}