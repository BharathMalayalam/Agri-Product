document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target).entries());

  try {
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || 'Login failed');
      return; // ❗ Stop execution if login failed
    }

    alert(result.message);

    // ✅ Redirect ONLY if login was successful
    if (result.role === 'seller') {
      window.location.href = 'seller.html';
    } else {
      window.location.href = 'customer/product.html';
    }

  } catch (err) {
    console.error('Login error:', err);
    alert('An error occurred during login. Please try again.');
  }
});
