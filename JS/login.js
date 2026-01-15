const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  errorMessage.style.display = "none";
  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      window.location.href = "/admin/dashboard.html";
    } else {
      errorMessage.textContent = data.message || "Login failed";
      errorMessage.style.display = "block";
      loginBtn.disabled = false;
      loginBtn.textContent = "Login";
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.textContent = "Connection error. Please try again.";
    errorMessage.style.display = "block";
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
});
