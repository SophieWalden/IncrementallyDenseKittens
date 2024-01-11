import "./pressTab.css"
import {useState} from "react";
import Decimal from "break_infinity.js";
import {formatValues} from "./globalFunctions";

const catPoints = {
    "Knitting Cat": 1,
    "Cat Toy Cat": 6,
    "Squirrel Cat": 2,
    "Void Cat": 5,
    "Princess Cat": 4,
    "Classy Cat": 3,
    "Hefty Cat": 7,
    "Chonky Cat": 8,
     "Megachonker": 9,
    "Garf Cat": 15,
    "Superhero Cat": 10,
    "Lawyer Cat": 11,
    "Cute Cat": 12,
    "Jim": 20,
    "Water Cat": 5,
    "Lava Cat": 10,
    "Earth Cat": 15,
    "Air Cat": 25,
    "Fox": 25,
    "Dog": 15,
    "Turtle": 20,
    "Three Cats One Trenchcoat": 30,
    "Sycthe Cat": 30,
    "Nunchuck Cat": 20,
    "Sword Cat": 40,
    "Gun Cat": 50,
}
function PressTab(props){

    function condenseCats(){
        let totalDensity = new Decimal(0);
        let highestDensity = new Decimal(0);
        let amountOfCats = props.state.cats.length;
        let pressurizedCoinsGained = new Decimal(0);

        if (amountOfCats < 5) return;

        for (let i = 0; i < amountOfCats; i++){

            totalDensity = totalDensity.plus(props.state.cats[i].density);
            if (props.state.cats[i].density.greaterThan(highestDensity)){
                highestDensity = props.state.cats[i].density
            }

            pressurizedCoinsGained = pressurizedCoinsGained.plus(catPoints[props.state.cats[i].type])
        }

        let averageDensity = totalDensity.dividedBy(amountOfCats);
        let newDensity = new Decimal(highestDensity.plus(averageDensity.dividedBy(highestDensity).times(amountOfCats)))
        newDensity = Math.floor(newDensity.times(1 + Math.random() * 0.25));

        let newCat = {"type": props.state.cats[Math.floor(Math.random() * amountOfCats)].type, "density": new Decimal(newDensity), "id": Math.floor(Math.random() * Number.MAX_SAFE_INTEGER * 0.9)};

        newCat["name"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].name
        newCat["image"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].image
        newCat["likes"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].likes


    
        let newCats = [];
        // Upgrade 6: Keep 3 highest density cats when using hydraulic press
        if (props.state.upgrades[6].unlocked == 1){
            let cats = props.state.cats.sort((cat1, cat2) => cat2.density - cat1.density);

            newCats.push(cats[0]);
            newCats.push(cats[1]);
            newCats.push(cats[2]);
        }

        props.setState((oldState) => ({...oldState, 
                "cats": [...newCats, newCat],
                "equippedCats": [],
                "pressurizedCoins": oldState.pressurizedCoins.plus(pressurizedCoinsGained),
                "catsSeen": [],
                "coins": new Decimal(10),
                "currentWorld": 0,
                "worldsUnlocked": [0],
                "killsPerWorld": [0],
                "enemyPowerLevel": 1,
                "firstEnemy": true,
                "unlockedEggs": 1,
                "eggHatchingIndex": 0,

        }));


    }

    function possibleGainsPressurizedCoins(){
        let pressurizedCoinsGained = new Decimal(0);

        for (let i = 0; i < props.state.cats.length; i++){
            pressurizedCoinsGained = pressurizedCoinsGained.plus(new Decimal(catPoints[props.state.cats[i].type]))
        }

        return pressurizedCoinsGained;
    }

    function possiblePowerLevel(){
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

        return [newDensity, newDensity.times(1.25)]

    }

    return (
        <div>
                <div id="hydraulic-explanation">
                    <h1>Do you have too many cats?</h1>
                    <h2>Combine all of your existing cats into one denser cat (Minimum 5 cats)</h2>
                    <h1>Warning: This will remove all of your current cats</h1>
                    <h1>Also resets your Almanac, allowing you to get even more perk points!</h1>
                </div>

        
                <button id="hydraulicPressButton" onClick={condenseCats}>Hydraulic Press</button>
                
                <h3>You will Gain {formatValues(possibleGainsPressurizedCoins())} Pressurized Coins</h3>
                <h3>You will also compress yours cats into a cat of power level {formatValues(possiblePowerLevel()[0])} - {formatValues(possiblePowerLevel()[1])}</h3>

        </div>
    )
}

export default PressTab