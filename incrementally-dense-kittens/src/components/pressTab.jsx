import "./pressTab.css"
import {useState} from "react";

function PressTab(props){

    function condenseCats(){
        let totalDensity = 0;

        for (let i = 0; i < props.state.cats.length; i++){

            totalDensity += props.state.cats[i].density;
        }

        console.log(totalDensity);

    }

    return (
        <div>
                <div id="hydraulic-explanation">
                    <h1>Do you have too many cats?</h1>
                    <h2>Combine all of your existing cats into one denser cat</h2>
                    <h1>Warning: This will remove all of your current cats</h1>
                </div>

        
                <button id="hydraulicPressButton" onClick={condenseCats}>Hydraulic Press</button>

        </div>
    )
}

export default PressTab