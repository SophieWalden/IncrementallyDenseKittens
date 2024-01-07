import "./hatchingTab.css"
import {useState, useEffect, useRef} from "react";
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
    "Classy Cat": "https://i.imgur.com/xgjQb3H.png",
    "Hefty Cat": "https://i.imgur.com/1u0lr1c.png",
    "Chonky Cat": "https://i.imgur.com/6RMwBrT.png",
     "Megachonker": "https://i.imgur.com/S9K37e3.png",
    "Garf Cat": "https://i.imgur.com/T796CTa.png",
    "Superhero Cat": "https://i.imgur.com/qEbVKHV.png",
    "Lawyer Cat": "https://i.imgur.com/Pb6INth.png",
    "Cute Cat": "https://i.imgur.com/8CrUpVy.png",
    "Jim": "https://i.imgur.com/1KTu8g4.png",
}

const cats = {
    "Knitting Cat": {"image": catIcons["Knitting Cat"], "base_density": 5},
    "Cat Toy Cat": {"image": catIcons["Cat Toy Cat"], "base_density": 25},
    "Squirrel Cat": {"image": catIcons["Squirrel Cat"], "base_density": 8},
    "Void Cat": {"image": catIcons["Void Cat"], "base_density": 18},
    "Princess Cat": {"image": catIcons["Princess Cat"], "base_density": 13},
    "Classy Cat": {"image": catIcons["Classy Cat"], "base_density": 10},
    "Hefty Cat": {"image": catIcons["Hefty Cat"], "base_density": 20},
    "Chonky Cat": {"image": catIcons["Chonky Cat"], "base_density": 25},
    "Megachonker": {"image": catIcons["Megachonker"], "base_density": 35},
    "Garf Cat": {"image": catIcons["Garf Cat"], "base_density": 50},
    "Cute Cat": {"image": catIcons["Cute Cat"], "base_density": 35},
    "Superhero Cat": {"image": catIcons["Superhero Cat"], "base_density": 55},
    "Lawyer Cat": {"image": catIcons["Lawyer Cat"], "base_density": 75},
    "Jim": {"image": catIcons["Jim"], "base_density": 100},
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

    function addCat(catType, buyAmount){
        let density = cats[catType].base_density;
        density = new Decimal(Math.floor(density * 0.75 + Math.random() * 0.5 * density)) // Add a little randomness to the values

        let id = props.state.nextCatId;
        if (buyAmount != undefined) id += buyAmount;
        let newCat = {"type": catType, "density": density, "id": id};

        newCat["name"] = coolCatNames[Math.floor(Math.random() * coolCatNames.length)]
        newCat["image"] = catIcons[catType]
        newCat["likes"] = catLikes[Math.floor(Math.random() * catLikes.length)]

        // Whenever you add a cat, increase the id value
        props.setState(oldState => ({...oldState, "nextCatId": oldState["nextCatId"] + 1}))
    
        props.setState((oldState) => ({...oldState, 
                "cats": [...oldState.cats, newCat]}));

    
      }

    function buyEgg(egg){
        
        let canBuy = Decimal.min(props.state.coins.dividedBy(egg.Cost).floor(),  props.state.eggOpeningAmount).toNumber(); // How many eggs of this type can you buy?
        for (let i = 0; i < canBuy; i++){
            if (props.state.coins.greaterThanOrEqualTo(egg.Cost)){
                let bought_type = null;
    
                props.setState((oldState) => ({
                    ...oldState, "coins": oldState.coins.minus(egg.Cost)
                }))
    
                let roll = Math.random() * 100;
              
                for (let total = 0, i = 0; i < egg.outcomes.length; i++){
                    total += egg.outcomes[i][0];
                    
                    if (roll <= total){
                        addCat(egg.outcomes[i][1], Math.floor(Math.random() * Number.MAX_SAFE_INTEGER * 0.9));
                        bought_type = egg.outcomes[i][1];
                        break
                    }
                }
                throwSparkles(bought_type)
            }
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

    const leftEgg = useRef(null);
    const middleEgg = useRef(null);
    const rightEgg = useRef(null);

    function rotateEggs(amount){
        // Rotate the eggs left
        if (amount > 0){
            let middleEggElement = middleEgg.current;
            let rightEggElement = rightEgg.current;

            if(middleEggElement && rightEggElement  ){
                middleEggElement.classList.add('middle-rotate-left-animation');
                rightEggElement.classList.add('right-rotate-left-animation');

                
                setTimeout(() => {
                    props.setState((oldState) => ({...oldState, "eggHatchingIndex": wrapAroundValues(oldState.eggHatchingIndex + amount, eggs.length)}));

                    setTimeout(() => {
                        middleEggElement.classList.remove('middle-rotate-left-animation');
                        middleEggElement.style.transform = 'translate(0, 0)';

                        rightEggElement.classList.remove('right-rotate-left-animation');
                        rightEggElement.style.transform = 'translate(0, 0)';
                    }, 25)
                }, 500)
             
            }
        }else{
            let middleEggElement = middleEgg.current;
            let leftEggElement = leftEgg.current;

            if(middleEggElement && leftEggElement  ){
                middleEggElement.classList.add('middle-rotate-right-animation');
                leftEggElement.classList.add('left-rotate-right-animation');

                
                setTimeout(() => {
                    props.setState((oldState) => ({...oldState, "eggHatchingIndex": wrapAroundValues(oldState.eggHatchingIndex + amount, eggs.length)}));

                    setTimeout(() => {
                        middleEggElement.classList.remove('middle-rotate-right-animation');
                        middleEggElement.style.transform = 'translate(0, 0)';

                        leftEggElement.classList.remove('left-rotate-right-animation');
                        leftEggElement.style.transform = 'translate(0, 0)';
                    }, 25)
                }, 500)
             
            }
        }
    }

    // Rebuyable Egg Autobuyer
    useEffect(() => {
        // Set up the interval when the component mounts
        let intervalId = null;
        if (props.state.upgrades[7].unlocked != 0){
            intervalId = setInterval(() => buyEgg(eggs[props.state.eggHatchingIndex]), props.state.autoHatchingSpeeds[props.state.upgrades[7].unlocked] * 1000);
        }
    
        // Clean up the interval when the component is unmounted or intervalDuration changes
        return () => clearInterval(intervalId);
      }, [props.state.upgrades[7].unlocked]);
  

    const eggs = [
        {"name": "Basic Egg", "Cost": new Decimal(5), "outcomes": [[55, "Knitting Cat"], [30, "Squirrel Cat"], [15, "Classy Cat"]], "image": "https://art.pixilart.com/sr28b85d0c470aws3.png"},
        {"name": "High Spending Egg", "Cost": new Decimal(100), "outcomes": [[40, "Classy Cat"], [25, "Princess Cat"], [20, "Void Cat"], [15, "Cat Toy Cat"]], "image": "https://art.pixilart.com/sr27c358cd449aws3.png"},
        {"name": "Chonker Egg", "Cost": new Decimal(500), "outcomes": [[40, "Hefty Cat"], [35, "Chonky Cat"], [20, "Megachonker"], [5, "Garf Cat"]], "image": "https://art.pixilart.com/sr2d139b3087eaws3.png"},
        {"name": "Super Egg", "Cost": new Decimal(3000), "outcomes": [[60, "Cute Cat"], [35, "Superhero Cat"], [4, "Lawyer Cat"], [1, "Jim"]], "image": "https://art.pixilart.com/sr21be6cd207faws3.png"},
    ]

    return (
        <div id="hatching-tab">
                
            <div id="eggs-display">
                <div className="egg-container-left" ref={leftEgg}>
                    <h1>{eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].name}</h1>
                    <img id="egg-container-display-image" src={eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].image}></img>


                    <div className="egg-outcome-showoff">
                        {eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].outcomes.map((cat, index) => (
                            <div className="egg-outcome-showoff-container" key={index}>
                                <img className={props.state.catsSeen.includes(cat[1]) ? "" : "notFound"} src={catIcons[cat[1]]}></img>
                                <h6>{cat[0]}%</h6>
                            </div>
                        ))}
                    </div>

                    <h3>Cost: {formatValues(eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)].Cost)}</h3>
                    <h2 onClick={() => buyEgg(eggs[wrapAroundValues(props.state.eggHatchingIndex - 1, eggs.length)])}>Buy</h2>
                </div>

                <div className="egg-container" ref={middleEgg}>
                    <h1>{eggs[props.state.eggHatchingIndex].name}</h1>

                    <img src={eggs[props.state.eggHatchingIndex].image}></img>
                    <div className="sparkle-container">
                        
                    </div>
                    
                    <div className="egg-outcome-showoff">
                        {eggs[props.state.eggHatchingIndex].outcomes.map((cat, index) => (
                            <div className="egg-outcome-showoff-container" key={index}>
                                <img className={props.state.catsSeen.includes(cat[1]) ? "" : "notFound"} src={catIcons[cat[1]]}></img>
                                <h6>{cat[0]}%</h6>
                            </div>
                        ))}
                    </div>

                    <h3>Cost: {formatValues(eggs[props.state.eggHatchingIndex].Cost)}</h3>
                    <h2 onClick={() => buyEgg(eggs[props.state.eggHatchingIndex])}>Buy</h2>
                </div>

                <div className="egg-container-right" ref={rightEgg}>
                    <h1>{eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)].name}</h1>
                    <img className="egg-container-display-image"src={eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)].image}></img>


                    <div className="egg-outcome-showoff">
                        {eggs[wrapAroundValues(props.state.eggHatchingIndex + 1, eggs.length)].outcomes.map((cat, index) => (
                            <div className="egg-outcome-showoff-container" key={index}>
                                <img className={props.state.catsSeen.includes(cat[1]) ? "" : "notFound"} src={catIcons[cat[1]]}></img>
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