import "./combatTab.css"
import {useEffect, useState, useRef} from "react";
import {formatValues} from "./globalFunctions";
import Decimal from "break_infinity.js";

import {getCat} from "./globalFunctions.jsx"

const enemyImages = {"dog": 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/7042/images/rqjcClzPTb6hUVFietnp_Getting_Started_With_Basic_Dog_Training_Commands.jpg',
                    "raccoon": "https://c8.alamy.com/comp/2BXGB2X/vector-pixel-art-raccoon-isolated-2BXGB2X.jpg",
                    "fox": "https://media.npr.org/assets/img/2014/01/02/140102123909_1_wide-da99ab742e0a327bf840d4b8e01b864b019482ca-s1400-c100.jpg"}

const enemies = {
    "dog": {"image": enemyImages["dog"], "speed": 3, "damage": 2, "health": 8, "reward": 2},
    "fox": {"image": enemyImages["fox"], "speed": 1.5, "damage": 1, "health": 4, "reward": 2},
    "raccoon": {"image": enemyImages["raccoon"], "speed": 2.6, "damage": 3, "health": 4, "reward": 2},
}

const worlds = {
    0: {"types": ["dog", "raccoon", "fox"], "powerLevel": 4}
}

function CombatTab(props){
    const playerFigtherImageRef = useRef(null);
    const enemyFigtherImageRef = useRef(null);

    function generateEnemy(){
        let level_modifier = 1.5;
        let world = props.state.currentWorld;
        if (!Object.keys(worlds).includes(world)){
            world = Object.keys(worlds)[Object.keys(worlds).length - 1];
            level_modifier = level_modifier ** (props.state.currentWorld - world)
        }else{
            level_modifier = 1;
        }

        let possibleEnemies = worlds[world]["types"];

        let enemyType = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
        let enemy = enemies[enemyType];
        let level = Math.floor(worlds[world]["powerLevel"] * level_modifier);

        props.setState((oldState) => ({
            ...oldState,
            "enemyMaxHealth": new Decimal(enemy["health"]).times(level),
            "enemyLostHealth": new Decimal(0),
            "enemyDamage": new Decimal(enemy["damage"]).times(level),
            "enemySpeed": new Decimal(enemy["speed"]),
            "currentEnemy": enemyType,
            "enemyPowerLevel": level
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
            "coins": oldState.coins + reward
        }))
    }

    function SimulateCombatTick(){

        // Enemy Dead
        if (props.state.enemyLostHealth.greaterThanOrEqualTo(props.state.enemyMaxHealth)){
            gainGoldFromKill(props.state.currentEnemy);
            generateEnemy();

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
            props.setState((oldState) => ({...oldState, "playerLastAttackDate": Date.now(),
                                                        "enemyLostHealth": oldState.enemyLostHealth.plus(props.state.playerDamage)}))

        
            // Fight Animation
            const element = playerFigtherImageRef.current;
            if (element){
                element.classList.add('move-player-attack-animation');

                setTimeout(() => {
                    element.classList.remove('move-player-attack-animation');
                }, 500);
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
                }, 500);
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


    return (
        <div id="combat-tab">
            <div id="personal-combat-stats-container">
                <h2>Yours Stats</h2>
                
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
                <h3>Damage: {formatValues(props.state.playerDamage)}</h3>
            </div>

            <div id="enemy-display-container">
                <div id="enemy-display">

                    <div id="fight-display-right"><img src={enemyImages[props.state.currentEnemy]} ref={enemyFigtherImageRef}></img></div>
                    <div id="fight-display-left">{props.state.equippedCats.length != 0 && <img src={getCat(props.state.cats, props.state.equippedCats[0]).image} ref={playerFigtherImageRef}></img>}</div>
                    


                </div>
                <div id="enemy-selecter">
                    <div id="world-selector">
                        {[0, 1, 2, 3, 4].map((world_index) => {
                            return <h5 key={world_index} onClick={() => rotateWorlds(-1 * (props.state.currentWorld - world_index))}>
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
                    <h3>Damage: {formatValues(props.state.enemyDamage)}</h3>
            </div>

        </div>
    )
}

export default CombatTab