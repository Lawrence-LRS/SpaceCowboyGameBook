// Character types //title screen
// -------------------------
// -base character stats (all characters)
// 	- movement speed: 5 (not currently important to game (v1))
// 	- vitality: 100 life points (varries by characterclass v1)
// 	- % Critical Hit: 10% (v1)
// 	- % Evasion: 10% (v1)
//
// -Rouge, 
// 	Thought as the fast and sneaky hero type, specalizes in daggers, movement speed, with reduced life
// 	+2 movement speed
// 	-25 life
// 	+ 10% Evasion (potentially 2nd draft of game)
// 	weapons: melee ( daggers, shields, knives, (daul weild option))
//
// -soldier
// 	Standard life and speed but is equiped with ranged weapons
// 	+0 movement speed
// 	+0 life
// 	+ 10% Critical Hit
// 	weapons: ranged( pistol (2) rifle)
//
// -Tank
// 	Increased life with slow movement but large attacks
// 	-2 movement speed
// 	+25 life
// 	-10% Evasion
// 	weapons: Large melee ( two handed: swords axes (2.1% damage (compared to daul wielding)))
//
// --------------------------------
//
//
// -Characters
// 	-Attributes
// ---------------------------
//
// - You (hero)
// 	- name, age, type
//
// - John
// 	- leaves you for most of game, if you save him while in danger he will help a lot on boss fight
// 		+ 20% Critical Hit
// 		+ 20% Evasion
// 		200 life points
// 		+ ranged (rifle (large damage))
//
// -----------------------------
// -Monsters
// 		Blood Hound
//		roachling
//		Ashserpent
//
// -Boss
// 	300 life points
// 	+ 25% Evasion melee
// 	+  5% Evasion ranged
// 	Damage Range: 15pts
// 	Damage Melee: 30pts
// ------------------------




// creating the player object to carry its stats into game.

function character(name, type){
	this.name = name;
	this.type = type;
	this.voice = 'white';

	this.weapon = new weapons(0);
	this.consumable = {};
	this.amulet = {};
	this.shield = {};
	this.bodyArmor = {};


	var	hpMod;
	var	mvspeedMod;
	var	evasionMod;
	var	criticalMod;

	switch(type) {
	    case "rouge":
	    // rouge character class has lower hp, faster movment and evasion + daul wielding/ shield
	        hpMod = -25;
			mvspeedMod = 2;
			evasionMod = 2;
			criticalMod = 0;
			this.dual = true;
			this.ranged = false;
	    break;

	    case "soldier":
	    // soldier class as increased critical hit chance but no negatives + ranged weapons
		    hpMod = 0;
			mvspeedMod = 0;
			evasionMod = 0;
			criticalMod = 1;
			this.dual = false;
			this.ranged = true;
	    break;

	    case "tank":
	    // tank has increased hp but takes hit to speed and dodge + two handed weapons
		    hpMod = +25;
			mvspeedMod = -2;
			evasionMod = -1;
			criticalMod = 1;
			this.dual = false;
			this.ranged = false;
	    break;

	  //   case "april":
	  //   // god class + all good, all weapons
		 //    hpMod = +50;
			// mvspeedMod = 5;
			// evasionMod = .5;
			// criticalMod = .5;
			// this.dual = true;
			// this.ranged = true;
	  //   break;
	}

	this.hpmax = 100 + hpMod;
	this.health = this.hpmax;

	this.mvspeed = 5 + mvspeedMod;
	this.evasion = 3 + evasionMod;
	this.criticalHit = 2 + criticalMod;
	this.damage = this.weapon.damage

};

// creating companion character with stats. ( has increased damage ranged weapon )
function Companion() {
	this.name =  "John";
	this.voice = 'green';
	this.health = 200;
	this.evasion = .2;
	this.criticalHit = 2;
	this.weapon = new weapons(6);
}

//so I can call monster and either roll for difficulty or just call them out
function Monster(difficulty) {
	this.voice = 'red';
	this.criticalHit = 1;

	switch (difficulty) {
		case 0:
			this.name = "Blood Hound";
			this.damage = 25;
			this.health= 200;
			this.mvspeed = 6;
			this.evasion = 1;
		break;

		case 1:
			this.name = "Roachling";
			this.damage = 20;
			this.health= 300;
			this.mvspeed = 5;
			this.evasion = 1;
		break;

		case 2:
			this.name = "Ashserpent";
			this.damage = 35;
			this.health= 150;
			this.mvspeed = 4;
			this.evasion = 1;
		break;
	}

}

// creating the object for the end game boss fight
function monsterBoss(sittight) {
	this.name = "THE DEMIGORGON";
	this.voice = 'red';
	this.damage = 25;
	this.damageR = 50;
	this.health = 200;
 
// one game victory mode is to ignore all signs of danger, John will appear on the deck and the 
// DEMIGORGON wont show herself, sittight is a counter for ignored warnings.
	this.evasion = 2;
	this.criticalHit = 2;

}
