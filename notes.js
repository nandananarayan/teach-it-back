function goBack() {
    window.location.href = "dashboard.html";
}
const cardsContainer = document.getElementById("notes-cards");
let studySessions = JSON.parse(localStorage.getItem("studySessions")) || [];
const lastSubject = localStorage.getItem("studySubject");
const lastText = localStorage.getItem("studyText");
if(lastSubject && lastText) {
    if(!studySessions.some(s => s.subject === lastSubject && s.text === lastText)) {
        studySessions.push({subject: lastSubject, text: lastText});
        localStorage.setItem("studySessions", JSON.stringify(studySessions));
    }
}
studySessions.forEach((session, index) => {
    const card = document.createElement("div");
    card.classList.add("note-card");

    card.innerHTML = `
        <h3>${session.subject}</h3>
        <p>${session.text.substring(0, 200)}${session.text.length>200 ? "..." : ""}</p>
        <button onclick="viewNote(${index})">View Full</button>
    `;

    cardsContainer.appendChild(card);
});
function viewNote(index) {
    const session = studySessions[index];
    alert(`Subject: ${session.subject}\n\n${session.text}`);
}
