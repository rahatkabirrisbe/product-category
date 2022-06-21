const formEl = document.querySelector('form')
const inputNameEl = document.querySelector('.product-name')
const inputPriceEl = document.querySelector('.product-price')
const  ulElement = document.querySelector('.list-group')


// Data Layer 
let data = [
    // {
    //     id: 0,
    //     name: productName,
    //     price: productPrice,
    // }
];

// event Listener
formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputNameValue = inputNameEl.value;
    const inputPriceValue = inputPriceEl.value;
    const id = data.length + 1;

    // validation;
    const isValid  = validationInput(inputNameValue, inputPriceValue)
    // show input into UI;
    if(isValid){
    // data tracking to global
    assignData(id, inputNameValue, inputPriceValue)
    // show inputToUi
    showInputToUi(id, inputNameValue, inputPriceValue);
    } else{
    alert('your input is not valid')
    }
    resetInput(inputNameEl, inputPriceEl)

})

ulElement.addEventListener('click', (e) => {
    // console.log(e.target.classList.contains('fa-trash'));
    if(e.target.classList.contains('fa-trash')){
        const id = getItemByID(e.target)
        removeDataFromUI(id)
        removeDataFromTracking(id)
    }
})


// logical function
function removeDataFromUI(id){
    document.querySelector(`#${id}`).remove()
}
function removeDataFromTracking(id){
    const idNum = Number(id.split('-')[1])
    data = data.filter(product => product.id !== idNum)

}

function getItemByID(elm){
    const listItem = elm.parentElement;
    return listItem.getAttribute('id');
}


function assignData(id, productName, productPrice){
    const productData = {
        id,
        productName,
        productPrice
    }
    data.push(productData)
}

function resetInput(name, price){
    name.value = '';
    price.value = '';
}

function validationInput(name, price){
    if(name.length > 2 && parseFloat(price) > 0){
        return true;
    } else {
        return false;
    }
}

function showInputToUi(id, name, price){
    const liHTMLElm = `<li class="list-group-item collection-item" id="item-${id}">
    <strong>${name}</strong>- <span class="price">$${price}</span>
    <i class="fa fa-trash float-right"></i>
    </li>`
    ulElement.insertAdjacentHTML('afterbegin', liHTMLElm);
}