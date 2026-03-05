// ------------------------
// Utility Functions
// ------------------------

// Get all users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// ------------------------
// SIGN UP FUNCTION
// ------------------------
function signup() {
    const username = document.getElementById("su-username").value.trim();
    const password = document.getElementById("su-password").value.trim();

    // Check empty fields
    if (!username || !password) {
        alert("Please fill in both username and password.");
        return;
    }

    const users = getUsers();

    // Check if username already exists
    if (users.find(u => u.username === username)) {
        alert(`The username "${username}" is already taken.`);
        return;
    }

    // Add new user
    users.push({ username, password });
    saveUsers(users);

    // Clear inputs
    document.getElementById("su-username").value = "";
    document.getElementById("su-password").value = "";

    // Success message
    alert(`Account for "${username}" created successfully!`);

    // Redirect to login
    window.location.href = "login.html";
}

// ------------------------
// LOGIN FUNCTION
// ------------------------
function login() {
    const username = document.getElementById("li-username").value.trim();
    const password = document.getElementById("li-password").value.trim();

    // Check empty fields
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const users = getUsers();

    // Find user
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Save login state
        localStorage.setItem("loggedInUser", username);

        // Success message
        alert(`Welcome back, ${username}!`);

        // Redirect to profile page
        window.location.href = "profile.html";
    } else {
        alert("Incorrect username or password.");
    }
}

// ------------------------
// CHECK LOGIN (for profile page protection)
// ------------------------
function checkLogin() {
    const user = localStorage.getItem("loggedInUser");

    if (!user) {
        // User not logged in, redirect to login page
        window.location.href = "login.html";
    } else {
        // Display username on profile page
        const usernameEl = document.getElementById("username");
        if (usernameEl) {
            usernameEl.textContent = user;
        }
    }
}

// ------------------------
// LOGOUT FUNCTION
// ------------------------
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out successfully.");
    window.location.href = "login.html";
}
