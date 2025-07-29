window.onload = async () => {
  const container = document.getElementById('productContainer');

  try {
    const res = await fetch('http://localhost:4000/api/products');
    const products = await res.json();

    if (!products.length) {
      container.innerHTML = '<p>No products available.</p>';
      return;
    }

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-img" />
        <h3>${product.name}</h3>
        <p>Quantity: ${product.quantity} Kg</p>
        <p>Price: ₹${product.price}</p>
        <button class="hero-button" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p>Error loading products.</p>`;
    console.error(err);
  }
};

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('orders')) || [];
  cart.push(product);
  localStorage.setItem('orders', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
