import "./catsTab.css"
import {useState} from "react";

function CatsTab(props){

  const startingInventorySize = 70;

  function generateRows(){
    let rows = [];
    let amountOfCats = props.state["cats"].length

    for (let j = 0; j < (amountOfCats > startingInventorySize ? (Math.floor(amountOfCats / 10) + 1) * 10 : startingInventorySize); j++){
      if (j % 10 == 0) rows.push([]);

      if (j < amountOfCats)
        rows[Math.floor(j/10)][j % 10] = props.state["cats"][j];
      else
        rows[Math.floor(j/10)][j % 10] = {id: 99999999999 + j};
    }

    return rows
  }
  
  function equipCat(cat){
    if (props.state.equippedCats.length < props.state.maxEquippedCats && !props.state.equippedCats.includes(cat.id))
      props.setState(oldState => ({...oldState, "equippedCats": [...oldState.equippedCats, cat.id]}))

  }

  const selectedCat = () => {
    return Object.values(props.state["cats"]).filter(cat => cat.id == props.state["selectedCat"])[0];
  }

  return ( 
    
      <div id="cat-content-container">
        <div id="cat-inventory">

          {generateRows().map((row, index) => (
            <div key={index} className="inventory-row">
              {row.map(cat => (
                <div key={cat.id} className={`inventory-tile ${cat.id == props.state["selectedCat"] ? "currently-selected-cat" : ""} ${props.state.equippedCats.includes(cat.id) ? "currently-equipped-cat" : ""}`} onClick={() => props.setState(oldState => ({...oldState, "selectedCat": cat.id}))}>

                  <h3>{cat.density}</h3>
                  <img src={cat.image}></img>
                </div>
                
              ))}
            </div>
          ))}


        </div>
        <div>
            {Object.values(props.state["cats"]).filter(cat => cat.id == props.state["selectedCat"]).length != 0 && 
               <div id="cat-display">
                  <h1>{selectedCat().name}</h1>

                  <img src={selectedCat().image}></img>

                  <div id="cat-stats">
                    <h2>Type: {selectedCat().type}</h2>
                    <h2>Density: {selectedCat().density}</h2>
                    <h2>Likes: {selectedCat().likes}</h2>
                  </div>

                  <div id="cat-management-buttons">

                    {!props.state.equippedCats.includes(selectedCat().id) ? 
                    <h3 onClick={() => equipCat(selectedCat())} id="equip-cat">Equip</h3> : 
                    <h3 onClick={() => props.setState((oldState) => ({
                      ...oldState, equippedCats: oldState.equippedCats.splice(oldState.equippedCats.indexOf(selectedCat().id), 1)
                    }))} id="unequip-cat">Unequip</h3> }

                  </div>

               </div>}
        </div>
      </div>

  )
}

export default CatsTab