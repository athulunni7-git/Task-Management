let username = sessionStorage.getItem("username");
let password = sessionStorage.getItem("password");



if (!username || !password) {

    window.location.href = "/";

}



let auth = btoa(username + ":" + password);



let taskForm = document.getElementById("taskForm");



taskForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    let title = document.getElementById("title").value;

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

        let response = await fetch("/api/tasks/", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Basic " + auth

            },

            body: JSON.stringify(taskData)

        });


        let data = await response.json();


        if (response.ok) {

            document.getElementById("message").innerText =
                "Task added successfully";


            setTimeout(function() {

                window.location.href = "/dashboard/";

            }, 800);


        } else {

            console.log(data);

            document.getElementById("message").innerText =
                "Failed to add task";

        }


    } catch (error) {

        console.log(error);

        document.getElementById("message").innerText =
            "Something went wrong";

    }

});