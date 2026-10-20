console.debug("Hello world!");

tasks = [
  {
    title: "Zadanie 1",
    date: "13-10-2026",
  },
  {
    title: "Zadanie 2",
    date: "13-10-2026",
  }
];

/* Klasa todo */
class Todo {
    constructor() {
        this.tasksList = document.querySelector("#tasks-list ul");
        this.newTaskInput = document.querySelector("#new-task-input");
        this.addTaskButton = document.querySelector("#add-task-button");

        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        } else {
            this.tasks = [];
        }

        this.addTaskButton.addEventListener("click", () => {
            this.addTask();
        });
    }

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    draw(){
        this.tasksList.innerHTML = "";

        this.tasks.forEach((task, index) => {
            const taskElement = document.createElement("li");
            taskElement.className = "task";
            taskElement.innerHTML = `
                <input type="checkbox" id="done-${index}"/>
                <span>${task.title} - ${task.date}</span>
                <button class="delete-task" data-index="${index}">Usuń</button>
            `;
            this.tasksList.appendChild(taskElement);
        });

        this.tasksList.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.index);

                this.tasks.splice(index, 1);
                this.save();
                this.draw();
            });
        });
    }

    addTask() {
        const title = this.newTaskInput.value;

        if (!title) {
            return
        }
        const today = new Date();
        const date = today.toLocaleDateString("pl-PL");


        this.tasks.push({ title, date });
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

        this.newTaskInput.value = "";

        this.draw();
    }
}

const todo = new Todo();
