window.onload = () => {
  const cart = JSON.parse(localStorage.getItem('orders') || '[]');
  const list = document.getElementById('orderList');
  let total = 0;

  cart.forEach((item, index) => {
    const entry = document.createElement('div');
    entry.innerHTML = `
      <strong>${item.name}</strong><br>
      ₹${item.price} <br>
      <button class="hero-button" onclick="removeItem(${index})">Remove</button>
    `;
    list.appendChild(entry);
    total += item.price;
  });

  document.getElementById('totalAmount').textContent = total;
};

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('orders'));
  cart.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(cart));
  window.location.reload();
}

function placeOrder() {
  alert("Order placed successfully!");
  localStorage.removeItem('orders');
  window.location.reload();
}
