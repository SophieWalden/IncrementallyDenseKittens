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
        "coins": 0,

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
        "worldsUnlocked": [0],
        "killsPerWorld": [0],
        "enemyPowerLevel": 1,
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
                    <h3 style={{color: "#c4be66"}}>Coins: {state.coins}</h3>
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