import "../css/style.css";

const btn = document.querySelector("button");
const input = document.querySelector("input");
const summary = document.querySelector(".summary");
const cityScore = document.querySelector(".city-score");
const score = document.querySelector(".score");
const category = document.querySelector(".category");
const containerData = document.querySelector(".container-data");
const errorTitle = document.querySelector(".error-title");
const loading = document.querySelector(".load");


let city;
let dataScore;





const showLoading = () => {
  clearScore();
  loading.style.display = "block"; 
  
};

const hideLoading = () => {
  loading.style.display = "none"; 
};



// chiamata api con axios
const axios = require('axios'); 

const getData = async function() {

  showLoading();

  try {
    const response = await axios.get(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`);
    const dataScore = response.data;

    console.log(dataScore);

    if (response.status !== 404) {

      searchCity(dataScore);
    } 
  // gestione errore di chiamata
  } catch (error) {

    console.error("An error has occurred:", error);

    if(input.value == ""){
       
        errorMessage("Please, insert a city!"); 
    }

    else{
    errorMessage("City non found, Please try again.");
    }
    
  clearScore();
  }
  finally {
    hideLoading(); 
  }
return dataScore;
};



// funzione per manipolare il dom con i dati ricevuti
const searchCity = function(data){
    
      errorTitle.innerHTML = "";
      errorTitle.classList.remove("padding-summary");
      containerData.classList.add("container--data");
      summary.classList.add("padding-summary");

      summary.innerHTML = data.summary;
      cityScore.innerHTML = "City Score";
      score.innerHTML = data.teleport_city_score.toFixed();

      data.categories.forEach((item) => {
        category.insertAdjacentHTML("afterbegin", `<h3>${item.name} <br/>${item.score_out_of_10.toFixed(1)}</br><h3>`);
      });

      input.value = "";
}



//funzione per messaggio di errore
const errorMessage = function(message){
  errorTitle.innerHTML = message;
  errorTitle.classList.add("padding-summary");
  return message;
}


// nome della città
function cityName(name){
    name = name.trim();
    name = name.replaceAll(" ","-");
    name = name.toLowerCase();
    return name;
};


//funzione per pulire i punteggi
function clearScore(){
    summary.classList.remove("padding-summary");
    summary.innerHTML = "";
    cityScore.innerHTML = "";
    score.innerHTML = "";
    category.innerHTML = "";
};


// evento per il tasto enter
input.addEventListener("keydown",function(enter){
 if(enter.key == "Enter"){
    city = cityName(input.value);
    getData();
 }
});


// evento per la ricerca
btn.addEventListener("click",function(){
    city = cityName(input.value);
    getData();
});
