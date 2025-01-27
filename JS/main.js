/// <reference types="../node_modules/@types/jquery" />
var cartona = ``
let currentView = 'random'
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
    document.querySelector('.website').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let mealsjson = await meals.json()
    displayDetails(mealsjson.meals[0])
    document.querySelector('.website').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
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
        console.log();
        await getdetailsMeals(this.id);
        document.querySelector('.meals').classList.add('d-none');
        document.querySelector('.mealsDetails').classList.remove('d-none');
    });
}
$(document).on('click', '.closedetails', function () {
    document.querySelector('.mealsDetails').classList.add('d-none');
    if (currentView === 'random') {
        document.querySelector('.meals').classList.remove('d-none');
    } else if (currentView === 'category') {
        document.querySelector('.catmeals').classList.remove('d-none');
    } else if(currentView ==='area'){
        document.querySelector('.areasmeals').classList.remove('d-none')
    } else if(currentView === 'ingrediants'){
        document.querySelector('.ingrediantsmeals').classList.remove('d-none')
    } else if(currentView === 'search'){
        document.querySelector('.search').classList.remove('d-none')
    }
});
async function getcategories(){
    document.querySelector('.besidenav').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
    let cat = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let catjson = await cat.json()
    displaycategories(catjson.categories)
    document.querySelector('.besidenav').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
}
function displaycategories(api){
    let cartona3 = ``
    for(var x = 0;x<api.length;x++){
        cartona3 += `
        <div class="col-md-3" id="${api[x].strCategory}">
                            <div class="image rounded-2">
                                <img src="${api[x].strCategoryThumb}" class="w-100" alt="">
                                <div class="layer rounded-2 p-2 text-center">
                                    <h3>${api[x].strCategory}</h3>
                                    <p>${api[x].strCategoryDescription}</p></div>
                            </div>
                        </div>
        `
    }
    document.getElementById('categories').innerHTML = cartona3
}
$(document).on('click','.links p.two',function(){
    document.querySelector('.mealsDetails').classList.add('d-none')
    document.querySelector('.catmeals').classList.add('d-none')
    document.querySelector('.areasmeals').classList.add('d-none')
    document.querySelector('.areas').classList.add('d-none')
    document.querySelector('.ingrediantsmeals').classList.add('d-none')
    document.querySelector('.ingrediants').classList.add('d-none')
    document.querySelector('.search').classList.add('d-none')
    document.querySelector('.contactUs').classList.add('d-none')
    $('nav').animate({'left':'-260px'},400)
    $('.links p').animate({'top':'300px'},400)
    document.querySelector('.navbarlinks').classList.remove('clicked')
    document.querySelector('.navcloseopen').classList.add('fa-align-justify')
    document.querySelector('.navcloseopen').classList.remove('fa-x')
    document.querySelector('.meals').classList.add('d-none');
    document.querySelector('.mealcategories').classList.remove('d-none');
    getcategories()
})
async function getcategorymeal(mealtitle){
    document.querySelector('.besidenav').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealtitle}`)
    let mealjson = await meal.json()
    console.log(mealjson.meals)
    displaycategorymeals(mealjson.meals)
    document.querySelector('.besidenav').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
}
function displaycategorymeals(api){
    var cartona4 = ``
    for(var i = 0;i<api.length;i++){
        cartona4 +=`
        <div class="col-md-3" id="${api[i].idMeal}">
                            <div class="image rounded-2">
                                <img src="${api[i].strMealThumb}" class="w-100" alt="">
                                <div class="layer rounded-2 d-flex justify-content-center align-items-center">${api[i].strMeal}</div>
                            </div>
                    </div>
        `
    }
    document.getElementById('categmeals').innerHTML = cartona4
}
$(document).on('click','.mealcategories .col-md-3',async function(){
    document.querySelector('.mealsDetails').classList.add('d-none')
    currentView = 'category';
    await getcategorymeal(this.id)
    document.querySelector('.mealcategories').classList.add('d-none')
    document.querySelector('.catmeals').classList.remove('d-none')
    $('#categmeals').on('click', '.col-md-3', async function () {
        await getdetailsMeals(this.id);
        document.querySelector('.catmeals').classList.add('d-none');
        document.querySelector('.mealsDetails').classList.remove('d-none');
    });
})
async function getareas(){
    document.querySelector('.besidenav').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
    let cat = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let catjson = await cat.json()
    displayareas(catjson.meals)
    document.querySelector('.besidenav').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
}
function displayareas(api){
    let cartona5 = ``
    for(var x = 0;x<api.length;x++){
        cartona5 += `
        <div class="col-md-3 text-center" id="${api[x].strArea}">
                                <i class="fa-solid fa-house-laptop fa-4x"></i>
                                <h3>${api[x].strArea}</h3>
                            </div>
        `
    }
    document.getElementById('areas').innerHTML = cartona5
}
$(document).on('click','.links p.three',function(){
    document.querySelector('.mealsDetails').classList.add('d-none')
    document.querySelector('.catmeals').classList.add('d-none')
    document.querySelector('.mealcategories').classList.add('d-none')
    document.querySelector('.areasmeals').classList.add('d-none')
    document.querySelector('.ingrediantsmeals').classList.add('d-none')
    document.querySelector('.ingrediants').classList.add('d-none')
    document.querySelector('.search').classList.add('d-none')
    document.querySelector('.contactUs').classList.add('d-none')
    $('nav').animate({'left':'-260px'},400)
    $('.links p').animate({'top':'300px'},400)
    document.querySelector('.navbarlinks').classList.remove('clicked')
    document.querySelector('.navcloseopen').classList.add('fa-align-justify')
    document.querySelector('.navcloseopen').classList.remove('fa-x')
    document.querySelector('.meals').classList.add('d-none');
    document.querySelector('.areas').classList.remove('d-none');
    getareas()
})
async function getareameal(mealarea){
    document.querySelector('.besidenav').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealarea}`)
    let mealjson = await meal.json()
    displayareameal(mealjson.meals)
    document.querySelector('.besidenav').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
}
function displayareameal(api){
    var cartona6 = ``
    for(var i = 0;i<api.length;i++){
        cartona6 +=`
        <div class="col-md-3" id="${api[i].idMeal}">
                            <div class="image rounded-2">
                                <img src="${api[i].strMealThumb}" class="w-100" alt="">
                                <div class="layer rounded-2 d-flex justify-content-center align-items-center">${api[i].strMeal}</div>
                            </div>
                    </div>
        `
    }
    document.getElementById('areasmeals').innerHTML = cartona6
}
$(document).on('click','.areas .col-md-3',async function(){
    document.querySelector('.mealsDetails').classList.add('d-none')
    currentView = 'area';
    await getareameal(this.id)
    document.querySelector('.areas').classList.add('d-none')
    document.querySelector('.areasmeals').classList.remove('d-none')
    $('#areasmeals').on('click', '.col-md-3', async function () {
        await getdetailsMeals(this.id);
        document.querySelector('.areasmeals').classList.add('d-none');
        document.querySelector('.mealsDetails').classList.remove('d-none');
    });
})
async function getingrediants(){
    document.querySelector('.besidenav').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
    let cat = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let catjson = await cat.json()
    displayingrediants(catjson.meals)
    document.querySelector('.besidenav').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
}
function truncateDescription(description) {
    const maxChars = 100;
    if (!description) {
        return '';
    }
    const firstDotIndex = description.indexOf('.');
    if (firstDotIndex !== -1 && firstDotIndex <= maxChars) {
        return description.substring(0, firstDotIndex + 1);
    } else if (description.length > maxChars) {
        return description.substring(0, maxChars) + '...';
    } else {
        return description;
    }
}
function displayingrediants(api){
    let cartona6 = ``
    for(var x = 0;x<api.length;x++){
        const truncatedDescription = truncateDescription(api[x].strDescription);
        if(truncatedDescription){
            cartona6 += `
            <div class="col-md-3" id="${api[x].strIngredient}">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${api[x].strIngredient}</h3>
                <p>${truncatedDescription}</p>
            </div>
`   
        }
    }
    document.getElementById('ingrediants').innerHTML = cartona6
}
$(document).on('click','.links p.four',function(){
    document.querySelector('.mealsDetails').classList.add('d-none')
    document.querySelector('.catmeals').classList.add('d-none')
    document.querySelector('.mealcategories').classList.add('d-none')
    document.querySelector('.areasmeals').classList.add('d-none')
    document.querySelector('.areas').classList.add('d-none')
    document.querySelector('.ingrediantsmeals').classList.add('d-none')
    document.querySelector('.search').classList.add('d-none')
    document.querySelector('.contactUs').classList.add('d-none')
    $('nav').animate({'left':'-260px'},400)
    $('.links p').animate({'top':'300px'},400)
    document.querySelector('.navbarlinks').classList.remove('clicked')
    document.querySelector('.navcloseopen').classList.add('fa-align-justify')
    document.querySelector('.navcloseopen').classList.remove('fa-x')
    document.querySelector('.meals').classList.add('d-none');
    document.querySelector('.ingrediants').classList.remove('d-none');
    getingrediants()
})
async function getingrediantmeal(mealarea){
    document.querySelector('.besidenav').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealarea}`)
    let mealjson = await meal.json()
    displayingrediantmeal(mealjson.meals)
    document.querySelector('.besidenav').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
}
function displayingrediantmeal(api){
    var cartona7 = ``
    for(var i = 0;i<api.length;i++){
        cartona7 +=`
        <div class="col-md-3" id="${api[i].idMeal}">
                            <div class="image rounded-2">
                                <img src="${api[i].strMealThumb}" class="w-100" alt="">
                                <div class="layer rounded-2 d-flex justify-content-center align-items-center">${api[i].strMeal}</div>
                            </div>
                    </div>
        `
    }
    document.getElementById('ingrediantsmeals').innerHTML = cartona7
}
$(document).on('click','.ingrediants .col-md-3',async function(){
    document.querySelector('.mealsDetails').classList.add('d-none')
    currentView = 'ingrediants';
    await getingrediantmeal(this.id)
    document.querySelector('.ingrediants').classList.add('d-none')
    document.querySelector('.ingrediantsmeals').classList.remove('d-none')
    $('#ingrediantsmeals').on('click', '.col-md-3', async function () {
        await getdetailsMeals(this.id);
        document.querySelector('.ingrediantsmeals').classList.add('d-none');
        document.querySelector('.mealsDetails').classList.remove('d-none');
    });
})
async function getsearchmeal(id){
        document.querySelector('.bucket').classList.add('d-none')
        document.querySelector('.loading').classList.remove('d-none')
            let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`);
            let mealjson = await meal.json();
            if (mealjson.meals) {
                displaysearchmeal(mealjson.meals);
            } else {
                document.getElementById('searchmeals').innerHTML = `<p>No meals found.</p>`;
            }
        document.querySelector('.bucket').classList.remove('d-none')
        document.querySelector('.loading').classList.add('d-none')
}
function displaysearchmeal(api){
    var cartona8 = ``
    for(var i = 0;i<api.length;i++){
        cartona8 +=`
                            <div class="col-md-3" id="${api[i].idMeal}">
                                <div class="image rounded-2">
                                    <img src="${api[i].strMealThumb}" class="w-100" alt="">
                                    <div class="layer rounded-2 d-flex justify-content-center align-items-center">${api[i].strMeal}</div>
                                </div>
                            </div>
        `
    }
    document.getElementById('searchmeals').innerHTML = cartona8
}
$(document).on('click','.links p.one',function(){
    document.querySelector('.mealsDetails').classList.add('d-none')
    document.querySelector('.catmeals').classList.add('d-none')
    document.querySelector('.mealcategories').classList.add('d-none')
    document.querySelector('.areasmeals').classList.add('d-none')
    document.querySelector('.ingrediants').classList.add('d-none')
    document.querySelector('.ingrediantsmeals').classList.add('d-none')
    document.querySelector('.areas').classList.add('d-none')
    document.querySelector('.contactUs').classList.add('d-none')
    $('nav').animate({'left':'-260px'},400)
    $('.links p').animate({'top':'300px'},400)
    document.querySelector('.navbarlinks').classList.remove('clicked')
    document.querySelector('.navcloseopen').classList.add('fa-align-justify')
    document.querySelector('.navcloseopen').classList.remove('fa-x')
    document.querySelector('.meals').classList.add('d-none');
    document.querySelector('.search').classList.remove('d-none');
})
$(document).on('input','.search .fullname',function(){
    let mealname = document.getElementById('mealname').value
    if(mealname != null){
        getsearchmeal(mealname)
    }
})
$(document).on('click','.search .bucket .col-md-3',async function(){
    currentView = 'search'
    await getdetailsMeals(this.id);
    document.querySelector('.search').classList.add('d-none');
    document.querySelector('.mealsDetails').classList.remove('d-none');
})
document.getElementById('letter').addEventListener('input', function() {
    let value = this.value;
    if (value.length > 1) {
        this.value = value[0];
    }
    else if(value.length == 0){
        getsearchletter(document.querySelector('.search .fullname').value[0])
    }
    getsearchletter(this.value)
});
async function getsearchletter(id){
    document.querySelector('.bucket').classList.add('d-none')
    document.querySelector('.loading').classList.remove('d-none')
        try{
            let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${id}`);
            let mealjson = await meal.json();
            if (mealjson.meals) {
                displaysearchletter(mealjson.meals);
            } else {
            document.getElementById('searchmeals').innerHTML = `<p>No meals found.</p>`;
            }
        } catch{
            document.getElementById('searchmeals').innerHTML = `<p>No meals found ,try in the first input box</p>`
        }
    document.querySelector('.bucket').classList.remove('d-none')
    document.querySelector('.loading').classList.add('d-none')
}
function displaysearchletter(api){
var cartona9 = ``
for(var i = 0;i<api.length;i++){
    cartona9 +=`
                        <div class="col-md-3" id="${api[i].idMeal}">
                            <div class="image rounded-2">
                                <img src="${api[i].strMealThumb}" class="w-100" alt="">
                                <div class="layer rounded-2 d-flex justify-content-center align-items-center">${api[i].strMeal}</div>
                            </div>
                        </div>
    `
}
document.getElementById('searchmeals').innerHTML = cartona9
}
$(document).on('click','.links p.five',function(){
    document.querySelector('.mealsDetails').classList.add('d-none')
    document.querySelector('.catmeals').classList.add('d-none')
    document.querySelector('.mealcategories').classList.add('d-none')
    document.querySelector('.areasmeals').classList.add('d-none')
    document.querySelector('.ingrediants').classList.add('d-none')
    document.querySelector('.ingrediantsmeals').classList.add('d-none')
    document.querySelector('.areas').classList.add('d-none')
    document.querySelector('.search').classList.add('d-none')
    $('nav').animate({'left':'-260px'},400)
    $('.links p').animate({'top':'300px'},400)
    document.querySelector('.navbarlinks').classList.remove('clicked')
    document.querySelector('.navcloseopen').classList.add('fa-align-justify')
    document.querySelector('.navcloseopen').classList.remove('fa-x')
    document.querySelector('.meals').classList.add('d-none');
    document.querySelector('.contactUs').classList.remove('d-none');
})
let nameregex = /^[a-zA-Z]+$/
let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let phoneregex = /^01[0-2,5]\d{8}$/
let ageregex = /^(1[01][0-9]|120|[1-9][0-9]?)$/
let passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
let first = false
let second = false
let third = false
let fourth = false
let fifth = false
let sixth = false
$(document).on('input', '.contactUs #name', function() {
    let value = this.value.trim()
    if (!nameregex.test(value)) {
        $('.contactUs .name').removeClass('d-none')
        first = false
    } else {
        $('.contactUs .name').addClass('d-none')
        first = true
    }
    validate()
})
$(document).on('input', '.contactUs #email', function() {
    let value = this.value.trim()
    if (!emailregex.test(value)) {
        $('.contactUs .email').removeClass('d-none')
        second = false
    } else {
        $('.contactUs .email').addClass('d-none')
        second = true
    }
    validate()
})
$(document).on('input', '.contactUs #phone', function() {
    let value = this.value.trim()
    if (!phoneregex.test(value)) {
        $('.contactUs .phone').removeClass('d-none')
        third = false
    } else {
        $('.contactUs .phone').addClass('d-none')
        third = true
    }
    validate()
})
$(document).on('input', '.contactUs #age', function() {
    let value = this.value.trim()
    if (!ageregex.test(value)) {
        $('.contactUs .age').removeClass('d-none')
        fourth = false
    } else {
        $('.contactUs .age').addClass('d-none')
        fourth = true
    }
    validate()
})
$(document).on('input', '.contactUs #pass', function() {
    let value = this.value
    if (!passwordregex.test(value)) {
        $('.contactUs .password').removeClass('d-none')
        fifth = false
    } else {
        $('.contactUs .password').addClass('d-none')
        fifth = true
    }
    validate()
})
$(document).on('input', '.contactUs #repass', function() {
    let value = this.value
    let passValue = $('#pass').val()
    if (value !== passValue) {
        $('.contactUs .repass').removeClass('d-none')
        sixth = false
    } else {
        $('.contactUs .repass').addClass('d-none')
        sixth = true
    }
    validate()
})
function validate() {
    if (first && second && third && fourth && fifth && sixth) {
        $('.potato button').removeClass('disabled')
    } else {
        $('.potato button').addClass('disabled')
        $('.successfullsubmit').addClass('d-none')
    }
}
$(document).on('input', 'input', function() {
    validate()
})
$(document).on('click','.potato button',function(){
    $('.successfullsubmit').removeClass('d-none')
})