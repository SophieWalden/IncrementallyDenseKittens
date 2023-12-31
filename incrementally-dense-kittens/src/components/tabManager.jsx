import "./tabManager.css"
import {useState} from "react";

import CatsTab from "./catsTab";
import HatchingTab from "./hatchingTab";
import PressureTab from "./pressureTab";
import CombatTab from "./combatTab";
import Decimal from "break_infinity.js";

import formatValues from "./globalFunctions";

function TabManager(){

    const [tab, setTab] = useState("cats");
    const [state, setState] = useState({
        "cats": [],
        "selectedCat": -1,
        "nextCatId": 0,
        "equippedCats": [],
        "maxEquippedCats": 3,
    });

    return (
        <div>   
                <div id="site-header">
                <div id="tab-button-holder">
                        <div className="tab-selector-buttons" onClick={() => setTab("cats")}>Cats</div>
                        <div className="tab-selector-buttons" onClick={() => setTab("eggs")}>Eggs</div>
                        <div className="tab-selector-buttons" onClick={() => setTab("combat")}>Combat</div>
                        <div className="tab-selector-buttons" onClick={() => setTab("pressure")}>Pressure Points</div>

                </div>
                <div id="resource-display">
                    <h3 style={{color: "#c4be66"}}>Coins: 0</h3>
                    <h3 style={{color: "lightblue"}}>Equipped: {state.equippedCats.length}/{state.maxEquippedCats}</h3>
                </div>
               </div>

              <div id="site-content">
                
                    {tab == "cats" ? <CatsTab state={state} setState={setState}></CatsTab> : 
                     tab == "eggs" ? <HatchingTab state={state} setState={setState}></HatchingTab> :
                     tab == "combat" ? <CombatTab state={state} setState={setState}></CombatTab> : 
                     <PressureTab state={state} setState={setState}></PressureTab>}

                    
              </div>
        </div>
    )
}

export default TabManager