
import Decimal from "break_infinity.js";
export const formatValues = (value, decimalMode) =>{
    value = new Decimal(value);

    if (new Decimal(100000).greaterThan(value)){
      // Return small decimal number
      
      value = value.times(100).floor().divideBy(100).toString()
      if (value.indexOf(".") == -1 && decimalMode != true) return value
      
      if (value.indexOf(".") == -1 && decimalMode == true) return value + ".00"

      value = value.substring(0, value.indexOf(".") + 3)
      let paddingNeeded = 3 - (value.length - value.indexOf("."));


      return value + "0".repeat(paddingNeeded);
      
    } 

    return value.toExponential(2).toString().replace("+","");
  }



export const getCat = (cats, id) => {
  for (let i = 0; i < cats.length; i++){
    if (cats[i].id == id) return cats[i];
  }
  return null;
}

