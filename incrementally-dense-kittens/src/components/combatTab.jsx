import "./combatTab.css"
import {useEffect, useState, useRef} from "react";
import {formatValues} from "./globalFunctions";
import Decimal from "break_infinity.js";

import {getCat} from "./globalFunctions.jsx"

const enemyImages = {"dog": 'https://opengameart.org/sites/default/files/styles/thumbnail/public/howl.png',
                    "raccoon": "https://opengameart.org/sites/default/files/styles/thumbnail/public/raccoon-run.gif",
                    "fox": "https://opengameart.org/sites/default/files/styles/thumbnail/public/tom-400.jpg",
                    "goblin": "https://opengameart.org/sites/default/files/styles/thumbnail/public/lpc_goblin_preview.png",
                    "wiggly mage": "https://opengameart.org/sites/default/files/styles/thumbnail/public/threeformsPrev.png",
                    "powerful wiggly mage": "https://opengameart.org/sites/default/files/styles/thumbnail/public/archon.gif",
                    "mummy": "https://opengameart.org/sites/default/files/styles/thumbnail/public/mons6.png",
                    "bat": "https://opengameart.org/sites/default/files/styles/thumbnail/public/new_piskel_9.png",
                    "golem": "https://opengameart.org/sites/default/files/styles/thumbnail/public/golem-preview.png",
                    "slime": "https://opengameart.org/sites/default/files/styles/thumbnail/public/Monster_rot_0.png",
                    "flame swordsman": "https://opengameart.org/sites/default/files/styles/thumbnail/public/flamelings_sprites_preview.png",
                    "lobster": "https://opengameart.org/sites/default/files/styles/thumbnail/public/HELMETFISH.gif",
                    "pumpkin": "https://opengameart.org/sites/default/files/styles/thumbnail/public/jack.png",
                    "minotaur": "https://opengameart.org/sites/default/files/styles/thumbnail/public/minotaurus_spritesheet_preview.png",
                    "what is this?": "https://opengameart.org/sites/default/files/styles/thumbnail/public/troll_1.png",
                    "knife guy": "https://opengameart.org/sites/default/files/styles/thumbnail/public/MrKnifeGuy_0B.gif",
                    "lizard man": "https://opengameart.org/sites/default/files/styles/thumbnail/public/reptile_128x128x9.png",
                    "octopus": "https://opengameart.org/sites/default/files/styles/thumbnail/public/preview_694.png",
                    "tubazord": "https://opengameart.org/sites/default/files/styles/thumbnail/public/ttm_move_by_cookiez.gif",
                    "dodo": "https://opengameart.org/sites/default/files/styles/thumbnail/public/preview_859.png",
                    "beaver": "https://opengameart.org/sites/default/files/styles/thumbnail/public/preview_802.png",
                    "bee": "https://opengameart.org/sites/default/files/styles/thumbnail/public/bee_4.png",
                    "cupcake": "https://opengameart.org/sites/default/files/styles/thumbnail/public/muffin_jump.png",
                    "toast": "https://opengameart.org/sites/default/files/styles/thumbnail/public/Toast.png",

                    }

      
               
    

          
const enemies = {
    "dog": {"image": enemyImages["dog"], "speed": 3, "damage": 2, "health": 8, "reward": 2},
    "fox": {"image": enemyImages["fox"], "speed": 1.5, "damage": 1, "health": 4, "reward": 2},
    "raccoon": {"image": enemyImages["raccoon"], "speed": 2.6, "damage": 3, "health": 4, "reward": 2}, 
    "bee": {"image": enemyImages["bee"], "speed": 3, "damage": 4, "health": 16, "reward": 4},
    "beaver": {"image": enemyImages["beaver"], "speed": 1.5, "damage": 2, "health": 8, "reward": 4},
    "dodo": {"image": enemyImages["lobster"], "speed": 2.6, "damage": 6, "health": 8, "reward": 4}, 
    "octopus": {"image": enemyImages["octopus"], "speed": 3, "damage": 8, "health": 32, "reward": 8}, 
    "slime": {"image": enemyImages["slime"], "speed": 1.5, "damage": 4, "health": 16, "reward": 8}, 
    "bat": {"image": enemyImages["bat"], "speed": 2.6, "damage": 12, "health": 16, "reward": 8}, 
    "goblin": {"image": enemyImages["goblin"], "speed": 3, "damage": 16, "health": 64, "reward": 16}, 
    "lizard man": {"image": enemyImages["lizard man"], "speed": 1.5, "damage": 8, "health": 32, "reward": 16}, 
    "knife guy": {"image": enemyImages["knife guy"], "speed": 2.6, "damage": 24, "health": 32, "reward": 16}, 
    "cupcake": {"image": enemyImages["cupcake"], "speed": 3, "damage": 32, "health": 128, "reward": 32}, 
    "toast": {"image": enemyImages["toast"], "speed": 1.5, "damage": 16, "health": 64, "reward": 32}, 
    "pumpkin": {"image": enemyImages["pumpkin"], "speed": 2.6, "damage": 48, "health": 64, "reward": 32}, 
    "minotaur": {"image": enemyImages["minotaur"], "speed": 3, "damage": 64, "health": 256, "reward": 64}, 
    "golem": {"image": enemyImages["golem"], "speed": 1.5, "damage": 32, "health": 128, "reward": 64}, 
    "lobster": {"image": enemyImages["lobster"], "speed": 2.6, "damage": 96, "health": 128, "reward": 64}, 
    "mummy": {"image": enemyImages["mummy"], "speed": 3, "damage": 128, "health": 512, "reward": 128}, 
    "wiggly mage": {"image": enemyImages["golem"], "speed": 1.5, "damage": 64, "health": 256, "reward": 128}, 
    "powerful wiggly mage": {"image": enemyImages["lobster"], "speed": 2.6, "damage": 192, "health": 256, "reward": 128}, 
    "flame swordsman": {"image": enemyImages["flame swordsman"], "speed": 3, "damage": 256, "health": 1024, "reward": 256}, 
    "what is this?": {"image": enemyImages["what is this?"], "speed": 1.5, "damage": 128, "health": 512, "reward": 256}, 
    "tubazord": {"image": enemyImages["tubazord"], "speed": 2.6, "damage": 384, "health": 512, "reward": 256}, 

}

const worlds = {
    "infinite": {"types": Object.keys(enemies), powerLevel: 8},
    0: {"types": ["dog", "raccoon", "fox"], "powerLevel": 4},
    5: {"types": ["bee", "beaver", "dodo"], "powerLevel": 4},
    10: {"types": ["octopus", "slime", "bat"], "powerLevel": 4},
    15: {"types": ["goblin", "lizard man", "knife guy"], "powerLevel": 4},
    20: {'types': ['pumpkin', 'toast', 'cupcake'], 'powerLevel': 4},
    25: {'types': ['minotaur', 'golem', 'lobster'], 'powerLevel': 4},
    30: {'types': ['flame swordsman', 'what is this?', 'tubazord'], 'powerLevel': 4},
}

function CombatTab(props){
    const playerFigtherImageRef = useRef(null);
    const enemyFigtherImageRef = useRef(null);

    function generateEnemy(startingLostHealth){
        let level_modifier = 1.15 ** (props.state.currentWorld);
        let world = props.state.currentWorld;
        let maxWorldMade = Object.keys(worlds).filter((world) => world != "infinite").reduce(function(a, b){ return parseInt(a) > parseInt(b) ? a : b }); // Max World defined before infinite
        maxWorldMade = parseInt(maxWorldMade);

        if (props.state.currentWorld < maxWorldMade + 5){

            // Find maximum world world unlocked
            let chosenWorld = 0;
            for (const entry in worlds){
                if (entry != "infinite" && props.state.currentWorld >= entry){
                    chosenWorld = Math.max(chosenWorld, entry)
                }
            }

            world = chosenWorld;
        }else{
            world = "infinite";
        }


        let possibleEnemies = worlds[world]["types"];

        let enemyType = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
        let enemy = enemies[enemyType];
        let level = Math.floor(worlds[world]["powerLevel"] * level_modifier);

        if (startingLostHealth == undefined) startingLostHealth = 0;

        props.setState((oldState) => ({
            ...oldState,
            "enemyMaxHealth": new Decimal(enemy["health"]).times(level),
            "enemyLostHealth": new Decimal(startingLostHealth),
            "enemyDamage": new Decimal(enemy["damage"]).times(level),
            "enemySpeed": new Decimal(enemy["speed"]),
            "currentEnemy": enemyType,
            "enemyPowerLevel": level,
            "enemyLastAttackDate": Date.now(),
        }))
    }


    function gainGoldFromKill(type){
        // Gain guranteed 50% of the gold and then an additional 50-100% of the gold randomly
        let reward = 0;
        reward += Math.floor(enemies[type]["reward"] / 2);
        reward += Math.floor(Math.random() * enemies[type]["reward"]);

        reward *= props.state.enemyPowerLevel

        props.setState((oldState) => ({
            ...oldState,
            "coins": oldState.coins.plus(reward)
        }))
    }

    function SimulateCombatTick(){

        // Enemy Dead
        if (props.state.enemyLostHealth.greaterThanOrEqualTo(props.state.enemyMaxHealth)){
            gainGoldFromKill(props.state.currentEnemy);

            let overkillDamage = 0;
            if (props.state.upgrades[8].unlocked == 1){
                overkillDamage = props.state.enemyLostHealth.minus(props.state.enemyMaxHealth);
            }
            generateEnemy(overkillDamage);

            // Increment killed enemy counter
            props.setState((oldState) => {
                let updatedList = [...props.state.killsPerWorld];
                let currentWorld = props.state.currentWorld;
                let worldsUnlocked = props.state.worldsUnlocked
                updatedList[props.state.currentWorld] += 1;

                // If 10 kills, unlock new world
                if (updatedList[props.state.currentWorld] == 10){
                    updatedList.push(0);
                    currentWorld += 1;
                    worldsUnlocked.push(currentWorld);
                }

                return {...oldState, "killsPerWorld": updatedList, "currentWorld": currentWorld, "worldsUnlocked": worldsUnlocked}
            })
        }
        

        // You Dead
        if (props.state.playerLostHealth.greaterThanOrEqualTo(props.state.playerMaxHealth) && props.state.equippedCats.length > 0){
            generateEnemy();
            props.setState((oldState) => ({
                ...oldState, "playerLostHealth": new Decimal(0)
            }))
         
        }

        let timeSinceLastAttack = new Date() - props.state.playerLastAttackDate
        if (new Decimal(timeSinceLastAttack).greaterThanOrEqualTo(props.state.playerSpeed.times(1000))){

            // 
            let DamageAmp = 1;
            if (props.state.upgrades[5].unlocked != 0){
                for (let i = 0; i < props.state.cats.length; i++){

                    if (props.state.equippedCats.includes(props.state.cats[i].id)){
                        let catsDensity = props.state.cats[i].density;

                        if (catsDensity.greaterThanOrEqualTo(30)){
                            if (Math.random() * 100 < 25){
                                DamageAmp *= 1.5;
                            }
                        }

                        if (catsDensity.greaterThanOrEqualTo(250)){
                            DamageAmp *= 1.2;
                        }
                    }
                    
                }
            }

            props.setState((oldState) => ({...oldState, "playerLastAttackDate": Date.now(),
                                                        "enemyLostHealth": oldState.enemyLostHealth.plus(props.state.playerDamage.times(DamageAmp))}))

        
            // Fight Animation
            const element = playerFigtherImageRef.current;
            if (element){
                element.classList.add('move-player-attack-animation');

                setTimeout(() => {
                    element.classList.remove('move-player-attack-animation');
                    element.style.transform = 'translate(0, 0)';
                }, props.state.playerSpeed.times(980));
            }
        }
        
        let enemyTimeSinceLastAttack = new Date() - props.state.enemyLastAttackDate;
        if (new Decimal(enemyTimeSinceLastAttack).greaterThanOrEqualTo(props.state.enemySpeed.times(1000)) && props.state.equippedCats.length != 0){
            props.setState((oldState) => ({...oldState, "enemyLastAttackDate": Date.now(), 
                                                        "playerLostHealth": oldState.playerLostHealth.plus(props.state.enemyDamage)}))

                                                        

            // Fight Animation
            const element = enemyFigtherImageRef.current;
            if (element){
                element.classList.add('move-enemy-attack-animation');

                setTimeout(() => {
                    element.classList.remove('move-enemy-attack-animation');
                    element.style.transform = 'translate(0, 0)';
                }, props.state.enemySpeed.times(980));
            }
        }


    }

      useEffect(() => {
        const intervalId = setInterval(SimulateCombatTick, 16.67); // 60 times a second (1000 ms / 60)
        
        // Clear the timeout when the component is unmounted
        return () => {
          clearInterval(intervalId);
        };
      }, [props.state.equippedCats.length, props.state.enemyLostHealth, props.state.playerLostHealth]);


      const [timeSinceLastAttack, setTimeSinceLastAttack] = useState(0);      
      useEffect(() => {
        let animationFrameId;
        let lastTimestamp;
    
        const animate = (timestamp) => {
          if (lastTimestamp === undefined) {
            lastTimestamp = timestamp;
          }
    
          const elapsedMilliseconds = timestamp - lastTimestamp;
          lastTimestamp = timestamp;
    
          // Update timeSinceLastAttack based on the elapsed time
          setTimeSinceLastAttack((prevTime) => prevTime + elapsedMilliseconds);
    
          // Continue the animation if the component is still mounted
          if (animationFrameId !== undefined) {
            animationFrameId = requestAnimationFrame(animate);
          }
        };
    
        // Start the animation loop
        animationFrameId = requestAnimationFrame(animate);
    
        // Cleanup function
        return () => {
          // Stop the animation when the component is unmounted
          if (animationFrameId !== undefined) {
            cancelAnimationFrame(animationFrameId);
          }
        };
      }, []);


      function rotateWorlds(index){
        if (props.state.worldsUnlocked.includes(props.state.currentWorld + index)){
            props.setState((oldState) => ({
                ...oldState, "currentWorld": oldState.currentWorld + index
            }))
        }
    
      }

    const [showExtraEffects, setShowExtraEffects] = useState(false);

    return (
        <div id="combat-tab">
        
            <div id="personal-combat-stats-container">
                <h2>Yours Stats</h2>
                <h3 id="extraEffectsButton" className={`${props.state.upgrades[5].unlocked != 0 ? "" : "hideTab"}`}onClick={() => setShowExtraEffects(true)}>Powerful Combat Effects!</h3>
                <div>
                    <h3>Health: {formatValues(props.state.playerMaxHealth.minus(props.state.playerLostHealth))}/{formatValues(props.state.playerMaxHealth)}</h3>
                    <div className="playerHeathbar">
                    <div className="playerGreenHealth" style={{width: new Decimal(20).minus(props.state.playerLostHealth.dividedBy(props.state.playerMaxHealth).times(20)) + "vw"}}></div>
                        <div className="playerRedHealth" style={{width: props.state.playerLostHealth.dividedBy(props.state.playerMaxHealth).times(20) + "vw"}}></div>
                    </div>
                </div>
    

                <div className="attackSpeedBar">
                    <div className="speedBarFullPortion" style={{width: (new Decimal(new Date() - props.state.playerLastAttackDate).dividedBy(props.state.playerSpeed.times(1000))).times(20) + "vw"}}></div>
                    <div className="speedBarUnfullPortion" style={{width: new Decimal(20).minus(new Decimal(new Date() - props.state.playerLastAttackDate).dividedBy(props.state.playerSpeed.times(1000)).times(20)) + "vw"}}></div>
                </div>
                <h4 id="combat-explainer-text">Fight them by overwhelming them with your immense pressure caused by your high density cats!</h4>
                <h3>Total Cat Density (Damage): {formatValues(props.state.playerDamage)}</h3>
            </div>

            <div id="enemy-display-container">
                <div id="enemy-display">

                    <div id="fight-display-right"><img src={enemyImages[props.state.currentEnemy]} ref={enemyFigtherImageRef}></img></div>
                    <div id="fight-display-left">{props.state.equippedCats.length != 0 && <img src={getCat(props.state.cats, props.state.equippedCats[0]).image} ref={playerFigtherImageRef}></img>}</div>
                    


                </div>
                <div id="enemy-selecter">
                    <div id="world-selector">
                        {[0, 1, 2, 3, 4].map((world_index) => {
                            return <h5 key={world_index} onClick={() => rotateWorlds(-1 * ((props.state.currentWorld % 5) - world_index))}>
                                {props.state.worldsUnlocked.includes(world_index + Math.floor(props.state.currentWorld / 5) * 5) ? world_index + Math.floor(props.state.currentWorld / 5) * 5 : "?"}
                            </h5> 
                        })}
                    </div>
                    <div id="world-selector-buttons">
                        <h3 onClick={() => rotateWorlds(-1)}>←</h3>

                        <h4>{props.state.currentWorld}</h4>
                        <h3 onClick={() => rotateWorlds(1)}>→</h3>
                    </div>
                </div>
            </div>

            <div id="enemy-combat-stats-container">
                <h2>{props.state.currentEnemy}</h2>

                <div>
                    <h3>Health: {formatValues(props.state.enemyMaxHealth.minus(props.state.enemyLostHealth))}/{formatValues(props.state.enemyMaxHealth)}</h3>
                    <div className="playerHeathbar">
                        <div className="playerGreenHealth" style={{width: new Decimal(20).minus(props.state.enemyLostHealth.dividedBy(props.state.enemyMaxHealth).times(20)) + "vw"}}></div>
                            <div className="playerRedHealth" style={{width: props.state.enemyLostHealth.dividedBy(props.state.enemyMaxHealth).times(20) + "vw"}}></div>
                        </div>
                    </div>
                    <div className="attackSpeedBar">
                        <div className="speedBarFullPortion" style={{width: (new Decimal(new Date() - props.state.enemyLastAttackDate).dividedBy(props.state.enemySpeed.times(1000))).times(20) + "vw"}}></div>
                        <div className="speedBarUnfullPortion" style={{width: new Decimal(20).minus(new Decimal(new Date() - props.state.enemyLastAttackDate).dividedBy(props.state.enemySpeed.times(1000)).times(20)) + "vw"}}></div>
                    </div>
                    <h3>Pressure Damage: {formatValues(props.state.enemyDamage)}</h3>
            </div>

            <div id="extra-effects-container" className={`${showExtraEffects == true ? "" : "hideTab"}`}>
                <h3 onClick={() => setShowExtraEffects(false)} id="exit-extra-effects-container-button">X</h3>

                <h2>Earn Extra Powerful Effects based on the Density of your Cats!</h2>

                <h3>These bonuses are per cat and they are additive per additional cat which meets the threshold!</h3>

                <div id="bonuses">
                    <h4>30 Density: 25% to crit for 150% damage (More Cats Increases Crit Damage)</h4>
                    <h4>50 Density: 5% increased attack speed</h4>
                    <h4>100 Density: 20% increased health</h4>
                    <h4>250 Density: 20% increased damage</h4>
                </div>
            </div>

        </div>
    )
}

export default CombatTab