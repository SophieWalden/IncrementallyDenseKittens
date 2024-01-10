import "./optionsTab.css"
import {useState, useEffect} from "react";
import Decimal from "break_infinity.js";

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
  
function isISOString(inputString) {
    // Regular expression for ISO 8601 date string
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    // Check if the string matches the ISO 8601 format
    return iso8601Regex.test(inputString);
}

function OptionsTab(props){

    function saveGame(){
        if (props.state.loaded || localStorage.getItem("incrementallyDenseKittensSave") == null)
            localStorage.setItem("incrementallyDenseKittensSave", btoa(JSON.stringify(props.state)));
    }
    
    function loadGame(){
        let save = localStorage.getItem("incrementallyDenseKittensSave")
        try{

            JSON.parse(atob(save))
            } catch(e){
            return false;
            }
      
        save = JSON.parse(atob(save))

        let upgradesGotten = {};
        for (const upgrade in props.state.upgrades){
            upgradesGotten[upgrade] = save["upgrades"][upgrade].unlocked;
        }


        for (const entry in save){
            if (isNumeric(save[entry])){
                save[entry] = new Decimal(save[entry])
            }

            if (isISOString(save[entry])){
                save[entry] = new Date(save[entry]);
            }

            if (entry == "cats"){
                for (let i = 0; i < save[entry].length; i++){
                    save[entry][i].density = new Decimal(save[entry][i].density);
                }
            }
        }

        save["loaded"] = true;

        // Reloading upgrades
        let upgrades = props.state.upgrades;
        for (const entry in upgradesGotten){
            upgrades[entry].unlocked = upgradesGotten[entry]
        }
        save["upgrades"] = upgrades;

        let newState = {

            // Resources
            "coins": new Decimal(10),
            "pressurizedCoins": new Decimal(0),
    
    
            // Inventory Tab
            "cats": [],
            "selectedCat": -1,
            "nextCatId": 0,
            "equippedCats": [],
            "maxEquippedCats": 3,
    
            // Hatching Tab
            "eggHatchingIndex": 0,
            "eggOpeningAmount": 1,
            "autoHatchingSpeeds": [60, 30, 20, 15, 10, 5, 4, 3, 2, 1, 0.5],
            "unlockedEggs": 1,
            "lastAutobuyingDate": new Date(),
    
            // Combat Tab
            "currentEnemy": "dog",
            "playerLostHealth": new Decimal(0),
            "playerMaxHealth": new Decimal(0),
            "enemyMaxHealth": new Decimal(0),
            "enemyLostHealth": new Decimal(0),
            "playerSpeed": new Decimal(2),
            "enemySpeed": new Decimal(1),
            "playerDamage": new Decimal(0),
            "enemyDamage": new Decimal(0),
            "playerLastAttackDate": new Date(),
            "enemyLastAttackDate": new Date(),
            "currentWorld": 0,
            "worldsUnlocked": [0],
            "killsPerWorld": [0],
            "enemyPowerLevel": 1,
            "firstEnemy": true,
    
            // Pressure Tab
            "catsSeen": [],
            "perkPoints": 0,
            "upgrades": {1: {"name": "Cat Legion Unleashed", "description": "[Rebuyable] Equip More Cats!", "unlocked": 0, "cost": 3, id:1},
            2:{"name": "Feline Frenzy", "description": "Scale Attack Speed with amount of equipped cats. 10% per cat", "unlocked": 0, "cost": 20, id:2},
            3:{"name": "Hydraulic Press!", "description": "Too many cats? Unlock the Hydraulic press and new eggs based on compacting cats together", "cost": 10, "unlocked": 0, id:3},
            4:{"name": "Multi Egg Elegance", "description": "[Rebuyable] Open more eggs at once", "cost": 7, "unlocked": 0, id:4},
            5:{"name": "Density Drive", "description": "Unlock powerful combat effects after hitting density milestones per cat (Crit, Attack Speed, etc)", "cost": 35, "unlocked": 0, id:5},
            6:{"name": "Unstoppable Pressure", "description": "Keep your 3 highest density cats when using the Hydraulic Press", "cost": 50, "unlocked": 0, id:6},
            7:{"name": "Auto Egg Bot", "description": "[Rebuyable] Opens your active egg every x seconds", "cost": 30, "unlocked": 0, id:7},
            8:{"name": "Overkill Overdrive", "description": "Excess damage in combat carries over to the next enemy", "cost": 100, "unlocked": 0, id:8},
            9:{"name": "Cat Party!", "description": "35% Increase in damage for every unique cat in your party", "cost": 500, "unlocked": 0, id:9},
                },
    
            // Options Tab
            "loaded": false,
            "gameBeaten": false,
            "endScreenShown": false}

        for (const entry in newState){
            if (!Object.keys(save).includes(entry)){
                save[entry] = newState[entry]
            }
        }

        props.setState(save);
    }

    useEffect(() => {
        loadGame();
      }, []);


    useEffect(() => {
        saveGame()
    }, [props.state.coins, props.state.cats.length, props.state.playerLastAttackDate])
 
    function resetGame(){
        localStorage.removeItem("incrementallyDenseKittensSave");
        window.location.reload();
    }

    return (
        <div id="options-container">
                <h3> Incrementally Dense Kittens!</h3>

                <h4>In loving Memory of John, who I made some of my first games with. You were taken too soon</h4>

                <div id="save-container">
                    <h2 id="save-button" onClick={() => saveGame()}>Save</h2> <h2 id="load-button" onClick={() => loadGame()}>Load</h2>
                </div>

                <h2 id="reset-button" onClick={() => resetGame()}>Reset Game</h2>
        </div>
    )
}

export default OptionsTab