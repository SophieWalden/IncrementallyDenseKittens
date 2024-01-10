import "./pressureTab.css"
import {useState, useEffect} from "react";
import {formatValues} from "./globalFunctions";

const catIcons = {
    "Knitting Cat": "https://i.imgur.com/w0krgMm.png",
    "Cat Toy Cat": "https://i.imgur.com/dg5jmS7.png",
    "Squirrel Cat": "https://i.imgur.com/757oJ80.png",
    "Void Cat": "https://i.imgur.com/E92OkRe.png",
    "Princess Cat": "https://i.imgur.com/N69iDEF.png",
    "Classy Cat": "https://i.imgur.com/xgjQb3H.png",
    "Hefty Cat": "https://i.imgur.com/1u0lr1c.png",
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
}


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



function PressureTab(props){

    const [almanac, showAlmanac] = useState(false);

    function logCat(){
        for (let i = 0; i < props.state.cats.length; i++){
            let currentCat = props.state.cats[i].type;

            if (!props.state.catsSeen.includes(currentCat)){
                props.state.catsSeen.push(currentCat);

                
                props.setState((oldState) => ({...oldState, "perkPoints": oldState.perkPoints + catPoints[currentCat]}))
            }
        }
    }

    useEffect(() => {
        logCat();
    }, [props.state.cats.length])

    function getCost(upgradeId){
        if (![1,4,7].includes(upgradeId)) return props.state.upgrades[upgradeId].cost

        return props.state.upgrades[upgradeId].cost ** (props.state.upgrades[upgradeId].unlocked + 1)
    }

    function buyUpgrade(upgradeId){
        
        let upgrade = props.state.upgrades[upgradeId];
        let cost = getCost(upgradeId);
        
        if (props.state.perkPoints >= cost && (upgrade.unlocked == 0 || [1,4,7].includes(upgradeId))){
            upgrade.unlocked += 1;
            props.setState((oldState) => ({...oldState, "perkPoints": oldState.perkPoints - cost, "upgrades": {...props.state.upgrades, upgradeId: upgrade}}))

            enactUpgrade(upgradeId);
        }
    }

    function enactUpgrade(upgradeId){
        // Doing the actual upgrading part of upgrades
        if (upgradeId == 1){
            props.setState((oldState) => ({...oldState, "maxEquippedCats": oldState.maxEquippedCats + 1}))
        }

        if (upgradeId == 4){
            props.setState((oldState) => ({...oldState, "eggOpeningAmount": oldState.eggOpeningAmount + 1}))
        }

    }

    return (
        <div id="pressure-tab-container">

                <div id="almanac-top-bar">
                    <h2 id="pressure-tab-almanac" onClick={() => showAlmanac(true)}>Almanac</h2>
                    <h3>Beat the game by collecting all cats in the Almanc in a single run!</h3>
                    <h2 id="cats-found-display">Perk Points: {props.state.perkPoints}</h2>
                </div>

                <div id="pressure-tab-explainer-div">
                    <h2 id="pressure-tab-title">Collect more unique cats to get more perk points!</h2>
                    <h3>Gain more points scaling based on pet rarity and egg cost!</h3>
                </div>

                <div className={almanac ? "" : "hideTab"}>
                    <div id="almanac-container">
                        <div id="almanac-hide-button" onClick={() => showAlmanac(false)}>X</div>
                        {Object.keys(catIcons).map((cat, index) => (
                            <img className={`almanac-cat ${props.state.catsSeen.includes(cat) ? '' : 'not-found-cat'}`} src={catIcons[cat]} key={index}></img>  
                        ))}
                    </div>
                </div>

                <div id="upgrades-container">
                    <div className="upgrades-row">
                        <div className={`upgrade ${props.state.perkPoints >= getCost(1) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(1)}>
                            <h2>{props.state.upgrades[1].name}</h2>
                            <h3>{props.state.upgrades[1].description}</h3>
                            <h4>{props.state.upgrades[1].unlocked + 3} → {props.state.upgrades[1].unlocked + 4}</h4>
                            <h4>Cost: {formatValues(getCost(1))}</h4>
                        </div>
                        <div className={`upgrade ${props.state.upgrades[2].unlocked != 0 ? "upgradeBought" : ""} ${props.state.perkPoints >= getCost(2) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(2)}>
                            <h2>{props.state.upgrades[2].name}</h2>
                            <h3>{props.state.upgrades[2].description}</h3>
                            <h4>Cost: {formatValues(props.state.upgrades[2].cost)}</h4>
                        </div>
                        <div className={`upgrade ${props.state.upgrades[3].unlocked != 0 ? "upgradeBought" : ""} ${props.state.perkPoints >= getCost(3) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(3)}>
                            <h2>{props.state.upgrades[3].name}</h2>
                            <h3>{props.state.upgrades[3].description}</h3>
                            <h4>Cost: {formatValues(props.state.upgrades[3].cost)}</h4>
                        </div>
                    </div>
                    <div className={`upgrades-row ${props.state.upgrades[3].unlocked == 0 ? "hiddenTab" : ""}`}>
                        <div className={`upgrade ${props.state.perkPoints >= getCost(4) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(4)}>
                            <h2>{props.state.upgrades[4].name}</h2>
                            <h3>{props.state.upgrades[4].description}</h3>
                            <h4>{props.state.upgrades[4].unlocked + 1} → {props.state.upgrades[4].unlocked + 2}</h4>
                            <h4>Cost: {formatValues(getCost(4))}</h4>
                        </div>
                        <div className={`upgrade ${props.state.upgrades[5].unlocked != 0 ? "upgradeBought" : ""} ${props.state.perkPoints >= getCost(5) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(5)}>
                            <h2>{props.state.upgrades[5].name}</h2>
                            <h3>{props.state.upgrades[5].description}</h3>
                            <h4>Cost: {formatValues(props.state.upgrades[5].cost)}</h4>
                        </div>
                        <div className={`upgrade ${props.state.upgrades[6].unlocked != 0 ? "upgradeBought" : ""} ${props.state.perkPoints >= getCost(6) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(6)}>
                            <h2>{props.state.upgrades[6].name}</h2>
                            <h3>{props.state.upgrades[6].description}</h3>
                            <h4>Cost: {formatValues(props.state.upgrades[6].cost)}</h4>
                        </div>

                    </div>
                    <div className={`upgrades-row ${props.state.upgrades[3].unlocked == 0 ? "hiddenTab" : ""}`}>
                        <div className={`upgrade  ${props.state.perkPoints >= getCost(7) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(7)}>
                            <h2>{props.state.upgrades[7].name}</h2>
                            <h3>{props.state.upgrades[7].description}</h3>
                            <h4>{props.state.upgrades[7].unlocked == 0 ? "∞" : props.state.autoHatchingSpeeds[props.state.upgrades[7].unlocked]} → {props.state.autoHatchingSpeeds[props.state.upgrades[7].unlocked + 1]}</h4>
                            <h4>Cost: {formatValues(getCost(7))}</h4>
                        </div>
                        <div className={`upgrade ${props.state.upgrades[8].unlocked != 0 ? "upgradeBought" : ""} ${props.state.perkPoints >= getCost(8) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(8)}>
                            <h2>{props.state.upgrades[8].name}</h2>
                            <h3>{props.state.upgrades[8].description}</h3>
                            <h4>Cost: {formatValues(props.state.upgrades[8].cost)}</h4>
                        </div>
                        <div className={`upgrade ${props.state.upgrades[9].unlocked != 0 ? "upgradeBought" : ""} ${props.state.perkPoints >= getCost(9) ? "buyableUpgrade" : ""}`} onClick={() => buyUpgrade(9)}>
                            <h2>{props.state.upgrades[9].name}</h2>
                            <h3>{props.state.upgrades[9].description}</h3>
                            <h4>Cost: {formatValues(props.state.upgrades[9].cost)}</h4>
                        </div>

                    </div>

                </div>



        </div>
    )
}

export default PressureTab