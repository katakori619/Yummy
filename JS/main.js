/// <reference types="../node_modules/@types/jquery" />
let cartona = ``
async function getrandomMeals(){
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    let mealsjson = await meals.json()
    console.log(mealsjson)
    displayrandomMeals(mealsjson)
}
function displayrandomMeals(api){
        cartona += `
                    <div class="col-md-3">
                        <div class="image">
                            <img src="${api.meals[0].strMealThumb}" class="w-100 rounded-2" alt="">
                            <div class="layer rounded-2 d-flex justify-content-center align-items-center">${api.meals[0].strMeal}</div>
                        </div>
                    </div>
        `
        console.log(api.meals[0].strMealThumb)
    document.getElementById('meals').innerHTML = cartona
}
for(var x=0;x<25;x++){
    getrandomMeals()
}