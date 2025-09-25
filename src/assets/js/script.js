const taskName = document.getElementById("toDoInput");
const taskList = document.querySelector(".tasks");
const result = document.getElementById("result");

const editContainer = document.getElementById("editContainer");
const editInput = document.getElementById("editInput");
const editBtn = document.getElementById("editBtn");
const taskEditBtn = document.querySelector("editTaskName");

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

  let btns = document.createElement("div");
  btns.classList.add("btns");

  btnsInfo = [
    {
      img: "src/assets/img/check-circle.svg",
      alt: "Botão para concluir tarefa",
      className: "doneBtn",
      func: () => endTask(task),
    },
    {
      img: "src/assets/img/pencil-square.svg",
      alt: "Botão para editar tarefa",
      className: "editTaskBtn",
      func: () => editTaskName(task),
    },
    {
      img: "src/assets/img/x-circle.svg",
      alt: "Botão para remover tarefa",
      className: "removeBtn",
      func: () => removeTask(task, removeAllBtn),
    },
  ];

  btnsInfo.forEach((button) => {
    let btn = document.createElement("button");

    let image = document.createElement("img");
    image.src = button.img;
    image.alt = button.alt;

    btn.classList.add(button.className);

    btn.addEventListener("click", () => {
      if (button.className === "removeBtn") {
        button.func(task, removeAllBtn);
      } else {
        button.func();
      }
    });

    btn.appendChild(image);
    btns.appendChild(btn);
  });

  task.appendChild(btns);

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

    if (editContainer) {
      editContainer.style.display = "none";
    }

    result.innerHTML = "<p>Você removeu todas as tarefas!</p>";
    result.style.color = "#ff0000";
  });
}

function endTask(task) {
  let text = task.querySelector("p");
  let editBtn = task.querySelector(".editTaskBtn");
  const isActive = task.dataset.done === "true";

  if (!isActive) {
    task.style.background = "#db4ddbff";
    text.style.textDecoration = "line-through";
    editBtn.style.display = "none";
    result.innerHTML = "<p>Você concluiu a tarefa!</p>";
    result.style.color = "#089608ff";
  } else {
    task.style.background = "";
    text.style.textDecoration = "none";
    editBtn.style.display = "block";
    result.innerHTML = "";
    result.style.color = "";
  }

  task.dataset.done = (!isActive).toString();
}

function editTaskName(task) {
  editContainer.style.display = "flex";
  editInput.focus();

  editBtn.onclick = () => {
    editTask(task);
  };

  editInput.onkeydown = (e) => {
    if (e.key === "Enter") {
      editTask(task);
    }
  };
}

function editTask(task) {
  if (!editInput.value) {
    result.innerHTML = "<p>Você não colocou o nome da tarefa!";
    result.style.color = "";
    return;
  }

  const btns = task.querySelector(".btns");

  task.innerHTML = `<p>${editInput.value}</p>`;

  if (!task.contains(btns)) {
    task.appendChild(btns);
  }

  editInput.value = "";
  result.innerHTML = "<p>Você editou o nome da tarefa!</p>";
  result.style.color = "#000000";
  editContainer.style.display = "none";
}

function removeTask(task, button) {
  task.remove();
  let tasks = document.querySelectorAll(".task");

  if (tasks.length === 0) {
    button.remove();

    if (editContainer) {
      editContainer.style.display = "none";
    }
  }

  result.innerHTML = "<p>Tarefa Removida!</p>";
  result.style.color = "#ff0000";
}

taskName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
