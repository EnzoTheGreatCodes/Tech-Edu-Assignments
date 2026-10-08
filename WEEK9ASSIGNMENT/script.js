
function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.add("hidden");
    });

    const selectedScreen = document.getElementById(screenId);

    selectedScreen.classList.remove("hidden");
}

function togglePassword(inputId) {

    const passwordInput =
        document.getElementById(inputId);

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

    } else {

        passwordInput.type = "password";

    }
}

setTimeout(function() {

    showScreen("welcome");

}, 1500);