/// <reference types="../node_modules/@types/jquery" />
var cartona = ``
async function getrandomMeals(){
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    let mealsjson = await meals.json()
    SetrandomMeals(mealsjson)
}
function SetrandomMeals(api){
        cartona += `
                    <div class="col-md-3">
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