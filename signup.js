<<<<<<< HEAD

    function checkPassword() {
        const val = document.getElementById('password-input').value;

        const rules = {
            'rule-length':  val.length >= 8,
            'rule-upper':   /[A-Z]/.test(val),
            'rule-lower':   /[a-z]/.test(val),
            'rule-number':  /[0-9]/.test(val),
            'rule-special': /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)
        };

        let metCount = 0;
        for (const [id, passed] of Object.entries(rules)) {
            const el = document.getElementById(id);
            if (passed) { el.classList.add('met'); metCount++; }
            else        { el.classList.remove('met'); }
        }

        const fill = document.getElementById('strength-fill');
        const label = document.getElementById('strength-label');
        const pct = (metCount / 5) * 100;
        fill.style.width = pct + '%';

        if (metCount <= 1)       { fill.style.background = '#ff5e5e'; label.textContent = 'Weak';      label.style.color = '#ff5e5e'; }
        else if (metCount <= 3)  { fill.style.background = '#ffb347'; label.textContent = 'Fair';      label.style.color = '#ffb347'; }
        else if (metCount === 4) { fill.style.background = '#ffe44d'; label.textContent = 'Good';      label.style.color = '#ffe44d'; }
        else                     { fill.style.background = '#4cff91'; label.textContent = 'Strong ✓'; label.style.color = '#4cff91'; }

        if (val === '') { fill.style.width = '0%'; label.textContent = ''; }

        if (document.getElementById('confirm-password-input').value) checkConfirmPassword();
    }

    function checkConfirmPassword() {
        const pw  = document.getElementById('password-input').value;
        const cpw = document.getElementById('confirm-password-input').value;
        const msg = document.getElementById('confirm-password-msg');
        if (!cpw) { msg.textContent = ''; return; }
        if (pw === cpw) {
            msg.textContent = '✓ Passwords match';
            msg.style.color = '#4cff91';
        } else {
            msg.textContent = '✗ Passwords do not match';
            msg.style.color = '#ff5e5e';
        }
    }

    // Runs AFTER script.js so it safely wraps whatever createAccount is defined there
    window.addEventListener('DOMContentLoaded', () => {
        const original = window.createAccount;
        window.createAccount = function() {
            const pw  = document.getElementById('password-input').value;
            const cpw = document.getElementById('confirm-password-input').value;

            const allMet = [
                pw.length >= 8,
                /[A-Z]/.test(pw),
                /[a-z]/.test(pw),
                /[0-9]/.test(pw),
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)
            ].every(Boolean);

            if (!allMet) {
                alert('Please make sure your password meets all the requirements.');
                return;
            }
            if (pw !== cpw) {
                alert('Passwords do not match. Please re-enter.');
                return;
            }

            if (typeof original === 'function') original();
        };
    });
=======

    function checkPassword() {
        const val = document.getElementById('password-input').value;

        const rules = {
            'rule-length':  val.length >= 8,
            'rule-upper':   /[A-Z]/.test(val),
            'rule-lower':   /[a-z]/.test(val),
            'rule-number':  /[0-9]/.test(val),
            'rule-special': /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)
        };

        let metCount = 0;
        for (const [id, passed] of Object.entries(rules)) {
            const el = document.getElementById(id);
            if (passed) { el.classList.add('met'); metCount++; }
            else        { el.classList.remove('met'); }
        }

        const fill = document.getElementById('strength-fill');
        const label = document.getElementById('strength-label');
        const pct = (metCount / 5) * 100;
        fill.style.width = pct + '%';

        if (metCount <= 1)       { fill.style.background = '#ff5e5e'; label.textContent = 'Weak';      label.style.color = '#ff5e5e'; }
        else if (metCount <= 3)  { fill.style.background = '#ffb347'; label.textContent = 'Fair';      label.style.color = '#ffb347'; }
        else if (metCount === 4) { fill.style.background = '#ffe44d'; label.textContent = 'Good';      label.style.color = '#ffe44d'; }
        else                     { fill.style.background = '#4cff91'; label.textContent = 'Strong ✓'; label.style.color = '#4cff91'; }

        if (val === '') { fill.style.width = '0%'; label.textContent = ''; }

        if (document.getElementById('confirm-password-input').value) checkConfirmPassword();
    }

    function checkConfirmPassword() {
        const pw  = document.getElementById('password-input').value;
        const cpw = document.getElementById('confirm-password-input').value;
        const msg = document.getElementById('confirm-password-msg');
        if (!cpw) { msg.textContent = ''; return; }
        if (pw === cpw) {
            msg.textContent = '✓ Passwords match';
            msg.style.color = '#4cff91';
        } else {
            msg.textContent = '✗ Passwords do not match';
            msg.style.color = '#ff5e5e';
        }
    }

    // Runs AFTER script.js so it safely wraps whatever createAccount is defined there
    window.addEventListener('DOMContentLoaded', () => {
        const original = window.createAccount;
        window.createAccount = function() {
            const pw  = document.getElementById('password-input').value;
            const cpw = document.getElementById('confirm-password-input').value;

            const allMet = [
                pw.length >= 8,
                /[A-Z]/.test(pw),
                /[a-z]/.test(pw),
                /[0-9]/.test(pw),
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)
            ].every(Boolean);

            if (!allMet) {
                alert('Please make sure your password meets all the requirements.');
                return;
            }
            if (pw !== cpw) {
                alert('Passwords do not match. Please re-enter.');
                return;
            }

            if (typeof original === 'function') original();
        };
    });
>>>>>>> f380457adb96d90c5116797874846612ef2e8148
