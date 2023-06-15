document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskName = taskInput.value.trim();

        if (taskName.length < 2 || taskName.length > 30) {
            taskInput.value="";
            taskInput.classList.add("error");
            taskInput.classList.add("shake");
            setTimeout(function() {
                taskInput.classList.remove("error", "shake");
            }, 1000);
            taskInput.setAttribute("placeholder", "Name not valid");
            setTimeout(function() {
                taskInput.value="";
                taskInput.setAttribute("placeholder", "Enter a task");
            }, 1000);
            return;
        }

        const existingTasks = Array.from(taskList.children).map(function(li) {
            return li.querySelector("span").textContent.trim();
        });

        if (existingTasks.includes(taskName)) {
            taskInput.classList.add("error");
            taskInput.classList.add("shake");
            setTimeout(function() {
                taskInput.classList.remove("error");
                taskInput.classList.remove("shake");
            }, 1000);

            alert("The task already exists!");

            return;
        }

        const li = document.createElement("li");
        const span = document.createElement("span");
        const upButton = document.createElement("button");
        const downButton = document.createElement("button");
        const deleteButton = document.createElement("button");


        span.textContent = taskName;
        upButton.textContent = "Move Up";
        downButton.textContent = "Move Down";
        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function() {
            if (confirm("Are you sure you want to delete this task?")) {
                li.remove();
            }
        });

        upButton.addEventListener("click", function() {
            if (li.previousElementSibling) {
                li.parentNode.insertBefore(li, li.previousElementSibling);
            }
        });

        downButton.addEventListener("click", function() {
            if (li.nextElementSibling) {
                li.parentNode.insertBefore(li.nextElementSibling, li);
            }
        });

        li.appendChild(span);
        li.appendChild(upButton);
        li.appendChild(downButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskInput.classList.add("success");
        setTimeout(function() {
            taskInput.classList.remove("success");
        }, 1000);

        taskInput.value = "";
    }
});