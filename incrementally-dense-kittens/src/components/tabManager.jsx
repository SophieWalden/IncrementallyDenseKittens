import "./tabManager.css"
import {useState, useEffect} from "react";

import CatsTab from "./catsTab";
import HatchingTab from "./hatchingTab";
import PressureTab from "./pressureTab";
import CombatTab from "./combatTab";
import OptionsTab from "./optionsTab";
import PressTab from "./pressTab";

import Decimal from "break_infinity.js";

import {formatValues} from "./globalFunctions";

function TabManager(){

    const [tab, setTab] = useState("cats");
    const [state, setState] = useState({

        // Resources
        "coins": new Decimal(100000),
        "pressurizedCoins": new Decimal(0),


        // Inventory Tab
        "cats": [],
        "selectedCat": -1,
        "nextCatId": 0,
        "equippedCats": [],
        "maxEquippedCats": 3,

        // Hatching Tab
        "eggHatchingIndex": 0,

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
        "worldsUnlocked": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
        "killsPerWorld": [0],
        "enemyPowerLevel": 1,
        "firstEnemy": true,

        // Pressure Tab
        "catsSeen": [],
        "perkPoints": 0,
        "upgrades": {1: {"name": "Cat Legion Unleashed", "description": "[Rebuyable] Equip More Cats!", "unlocked": 0, "cost": 2, id:1},
        2:{"name": "Feline Frenzy", "description": "Scale Attack Speed with amount of equipped cats. 10% per cat", "unlocked": 0, "cost": 10, id:2},
        3:{"name": "Hydraulic Press!", "description": "Too many cats? Unlock the Hydraulic press and new eggs based on compacting cats together", "cost": 5, "unlocked": 0, id:3},
        4:{"name": "Multi Egg Elegance", "description": "[Rebuyable] Open more eggs at once", "cost": 3, "unlocked": 0, id:4},
        5:{"name": "Density Drive", "description": "Unlock powerful combat effects after hitting density milestones per cat (Crit, Poison, etc)", "cost": 15, "unlocked": 0, id:5},
        6:{"name": "Unstoppable Pressure", "description": "Keep your 3 highest density cats when using the Hydraulic Press", "cost": 20, "unlocked": 0, id:6},
        7:{"name": "Auto Egg Bot", "description": "[Rebuyable] Opens your active egg every x seconds", "cost": 10, "unlocked": 0, id:7},
        8:{"name": "Overkill Overdrive", "description": "Excess damage in combat carries over to the next enemy", "cost": 40, "unlocked": 0, id:8},
        9:{"name": "Stellar Accumulate", "description": "Unlock Stellar Cats", "cost": 100, "unlocked": 0, id:9},
            },
        
    });

    function calculateStats(){
        // Calculate Combat Stats
        let totalDensity = new Decimal(0);
        for (let i = 0; i < state.equippedCats.length; i++){
            for (let j = 0; j < state.cats.length; j++){
                if (state.cats[j].id == state.equippedCats[i]){
                    totalDensity = totalDensity.plus(state.cats[j].density);
                }
                    
            }
        }

        setState((oldState) => ({
            ...oldState, "playerMaxHealth": totalDensity.times(5),
            "playerDamage": totalDensity,
            "playerSpeed": new Decimal(2)
        }))
    }

    useEffect(() => {
        calculateStats();
      }, [state.equippedCats]);

    return (
        <div>   
                <div id="site-header">
                <div id="tab-button-holder">
                        <div className="tab-selector-buttons" onClick={() => setTab("cats")}>Cats</div>
                        <div className="tab-selector-buttons" onClick={() => setTab("eggs")}>Eggs</div>
                        <div className="tab-selector-buttons" onClick={() => setTab("combat")}>Combat</div>
                        <div className="tab-selector-buttons" onClick={() => setTab("pressure")}>Pressure Perks</div>
                        <div className="tab-selector-buttons" onClick={() => setTab("press")}>Hydraulic Press</div>
                        <div className="tab-selector-buttons" onClick={() => setTab("options")}>Options</div>

                </div>
                <div id="resource-display">
                    <h3 style={{color: "#c4be66"}}>Coins: {formatValues(state.coins)}</h3>
                    <h3 style={{color: "darkseagreen"}}>Pressurized Coins: {formatValues(state.pressurizedCoins)}</h3>
                    <h3 style={{color: "lightblue"}}>Equipped: {state.equippedCats.length}/{state.maxEquippedCats}</h3>
                </div>
               </div>

              <div id="site-content">
                    <div className={tab !== "cats" ? "hiddenTab" : undefined}><CatsTab state={state} setState={setState}></CatsTab> </div>
                    <div className={tab !== "eggs" ? "hiddenTab" : undefined}><HatchingTab  state={state} setState={setState}></HatchingTab></div>
                    <div className={tab !== "combat" ? "hiddenTab" : undefined}><CombatTab state={state} setState={setState}></CombatTab> </div>
                    <div className={tab !== "options" ? "hiddenTab" : undefined}><OptionsTab   state={state} setState={setState}></OptionsTab></div>
                    <div className={tab !== "press" ? "hiddenTab" : undefined}><PressTab  state={state} setState={setState}></PressTab> </div>
                    <div className={tab !== "pressure" ? "hiddenTab" : undefined}><PressureTab state={state} setState={setState}></PressureTab></div>

                    
              </div>
        </div>
    )
}

export default TabManager