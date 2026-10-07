let username = sessionStorage.getItem("username");
let password = sessionStorage.getItem("password");

if (!username || !password) {
    window.location.href = "/";
}

let auth = btoa(username + ":" + password);



let usernameElement = document.getElementById("username");

if (usernameElement) {
    usernameElement.innerText = username;
}


async function loadTasks() {

    try {

        let response = await fetch(
            "/api/tasks/",
            {
                headers: {
                    "Authorization": "Basic " + auth
                }
            }
        );

        if (!response.ok) {
            alert("Failed to load tasks");
            return;
        }

        let tasks = await response.json();

        displayTasks(tasks);

    } catch (error) {

        console.log(error);

        alert("Something went wrong");
    }
}



function displayTasks(tasks) {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML = "<p>No tasks found.</p>";

        return;
    }


    tasks.forEach(function(task) {

        taskList.innerHTML += `
    <div class="task">
        <h3>${task.title}</h3>
        <p>${task.description || "No description"}</p>

        <button onclick="viewTask(${task.id})">View</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
    </div>
`;
    });
}



async function searchTasks() {

    let search =
        document.getElementById("search").value;

    let status =
        document.getElementById("statusFilter").value;

    let priority =
        document.getElementById("priorityFilter").value;


    let url =
        "/api/tasks/search/?";


    let params = [];


    if (search) {
        params.push(
            "search=" + encodeURIComponent(search)
        );
    }


    if (status) {
        params.push(
            "status=" + status
        );
    }


    if (priority) {
        params.push(
            "priority=" + priority
        );
    }


    url += params.join("&");


    try {

        let response = await fetch(
            url,
            {
                headers: {
                    "Authorization": "Basic " + auth
                }
            }
        );


        if (!response.ok) {

            alert("Failed to search tasks");

            return;
        }


        let tasks = await response.json();

        displayTasks(tasks);


    } catch (error) {

        console.log(error);

        alert("Something went wrong");
    }
}



function editTask(id) {

    window.location.href =
        "/edit-task/?id=" + id;
}

function viewTask(id) {
    window.location.href = "/task-detail/?id=" + id;
}

function logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");

    window.location.href = "/";
}



async function deleteTask(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        let response = await fetch(
            "/api/tasks/" + id + "/",
            {
                method: "DELETE",

                headers: {
                    "Authorization": "Basic " + auth
                }
            }
        );


        if (response.ok) {

            alert("Task deleted successfully");

            loadTasks();

        } else {

            alert("Failed to delete task");
        }


    } catch (error) {

        console.log(error);

        alert("Something went wrong");
    }
}



loadTasks();