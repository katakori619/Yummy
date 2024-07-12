/// <reference types="../node_modules/@types/jquery" />
var cartona = ``
async function getrandomMeals(){
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    let mealsjson = await meals.json()
    SetrandomMeals(mealsjson)
}
function SetrandomMeals(api){
        cartona += `
                    <div class="col-md-3" id="${api.meals[0].idMeal}">
                        <div class="image">
                            <img src="${api.meals[0].strMealThumb}" class="w-100 rounded-2" alt="">
                            <div class="layer rounded-2 d-flex justify-content-center align-items-center">${api.meals[0].strMeal}</div>
                        </div>
                    </div>
        `
}
async function displayrandomMeals(){
    cartona = ``
    document.querySelector('.website').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
    for(var x=0;x<25;x++){
        await getrandomMeals()
    }
    document.querySelector('.website').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
    document.getElementById('meals').innerHTML = cartona
    setdetails()
} 
displayrandomMeals()
$('.navcloseopen').on('click',function(){
    if(document.querySelector('.navbarlinks').classList.contains('clicked')){
        $('nav').animate({'left':'-260px'},400)
        $('.links p').animate({'top':'300px'},400)
        document.querySelector('.navbarlinks').classList.remove('clicked')
        document.querySelector('.navcloseopen').classList.add('fa-align-justify')
        document.querySelector('.navcloseopen').classList.remove('fa-x')
    }
    else{
        $('nav').animate({'left':'0'},400)
        $('.links .one').animate({'top':'0px'},400)
        $('.links .two').delay(100).animate({'top':'0px'},400)
        $('.links .three').delay(200).animate({'top':'0px'},400)
        $('.links .four').delay(300).animate({'top':'0px'},400)
        $('.links .five').delay(400).animate({'top':'0px'},400)
        document.querySelector('.navbarlinks').classList.add('clicked')
        document.querySelector('.navcloseopen').classList.remove('fa-align-justify')
        document.querySelector('.navcloseopen').classList.add('fa-x')
    }
})
async function getdetailsMeals(id){
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let mealsjson = await meals.json()
    displayDetails(mealsjson.meals[0])
}

function displayDetails(api){
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = api[`strIngredient${i}`];
        const measure = api[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
            ingredients += `<span class="painted m-2 rounded-2">${measure} ${ingredient}</span>`;
        }
    }
    let cartona2 = ``
    cartona2 += `
        <div class="col-md-4">
                            <div class="image">
                                <img src="${api.strMealThumb}" class="w-100 rounded-2" alt="">
                            </div>
                            <h3>${api.strMeal}</h3>
                        </div>
                        <div class="col-md-8">
                            <h2 class="d-flex justify-content-between">
                            <span>Instructions</span>
                            <i class="fa-solid open-close-icon navcloseopen closedetails fa-x" aria-hidden="true"></i>
                            </h2>
                            <p>${api.strInstructions}</p>
                            <h2><span class="fw-bold">Area</span>: ${api.strArea}</h2>
                            <h2><span class="fw-bold">Category</span>: ${api.strCategory}</h2>
                            <div class="recipies">
                                <h2>Recipes:</h2>
                                <div class="ingredients d-flex flex-wrap">
                                ${ingredients}
                                </div>
                            </div>
                            <h2>Tags:</h2>
                            <div class="types my-4">
                            ${api.strTags ? api.strTags.split(',').map(tag => `<span class="rounded-2 mx-2">${tag}</span>`).join('') : ''}
                            </div>
                            <div class="links d-flex">
                                <a href="${api.strSource}" target="_blank" class="btn btn-success me-2">Source</a>
                                <a href="${api.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                            </div>
                        </div>
    `
    document.getElementById('mealsdetails').innerHTML = cartona2
}
function setdetails() {
    $('#meals').on('click', '.col-md-3', async function () {
        await getdetailsMeals(this.id);
        document.querySelector('.meals').classList.add('d-none');
        document.querySelector('.mealsDetails').classList.remove('d-none');
    });
}
$(document).on('click','.closedetails',function(){
    console.log("done");
    document.querySelector('.mealsDetails').classList.add('d-none');
    document.querySelector('.meals').classList.remove('d-none');
})