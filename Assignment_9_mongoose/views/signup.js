// signup.js

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            // Display success message
            errorMessage.textContent = data.message;
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
});
