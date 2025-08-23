async function loadProducts() {
  const res = await fetch('products.json');
  return await res.json();
}

async function showFeatured() {
  const products = await loadProducts();
  const container = document.getElementById('featured-products');
  if (container) {
    products.slice(0, 5).forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `<img src="assets/${p.image}" alt="${p.name}"><h3>${p.name}</h3><p>QAR ${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>`;
      container.appendChild(div);
    });
  }
}

async function showCategory() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const products = await loadProducts();
  const container = document.getElementById('category-products');
  if (container) {
    products.filter(p => p.category === cat).forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `<a href="product.html?id=${p.id}"><img src="assets/${p.image}" alt="${p.name}"><h3>${p.name}</h3></a><p>QAR ${p.price}</p>`;
      container.appendChild(div);
    });
  }
}

async function showProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const products = await loadProducts();
  const product = products.find(p => p.id === id);
  const container = document.getElementById('product-details');
  if (container && product) {
    container.innerHTML = `<img src="assets/${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>Price: QAR ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>`;
  }
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Item added to cart!');
}

async function showCart() {
  const products = await loadProducts();
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  if (container) {
    container.innerHTML = '';
    let total = 0;
    cart.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        total += product.price;
        const div = document.createElement('div');
        div.innerHTML = `<h3>${product.name}</h3><p>QAR ${product.price}</p>`;
        container.appendChild(div);
      }
    });
    container.innerHTML += `<h2>Total: QAR ${total}</h2>`;
  }
}

function checkout() {
  alert('Checkout system will be integrated soon!');
}

showFeatured();
showCategory();
showProduct();
showCart();
