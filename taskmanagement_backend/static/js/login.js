document.getElementById("loginForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    try {

        let response = await fetch("/api/auth/login/", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        let data = await response.json();

        console.log("Status:", response.status);
        console.log("Response:", data);

        if (response.ok) {

            sessionStorage.setItem("username", username);
            sessionStorage.setItem("password", password);

            window.location.href = "/dashboard/";

        } else {

            document.getElementById("message").innerText =
                data.error || "Invalid username or password";

        }

    } catch (error) {

        console.log(error);

        document.getElementById("message").innerText =
            "Something went wrong";
    }

});