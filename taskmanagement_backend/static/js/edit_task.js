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



async function loadTask() {

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

        
        document.getElementById("title").value = task.title;

        document.getElementById("description").value =
            task.description || "";

        document.getElementById("status").value =
            task.status;

        document.getElementById("priority").value =
            task.priority;

        document.getElementById("due_date").value =
            task.due_date || "";

    } catch (error) {

        console.log(error);

        alert("Something went wrong");
    }
}



document.getElementById("editTaskForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        let title =
            document.getElementById("title").value;

        let description =
            document.getElementById("description").value;

        let status =
            document.getElementById("status").value;

        let priority =
            document.getElementById("priority").value;

        let due_date =
            document.getElementById("due_date").value;


        let taskData = {

            title: title,

            description: description,

            status: status,

            priority: priority,

            due_date: due_date || null
        };


        try {

            let response = await fetch(
                "/api/tasks/" + taskId + "/",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + auth
                    },

                    body: JSON.stringify(taskData)
                }
            );


            let data = await response.json();


            if (response.ok) {

                document.getElementById("message").innerText =
                    "Task updated successfully";

                setTimeout(function() {

                    window.location.href = "/dashboard/";

                }, 800);

            } else {

                console.log(data);

                document.getElementById("message").innerText =
                    "Failed to update task";
            }


        } catch (error) {

            console.log(error);

            document.getElementById("message").innerText =
                "Something went wrong";
        }

    });



loadTask();