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