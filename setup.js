
document.getElementById("start-session-btn").onclick = () => {
    const fileInput = document.getElementById("study-file");
    const subject = document.getElementById("study-subject").value.trim();
    const cafe = document.getElementById("cafe-select").value;

    if (!fileInput.files[0] || !subject || !cafe) {
        alert("Please upload a .txt file, enter a subject, and select a cafe!");
        return;
    }

    const file = fileInput.files[0];
    if (!file.name.endsWith(".txt")) {
        alert("Only .txt files are allowed!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        localStorage.setItem("studyText", text);
        localStorage.setItem("studySubject", subject);
        localStorage.setItem("selectedCafe", cafe);
        window.location.href = "speech.html";
    };
    reader.readAsText(file);
};
