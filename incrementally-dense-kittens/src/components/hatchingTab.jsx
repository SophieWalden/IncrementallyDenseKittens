import "./hatchingTab.css"
import {useState} from "react";


const coolCatNames = [
      'Whiskerino',
      'Shadowpaws',
      'Lunaflare',
      'Mochi',
      'Purrlock Holmes',
      'Catalicious',
      'Thunderpaws',
      'Sphinxter',
      'Ziggy Stardust',
      'Meowcolm X',
      'Chai Latte',
      'Sassyfras',
      'Furrball McGraw',
      'Pawspero',
      'Captain Whiskerbeard',
      'Spike the Catster',
      'Furrnando',
      'Catalyst',
      'Mittens von Scratchington',
      'Sir Fluffington',
      'Napoleon Whiskers',
      'Jazzpurr',
      'CleoCATra',
      'Fuzz Lightyear',
      'Mewbacca',
      'Oliver Whiskerspoon',
      'Zen Meowster',
      'Catsby',
      'Purrlock Holmes',
      'Kitty Smalls',
      'Whiskerbell',
      'Cheshire',
      'Pixel Paws',
      'Boba Feline',
      'Sir Purrsalot',
      'Napoleon Cataparte',
      'Catalina Wine Mixer',
      'Furrnando Alonso',
      'Buddy Thunderstruck',
      'Catniss Everclean',
      'Galacticat',
      'Waffles the Cat',
      'Mr. Meowgi',
      'Lilith Von Claw',
      'Purrlock Holmes',
    ];

const catIcons = {
    "Airy Breezetail": "https://www.pixelcatsend.com/images/catmojis/decision.png",
    "Pebble Pouncer": "https://www.pixelcatsend.com/images/catmojis/prideflag.png",
    "Mossy Whiskerblade": "https://www.pixelcatsend.com/images/catmojis/laughing.png",
    "Sandy Pawshifter": "https://www.pixelcatsend.com/images/catmojis/scribe.png"
}

const catLikes = [
    "Pickles", 
    "Socks",
    "Forks",
    "Backflips",
    "Eatting Cars",
    "Flying",
    "Swimming?"
]

function HatchingTab(props){

    function addCat(catType){
        let newCat = {"type": catType, "density": Math.floor(Math.random() * 5), "id": props.state["nextCatId"]};

        newCat["name"] = coolCatNames[Math.floor(Math.random() * coolCatNames.length)]
        newCat["image"] = catIcons[catType]
        newCat["likes"] = catLikes[Math.floor(Math.random() * catLikes.length)]

        // Whenever you add a cat, increase the id value
        props.setState(oldState => ({...oldState, "nextCatId": oldState["nextCatId"] + 1}))
    
        props.setState((oldState) => ({...oldState, 
                "cats": [...oldState.cats, newCat]}));
    
      }

    function buyEgg(egg){

        if (props.state.coins >= egg.Cost){
            props.setState((oldState) => ({
                ...oldState, "coins": oldState.coins - egg.Cost  
            }))

            let roll = Math.random() * 100;
          
            for (let total = 0, i = 0; i < egg.outcomes.length; i++){
                total += egg.outcomes[i][0];
                
                if (roll <= total){
                    addCat(egg.outcomes[i][1]);
                    break
                }
            }
            
        }
    }

    function wrapAroundValues(value, length){
        if (value < 0) return length - 1;
        if (value >= length) return 0;
        return value
    }

    function rotateEggs(amount){
        props.setState((oldState) => ({...oldState, "eggHatchingIndex": wrapAroundValues(oldState.eggHatchingIndex + amount, eggs.length)}));
    }

    const eggs = [
        {"name": "Basic Egg4", "Cost": 0, "outcomes": [[45, "Airy Breezetail"], [30, "Pebble Pouncer"], [20, "Mossy Whiskerblade"], [5, "Sandy Pawshifter"]], "image": "https://art.pixilart.com/sr2d57188742faws3.png"},
        {"name": "Basic Egg2", "Cost": 0, "outcomes": [[45, "Airy Breezetail"], [30, "Pebble Pouncer"], [20, "Mossy Whiskerblade"], [5, "Sandy Pawshifter"]], "image": "https://art.pixilart.com/sr282cfb803d8aws3.png"},
        {"name": "Basic Egg", "Cost": 0, "outcomes": [[45, "Airy Breezetail"], [30, "Pebble Pouncer"], [20, "Mossy Whiskerblade"], [5, "Sandy Pawshifter"]], "image": "https://art.pixilart.com/sr22850d3a01daws3.png"},
        {"name": "Basic Egg3", "Cost": 0, "outcomes": [[45, "Airy Breezetail"], [30, "Pebble Pouncer"], [20, "Mossy Whiskerblade"], [5, "Sandy Pawshifter"]], "image": "https://art.pixilart.com/sr27019243780aws3.png"},
        {"name": "Dense Egg", "Cost": 0, "outcomes": [[5, "Airy Breezetail"], [10, "Pebble Pouncer"], [40, "Mossy Whiskerblade"], [45, "Sandy Pawshifter"]], "image": "https://art.pixilart.com/sr27fc9e77fc7aws3.png"}
    ]

    return (
        <div id="hatching-tab">
                
            <div id="eggs-display">
                <div className="egg-container-left">
                    <h1>{eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].name}</h1>
                    <img id="egg-container-display-image" src={eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].image}></img>


                    <div className="egg-outcome-showoff">
                        {eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].outcomes.map((cat, index) => (
                            <div className="egg-outcome-showoff-container" key={index}>
                                <img src={catIcons[cat[1]]}></img>
                                <h6>{cat[0]}%</h6>
                            </div>
                        ))}
                    </div>

                    <h3>Cost: {eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].Cost}</h3>
                    <h2 onClick={() => buyEgg(eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)])}>Buy</h2>
                </div>

                <div className="egg-container">
                    <h1>{eggs[props.state.eggHatchingIndex].name}</h1>
                    <img src={eggs[props.state.eggHatchingIndex].image}></img>


                    <div className="egg-outcome-showoff">
                        {eggs[props.state.eggHatchingIndex].outcomes.map((cat, index) => (
                            <div className="egg-outcome-showoff-container" key={index}>
                                <img src={catIcons[cat[1]]}></img>
                                <h6>{cat[0]}%</h6>
                            </div>
                        ))}
                    </div>

                    <h3>Cost: {eggs[props.state.eggHatchingIndex].Cost}</h3>
                    <h2 onClick={() => buyEgg(eggs[props.state.eggHatchingIndex])}>Buy</h2>
                </div>

                <div className="egg-container-right">
                    <h1>{eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)].name}</h1>
                    <img className="egg-container-display-image"src={eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)].image}></img>


                    <div className="egg-outcome-showoff">
                        {eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)].outcomes.map((cat, index) => (
                            <div className="egg-outcome-showoff-container" key={index}>
                                <img src={catIcons[cat[1]]}></img>
                                <h6>{cat[0]}%</h6>
                            </div>
                        ))}
                    </div>

                    <h3>Cost: {eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)].Cost}</h3>
                    <h2 onClick={() => buyEgg(eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)])}>Buy</h2>
                </div>
            </div>
            <div id="egg-display-rotator-buttons">
                <h3 onClick={() => rotateEggs(-1)}>←</h3>

                {props.state.eggHatchingIndex}
                <h3 onClick={() => rotateEggs(1)}>→</h3>
            </div>
             
        </div>
    )
}

export default HatchingTab