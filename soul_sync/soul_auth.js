document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            
            if (email === "test@example.com" && password === "123456") {
                alert("Login successful!");
                window.location.href = "soul_index.html";
            } else {
                alert("Invalid credentials!");
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Signup successful! Redirecting to login...");
            window.location.href = "soul_login.html";
        });
    }
});

function redirectTo(page) {
    window.location.href = page;
}
