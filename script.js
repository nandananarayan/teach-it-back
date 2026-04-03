<<<<<<< HEAD

function toggleAvatars() {
    document.querySelector(".avatar-section").classList.toggle("active");
}

function selectAvatar(img) {
    const display = document.getElementById("selected-avatar");
    const text    = document.getElementById("avatar-text");

    display.src          = img.src;
    display.style.display = "block";
    text.style.display   = "none";

    document.querySelector(".avatar-section").classList.remove("active");
}
function checkPassword() {
    const val = document.getElementById("password-input").value;

    const rules = {
        "rule-length":  val.length >= 8,
        "rule-upper":   /[A-Z]/.test(val),
        "rule-lower":   /[a-z]/.test(val),
        "rule-number":  /[0-9]/.test(val),
        "rule-special": /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)
    };

    let metCount = 0;
    for (const [id, passed] of Object.entries(rules)) {
        const el = document.getElementById(id);
        if (passed) { el.classList.add("met");    metCount++; }
        else        { el.classList.remove("met"); }
    }

    const fill  = document.getElementById("strength-fill");
    const label = document.getElementById("strength-label");

    if (val === "") {
        fill.style.width   = "0%";
        label.textContent  = "";
        return;
    }

    fill.style.width = (metCount / 5 * 100) + "%";

    if      (metCount <= 1) { fill.style.background = "#ff5e5e"; label.textContent = "Weak";      label.style.color = "#ff5e5e"; }
    else if (metCount <= 3) { fill.style.background = "#ffb347"; label.textContent = "Fair";      label.style.color = "#ffb347"; }
    else if (metCount === 4){ fill.style.background = "#ffe44d"; label.textContent = "Good";      label.style.color = "#ffe44d"; }
    else                    { fill.style.background = "#4cff91"; label.textContent = "Strong ✓"; label.style.color = "#4cff91"; }

    if (document.getElementById("confirm-password-input").value) {
        checkConfirmPassword();
    }
}

function checkConfirmPassword() {
    const pw  = document.getElementById("password-input").value;
    const cpw = document.getElementById("confirm-password-input").value;
    const msg = document.getElementById("confirm-password-msg");

    if (!cpw) { msg.textContent = ""; return; }

    if (pw === cpw) {
        msg.textContent = "✓ Passwords match";
        msg.style.color = "#4cff91";
    } else {
        msg.textContent = "✗ Passwords do not match";
        msg.style.color = "#ff5e5e";
    }
}
function isPasswordValid(pw) {
    return (
        pw.length >= 8        &&
        /[A-Z]/.test(pw)      &&
        /[a-z]/.test(pw)      &&
        /[0-9]/.test(pw)      &&
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)
    );
}

function createAccount() {
    const name      = document.querySelector('input[placeholder="Full Name"]').value.trim();
    const age       = document.querySelector('input[placeholder="Age"]').value.trim();
    const email     = document.querySelector('input[placeholder="Email"]').value.trim();
    const password  = document.getElementById("password-input").value;
    const confirm   = document.getElementById("confirm-password-input").value;
    const avatarImg = document.getElementById("selected-avatar");

    if (!name || !age || !email || !password || !avatarImg.src) {
        alert("Please fill all fields and select an avatar.");
        return;
    }

    if (!isPasswordValid(password)) {
        alert("Please make sure your password meets all the requirements.");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match. Please re-enter.");
        return;
    }

    const user = {
        name:     name,
        age:      age,
        email:    email,
        password: password,
        pfp:      avatarImg.src
    };

    localStorage.setItem("teachItBackUser", JSON.stringify(user));
    alert("Account created successfully!");
    window.location.href = "index.html";
}
function login() {
    const email    = document.getElementById("login-email").value;
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
window.onload = function () {
    const user = JSON.parse(localStorage.getItem("teachItBackUser"));

    if (user) {
        const welcome = document.getElementById("welcome-text");
        if (welcome) {
            welcome.innerText = "Welcome back, " + user.name + " \u2728";
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
    const file    = document.getElementById("study-file").files[0];
    const subject = document.getElementById("study-subject").value;
    const cafe    = document.getElementById("cafe-select").value;

    if (!file || !subject || !cafe) {
        alert("Fill everything before starting!");
        return;
    }

    localStorage.setItem("studySubject", subject);
    localStorage.setItem("selectedCafe", cafe);

    window.location.href = "speech.html";
}
=======

function toggleAvatars() {
    document.querySelector(".avatar-section").classList.toggle("active");
}

function selectAvatar(img) {
    const display = document.getElementById("selected-avatar");
    const text    = document.getElementById("avatar-text");

    display.src          = img.src;
    display.style.display = "block";
    text.style.display   = "none";

    document.querySelector(".avatar-section").classList.remove("active");
}
function checkPassword() {
    const val = document.getElementById("password-input").value;

    const rules = {
        "rule-length":  val.length >= 8,
        "rule-upper":   /[A-Z]/.test(val),
        "rule-lower":   /[a-z]/.test(val),
        "rule-number":  /[0-9]/.test(val),
        "rule-special": /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)
    };

    let metCount = 0;
    for (const [id, passed] of Object.entries(rules)) {
        const el = document.getElementById(id);
        if (passed) { el.classList.add("met");    metCount++; }
        else        { el.classList.remove("met"); }
    }

    const fill  = document.getElementById("strength-fill");
    const label = document.getElementById("strength-label");

    if (val === "") {
        fill.style.width   = "0%";
        label.textContent  = "";
        return;
    }

    fill.style.width = (metCount / 5 * 100) + "%";

    if      (metCount <= 1) { fill.style.background = "#ff5e5e"; label.textContent = "Weak";      label.style.color = "#ff5e5e"; }
    else if (metCount <= 3) { fill.style.background = "#ffb347"; label.textContent = "Fair";      label.style.color = "#ffb347"; }
    else if (metCount === 4){ fill.style.background = "#ffe44d"; label.textContent = "Good";      label.style.color = "#ffe44d"; }
    else                    { fill.style.background = "#4cff91"; label.textContent = "Strong ✓"; label.style.color = "#4cff91"; }

    if (document.getElementById("confirm-password-input").value) {
        checkConfirmPassword();
    }
}

function checkConfirmPassword() {
    const pw  = document.getElementById("password-input").value;
    const cpw = document.getElementById("confirm-password-input").value;
    const msg = document.getElementById("confirm-password-msg");

    if (!cpw) { msg.textContent = ""; return; }

    if (pw === cpw) {
        msg.textContent = "✓ Passwords match";
        msg.style.color = "#4cff91";
    } else {
        msg.textContent = "✗ Passwords do not match";
        msg.style.color = "#ff5e5e";
    }
}
function isPasswordValid(pw) {
    return (
        pw.length >= 8        &&
        /[A-Z]/.test(pw)      &&
        /[a-z]/.test(pw)      &&
        /[0-9]/.test(pw)      &&
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)
    );
}

function createAccount() {
    const name      = document.querySelector('input[placeholder="Full Name"]').value.trim();
    const age       = document.querySelector('input[placeholder="Age"]').value.trim();
    const email     = document.querySelector('input[placeholder="Email"]').value.trim();
    const password  = document.getElementById("password-input").value;
    const confirm   = document.getElementById("confirm-password-input").value;
    const avatarImg = document.getElementById("selected-avatar");

    if (!name || !age || !email || !password || !avatarImg.src) {
        alert("Please fill all fields and select an avatar.");
        return;
    }

    if (!isPasswordValid(password)) {
        alert("Please make sure your password meets all the requirements.");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match. Please re-enter.");
        return;
    }

    const user = {
        name:     name,
        age:      age,
        email:    email,
        password: password,
        pfp:      avatarImg.src
    };

    localStorage.setItem("teachItBackUser", JSON.stringify(user));
    alert("Account created successfully!");
    window.location.href = "index.html";
}
function login() {
    const email    = document.getElementById("login-email").value;
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
window.onload = function () {
    const user = JSON.parse(localStorage.getItem("teachItBackUser"));

    if (user) {
        const welcome = document.getElementById("welcome-text");
        if (welcome) {
            welcome.innerText = "Welcome back, " + user.name + " \u2728";
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
    const file    = document.getElementById("study-file").files[0];
    const subject = document.getElementById("study-subject").value;
    const cafe    = document.getElementById("cafe-select").value;

    if (!file || !subject || !cafe) {
        alert("Fill everything before starting!");
        return;
    }

    localStorage.setItem("studySubject", subject);
    localStorage.setItem("selectedCafe", cafe);

    window.location.href = "speech.html";
}

>>>>>>> f380457adb96d90c5116797874846612ef2e8148
