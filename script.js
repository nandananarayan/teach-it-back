function startSession() {
  const name = document.getElementById("name").value;
  const topic = document.getElementById("topic").value;
  const vibe = document.getElementById("vibe").value;

  if (!name || !topic) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("topic", topic);
  localStorage.setItem("vibe", vibe);

  window.location.href = "session.html";
  const topicValue = document.getElementById("topic").value
    .trim()
    .toLowerCase();

  localStorage.setItem("topic", topicValue || "general");

  window.location.href = "session.html";
}
