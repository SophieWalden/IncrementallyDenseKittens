import "./hatchingTab.css"
import {useState} from "react";
import Decimal from "break_infinity.js";
import {formatValues} from "./globalFunctions";

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
    "Knitting Cat": "https://i.imgur.com/w0krgMm.png",
    "Cat Toy Cat": "https://i.imgur.com/dg5jmS7.png",
    "Squirrel Cat": "https://i.imgur.com/757oJ80.png",
    "Void Cat": "https://i.imgur.com/E92OkRe.png",
    "Princess Cat": "https://i.imgur.com/N69iDEF.png",
    "Classy Cat": "https://i.imgur.com/xgjQb3H.png"
}

const cats = {
    "Knitting Cat": {"image": catIcons["Knitting Cat"], "base_density": 5},
    "Cat Toy Cat": {"image": catIcons["Cat Toy Cat"], "base_density": 25},
    "Squirrel Cat": {"image": catIcons["Squirrel Cat"], "base_density": 8},
    "Void Cat": {"image": catIcons["Void Cat"], "base_density": 18},
    "Princess Cat": {"image": catIcons["Princess Cat"], "base_density": 13},
    "Classy Cat": {"image": catIcons["Classy Cat"], "base_density": 10},
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
        let density = cats[catType].base_density;
        density = Math.floor(density * 0.75 + Math.random() * 0.5 * density) // Add a little randomness to the values

        let newCat = {"type": catType, "density": density, "id": props.state["nextCatId"]};

        newCat["name"] = coolCatNames[Math.floor(Math.random() * coolCatNames.length)]
        newCat["image"] = catIcons[catType]
        newCat["likes"] = catLikes[Math.floor(Math.random() * catLikes.length)]

        // Whenever you add a cat, increase the id value
        props.setState(oldState => ({...oldState, "nextCatId": oldState["nextCatId"] + 1}))
    
        props.setState((oldState) => ({...oldState, 
                "cats": [...oldState.cats, newCat]}));

    
      }

    function buyEgg(egg){
      
        if (props.state.coins.greaterThanOrEqualTo(egg.Cost)){
            let bought_type = null;

            props.setState((oldState) => ({
                ...oldState, "coins": oldState.coins.minus(egg.Cost)
            }))

            let roll = Math.random() * 100;
          
            for (let total = 0, i = 0; i < egg.outcomes.length; i++){
                total += egg.outcomes[i][0];
                
                if (roll <= total){
                    addCat(egg.outcomes[i][1]);
                    bought_type = egg.outcomes[i][1];
                    break
                }
            }
            throwSparkles(bought_type)
        }
    }

    function throwSparkles(type) {
        const sparkleContainer = document.querySelector('.sparkle-container');
        

        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkleContainer.appendChild(sparkle);

    
        const image_display = document.createElement("img");
        image_display.src = catIcons[type];
        sparkleContainer.appendChild(image_display);
      

        // Trigger reflow to restart the animation
        const reflow = sparkleContainer.offsetWidth;
    
        // Apply animation class to start the burst effect
        sparkleContainer.classList.add('burst');

        setTimeout(() => {
            sparkle.remove();
            image_display.remove();
          }, 800); 
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
        {"name": "Basic Egg", "Cost": new Decimal(5), "outcomes": [[55, "Knitting Cat"], [30, "Squirrel Cat"], [15, "Classy Cat"]], "image": "https://art.pixilart.com/sr28b85d0c470aws3.png"},
        {"name": "High Spending Egg", "Cost": new Decimal(100), "outcomes": [[40, "Classy Cat"], [25, "Princess Cat"], [20, "Void Cat"], [15, "Cat Toy Cat"]], "image": "https://art.pixilart.com/sr27c358cd449aws3.png"},
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

                    <h3>Cost: {formatValues(eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].Cost)}</h3>
                    <h2 onClick={() => buyEgg(eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)])}>Buy</h2>
                </div>

                <div className="egg-container">
                    <h1>{eggs[props.state.eggHatchingIndex].name}</h1>

                    <img src={eggs[props.state.eggHatchingIndex].image}></img>
                    <div className="sparkle-container">
                        
                    </div>
                    

                    <div className="egg-outcome-showoff">
                        {eggs[props.state.eggHatchingIndex].outcomes.map((cat, index) => (
                            <div className="egg-outcome-showoff-container" key={index}>
                                <img src={catIcons[cat[1]]}></img>
                                <h6>{cat[0]}%</h6>
                            </div>
                        ))}
                    </div>

                    <h3>Cost: {formatValues(eggs[props.state.eggHatchingIndex].Cost)}</h3>
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

                    <h3>Cost: {formatValues(eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)].Cost)}</h3>
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