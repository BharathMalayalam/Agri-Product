const { route } = require("../../backend/routes/auth");

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch('http://localhost:4000/api/products', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    alert(result.message || "Product added!");
    form.reset();
  } catch (err) {
    console.error(err);
    alert('Failed to upload product');
  }
});

