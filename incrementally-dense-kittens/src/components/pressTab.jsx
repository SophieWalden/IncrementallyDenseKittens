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
    "John Lennon": 40,
    "Lev": 100,
    "Table": 75,
    "Vampire Cat": 30,
    "Alien Cat": 40,
    "Ghost Cat": 45,
    "Zombie Cat": 125,
    "Box Cat": 100,
    "Bottled Cat": 125,
    "Catgirl Lennon": 300,
    "Octocat": 30,
    "Office Cat": 50,
    "Rabbit": 65,
    "Simon": 80,
    "One Line Cat": 65,
    "Small Cat": 80,
    "Wiggly Cat": 100,
    "Wizard Cat": 150,
    "Fancy Cat": 100,
    "Squire Cat": 150,
    "King Cat": 200,
    "Queen Cat": 250
}

const catIcons = {
    // Mom Submitted Cats:
    "Knitting Cat": "https://i.imgur.com/w0krgMm.png",
    "Cat Toy Cat": "https://i.imgur.com/dg5jmS7.png",
    "Squirrel Cat": "https://i.imgur.com/757oJ80.png",
    "Void Cat": "https://i.imgur.com/E92OkRe.png",
    "Princess Cat": "https://i.imgur.com/N69iDEF.png",
    "Classy Cat": "https://i.imgur.com/xgjQb3H.png",

    // Me Drawn Cats (God cant draw that many)
    "Chonky Cat": "https://i.imgur.com/6RMwBrT.png",
    "Megachonker": "https://i.imgur.com/S9K37e3.png",
    "Garf Cat": "https://i.imgur.com/T796CTa.png",
    "Superhero Cat": "https://i.imgur.com/qEbVKHV.png",
    "Lawyer Cat": "https://i.imgur.com/Pb6INth.png",
    "Cute Cat": "https://i.imgur.com/8CrUpVy.png",
    "Jim": "https://i.imgur.com/1KTu8g4.png",
    "Water Cat": "https://i.imgur.com/5RDyC0s.png",
    "Lava Cat": "https://i.imgur.com/TLxJEXt.png",
    "Earth Cat": "https://i.imgur.com/EWtflaq.png",
    "Air Cat": "https://i.imgur.com/LKtk9KS.png",
    "Fox": "https://i.imgur.com/8hyOUrP.png",
    "Dog": "https://i.imgur.com/wyIDMHu.png",
    "Turtle": "https://i.imgur.com/uQJoR8m.png",
    "Three Cats One Trenchcoat": "https://i.imgur.com/esoAfbC.png",
    "Sycthe Cat": "https://i.imgur.com/edI14Qp.png",
    "Nunchuck Cat": "https://i.imgur.com/EFs3Tvy.png",
    "Sword Cat": "https://i.imgur.com/uagQHeD.png",
    "Gun Cat": "https://i.imgur.com/29GscWz.png",
    "John Lennon": "https://i.imgur.com/8RhoEIG.png",
    "Lev": "https://i.imgur.com/0dHFThi.png",
    "Table": "https://i.imgur.com/ODuVz0k.png",

    // Emerson Submitted Cats (Love you bestie <3)
    "Vampire Cat": "https://i.imgur.com/gHGUmpt.png",
    "Alien Cat": "https://i.imgur.com/KQ3DgYF.png",
    "Ghost Cat": "https://i.imgur.com/61pgQj8.png",
    "Zombie Cat": "https://i.imgur.com/ytSveGn.png",

    "Box Cat": "https://i.imgur.com/gg8D77q.png",
    "Bottled Cat": "https://i.imgur.com/tJGCqmH.png",
    "Catgirl Lennon": "https://i.imgur.com/ckfkgTN.png",

    "Fancy Cat": "https://i.imgur.com/ow1PgjX.png",
    "Squire Cat": "https://i.imgur.com/TKGjxUV.png",
    "King Cat": "https://i.imgur.com/PlfZfQH.png",
    "Queen Cat": "https://i.imgur.com/BjknyAE.png",
    
    
    "One Line Cat": "https://i.imgur.com/p4fuQhG.png",
    "Small Cat": "https://i.imgur.com/KKfYfiK.png",
    "Wiggly Cat": "https://i.imgur.com/JWgrtZP.png",
    "Wizard Cat": "https://i.imgur.com/dnlrQ2A.png",

    "Octocat": "https://i.imgur.com/KAIwtrW.png",
    "Office Cat": "https://i.imgur.com/pdDRYXX.png",
    "Rabbit": "https://i.imgur.com/e8qC50x.png",
    "Simon": "https://i.imgur.com/GH96SfM.png",
    
    "Hefty Cat": "https://i.imgur.com/oCrNwxT.png",
}

function PressTab(props){

    const [pressed, setPressed] = useState(false)
    const [displayCat, setDisplayCat] = useState("");

    function condenseCats(){

        let totalDensity = new Decimal(0);
        let highestDensity = new Decimal(0);
        let amountOfCats = props.state.cats.length;
        let pressurizedCoinsGained = new Decimal(0);

        if (amountOfCats < 5) return;
        setPressed(true)

        let newCats = [];
        // Upgrade 6: Keep 3 highest density cats when using hydraulic press
        if (props.state.upgrades[6].unlocked == 1){
            let cats = props.state.cats.sort((cat1, cat2) => cat2.density - cat1.density);

            newCats.push(cats[0]);
            newCats.push(cats[1]);
            newCats.push(cats[2]);
        }

        for (let i = 0; i < amountOfCats; i++){

            if (!newCats.includes(props.state.cats[i])){
                totalDensity = totalDensity.plus(props.state.cats[i].density);
                if (props.state.cats[i].density.greaterThan(highestDensity)){
                    highestDensity = props.state.cats[i].density
                }

                pressurizedCoinsGained = pressurizedCoinsGained.plus(catPoints[props.state.cats[i].type])
            }
        }

        let averageDensity = totalDensity.dividedBy(amountOfCats);
        let newDensity = new Decimal(highestDensity.plus(averageDensity.dividedBy(highestDensity).times(amountOfCats)))
        newDensity = Math.floor(newDensity.times(1 + Math.random() * 0.25));

        let newCat = {"type": props.state.cats.sort((cat1, cat2) => cat2.density - cat1.density)[0].type, "density": new Decimal(newDensity), "id": Math.floor(Math.random() * Number.MAX_SAFE_INTEGER * 0.9)};

        newCat["name"] = props.state.cats.sort((cat1, cat2) => cat2.density - cat1.density)[0].name
        newCat["image"] = props.state.cats.sort((cat1, cat2) => cat2.density - cat1.density)[0].image
        newCat["likes"] = props.state.cats[Math.floor(Math.random() * amountOfCats)].likes


    

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

        setTimeout(() => {
            setPressed(false)
            setDisplayCat(newCat["type"])

            setTimeout(() => {
                setDisplayCat("");
            }, 1500)
        }, 500)

    }

    function possibleGainsPressurizedCoins(){
        let pressurizedCoinsGained = new Decimal(0);

        let newCats = [];

        if (props.state.upgrades[6].unlocked == 1){
            let cats = props.state.cats.sort((cat1, cat2) => cat2.density - cat1.density);

            newCats.push(cats[0]);
            newCats.push(cats[1]);
            newCats.push(cats[2]);
        }

        for (let i = 0; i < props.state.cats.length; i++){
            if (!newCats.includes(props.state.cats[i])){
             pressurizedCoinsGained = pressurizedCoinsGained.plus(new Decimal(catPoints[props.state.cats[i].type]))
            }
        }

        return pressurizedCoinsGained;
    }

    function possiblePowerLevel(){
        let totalDensity = new Decimal(0);
        let highestDensity = new Decimal(0);
        let amountOfCats = props.state.cats.length;

        let newCats = [];
        // Upgrade 6: Keep 3 highest density cats when using hydraulic press
        if (props.state.upgrades[6].unlocked == 1){
            let cats = props.state.cats.sort((cat1, cat2) => cat2.density - cat1.density);

            newCats.push(cats[0]);
            newCats.push(cats[1]);
            newCats.push(cats[2]);
        }

        for (let i = 0; i < amountOfCats; i++){

            if (!newCats.includes(props.state.cats[i])){
                totalDensity = totalDensity.plus(props.state.cats[i].density);
                if (props.state.cats[i].density.greaterThan(highestDensity)){
                    highestDensity = props.state.cats[i].density
                }
            }

        }

        let averageDensity = totalDensity.dividedBy(amountOfCats);
        let newDensity = new Decimal(highestDensity.plus(averageDensity.dividedBy(highestDensity).times(amountOfCats)))

        return [newDensity, newDensity.times(1.25)]

    }

    return (
        <div id="press-container">
                <div id="hydraulic-explanation">
                    <h1>Do you have too many cats?</h1>
                    <h2>Combine all of your existing cats into one denser cat (Minimum 5 cats)</h2>
                    <h1>Warning: This will remove all of your current cats</h1>
                    <h1>Also resets your Almanac, allowing you to get even more perk points!</h1>
                </div>

        
                <button id="hydraulicPressButton" onClick={condenseCats}>Hydraulic Press</button>
                
                <h3>You will Gain {formatValues(possibleGainsPressurizedCoins())} Pressurized Coins</h3>
                <h3>You will also compress yours cats into a cat of power level {formatValues(possiblePowerLevel()[0])} - {formatValues(possiblePowerLevel()[1])}</h3>

                {pressed && <div className="press pressArm" />}
                {pressed && <div className="leftPress" />}
                {displayCat != "" && <div id='sparkle'></div>}
                {displayCat != "" && <img src={catIcons[displayCat]} id='display-cat'></img>}
                
        </div>
    )
}

export default PressTab