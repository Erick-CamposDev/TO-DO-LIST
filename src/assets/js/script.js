const taskName = document.getElementById("toDoInput");
const taskList = document.querySelector(".task-container");
const result = document.getElementById("result");

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

  removeBtn.addEventListener("click", () => removeTask(task));
}

function removeTask(task) {
  task.remove();
  result.innerHTML = "<p>Tarefa Removida!</p>";
  result.style.color = "#ff0000";
}
