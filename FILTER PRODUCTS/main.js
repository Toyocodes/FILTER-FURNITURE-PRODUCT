//import products and assign to a variable
let filteredProducts = [...products]
const productsContainer = document.querySelector(".products-container")

//display products
const displayProducts = ()=> {

    if (filteredProducts.length < 1) {
        productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
        return;
      }//n product when u search

    productsContainer.innerHTML =  filteredProducts
    .map(({id, title,image,price})=>{
    return `
    <div class="product" data-id ="${id}">
    <img
      src="${image}"
      class="product-img img"/>
    <footer>
      <h5 class="product-name">${title}</h5>
      <span class="product-price">${price}</span>
    </footer>
  </div>`
    }).join("")
};

displayProducts()


//filter text
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

form.addEventListener("keyup",()=>{
    const inputValue = searchInput.value;
    filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(inputValue);
      });
      displayProducts();
});

//filter button

const companiesDOM = document.querySelector('.companies');

const displayButtons = () => {
  const buttons = [
    'all',
    ...new Set(products.map((product) => product.company)),
  ];
  // console.log(buttons);
  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `<button class='company-btn' data-id="${company}">${company}</button>`;
    })
    .join('');
};

displayButtons();

//target the buttons
companiesDOM.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('company-btn')) {
      if (el.dataset.id === 'all') {
        filteredProducts = [...products];
      } else {
        filteredProducts = products.filter((product) => {
          return product.company === el.dataset.id;
        });
      }
      searchInput.value = '';
      displayProducts();
    }
  });