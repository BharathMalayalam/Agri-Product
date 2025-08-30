document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const res = await fetch('http://localhost:4000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(result.message);
  if (result.role === 'seller') window.location.href = 'farmer-home.html';
  else window.location.href = 'customer/product.html';
});