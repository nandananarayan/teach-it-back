function toggleAvatars() {
    document.getElementById("avatar-section").classList.toggle("active");
}

function selectAvatar(img) {
    const display = document.getElementById("selected-avatar");
    const text    = document.getElementById("avatar-text");
    display.src           = img.src;
    display.style.display = "block";
    text.style.display    = "none";
    document.getElementById("avatar-section").classList.remove("active");
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

    if (val === "") { fill.style.width = "0%"; label.textContent = ""; return; }

    fill.style.width = (metCount / 5 * 100) + "%";

    if      (metCount <= 1) { fill.style.background = "#ff5e5e"; label.textContent = "Weak";      label.style.color = "#ff5e5e"; }
    else if (metCount <= 3) { fill.style.background = "#ffb347"; label.textContent = "Fair";      label.style.color = "#ffb347"; }
    else if (metCount === 4){ fill.style.background = "#ffe44d"; label.textContent = "Good";      label.style.color = "#ffe44d"; }
    else                    { fill.style.background = "#4cff91"; label.textContent = "Strong \u2713"; label.style.color = "#4cff91"; }

    if (document.getElementById("confirm-password-input").value) checkConfirmPassword();
}

function checkConfirmPassword() {
    const pw  = document.getElementById("password-input").value;
    const cpw = document.getElementById("confirm-password-input").value;
    const msg = document.getElementById("confirm-password-msg");
    if (!cpw) { msg.textContent = ""; return; }
    if (pw === cpw) {
        msg.textContent = "\u2713 Passwords match";
        msg.style.color = "#4cff91";
    } else {
        msg.textContent = "\u2717 Passwords do not match";
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
    const name      = document.getElementById("full-name").value.trim();
    const age       = document.getElementById("age").value.trim();
    const email     = document.getElementById("email").value.trim();
    const password  = document.getElementById("password-input").value;
    const confirm   = document.getElementById("confirm-password-input").value;
    const avatarImg = document.getElementById("selected-avatar");

    if (!name || !age || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    if (!avatarImg.src || avatarImg.style.display === "none") {
        alert("Please select an avatar.");
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