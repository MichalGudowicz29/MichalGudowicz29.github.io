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
        this.searchInput = document.querySelector("#search-input");
        this.newTaskInput = document.querySelector("#new-task-input");
        this.newTaskDate = document.querySelector("#new-task-date");
        this.newTaskNote = document.querySelector("#new-task-note");
        this.addTaskButton = document.querySelector("#add-task-button");
        this.phrase = "";

        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks).map((task) => ({
                ...task,
                note: task.note || ""
            }));
        } else {
            this.tasks = [];
        }

        this.addTaskButton.addEventListener("click", () => {
            this.add();
        });

        this.searchInput.addEventListener("input", () => {
            this.phrase = this.searchInput.value.trim().toLowerCase();
            this.draw();
        });
    }

    get filteredTasks() {
        if (!this.phrase) {
            return this.tasks;
        }

        return this.tasks.filter((task) => {
            const searchableText = `${task.title} ${task.date} ${task.note || ""}`;
            return searchableText.toLowerCase().includes(this.phrase);
        });
    }

    highlight(text) {
        if (!this.phrase) return text;
        return text.replace(
            new RegExp(this.phrase, "gi"),
            (match) => `<mark>${match}</mark>`
        );
    }

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    draw(){
        this.tasksList.innerHTML = "";

        this.filteredTasks.forEach((task) => {
            const index = this.tasks.indexOf(task);
            const taskElement = document.createElement("li");
            taskElement.className = "task";
            taskElement.innerHTML = `
                <input type="checkbox" id="done-${index}" data-index="${index}">
                <span>
                    <strong>${this.highlight(task.title)}</strong> -
                    ${this.highlight(task.date)}
                    <small>${this.highlight(task.note)}</small>
                </span>
                <button class="delete-task" data-index="${index}">Usuń</button>
            `;

            taskElement.addEventListener("click", (event) => {
                if (event.target.matches("button, input")) {
                    return;
                }
                this.edit(index);
            });
            this.tasksList.appendChild(taskElement);
        });

        this.tasksList.querySelectorAll("button, input[type='checkbox']").forEach((button) => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.index);

                this.tasks.splice(index, 1);
                this.save();
                this.draw();
            });
        });
    }

    add() {
        const title = this.newTaskInput.value.trim();
        const note = this.newTaskNote.value.trim();

        if (!title) {
            return;
        }

        const today = new Date();
        const date = this.newTaskDate.value || today.toLocaleDateString("pl-PL");

        this.tasks.push({ title, date, note });
        this.save();

        this.newTaskInput.value = "";
        this.newTaskDate.value = "";
        this.newTaskNote.value = "";

        this.draw();
    }

    edit(index) {
        const task = this.tasks[index];

        const title = prompt("Edytuj tytuł:", task.title);
        if (title === null) {
            return;
        }

        const date = prompt("Edytuj datę:", task.date);
        if (date === null) {
            return;
        }

        const note = prompt("Edytuj notatkę:", task.note || "");
        if (note === null) {
            return;
        }

        if (!title.trim()) {
            return;
        }

        this.tasks[index] = {
            title: title.trim(),
            date: date.trim(),
            note: note.trim()
        };

        this.save();
        this.draw();
    }
}

document.todo = new Todo();
