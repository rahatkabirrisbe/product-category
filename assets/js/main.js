const formEl = document.querySelector('form')
const inputNameEl = document.querySelector('.product-name')
const inputPriceEl = document.querySelector('.product-price')
const  ulElement = document.querySelector('.list-group')

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputNameValue = inputNameEl.value;
    const inputPriceValue = inputPriceEl.value;
    
    // validation;
    const isValid  = validationInput(inputNameValue, inputPriceValue)
    // show input into UI;
    if(isValid){
    showInputToUi(inputNameValue, inputPriceValue);
    } else{
    alert('your input is not valid')
    }
    resetInput(inputNameEl, inputPriceEl)


})

function resetInput(name, price){
    name.value = '';
    price.value = '';
}

function validationInput(name, price){
    if(name.length > 0 && parseFloat(price) > 0){
        return true;
    } else {
        return false;
    }
}

function showInputToUi(name, price){
    const liHTMLElm = `<li class="list-group-item collection-item">
    <strong>${name}</strong>- <span class="price">$${price}</span>
    <i class="fa fa-trash float-right"></i>
    </li>`
    ulElement.insertAdjacentHTML('afterbegin', liHTMLElm);
}