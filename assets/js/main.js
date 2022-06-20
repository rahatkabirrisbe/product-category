const formEl = document.querySelector('form')
const inputNameEl = document.querySelector('.product-name')
const inputPriceEl = document.querySelector('.product-price')
const  ulElement = document.querySelector('.list-group')

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputNameValue = inputNameEl.value;
    const inputPriceValue = inputPriceEl.value;
    
    // show input into UI;
    showInputToUi(inputNameValue, inputPriceValue);

})

function showInputToUi(name, price){
    const liHTMLElm = `<li class="list-group-item collection-item">
    <strong>${name}</strong>- <span class="price">$${price}</span>
    <i class="fa fa-trash float-right"></i>
    </li>`
    ulElement.insertAdjacentHTML('afterbegin', liHTMLElm);
}