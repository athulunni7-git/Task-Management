let username = sessionStorage.getItem("username");
let password = sessionStorage.getItem("password");

if (!username || !password) {
    window.location.href = "/";
}

let auth = btoa(username + ":" + password);

let urlParams = new URLSearchParams(window.location.search);
let taskId = urlParams.get("id");

if (!taskId) {
    alert("Task ID not found");
    window.location.href = "/dashboard/";
}

async function loadTaskDetails() {

    try {

        let response = await fetch(
            "/api/tasks/" + taskId + "/",
            {
                headers: {
                    "Authorization": "Basic " + auth
                }
            }
        );

        if (!response.ok) {
            alert("Failed to load task");
            window.location.href = "/dashboard/";
            return;
        }

        let task = await response.json();

        document.getElementById("taskDetails").innerHTML = `
            <div class="task">
                <h2>${task.title}</h2>

                <p>
                    <strong>Description:</strong>
                    ${task.description || "No description"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${task.status}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${task.priority}
                </p>

                <p>
                    <strong>Due Date:</strong>
                    ${task.due_date || "No due date"}
                </p>

                <p>
                    <strong>Created Date:</strong>
                    ${task.created_date}
                </p>
            </div>
        `;

    } catch (error) {

        console.log(error);

        document.getElementById("taskDetails").innerHTML =
            "<p>Something went wrong.</p>";
    }
}

loadTaskDetails();