document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
  
    if (email === '' || password === '') {
      alert('Please fill in both fields.');
      return;
    }
  
    // Simulate successful login
    alert('Login successful!');
    window.location.href = 'index.html';  // ✅ Redirect to index.html
  });
  