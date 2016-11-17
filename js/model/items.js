// Items class:
// ------------------------
// 	Weapons:
// 		daggers: 20 dmg
// 		knives : 30 dmg
// 		swords : 30 dmg
// 		axes   : 60 dmg
// 		pistol : 30 dmg
// 		rifle  : 60 dmg

// 	Amulet:
// 		Critical Hit : + 15%
// 		Damage: + 50%
// 		Life: + 50 hp
// 		Evasion + 25%

// 	Armor:
// 		Shield:
// 		light Armor:
// 		heavy Armor:

// 	Consumables
// 		Potion:
// 		Large Potion:


//weapon objects
function Weapons(num) {
	switch(num) {
		case 0:
			this.name =  "FIST OF FURRY",
			this.damage = 10
		break;
			
    	case 1:
			this.name =  "Dagger of Light",
			this.damage = 30
		break;

		case 2:
			this.name =  "knife boi",
			this.damage = 40
		break;

		case 3:
			this.name =  "sword",
			this.damage = 40
		break;

		case 4:
			this.name =  "axe",
			this.damage = 80
		break;

		case 5:
			this.name =  "pistol",
			this.damage = 40
		break;

		case 6:
			this.name =  "rifle",
			this.damage = 90
		break;
	}
}

// Amulet objects
function Amulets (num) {

	switch(num) {
	    case 0:
		    // amulet that increases characters critical hit mod
			// Critical Hit : +25%   
			this.name = "typeCritical";
			this.type = 'critical';
			this.bonus = 1.25;
	    break;

	    case 1:
		    // amulet that increases characters base damage
			// Damage: + +25%	
			this.name =  "typeDamage";
			this.type = 'damage';
			this.bonus = 1.25;
	    break;

	    case 2:
		    // amulet that increase characters life hit points
			// Life: +25%	
			this.name = "typelife";
			this.type = 'health';
			this.bonus = 1.25;
	    break;

	    case 3:
		    // amulet that increase evasion
			// Evasion +25% 
			this.name = "typeEvasion";
			this.type = 'evasion';
			this.bonus = 1.25;
		break;
	}
}

function Armors (num) {

	switch(num) {
	    case 0:
			// Armor increase:
			this.name = "buckler shield";
			this.duration = 25;
	    break;

	    case 1:
			// Armor increase
			this.name = "Light Armor";
			this.duration = 15;
	    break;

	    case 2:
			// Armor increase:	
			this.name = "Heavy Armor";
			this.duration = 30;
	    break;
	}
}

function Potions (num) {

	switch(num) {
	    case 0:
			//lifepoint increase:    
			this.name = "Small Potion";
			this.life = 25;

        break;

  	    case 1:
			//lifepoint increase:    
			this.name = "Medium Potion";
			this.life = 50;
        break;

	    case 2:
			//lifepoint increase:    
			this.name = "Large Potion";
			this.life = 75;
        break;
	}
}

