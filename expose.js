

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  document.querySelector("Myrecipes").addEventListener("click", ()=>{
    document.querySelector("isMyRecipe").classList.add('hidden');
    
  });
}