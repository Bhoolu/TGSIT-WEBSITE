async function loadContacts() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/admin/contacts", {
    headers: { Authorization: "Bearer " + token },
  });
  const data = await res.json();

  if (data.success) {
    const tbody = document.querySelector("#contactsTable tbody");
    tbody.innerHTML = "";
    data.contacts.forEach((contact) => {
      tbody.innerHTML += `
        <tr>
          <td>${contact.name}</td>
          <td>${contact.email}</td>
          <td>${contact.subject}</td>
          <td>${contact.message}</td>
          <td>${contact.status}</td>
          <td>
            <div class="actions">
              <button class="read" onclick="updateStatus('${contact._id}', 'read')">Mark Read</button>
              <button class="resolve" onclick="updateStatus('${contact._id}', 'resolved')">Resolve</button>
              <button class="delete" onclick="deleteContact('${contact._id}')">Delete</button>
            </div>
          </td>
        </tr>
      `;
    });
  } else {
    alert("Failed to load contacts");
  }
}

async function updateStatus(id, status) {
  const token = localStorage.getItem("token");
  await fetch("/api/admin/contacts/" + id, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  loadContacts();
}

async function deleteContact(id) {
  const token = localStorage.getItem("token");
  await fetch("/api/admin/contacts/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  loadContacts();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/admin/login.html";
}

window.onload = loadContacts;
