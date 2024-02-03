let submitButton = document.querySelector("button");
let outputWindow = document.querySelector("#msg");
let dropdown = document.querySelectorAll("select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const BASE_URL = "https://open.er-api.com/v6/latest/";


//step-1 here we are setting dropdown data from country.js files
  for (let select of dropdown) { // getting each select element 
    for (code in countryList) {  // getting country currency code from country.js
      let newOption = document.createElement("option");
      newOption.innerText = code;
      newOption.value = code;
      if (select.name === "from" && code === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && code === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
      select.addEventListener("change", (evt) => {
        updateflag(evt.target);
      });
    }
  }  
 //----------------------------------------------------------------------
let updateflag = (element) => {
  let currCode = countryList[element.value];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${currCode}/flat/64.png`;
};
submitButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchangeRate();
});
//----------------------------------------------------------------------
  let exchangeRate = async () => {
    let amount = document.querySelector("input");
    let amtVal = amount.value;
    const URL=`${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let calculateAmt=Math.round(amtVal*data.rates[toCurr.value],2);
    outputWindow.innerText=`${amtVal} ${fromCurr.value} to ${calculateAmt}  ${toCurr.value}`;
    amount.value=``;
  }  
