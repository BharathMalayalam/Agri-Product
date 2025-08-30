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
      return;
    }

    alert(result.message);

    if ( result.role === 'seller') {
      window.location.href = 'farmer-home.html';
    } else if (result.role === 'customer') {
      window.location.href = 'customer/customer-home.html';
    }

  } catch (err) {
    console.error('Login error:', err);
    alert('An error occurred during login. Please try again.');
  }
});
