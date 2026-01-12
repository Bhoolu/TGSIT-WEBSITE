// Show welcome message
// alert("Welcome to TGIST");

// --- Learn More Buttons ---
document.querySelectorAll(".learn-button").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "/about.html";
  });
});

// --- Get Started Button ---
// const ctaButton = document.querySelector(".cta-button");
// if (ctaButton) {
//   ctaButton.addEventListener("click", () => {
//     window.location.href = "/get-started.html";
//   });
// }

// --- Navigation Links ---
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default "#" behavior

    const text = link.textContent.trim().toLowerCase();

    switch (text) {
      case "index":
        window.location.href = "/index.html"; // main homepage
        break;
      case "about us":
        window.location.href = "/about.html"; // create about.html
        break;
      case "overview":
        window.location.href = "/overview.html"; // create overview.html
        break;
      case "clients & partners":
        window.location.href = "/client.html"; // create clients.html
        break;
      case "contact us":
        window.location.href = "/contact.html"; // create contact.html
        break;
      // case "blog":
      //   window.location.href = "/blog.html"; // create blog.html
      //   break;
      default:
        console.log("No page mapped for:", text);
    }
  });
});

// --- Learn More Buttons ---
document.querySelectorAll(".learn-button").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "/overview.html"; // redirect to overview page
  });
});

// --- Get Started Button ---
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    window.location.href = "/get-started.html"; // redirect to Get Started page
  });
}

tgist.js;
