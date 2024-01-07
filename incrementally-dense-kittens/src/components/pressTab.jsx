import "./pressTab.css"
import {useState} from "react";
import Decimal from "break_infinity.js";
import {formatValues} from "./globalFunctions";

function PressTab(props){

    function condenseCats(){
        let totalDensity = new Decimal(0);
        let highestDensity = new Decimal(0);
        let amountOfCats = props.state.cats.length;

        for (let i = 0; i < amountOfCats; i++){

            totalDensity = totalDensity.plus(props.state.cats[i].density);
            if (props.state.cats[i].density.greaterThan(highestDensity)){
                highestDensity = props.state.cats[i].density
            }
        }

        let averageDensity = totalDensity.dividedBy(amountOfCats);
        let newDensity = new Decimal(highestDensity.plus(averageDensity.dividedBy(highestDensity).times(amountOfCats)))
        newDensity = Math.floor(newDensity.times(1 + Math.random() * 0.25));

        let newCat = {"type": props.state.cats[Math.floor(Math.random() * amountOfCats)].type, "density": new Decimal(newDensity), "id": props.state["nextCatId"]};

        newCat["name"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].name
        newCat["image"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].image
        newCat["likes"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].likes

        // Whenever you add a cat, increase the id value
        props.setState(oldState => ({...oldState, "nextCatId": oldState["nextCatId"] + 1}))
    
        props.setState((oldState) => ({...oldState, 
                "cats": [newCat],
                "equippedCats": [],
                "pressurizedCoins": oldState.pressurizedCoins.plus(new Decimal(amountOfCats))}));

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