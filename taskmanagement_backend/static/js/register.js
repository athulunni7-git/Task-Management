document.getElementById("registerForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {

        let response = await fetch("/api/auth/register/", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        let data = await response.json();

        console.log("Status:", response.status);
        console.log("Response:", data);

        if (response.ok) {

            document.getElementById("message").innerText =
                "Registration successful! Redirecting to login...";

            setTimeout(function() {
                window.location.href = "/";
            }, 1000);

        } else {

            if (data.username) {
                document.getElementById("message").innerText =
                    data.username[0];

            } else if (data.password) {
                document.getElementById("message").innerText =
                    data.password[0];

            } else {
                document.getElementById("message").innerText =
                    "Registration failed";
            }
        }

    } catch (error) {

        console.log(error);

        document.getElementById("message").innerText =
            "Something went wrong";
    }

});