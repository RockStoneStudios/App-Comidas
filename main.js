const searchform = document.querySelector('form');
const searchResultDiv = document.querySelector('.buscar-resultado');
const container = document.querySelector('.container');
let searchQuery = '';
const app_id = 'b266c396';
const app_key = 'a93d28bff01db36a6734e84e8bd2752e';

searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
    
});

async function fetchAPI(){
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    generateHtml(data.hits);
    
  
}

function generateHtml(results){
    let generaHtml = "";
    results.map(result =>{
       generaHtml +=
       `<div class="item">
       <img src="${result.recipe.image}" alt="Comida">
       <div class="flex-container">
           <h1 class="titulo">${result.recipe.label}</h1>
           <a class="boton" href="${result.recipe.url}" target ="_blank">Ver Receta</a>
       </div>
       <p class="dato-receta">Calorias : ${Math.round(result.recipe.calories)} </p>
       <p class="dato-receta">Dieta : ${result.recipe.dietLabels.length>0 ? result.recipe.dietLabels : 'No Data Found'} </p>
       <p class="dato-receta">Ingredientes : ${result.recipe.healthLabels} </p>
   </div>` 
    })
    searchResultDiv.innerHTML = generaHtml;
}