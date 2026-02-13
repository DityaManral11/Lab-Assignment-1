let events = [];

const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const sampleBtn = document.getElementById("sampleBtn");
const eventList = document.getElementById("eventList");

addBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  if (title === "" || date === "") {
    alert("Please enter event title and date");
    return;
  }

  events.push({ title, date, category, description });
  displayEvents();
  clearForm();
});

function displayEvents() {
  eventList.innerHTML = "";

  if (events.length === 0) {
    eventList.innerHTML = `<p class="empty-text">No events yet. Add your first event!</p>`;
    return;
  }

  events.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <button class="delete-btn" onclick="deleteEvent(${index})">×</button>
      <h4>${event.title}</h4>
      <p>📅 ${event.date}</p>
      <span class="badge">${event.category}</span>
      <p>${event.description}</p>
    `;

    eventList.appendChild(card);
  });
}

function deleteEvent(index) {
  events.splice(index, 1);
  displayEvents();
}

clearBtn.addEventListener("click", () => {
  events = [];
  displayEvents();
});

sampleBtn.addEventListener("click", () => {
  events = [
    {
      title: "Web Development Conference",
      date: "2026-02-15",
      category: "Conference",
      description: "Annual conference on modern web technologies."
    },
    {
      title: "JavaScript Workshop",
      date: "2026-02-20",
      category: "Workshop",
      description: "Hands-on JavaScript learning session."
    }
  ];
  displayEvents();
});

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
}

document.getElementById("domInput").addEventListener("keyup", function () {
  this.style.backgroundColor = "#e0f2f1";
});
