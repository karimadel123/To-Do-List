let text = document.getElementById("text");
let btn = document.getElementById("btn");

let data_task;
if (localStorage.Taskes != null) {
  data_task = JSON.parse(localStorage.Taskes);
} else {
  data_task = [];
}

btn.onclick = function () {
  const Taskes = {
    text: text.value,
    completed: false,
  };
  if (text.value != "") {
    data_task.push(Taskes);
    localStorage.setItem("Taskes", JSON.stringify(data_task));
    showTaskes();
    text.value = "";
  }
};

function showTaskes() {
  let Task = "";
  for (let i = 0; i < data_task.length; i++) {
    Task += `
    <div class="task-item">
        <input type="checkbox" onclick="CompleteTask(${i})" ${data_task[i].completed ? "checked" : ""}>
        <span>${data_task[i].text}</span>
         <i id="delete" onclick="Delete(${i})"class="fa-solid fa-trash"></i>
      </div>
       

        `;
  }
  document.getElementById("tasks").innerHTML = Task;
  countCompletedTasks();
}
showTaskes();

function Delete(i) {
  data_task.splice(i, 1);
  localStorage.Taskes = JSON.stringify(data_task);
  showTaskes();
}

function CompleteTask(i) {
  data_task[i].completed = !data_task[i].completed;

  localStorage.setItem("Taskes", JSON.stringify(data_task));
  showTaskes();
}
function countCompletedTasks() {
  let completedTasks = data_task.filter((task) => {
    return task.completed === true;
  });
  let count = completedTasks.length;
  document.getElementById("completedCount").innerHTML = count;
}
