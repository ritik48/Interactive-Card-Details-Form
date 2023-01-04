const cvvDisplay = document.querySelector('.pin');
const cardNumberDisplay = document.querySelector('.number');
const nameDisplay = document.querySelector('.name');
const expMonth = document.querySelector('#exp-m');
const expYear = document.querySelector('#exp-y');

const nameInput = document.querySelector('input#name');
const numberInput = document.querySelector('#number')

const monthInput = document.querySelector('.month');
const yearInput = document.querySelector('.year')
const cvcInput = document.querySelector('input.cvc')
const confirm_button = document.querySelector('.confirm')

let nameError = cardError = monthError = yearError = cvcError = false;
let cardNumber_entered = '';

// adding hidden p tag below all input , made visible when input error occurs

document.querySelectorAll('.input-container').forEach(element => {
    if(element.className.includes('year')){
        return;
    }
    const err_element = document.createElement('p');
    err_element.classList.add('hide');
    err_element.append("Can't be blank.")

    if(element.className.includes('month'))
    {
        element.parentElement.parentElement.appendChild(err_element)
        return;
    }
    console.log(element)

    element.appendChild(err_element);
    
});

document.querySelector('.con-popup button').addEventListener('click', ()=>{
    document.querySelector('.con-popup').classList.remove('active');
    document.querySelector('form').style.opacity='1';

    window.location.reload();
})

confirm_button.addEventListener('click', (e) => {
    e.preventDefault();


    let nameStatus = validName();
    if(nameStatus!='valid')
    {
        nameError=true;
        showHideError(nameInput,'show','hide');  
    }
    if(monthInput.value=='')
    {
        monthError=true;
        showHideError(monthInput,'show','hide'); 
    }
    if(yearInput.value=='')
    {
        console.log("year")
        yearError=true;
        showHideError(yearInput,'show','hide'); 
    }
    if(cvcInput.value=='')
    {
        cvcError=true;
        showHideError(cvcInput,'show','hide'); 
    }
    if(numberInput.value=='')
    {
        cardError=true;
        showHideError(numberInput,'show','hide');
    }

    if(!cardError && !monthError && !yearError && !cvcError && !nameError)
    {
        showConfirmationPopup();
    }
})

nameInput.addEventListener("input", (e) => {

    if(nameError){
        nameError=false;
        showHideError(nameInput,'hide','show');
    }

    let value = nameInput.value;
    if(value=='')
    {
        value='Jane Appleseed';
    }
    nameDisplay.innerText = value;
})

numberInput.addEventListener("input", (e) => {
    if(cardError){
        cardError=false;
        showHideError(numberInput,'hide','show');
    }

    if (e.data) {
        if (number_validation(e.data, 20, numberInput) == false) {
            return;
        }
        if (cardNumber_entered.length == 4 ||
            cardNumber_entered.length == 8 ||
            cardNumber_entered.length == 12) {
            numberInput.value = numberInput.value.substring(0, numberInput.value.length - 1) + ' ' + e.data;

        }

        cardNumber_entered += e.data;
    }
    else {
        if (cardNumber_entered.length == 13 || cardNumber_entered.length == 9 || cardNumber_entered.length == 5) {
            numberInput.value = numberInput.value.substring(0, numberInput.value.length - 1)
        }
        cardNumber_entered = cardNumber_entered.substring(0, cardNumber_entered.length - 1);
        console.log(`${cardNumber_entered} ---- ${cardNumber_entered.length}`);

        if (cardNumber_entered.length == 0) {
            cardNumberDisplay.innerText = '0000 0000 0000 0000';
            return;
        }
    }

    cardNumberDisplay.innerText = numberInput.value;


})

monthInput.addEventListener("input", (e) => {
    if(monthError){
        monthError=false;
        showHideError(monthInput,'hide','show');
    }

    if (e.data) {
        if (number_validation(e.data, 3, monthInput) == false) {
            return;
        }
    }
    expMonth.innerText = monthInput.value;
})

yearInput.addEventListener("input", (e) => {
    if(yearError){
        yearError=false;
        showHideError(yearInput,'hide','show');
    }

    if (e.data) {
        if (number_validation(e.data, 3, yearInput) == false) {
            return;
        }
    }
    expYear.innerText = yearInput.value;
})

cvcInput.addEventListener("input", (e) => {
    if(cvcError){
        cvcError=false;
        showHideError(cvcInput,'hide','show');
    }

    if (e.data) {
        if (number_validation(e.data, 4, cvcInput) == false) {
            return;
        }
    }
    cvvDisplay.innerText = cvcInput.value;
})

function validName() {
    let value = nameInput.value;
    if (!value) {
        return "empty";
    }

    for (let i in value) {
        let ascii = value.charCodeAt(i);
        if (!(ascii >= 65 && ascii <= 95) && !(ascii >= 97 && ascii <= 122) && !(ascii==32))
            return "invalid";
    }
    return "valid";
}

function number_validation(e, length, input) {
    let ascii = e.charCodeAt(0);
    if (ascii < 48 || ascii > 57 || input.value.length == length) {
        input.value = input.value.substring(0, input.value.length - 1);
        return false;
    }
    return true;
}


function showHideError(e,show,hide) {
    let parent=e.parentElement.parentElement;
    if(e.className.includes('month') || e.className.includes('year'))
    {
        console.log('yesss')
        parent=e.parentElement.parentElement.parentElement.parentElement;
        
    }
    
    let err_element=parent.querySelector('p');
    err_element.classList.remove(hide);
    err_element.classList.add(show);
}

function showConfirmationPopup() {
    document.querySelector('form').style.opacity='0';
    document.querySelector('.con-popup').classList.add('active');
}


