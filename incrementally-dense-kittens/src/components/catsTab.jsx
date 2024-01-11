import "./catsTab.css"
import {useState} from "react";
import {formatValues} from "./globalFunctions";
import Decimal from "break_infinity.js";

function CatsTab(props){
  
  const getCat = (cats, id) => {
    for (let i = 0; i < cats.length; i++){
      if (cats[i].id == id) return cats[i];
    }
    return null;
  }
  const startingInventorySize = 70;
  const [sortingMode, setSortingMode] = useState("density");

  function sorted(cats){
    if (sortingMode == "density")
      return cats.sort((cat1, cat2) => cat2.density - cat1.density);

    if (sortingMode == "type")
      return cats.sort((cat1, cat2) => cat1.type > cat2.type);
  }

  function generateRows(){
    let rows = [];
    let cats = props.state.cats

    // Sort Cats
    cats = sorted(cats)

    let amountOfCats = cats.length

    for (let j = 0; j < (amountOfCats > startingInventorySize ? (Math.floor(amountOfCats / 10) + 1) * 10 : startingInventorySize); j++){
      if (j % 10 == 0) rows.push([]);

      if (j < amountOfCats)
        rows[Math.floor(j/10)][j % 10] = cats[j];
      else
        rows[Math.floor(j/10)][j % 10] = {id: 99999999999 + j};
    }

    return rows
  }
  
  function equipCat(cat){
    if (props.state.equippedCats.length < props.state.maxEquippedCats){
      if (!props.state.equippedCats.includes(cat.id)){
        props.setState(oldState => ({...oldState, "equippedCats": [...oldState.equippedCats, cat.id]}))
      }
    }else{
      let weakestCatIndex = -1;
      let weakestCatDensity = new Decimal('Infinity');
      for (let i = 0; i < props.state.equippedCats.length; i++){
        let cat = getCat(props.state.cats, props.state.equippedCats[i]);

        if (weakestCatDensity.greaterThan(cat.density)){
          weakestCatDensity = cat.density;
          weakestCatIndex = i;
        }
      }


      if (weakestCatIndex != -1 && cat.density.greaterThan(weakestCatDensity)){
        let newEquippedCats = props.state.equippedCats;
        newEquippedCats[weakestCatIndex] = cat.id;

        props.setState(oldState => ({...oldState, "equippedCats": newEquippedCats}))
      }
    }
      
  }

  function changeEquipmentStatus(cat){
    // If cat is equipped, then unequip and vice versa

    if (!props.state.equippedCats.includes(cat.id)){
      equipCat(cat);
    }else{
      let equippedCats = props.state.equippedCats;
      let index = equippedCats.indexOf(cat.id)
      equippedCats.splice(index, 1)

      props.setState((oldState) => ({...oldState, "equippedCats": equippedCats}))
    }
  }

  const selectedCat = () => {
    return Object.values(props.state["cats"]).filter(cat => cat.id == props.state["selectedCat"])[0];
  }

  return ( 
    
      <div id="cat-content-container">

        <div id="cat-content-left">
          <div id="cat-inventory-sorter">
            <h3>Sort By: </h3>
            <h3 className={`cat-sorting-button ${sortingMode == "density" ? "mainSorting": "nonSorting"}`} onClick={() => setSortingMode("density")}>Density</h3>
            <h3 className={`cat-sorting-button ${sortingMode == "type" ? "mainSorting": "nonSorting"}`} onClick={() => setSortingMode("type")}>Type</h3>
          </div>
          <div id="cat-inventory">
            {generateRows().map((row, index) => (
              <div key={index} className="inventory-row">
                {row.map(cat => (
                  <div onDoubleClick={() => changeEquipmentStatus(cat)} key={cat.id} className={`inventory-tile ${cat.id == props.state["selectedCat"] ? "currently-selected-cat" : ""} ${props.state.equippedCats.includes(cat.id) ? "currently-equipped-cat" : ""}`} onClick={() => props.setState(oldState => ({...oldState, "selectedCat": cat.id}))}>

                    <h3>{cat.density == null ? "" : formatValues(cat.density)}</h3>
                    <img  src={cat.image}></img>
                  </div>
                  
                ))}
              </div>
            ))}


          </div>
        </div>
        <div>
            {Object.values(props.state["cats"]).filter(cat => cat.id == props.state["selectedCat"]).length != 0 && 
               <div id="cat-display">
                  <h1>{selectedCat().name}</h1>

                  <img src={selectedCat().image}></img>

                  <div id="cat-stats">
                    <h2>Type: {selectedCat().type}</h2>
                    <h2>Density: {formatValues(selectedCat().density)}</h2>
                    <h2>Likes: {selectedCat().likes}</h2>
                  </div>

                  <div id="cat-management-buttons">

                    {!props.state.equippedCats.includes(selectedCat().id) ? 
                    <h3 onClick={() => equipCat(selectedCat())} id="equip-cat">Equip</h3> : 
                    <h3 onClick={() => props.setState((oldState) => ({
                      ...oldState, equippedCats:  oldState.equippedCats.filter((cat) => cat !== selectedCat().id),
                      "selectedCat": oldState.equippedCats.filter((cat) => cat !== selectedCat().id).length > 0 ? oldState.equippedCats.filter((cat) => cat !== selectedCat().id)[0] : -1,
                    }))} id="unequip-cat">Unequip</h3> }

                  </div>

               </div>}
        </div>
      </div>

  )
}

export default CatsTab