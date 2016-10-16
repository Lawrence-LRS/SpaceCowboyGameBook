// controller to perform various tasks, right now including
// chest openings

// Math.floor(Math.random() * (max - min +1)) + min	



// bring up character selection and images

function characterChoice (name){

	var text;

	$('.overlay').on('click', function(){
		var id = event.target.id;

		if (id.length < 8){

			switch(id){

				case 'rouge':
					text = "You have choosen the rouge,\n be as cunning as a fox!";
				break;

				case 'soldier':
					text = "You have choosen the soldier,\n stay your distance to stay alive!";
				break;

				case 'tank':
					text = "You have choosen the tank,\n GET UP IN THERE!";
				break;

			}

			alert(text);
			var player = new character(name, id);
			console.log( "player generated");
			$( ".overlay" ).toggle();

		} else {

			alert("choose a class of player to continue.");
			characterChoice (name);
		}
		return player;
	});	

	$(document).keydown(function(key) {
		if (key == 65){
			alert("You have choosen a goddess,\n be gental!");
			charchoice = "april";
			$( ".overlay" ).toggle();
			var player = new character(name, charchoice);	
			return player;		
		}
	});

	
};


// opens random chest
function chestR(type)
{
	var open = confirm("would you like to open this Random chest?");
	var random = weapons(Math.floor(Math.random()*(2 - 1 + 1)) + 1);

	if (open == true) {
		switch (random)
		{
			case 0:
				chestW(type);
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
		if (open == true)
		{
			alert("oookay");
			return;
		} else
		{
			chestR(type);
		}
	}
}


// opens weapons chest
function chestW (type) {
	var open = confirm("would you like to open this weapons chest?");
	if (open == true) {
		// weapon(0) = fist
		switch(type) 
		{
		    case "rouge":
			// weapons dual = 1,2
		 	  	var newWeapon = weapons(Math.floor(Math.random()*(2 - 1 + 1)) + 1);
		 	  	if (player.weapon.name == "FIST OF FURRY")
		 	  	{
		 	  		player.weapon = newWeapon;
			 		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage + "damage");
			 	} else
			 	{
			 		var replacepWeapon = confirm("You already have " + " " + player.weapon.name + "with" + player.weapon.damage + "\n do you wish to replace it with" + newWeapon.name + "with" + newWeapon.damage+ "?");
			 	  	if (replacepWeapon == true)
			 	    {
			 	   		player.weapon = newWeapon;
			 	   		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage+  "damage");
			 	    } else
			 	    {
			 	    	return;
			 	    }
			 	}
		    break;

		    case "soldier":
		    // weapons dual = 5,6
				var newWeapon = weapons(Math.floor(Math.random()*(6 - 5 + 1)) + 5);
		 	    if (player.weapon.name == "FIST OF FURRY"){
		 	  		player.weapon = newWeapon;
			 		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage + "damage");
			 	} else {

			 		var replacepWeapon = confirm("You already have " + " " + player.weapon.name + "with" + player.weapon.damage + "\n do you wish to replace it with" + newWeapon.name + "with" + newWeapon.damage+ "?");
			 	  	if (replacepWeapon == true)
			 	    {
			 	   		player.weapon = newWeapon;
			 	   		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage + "damage");
			 	    } else
			 	    {
			 	    	return;
			 	    }
			 	}
		     break;

		    case "tank":
			// weapons dual = 5,6
				var newWeapon = weapons(Math.floor(Math.random()*(4 - 3 + 1)) + 3);
				if (player.weapon.name == "FIST OF FURRY") {
					
		 	  		player.weapon = newWeapon;
			 		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage + "damage");
			 	} else {

			 		var replacepWeapon = confirm("You already have " + " " + player.weapon.name + "with" + player.weapon.damage + "\n do you wish to replace it with" + newWeapon.name + "with" + newWeapon.damage+ "?");
			 	  	if (replacepWeapon == true)
			 	    {
			 	   		player.weapon = newWeapon;
			 	   		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage + "damage");
			 	    } else
			 	    {
			 	    	return;
			 	    }
			 	}
		     break;

		    case "april":
		    // god class, all weapons
			    var newWeapon = weapons(Math.floor(Math.random()*(6 - 1 + 1)) + 1);
			    if (player.weapon.name == "FIST OF FURRY")
		 	  	{
		 	  		player.weapon = newWeapon;
			 		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage + "damage");
			 	} else
			 	{
			 		var replacepWeapon = confirm("You already have " + " " + player.weapon.name + "with" + player.weapon.damage + "\n do you wish to replace it with" + newWeapon.name + "with" + newWeapon.damage+ "?");
			 	  	if (replacepWeapon == true)
			 	    {
			 	   		player.weapon = newWeapon;
			 	   		alert("You have just recieved the" + player.weapon.name + "weapon \n which gives you" + player.weapon.damage + "damage");
			 	    } else
			 	    {
			 	    	return;
			 	    }
			 	}
		     break;
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


// opens item chest
function chestI () {
	var open = confirm("would you like to open this Item chest?");
	
	if (open == true)
	{
		if (player.type == rouge)
		{
			type = Math.floor(Math.random()*(2 - 0 + 1)) + 0;
		} else
		{
			type = Math.floor(Math.random()*(1 - 0 + 1)) + 0;
		}
		
		switch (type)
		{
			case 0:
				alert("The Chest had an Amulet in it!");
				var newAmulet = Amulet(Math.floor(Math.random()*(3 - 0 + 1)) + 0);
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
				var newbodyarmor = Armor(Math.floor(Math.random()*(2 - 1 + 1)) + 1);
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
					player.shield = Armor(0);
					alert("You have just recieved the" + player.shield.name + "shield \n which gives you" + player.shield.duration + "hp duration");
				} else
				{
					alert("Sorry, you already had a shield \n better luck next time");
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
		var newPotion = Consumables(Math.floor(Math.random()*(2 - 0 + 1)) + 0);
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

