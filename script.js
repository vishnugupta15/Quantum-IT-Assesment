let products = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('product.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts(products);
    })
    .catch(err => console.error('Error fetching products:', err));

  // Event listeners for search and filter
  document.getElementById('searchInput').addEventListener('input', filterProducts);
  document.getElementById('priceFilter').addEventListener('change', filterProducts);
});

function filterProducts() {
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const priceFilter = document.getElementById('priceFilter').value;

  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);

    let matchesPrice = true;
    if (priceFilter === 'under1000') matchesPrice = product.price < 1000;
    else if (priceFilter === '1000to2000') matchesPrice = product.price >= 1000 && product.price <= 2000;
    else if (priceFilter === 'above2000') matchesPrice = product.price > 2000;

    return matchesSearch && matchesPrice;
  });

  renderProducts(filtered);
}

function renderProducts(productList) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  if (productList.length === 0) {
    grid.innerHTML = '<p style="text-align:center;">No products found.</p>';
    return;
  }

  productList.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹${product.price}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}
