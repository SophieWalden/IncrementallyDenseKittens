import "./combatTab.css"
import {useEffect, useState, useRef} from "react";
import {formatValues} from "./globalFunctions";
import Decimal from "break_infinity.js";

import {getCat} from "./globalFunctions.jsx"

const enemyImages = {"dog": 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/7042/images/rqjcClzPTb6hUVFietnp_Getting_Started_With_Basic_Dog_Training_Commands.jpg'}

function CombatTab(props){
    const playerFigtherImageRef = useRef(null);
    const enemyFigtherImageRef = useRef(null);

    function SimulateCombatTick(){

        // Enemy Dead
        if (props.state.enemyLostHealth.greaterThanOrEqualTo(props.state.enemyMaxHealth)){
            props.setState((oldState) => ({
                ...oldState, "enemyMaxHealth": new Decimal(Math.floor(Math.random() * 100)),
                "enemyLostHealth": new Decimal(0),
                "enemySpeed": new Decimal(1),
                "enemyDamage": new Decimal(Math.floor(Math.random() * 5)).plus(1),
                "coins": oldState.coins + Math.floor(Math.random() * 4)
            }))
        }
        

        // You Dead
        if (props.state.playerLostHealth.greaterThanOrEqualTo(props.state.playerMaxHealth) && props.state.equippedCats.length > 0){
            props.setState((oldState) => ({
                ...oldState, "playerLostHealth": new Decimal(0),
                "enemyMaxHealth": new Decimal(Math.floor(Math.random() * 100)),
                "enemyLostHealth": new Decimal(0),
                "enemySpeed": new Decimal(1),
                "enemyDamage": new Decimal(Math.floor(Math.random() * 5)).plus(1),
            }))
         
        }

        let timeSinceLastAttack = new Date() - props.state.playerLastAttackDate
        if (new Decimal(timeSinceLastAttack).greaterThanOrEqualTo(props.state.playerSpeed.times(1000))){
            props.setState((oldState) => ({...oldState, "playerLastAttackDate": Date.now(),
                                                        "enemyLostHealth": oldState.enemyLostHealth.plus(props.state.playerDamage)}))

        
            // Fight Animation
            const element = playerFigtherImageRef.current;
            element.classList.add('move-player-attack-animation');

            setTimeout(() => {
                element.classList.remove('move-player-attack-animation');
            }, 500);
        }
        
        let enemyTimeSinceLastAttack = new Date() - props.state.enemyLastAttackDate;
        if (new Decimal(enemyTimeSinceLastAttack).greaterThanOrEqualTo(props.state.enemySpeed.times(1000))){
            props.setState((oldState) => ({...oldState, "enemyLastAttackDate": Date.now(), 
                                                        "playerLostHealth": oldState.playerLostHealth.plus(props.state.enemyDamage)}))

                                                        

            // Fight Animation
            const element = enemyFigtherImageRef.current;
            element.classList.add('move-enemy-attack-animation');

            setTimeout(() => {
                element.classList.remove('move-enemy-attack-animation');
            }, 500);
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