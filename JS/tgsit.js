// // Show welcome message
// // alert("Welcome to TGIST");

// // --- Learn More Buttons ---
// document.querySelectorAll(".learn-button").forEach((button) => {
//   button.addEventListener("click", () => {
//     window.location.href = "about.html";
//   });
// });

// // --- Get Started Button ---
// // const ctaButton = document.querySelector(".cta-button");
// // if (ctaButton) {
// //   ctaButton.addEventListener("click", () => {
// //     window.location.href = "/get-started.html";
// //   });
// // }

// // --- Navigation Links ---
// document.querySelectorAll(".nav-link").forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault(); // prevent default "#" behavior

//     const text = link.textContent.trim().toLowerCase();

//     switch (text) {
//       case "index":
//         window.location.href = "index.html"; // main homepage
//         break;
//       case "about us":
//         window.location.href = "about.html"; // create about.html
//         break;
//       case "overview":
//         window.location.href = "overview.html"; // create overview.html
//         break;
//       case "clients & partners":
//         window.location.href = "client.html"; // create clients.html
//         break;
//       case "contact us":
//         window.location.href = "contact.html"; // create contact.html
//         break;
//       // case "blog":
//       //   window.location.href = "/blog.html"; // create blog.html
//       //   break;
//       default:
//         console.log("No page mapped for:", text);
//     }
//   });
// });

// // --- Learn More Buttons ---
// document.querySelectorAll(".learn-button").forEach((button) => {
//   button.addEventListener("click", () => {
//     window.location.href = "overview.html"; // redirect to overview page
//   });
// });

// // --- Get Started Button ---
// const ctaButton = document.querySelector(".cta-button");
// if (ctaButton) {
//   ctaButton.addEventListener("click", () => {
//     window.location.href = "get-started.html"; // redirect to Get Started page
//   });
// }

// tgist.js;
// public/JS/tgist.js

console.log("TGIST Website Loaded Successfully! 🚀");

// ============ SMOOTH NAVIGATION ============
document.addEventListener("DOMContentLoaded", () => {
  // Navigation Links Handler
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Only prevent default for # links
      if (href === "#") {
        e.preventDefault();
        const text = link.textContent.trim().toLowerCase();

        // Map navigation
        const pages = {
          home: "/index.html",
          "about us": "/about.html",
          overview: "/overview.html",
          "clients & partners": "/client.html",
          "contact us": "/contact.html",
        };

        if (pages[text]) {
          window.location.href = pages[text];
        }
      }
    });
  });

  // ============ LEARN MORE BUTTONS ============
  // document
  //   .querySelectorAll(".learn-button, .learn-button2")
  //   .forEach((button) => {
  //     button.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       window.location.href = "/about.html";
  //     });
  //   });
  // Learn More on About Us
  document.querySelectorAll(".learn-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "about.html";
    });
  });

  // Learn More on Overview
  document.querySelectorAll(".learn-button2").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "overview.html";
    });
  });

  // ============ CTA BUTTONS ============
  document.querySelectorAll(".cta-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonText = button.textContent.trim().toLowerCase();

      if (
        buttonText.includes("get started") ||
        buttonText.includes("get in touch")
      ) {
        window.location.href = "/contact.html";
      }
    });
  });

  // ============ CONTACT FORM SUBMISSION ============
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject")?.value || "",
        message: document.getElementById("message").value,
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          alert(result.message);
          contactForm.reset();
        } else {
          alert(result.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to send message. Please try again.");
      }
    });
  }

  // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// ============ DYNAMIC TESTIMONIALS (Optional) ============
async function loadTestimonials() {
  try {
    const response = await fetch("/api/testimonials");
    const data = await response.json();

    if (data.success && data.testimonials) {
      // TODO: Dynamically render testimonials if needed
      console.log("Testimonials loaded:", data.testimonials);
    }
  } catch (error) {
    console.error("Error loading testimonials:", error);
  }
}

// Uncomment to load testimonials dynamically
// loadTestimonials();
