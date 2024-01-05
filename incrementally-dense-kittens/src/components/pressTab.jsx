import "./pressTab.css"
import {useState} from "react";
import Decimal from "break_infinity.js";

function PressTab(props){

    function condenseCats(){
        let totalDensity = new Decimal(0);
        let highestDensity = new Decimal(0);
        let amountOfCats = props.state.cats.length;
        

        for (let i = 0; i < amountOfCats; i++){

            totalDensity += props.state.cats[i].density;

            if (props.state.cats[i].density.greaterThen(highestDensity)){
                highestDensity = props.staet.cats[i].density
            }
        }

        let averageDensity = totalDensity / amountOfCats;
        let newDensity = highestDensity + (averageDensity / newDensity)
        newDensity = Math.floor((0.9 + Math.random() * 0.5) * newDensity);

        let newCat = {"type": props.state.cats[Math.floor(Math.random() * amountOfCats)].type, "density": newDensity, "id": props.state["nextCatId"]};

        newCat["name"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].name
        newCat["image"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].image
        newCat["likes"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].likes

        // Whenever you add a cat, increase the id value
        props.setState(oldState => ({...oldState, "nextCatId": oldState["nextCatId"] + 1}))
    
        props.setState((oldState) => ({...oldState, 
                "cats": [newCat],
                "equippedCats": []}));

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