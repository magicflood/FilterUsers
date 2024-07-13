const apiUrl = "https://randomuser.me/api/?results=50";



async function fetchUsers() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const users = data.results;

    const americanUsers = users.filter(
      (user) => user.location.country
    );

    displayUsers(americanUsers);


    document.getElementById("nameFilter").addEventListener("input", (event) => {
      const filterText = event.target.value.toLowerCase();
      const filteredUsers = americanUsers.filter(
        (user) =>
          user.name.first.toLowerCase().includes(filterText) ||
          user.name.last.toLowerCase().includes(filterText)
      );
      displayUsers(filteredUsers);
    });
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}


function displayUsers(users) {
  const container = document.getElementById("user-cards-container");
  container.innerHTML = "";

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">
      <h2>${user.name.first} ${user.name.last}</h2>
      <p>Country: ${user.location.country}</p>
      <p>Phone: ${user.phone}</p>
    `;

    container.appendChild(userCard);
  });
}

fetchUsers();
