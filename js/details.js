import* as sharedFunctions
from './sharedFunctions.js';

function domContentLoaded(){
  document.addEventListener('DOMContentLoaded', function () {
    const listCategories = JSON.parse(localStorage.getItem('listCategories')) || [];
    if(listCategories.length==0){
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          sharedFunctions.createObjCat(data);
          sharedFunctions.createMenu();
          sharedFunctions.cartCounter();
        })
        .catch((error) => {
          console.error("Error en la comunicación con la API:", error);
        });
    }
    else{
      sharedFunctions.createMenu();
      sharedFunctions.cartCounter();
    }
  });
} 
function apiFetchDetails(){
    const queryString = location.search;
    const objQueryString = new URLSearchParams(queryString);
    const idPr = objQueryString.get('id');
    console.log(idPr);
    fetch(`https://fakestoreapi.com/products/${idPr}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
            let fechaPedido = new Date().toISOString();
            const detailsContent = document.querySelector('.detailsContent');
            const divSolapa = document.createElement('div');
            divSolapa.classList.add('solapaDetails');
            const h2Product = document.createElement('h2');
            const aH2Product = document.createElement('a');
            aH2Product.setAttribute('href', `index.html#${sharedFunctions.firstWord(data.category)}`);
            aH2Product.innerText = `${sharedFunctions.firstWord(data.category).toUpperCase()}`;
            detailsContent.appendChild(divSolapa);
            divSolapa.appendChild(h2Product);
            h2Product.appendChild(aH2Product);
            const divContent = document.createElement('div');
            divContent.classList.add('divDetails');
            detailsContent.appendChild(divContent);
            const imgProd = document.createElement('img');
            imgProd.setAttribute('src', `${data.image}`);
            imgProd.setAttribute('alt', `${data.title}`);
            divContent.appendChild(imgProd);
            const detailText = document.createElement('span');
            detailText.classList.add('detailText');
            divContent.appendChild(detailText);
            const h3Content = document.createElement('h3');
            h3Content.classList.add('h3Content');
            h3Content.innerText = `${data.title}`;
            detailText.appendChild(h3Content);
            const descript = document.createElement('p');
            descript.classList.add('descript');
            descript.innerText = `${sharedFunctions.capitalizeWord(data.description)}`;
            detailText.appendChild(descript);
            const rateCountContent = document.createElement('span');
            rateCountContent.classList.add('rateCountContentDetails');
            detailText.appendChild(rateCountContent);
            const spanRate = document.createElement('p');
            const spanCount = document.createElement('p');
            spanRate.innerText = `Rate: ${data.rating.rate}`;
            spanCount.innerText = `Count: ${data.rating.count}`;
            rateCountContent.appendChild(spanRate);
            rateCountContent.appendChild(spanCount);
            const buyContent = document.createElement('form');
            buyContent.setAttribute('id', `${data.id}`);
            buyContent.classList.add('buyContent');
            if(sharedFunctions.firstWord(data.category) == 'men'){
                buyContent.setAttribute('name', '#7a8fe1');
            }
            else if(sharedFunctions.firstWord(data.category) == 'electronics'){
                buyContent.setAttribute('name', '#713333');
            }
            else if(sharedFunctions.firstWord(data.category) == 'jewelery'){
                buyContent.setAttribute('name', '#e4664a');
            }
            else{
                buyContent.setAttribute('name', '#f63488');
            };
            buyContent.setAttribute('action', `shoppingCart.html`);
            buyContent.setAttribute('method', 'get');
            buyContent.style.marginTop = '2.5rem';
            buyContent.style.border = '1px solid grey';
            buyContent.style.borderRadius = '5px';
            buyContent.style.width = '184px';
            detailText.appendChild(buyContent);
            const pPrice = document.createElement('p');
            pPrice.classList.add('pPrice');
            pPrice.innerText = `€${data.price.toFixed(2)}`;
            buyContent.appendChild(pPrice);
            const prodQty = document.createElement('input');
            const priceValue = document.createElement('input');
            priceValue.classList.add('idProduct');
            priceValue.setAttribute('type', 'hidden');
            priceValue.setAttribute('name', 'idProd');
            priceValue.setAttribute('id', `${data.id}`);
            priceValue.setAttribute('value', `${data.id}`);
            prodQty.classList.add('prodQty');
            prodQty.setAttribute('type', 'number');
            prodQty.setAttribute('min', '1');
            prodQty.setAttribute('max', '999');
            prodQty.setAttribute('name', 'prodQty');
            prodQty.setAttribute('value', '');
            prodQty.setAttribute('placeholder', 'Qty');
            buyContent.appendChild(priceValue);
            buyContent.appendChild(prodQty);
            const buyButton = document.createElement('button');
            buyButton.classList.add('buyButton');
            buyButton.setAttribute('type', 'submit');
            buyButton.innerText = 'Add to Cart';
            buyContent.appendChild(buyButton);
        })
        .catch((error) => {
        console.error("Error en la comunicación con la API:", error);
        });
}


domContentLoaded();
apiFetchDetails();
sharedFunctions.searchTitle();
sharedFunctions.darkLight();
sharedFunctions.smoothScrollPage();