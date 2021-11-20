let element = document.querySelector(".dropdown.delete");
let mybox = document.querySelector(".box");

//code dive works, need to test later 
// cannot delete other users recipes without permission

element.addEventListener("click", function() {
        deleteRecipe(mybox.id);
});



