const taskName = document.getElementById("toDoInput");
const taskList = document.querySelector(".tasks");
const result = document.getElementById("result");
const removeAllContainer = document.querySelector(".remove-all-container");

result.innerHTML = "";

function addTask() {
  if (taskName.value.length === 0) {
    result.innerHTML = "<p>Você não colocou o nome da tarefa!</p>";
    result.style.color = "";
    return;
  }

  result.innerHTML = "<p>Você adicionou uma nova tarefa!</p>";
  result.style.color = "#089608ff";

  let task = document.createElement("div");
  task.classList.add("task");
  task.innerHTML = `<p>${taskName.value}</p>`;

  let removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");

  let image = document.createElement("img");
  image.src = "src/assets/img/x-circle.svg";
  image.alt = "Botão para remover tarefa";

  removeBtn.appendChild(image);

  task.appendChild(removeBtn);

  taskList.appendChild(task);

  taskName.focus();
  taskName.value = "";

  let removeAllBtn = document.querySelector(".remove-all-btn");
  if (!removeAllBtn) {
    removeAllBtn = document.createElement("button");
    removeAllBtn.classList.add("remove-all-btn");
    removeAllBtn.innerText = "Remover Todas as Tarefas";
    removeAllContainer.appendChild(removeAllBtn);
  }
  removeAllBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    removeAllBtn.remove();

    result.innerHTML = "<p>Você removeu todas as tarefas!</p>";
    result.style.color = "#ff0000";
  });

  removeBtn.addEventListener("click", () => removeTask(task, removeAllBtn));
}

function removeTask(task, button) {
  task.remove();
  let tasks = document.querySelectorAll(".task");

  if (tasks.length === 0) {
    button.remove();
  }

  result.innerHTML = "<p>Tarefa Removida!</p>";
  result.style.color = "#ff0000";
}
