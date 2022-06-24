const formEl = document.querySelector('form')
const inputNameEl = document.querySelector('.product-name')
const inputPriceEl = document.querySelector('.product-price')
const  ulElement = document.querySelector('.list-group')
const searchElm = document.querySelector('#filter')
const submitBtnElm = document.querySelector('.add-product')

// Data Layer 
let data = [];
let updateId;

// event Listener
formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputNameValue = inputNameEl.value;
    const inputPriceValue = inputPriceEl.value;
    const id = data.length + 1;
    // const createId = idCheck(data,id)
    // console.log(createId);

    // validation;
    const isValid  = validationInput(inputNameValue, inputPriceValue)
    // show input into UI;
    if(isValid){
    // data tracking to global
    const products = createData(id, inputNameValue, inputPriceValue)
    data.push(products)
    // data tracking to localStorage
    addDataToLocalStorage(id, inputNameValue, inputPriceValue)
    // show inputToUi
    showInputToUi(id, inputNameValue, inputPriceValue);
    } else{
    alert('your input is not valid')
    }
    resetInput(inputNameEl, inputPriceEl)
})

ulElement.addEventListener('click', (e) => {
    // console.log(e.target.classList.contains('fa-trash'));
    const id = getItemByID(e.target)
    if(e.target.classList.contains('fa-trash')){
        removeDataFromUI(id)
        removeDataFromTracking(data, id)
        removeDataFromLocalStorage(id);
    } 

    if(e.target.classList.contains('fa-edit')){
        // console.log('Hello');
        // select list by id;
        const idNum = Number(id.split('-')[1]);
        updateId = idNum;
        // console.log(idNum);
        // find the product;
        const findProduct = data.find(product => product.id === idNum)
        console.log(findProduct);
        // data in input area populate
        populateUIEditState(findProduct)
        // update btn
        if(!document.querySelector('.update-product')){
            showUpdateBtn()
        }
        // data modify 
        // data store in memory
        // update & store in localStorage
    }
})

searchElm.addEventListener('keyup', (e)=>{
    // console.log(e.target.value);
    const showData = filteredData(e.target.value);
    // console.log(showData);
    showFilterItemToUI(showData)

})

document.addEventListener('DOMContentLoaded', showUIFromLocalStorage)

formEl.addEventListener('click', (e)=>{
    if(e.target.classList.contains('update-product')){
        // console.log('ddd');
        const name = inputNameEl.value;
        const price = inputPriceEl.value;
        // console.log(name,price)
        const isError = validationInput(name, price);
        if(!isError){
            alert('your edit input not valid')
            return
        }else{
            const editedData = data.map(product => {
                if(product.id === updateId){
                    return {
                        id: updateId,
                        productName: name,
                        productPrice: price
                    }
                }
                return product;
            })
            submitBtnElm.style.display = 'block'
            // showInputToUi(editedData.id,editedData.productName,editedData.productPrice)
            showFilterItemToUI(editedData)
            resetInput(inputNameEl, inputPriceEl);
            document.querySelector('.update-product').remove();
            updateProductToLocalStorage(editedData)
        }
    }
})


// logical function
function updateProductToLocalStorage(editedData){
    if(localStorage.getItem('productList')){
        localStorage.setItem('productList', JSON.stringify(editedData))
    }
}
function showUpdateBtn(){
    const updateBtn = ` <button type="button" class="btn mt-3 btn-block btn-secondary update-product">Update</button>`
    submitBtnElm.style.display = 'none'
    formEl.insertAdjacentHTML('beforeend', updateBtn)
}

function populateUIEditState(product){
    inputNameEl.value = product.productName;
    inputPriceEl.value = product.productPrice;
    // product.productName = inputNameEl.value;
    // product.productPrice = inputPriceEl.value;
}

function removeDataFromLocalStorage(id){
    // if(localStorage.getItem('productList')){
    const idNum = Number(id.split('-')[1])
    const data = JSON.parse(localStorage.getItem('productList'))
    const newData = updateAfterRemove(data, idNum)
    localStorage.setItem('productList', JSON.stringify(newData))
// }
}

function showUIFromLocalStorage(){
    // const data = JSON.parse(localStorage.getItem('productList'))

    // overwriting temp memory data by global scope variable;
    const localData = JSON.parse(localStorage.getItem('productList'))
    if(localStorage.getItem('productList')){
        data = localData
        showFilterItemToUI(localData)
    }
}

function addDataToLocalStorage(id, productName, productPrice){
    const product = createData(id, productName, productPrice)
    if(localStorage.getItem('productList')){
        const products = JSON.parse(localStorage.getItem('productList'))
        products.push(product)
    localStorage.setItem('productList', JSON.stringify(products))
    }else{
        const products = [];
        products.push(product)
        localStorage.setItem('productList', JSON.stringify(products))
    }

}

function showFilterItemToUI(data){
    ulElement.innerHTML = '';
    data.forEach(product => {
        
        const liHTMLElm = `<li class="list-group-item collection-item" id="item-${product.id}">
        <strong>${product.productName}</strong>- <span class="price">$${product.productPrice}</span>
        <i class="fa fa-trash float-right"></i>
        <i class="fas fa-edit float-right" style="margin-right:13px"></i>
        </li>`
        ulElement.insertAdjacentHTML('afterbegin', liHTMLElm)

    })
}

function filteredData(value){
    return data.filter(product => product.productName.includes(value) || product.productPrice.includes(value))
}

function removeDataFromUI(id){
    document.querySelector(`#${id}`).remove()
}

function updateAfterRemove(data, id){
    return data.filter(product => product.id !== id)
}

function removeDataFromTracking(data, id){
    const idNum = Number(id.split('-')[1])
    data = updateAfterRemove(data, idNum)
    
}

function getItemByID(elm){
    const listItem = elm.parentElement;
    return listItem.getAttribute('id');
}

function idCheck(data, id){
    if(data[length - 1].id === id){
        data[length - 1].id++
    } else {
        id
    }
}

function createData(id, productName, productPrice){
    const productData = {
        id,
        productName,
        productPrice
    }
    // data.push(productData)
    return productData;
}

function resetInput(name, price){
    name.value = '';
    price.value = '';
}

function validationInput(name, price){
    if(isNaN(parseFloat(name)) &&  name.length >= 2 && Number(price) >= 0){
        return true;
    } else {
        return false;
    }
}

function showInputToUi(id, name, price){
    const liHTMLElm = `<li class="list-group-item collection-item" id="item-${id}">
    <strong>${name}</strong>- <span class="price">$${price}</span>
    <i class="fa fa-trash float-right"></i>
    <i class="fas fa-edit float-right" style="margin-right:13px"></i>
    </li>`
    ulElement.insertAdjacentHTML('afterbegin', liHTMLElm);
}