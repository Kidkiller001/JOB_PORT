document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const result = await response.json();
            
            // Store the JWT token securely if the server sends one
            if (result.token) {
                
                // Example: Store in localStorage or secure cookie (depending on your security strategy)
                localStorage.setItem('authToken', result.token);
            }

            alert('Login successful!');
            const UserRole=result.user.role
            console.log(UserRole)
            if ( UserRole== "client"){
                window.location.href = 'dashboard.html';
            }
            else if(UserRole == "employer"){
                window.location.href = 'employerdash.html'
            }
             // Redirect to the dashboard or another secure page
        } else {
            const errorResult = await response.json();
            alert('Login failed: ' + errorResult.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});
