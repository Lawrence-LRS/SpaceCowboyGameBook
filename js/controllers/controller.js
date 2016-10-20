// controller to perform various tasks, right now including
// chest openings


// bring up character selection and images

function characterChoice (name, chartype) {

	if (chartype == 'rouge' || 'soldier' || 'tank'){

		switch(chartype){

			case 'rouge':
				alert("You have choosen the rouge,\n be as cunning as a fox!");
			break;

			case 'soldier':
				alert("You have choosen the soldier,\n stay your distance to stay alive!");
			break;

			case 'tank':
				alert("You have choosen the tank,\n GET UP IN THERE!");
			break;

			// case 'april':
			// 	alert("You have choosen a goddess,\n be gental!");
			// break;

		}

		player = new character(name, chartype);
		console.log( "player generated");
		$( ".overlay" ).remove();
		$(document).off('keydown');
		storyTime();
	}
};
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

//roll for monster or chest
function chestorMonster(){
	var random = randomRoll(10,0);
	
	if ( random >= 3){
		monsterRoll();
	} else{
		chestR();
	}
}
//roll for which monster monster
function monsterRoll(){
	var random = randomRoll(2,0);
	var enemy = new Monster(random);
}

// opens random chest
function chestR() {
	var open = confirm("would you like to open this Random chest?");
	var random = randomRoll(2,0);

	if (open == true) {
		switch (random) {
			case 0:
				chestW();
			break;

			case 1:
				chestI();
			break;

			case 2:
				chestC();
			break;
		}
	} else {
		// gives players a second chance.
		open = confirm("Are you sure?");
		if (open == true) {
			alert("oookay");
			return;
		} else {
			chestR();
		}
	}
}


// opens weapons chest
function chestW () {
	var open = confirm("would you like to open this weapons chest?");
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
	} else
	{
		// gives players a second chance.
		open = confirm("Are you sure?");
		if (open == true)
		{
			alert("oookay");
			return;
		} else
		{
			chestW(type);
		}
	}
}

//checks current weapon and replaces with new
function weaponCheck (newWeapon) {
	if (player.weapon.name == "FIST OF FURRY") {
		player.weapon = newWeapon;
		player.damage = player.weapon.damage;
		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.damage + "damage");
	} else {
		var replacepWeapon = confirm("You already have " + " " + player.weapon.name + "with" + player.weapon.damage + "\n do you wish to replace it with" + newWeapon.name + "with" + newWeapon.damage+ "?");
		if (replacepWeapon == true) {
			player.weapon = newWeapon;
			player.damage = player.weapon.damage;
			alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage+  "damage");
		} else {
			return;
		}
	} 
};

// opens item chest
function chestI () {
	var open = confirm("would you like to open this Item chest?");
	
	if (open == true)
	{
		if (player.type == 'rouge')
		{
			type = randomRoll(2,0);
		} else
		{
			type = randomRoll(1,0);
		}
		
		switch (type)
		{
			case 0:
				alert("The Chest had an Amulet in it!");
				var newAmulet = new Amulet(randomRoll(3,0));
				if (player.amulet == null)
				{
					player.amulet = newAmulet;
					alert("You have just recieved the" + player.amulet.name + "amulet \nwhich gives you" +player.amulet.bonus*100 + "% bonus");
				} else
				{
					var replaceAmulet = confirm("You already have a" + " " + player.amulet.name + "\n do you wish to replace it with" + newAmulet.name + "with" + newAmulet.bonus*100 + "% bonus");
					if ( replaceAmulet == true)
					{
						player.amulet = newAmulet;
						alert("You have just recieved the" + player.amulet.name + "amulet \nwhich gives you" + player.amulet.bonus*100 + "% bonus");
					} else
					{
						return;
					}
				} 
			break;


			case 1:
				alert("The Chest had Armor in it!");
				var newbodyarmor = new Armor(randomRoll(2,1));
				if (player.bodyArmor == null)
				{
					player.bodyArmor = newbodyarmor;
					alert("You have just recieved the" + player.bodyArmor.name + "Armor \n which gives you" + player.bodyArmor.bonus + "bonus");
				} else
				{	
					var replaceArmor = confirm("You already have a" + " " + player.bodyArmor.name + "\n do you wish to replace it with" + newbodyarmor.name + "with" + newbodyarmor.bonus+ "?");
					if ( replaceArmor == true)
					{
						player.bodyArmor = newbodyarmor;
						alert("You have just recieved the" + player.bodyArmor.name + "Armor \n which gives you" + player.bodyArmor.bonus + "bonus");
					} else
					{
						return;
					}
				} 
			break;


			case 2:
				alert("The Chest had an shield in it!");
				if (player.shield == null )
				{
					player.shield = new Armor(0);
					alert("You have just recieved the" + player.shield.name + "shield \n which gives you" + player.shield.duration + "hp duration");
				} else
				{
					alert("Sorry, you already had a shield \n better luck next time!");
					return;
				}
			break;
		}

	} else
	{
		// gives players a second chance.
		open = confirm("Are you sure?");
		if (open == true)
		{
			alert("oookay");
			return;
		} else
		{
			chestI();
		}
	}
}

// opens consumable chest
function chestC () {
	// confirm opening the chest
	var open = confirm("would you like to open this consumables chest?");
	if (open == true)
	{
		// random roll for consumable item
		var newPotion = new Consumables(randomRoll(2,0));
		if (player.consumable != null)
		{
			// keep the potion you have?
			var keepPotion = confirm("You already have a" + " " + player.consumable.name + " with " + player.consumable.life + "hp" + "\n do you wish to replace it with" + newPotion + "with" + newPotion.life + "?");
			if ( keepPotion == true)
			{
				// replaces consumable with new potion
				player.consumable = newPotion;
			} else
			{
				return;
			}
		} else
		{
			player.consumable = newPotion;
			alert("congradulations you just recieved a " +" " + player.consumable.name + "\nWhich can give you" + " " + player.consumable.life + "health");
		}
	} else
	{
		// gives players a second chance.
		open = confirm("Are you sure?");
		if (open == true){
			alert("oookay");
			return;
		} else{
			chestC();
		}
	}
}


// uses potion
function useConsume() {

	if (player.consumable != null)
	{
		player.health = player.health + player.consumable.life;
		player.consumable = null;
		if (player.health > player.hpmax)
		{
			player.health = player.hpmax;
		} else
		{
			return;
		}

	} else
	{
		alert("You do not have anything to consume");
	}
}

// Math.floor(Math.random() * (max - min +1)) + min	
function randomRoll(max, min){
	var num = Math.floor(Math.random() * (max - min +1)) + min;
	return num;
}

// if faced with a monster
function fightMonster(){

	//global variables
	var attackorder;
	var method;
	var CRhit;
	var sucess;

	alert("It's fight time. Be brave" + " " + player.name +".");
	while(enemy.health > 0 && player.health > 0){
		attackorder = 0;

		if (attackorder = 0){
			if (player.ranged == true){
				var method = prompt("You have ranged abilities do you want to use them or melee: 'ranged' or 'melee'").toLowerCase();
			} else {
				var method = prompt("Sorry you do not have ranged abilities, get in there and cut em up: 'melee'").toLowerCase();
			}


			CRhit = criticalHit(player, enemy); //rolls for critical hit. if damage, comes back true

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
				alert("You got a critical hit, you will do 2x damage now!");
				alert(enemy.name + "'s new health is" + " " + enemy.health);
				attackorder++;
			}
		} else {

			// enemy attacks on odd turns, enemy has much lower chance for CR and player has higher evade
			CRhit = criticalHit(enemy, player); //rolls for critical hit and does damage, no further damage needed


			if(CRhit == false) {
			// enemy attacking player
				sucess = attack(enemy, player);
					if (sucess == true){
						alert("Oh no, the" + " " + enemy.name + " has attacked you!");
						alert("Watch out your new health is" + player.health);
					} else {
						alert("It missed you!");
					}
				attackorder++;

			} else {
				alert(enemy.name + " got a critical hit! you will recieve 2x damage now!");
				alert("Watch out your new health is" + player.health);
				attackorder++;
			}
		}
	}


	if(enemy.health <= 0) {
		alert("You've defeated the" + " " + enemy.name +"! Onwards!");
		enemy = {};
		return;

	} else if (player.health <= 0) {
		// then you have died
		dead();
		return;
	}
}


function attack(atkobj, defobj) {
	var hitchance = randomRoll(10,1);

	if (player.amulet.type == 'evasion') {
			
	} else {

	}


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
function criticalHit(atkobj, defobj) {
	var criticalChance = randomRoll(10,1);
	var CRbonus = 2;

	if (player.amulet.type == 'critical') {
			
	} else {
		
	}

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

// If you die
function dead(){

	alert("It seems as though you have fallen great warrior");
	alert("Try again? maybe this time you sit tight or explore more?");

	var action = prompt("Would you like to play again, yes, no").toLowerCase();

	switch (action) {
		case 'yes':
		initiateGame();
		break;

		case 'no':
			alert("Hope you enjoyed your time anyway.");
			$('.gameover').toggle();
			//end game, idk how
		break;

		case 'one more time':
			// heal player to half health and start back where he was
			player.health = player.hpmax/2;
			return;
		break;
				
		default:
			alert("I'll take that as a yes!");
			initiateGame();
	}
}
