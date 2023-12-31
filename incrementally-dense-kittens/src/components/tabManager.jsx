import "./tabManager.css"
import {useState} from "react";

import CatsTab from "./catsTab";
import HatchingTab from "./hatchingTab";
import PressureTab from "./pressureTab";
import CombatTab from "./combatTab";

function TabManager(){

    const [tab, setTab] = useState("cats");

    return (
        <div>
               <div id="tab-button-holder">
                    <div className="tab-selector-buttons" onClick={() => setTab("cats")}>Cats</div>
                    <div className="tab-selector-buttons" onClick={() => setTab("eggs")}>Eggs</div>
                    <div className="tab-selector-buttons" onClick={() => setTab("combat")}>Combat</div>
                    <div className="tab-selector-buttons" onClick={() => setTab("pressure")}>Pressure Points</div>

               </div>


              <div id="site-content">
                
                    {tab == "cats" ? <CatsTab></CatsTab> : 
                     tab == "eggs" ? <HatchingTab></HatchingTab> :
                     tab == "combat" ? <CombatTab></CombatTab> : 
                     <PressureTab></PressureTab>}

              </div>
        </div>
    )
}

export default TabManager