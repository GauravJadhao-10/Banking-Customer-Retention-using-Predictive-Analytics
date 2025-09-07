// Initialize demo user
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([
    { email: "admin@bank.com", password: "Bank@1234" }
  ]));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Handle Login
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    window.location.href = "home.html";
  } else {
    alert("Invalid credentials! Try again or create account.");
  }
}

// Signup
function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  let users = getUsers();
  if (users.find(u => u.email === email)) {
    alert("Account already exists.");
    return;
  }
  users.push({ email, password });
  saveUsers(users);

  alert("Account created successfully!");
  closeModal("signupModal");
}

// Forgot Password
function handleForgot(event) {
  event.preventDefault();
  const email = document.getElementById("forgotEmail").value.trim();
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (user) {
    alert("Your password is: " + user.password);
    closeModal("forgotModal");
  } else {
    alert("Email not found.");
  }
}

// Modals
function showSignup() { document.getElementById("signupModal").classList.remove("hidden"); }
function showForgot() { document.getElementById("forgotModal").classList.remove("hidden"); }
function closeModal(id) { document.getElementById(id).classList.add("hidden"); }

// Auth check
function requireAuth() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

// Logout
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector("[data-logout]");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.href = "index.html";
    });
  }
});

function getUserEmail() {
  return localStorage.getItem("userEmail") || "";
}

// Download High Risk Data
function downloadData() {
  const csv = "ID,Name,Risk\n101,John Doe,92%\n102,Mary Smith,88%\n103,Ali Khan,85%";
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "high_risk_customers.csv";
  link.click();
}
