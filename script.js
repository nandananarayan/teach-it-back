function createAccount() {

    const name = document.querySelector('input[placeholder="Full Name"]').value;
    const age = document.querySelector('input[placeholder="Age"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Create Password"]').value;
    const avatarImg = document.getElementById("selected-avatar");
    if (!name || !age || !email || !password || !avatarImg.src) {
        alert("Please fill all fields and select an avatar.");
        return;
    }
    const user = {
        name: name,
        age: age,
        email: email,
        password: password,
        pfp: avatarImg.src
    };
    localStorage.setItem("teachItBackUser", JSON.stringify(user));
    alert("Account created successfully!");
    window.location.href = "index.html";
}
function login() {

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("teachItBackUser"));

    if (!storedUser) {
        alert("No account found. Please create one.");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";

    } else {
        alert("Incorrect email or password.");
    }
}

function toggleAvatars() {
    document.querySelector(".avatar-section").classList.toggle("active");
}

function selectAvatar(img) {

    const display = document.getElementById("selected-avatar");
    const text = document.getElementById("avatar-text");

    display.src = img.src;
    display.style.display = "block";

    text.style.display = "none";

    document.querySelector(".avatar-section").classList.remove("active");
}
window.onload = function () {

    const user = JSON.parse(localStorage.getItem("teachItBackUser"));

    if (user) {
        const welcome = document.getElementById("welcome-text");
        if (welcome) {
            welcome.innerText = "Welcome back, " + user.name + " ✨";
        }
    }

    const notesArea = document.getElementById("user-notes");

    if (notesArea) {
        notesArea.value = localStorage.getItem("userNotes") || "";

        notesArea.addEventListener("input", function () {
            localStorage.setItem("userNotes", notesArea.value);
        });
    }
};

function goStudy() {
    alert("Study page coming next 😌🔥");
}
function startSession() {

    const file = document.getElementById("study-file").files[0];
    const subject = document.getElementById("study-subject").value;
    const cafe = document.getElementById("cafe-select").value;

    if (!file || !subject || !cafe) {
        alert("Fill everything before starting!");
        return;
    }

    localStorage.setItem("studySubject", subject);
    localStorage.setItem("selectedCafe", cafe);

    window.location.href = "speech.html";
}

