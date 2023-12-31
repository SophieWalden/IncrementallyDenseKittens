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
      'Meow Zedong',
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

const catIcons = [
    "https://www.pixelcatsend.com/images/catmojis/hi.png",
    "https://www.pixelcatsend.com/images/catmojis/pridecat.png",
    "https://www.pixelcatsend.com/images/catmojis/feels.png",
    "https://www.pixelcatsend.com/images/catmojis/thonk.png",
    "https://www.pixelcatsend.com/images/catmojis/writing.png",
    "https://i.postimg.cc/ry0S4SV6/Jill-headshot-by-5119.png",

]

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

    function addCat(){
        let newCat = {"Type": "Fire", "density": Math.floor(Math.random() * 1000), "id": props.state["nextCatId"]};

        newCat["name"] = coolCatNames[Math.floor(Math.random() * coolCatNames.length)]
        newCat["image"] = catIcons[Math.floor(Math.random() * catIcons.length)]
        newCat["likes"] = catLikes[Math.floor(Math.random() * catLikes.length)]

        // Whenever you add a cat, increase the id value
        props.setState(oldState => ({...oldState, "nextCatId": oldState["nextCatId"] + 1}))
    
        props.setState((oldState) => ({...oldState, 
                "cats": [...oldState.cats, newCat]}));
    
      }

    return (
        <div>
                <h3>Hatching Tab</h3>
                <button onClick={addCat}>Add Cat</button>
        </div>
    )
}

export default HatchingTab