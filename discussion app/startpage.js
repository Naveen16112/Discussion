const kaam = "baas aise hi bhagwan ki trh programmer ne muje bnaya";

// Get existing users from localStorage or initialize empty array
let Users = JSON.parse(localStorage.getItem("Users")) || [];

// ---------------- SIGNUP FUNCTION ----------------
function signUp() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Invalid input: username and password required.");
        return;
    }

    // Check for duplicate user
    const exists = Users.find(user => user.username === username);
    if (exists) {
        alert("User already registered");
        return;
    }

    // Add new user to array
    const newUser = { username, password };
    Users.push(newUser); // ✅ Fix: add to array before storing

    // Save updated user list to localStorage
    localStorage.setItem("Users", JSON.stringify(Users));

    alert("User registered successfully!");
}


// ---------------- LOGIN FUNCTION ----------------
function logIn() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    const Users = JSON.parse(localStorage.getItem("Users")) || [];

    console.log("All users:", Users);
    console.log("Entered:", username, password);

    const user = Users.find(user =>
        user.username === username && user.password === password
    );

    if (!user) {
        alert("Invalid credentials");
        return;
    }

    // Save session
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect based on user
    if (user.username === "NVI16112@GMAIL.COM") {
        window.location.href = "admin.htm";
    } else {
        window.location.href = "admin.htm"; // You can keep this or redirect to admin.htm if needed
    }
}
