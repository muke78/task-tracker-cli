const fs = require('fs');
const path = require('path');
const { controlDate } = require('./dateManager');
const { getStatusEmoji } = require('./statusManager');

const dbPath = path.join(__dirname, 'db.json');

// Cargar  tareas desde el archivo db.json
const loadTask = () => {
  if (!fs.existsSync(dbPath)) return [];
  const data = fs.readFileSync(dbPath, 'utf-8');
  return data ? JSON.parse(data) : [];
};

// Guardar tareas en el archivo
const saveTask = (task) => {
  fs.writeFileSync(dbPath, JSON.stringify(task, null, 2));
};

//Listar tareas
const listTasks = () => {
  const task = loadTask();
  if (task.length === 0) {
    console.log('No hay tareas pendientes 🗑️');
  } else {
    console.table(
      task.map((task, index) => ({
        '#ID': index + 1,
        Description: task.description,
        State: getStatusEmoji(task.status),
        Created: task.createAt.split('T')[0],
        Update: task.updateAt.split('T')[0],
      }))
    );
  }
};

// Agregar una tarea
const addTask = (description) => {
  const task = loadTask();
  const date = controlDate();
  const newTask = {
    id: Date.now(),
    description,
    status: {
      TaskThataAreDone: false,
      TasksThatAreNotDone: false,
      TasksThatAreInProgress: true,
    },
    createAt: date,
    updateAt: date,
  };
  task.push(newTask);
  saveTask(task);
  console.log(`✅ La tarea "${description}" ha sido creada`);
};

// Editar una tarea
const editTask = (index, description) => {
  const task = loadTask();
  const date = controlDate();
  if (index < 1 || index > task.length) {
    console.log('❌ Índice no válido.');
    return;
  }
  task[index - 1].description = description;
  task[index - 1].updateAt = date;
  saveTask(task);
  console.log(`✅ Tarea editada: "${description}"`);
};

// Eliminar una tarea
const deleteTask = (index) => {
  const task = loadTask();
  const indexDelete = index;
  if (index < 1 || index > task.length) {
    console.log('❌ Índice no válido.');
    return;
  }
  const deletedTask = task.splice(index - 1, 1);
  saveTask(task);
  console.table(
    deletedTask.map(() => ({
      '#ID': indexDelete,
      Descripción: `❌ Tarea eliminada: "${deletedTask[0].description}"`,
    }))
  );
};

// Marcar una tarea como completada
const completeTask = (index) => {
  const task = loadTask();
  if (index < 1 || index > task.length) {
    console.log('❌ Índice no válido.');
    return;
  }
  task[index - 1].status.TasksThatAreInProgress = false;
  if (task[index - 1].status.TasksThatAreNotDone) {
    task[index - 1].status.TasksThatAreNotDone = false;
  }
  task[index - 1].status.TaskThataAreDone = true;
  saveTask(task);
  console.table(`✅ Task completed : "${task[index - 1].description}"`);
};

// Marcar una tarea como no completada
const notCompleteTask = (index) => {
  const task = loadTask();
  if (index < 1 || index > task.length) {
    console.log('❌ Índice no válido.');
    return;
  }
  task[index - 1].status.TasksThatAreInProgress = false;
  if (task[index - 1].status.TaskThataAreDone) {
    task[index - 1].status.TaskThataAreDone = false;
  }
  task[index - 1].status.TasksThatAreNotDone = true;
  saveTask(task);
  console.table(`✅ Task not completed: "${task[index - 1].description}"`);
};

//Enumerar las tareas en proceso
const listTasksInProgress = () => {
  const task = loadTask();
  const taskInProgress = task.filter(
    (task) => task.status.TasksThatAreInProgress
  );
  if (taskInProgress.length === 0) {
    console.log('No tasks in progress 🔄');
  } else {
    console.table(
      taskInProgress.map((task, index) => ({
        '#ID': index + 1,
        Description: task.description,
        State: getStatusEmoji(task.status),
        Created: task.createAt.split('T')[0],
        Update: task.updateAt.split('T')[0],
      }))
    );
  }
};

//Enumerar las tareas no hechas
const notDoneTask = () => {
  const task = loadTask();
  const taskNotDone = task.filter((task) => task.status.TasksThatAreNotDone);
  if (taskNotDone.length === 0) {
    console.log('There are no undone tasks ❌');
  } else {
    console.table(
      taskNotDone.map((task, index) => ({
        '#ID': index + 1,
        Description: task.description,
        State: getStatusEmoji(task.status),
        Created: task.createAt.split('T')[0],
        Update: task.updateAt.split('T')[0],
      }))
    );
  }
};

//Enumerar las tareas hechas
const doneTask = () => {
  const task = loadTask();
  const taskDone = task.filter((task) => task.status.TaskThataAreDone);
  if (taskDone.length === 0) {
    console.log('No tasks done ✅');
  } else {
    console.table(
      taskDone.map((task, index) => ({
        '#ID': index + 1,
        Description: task.description,
        State: getStatusEmoji(task.status),
        Created: task.createAt.split('T')[0],
        Update: task.updateAt.split('T')[0],
      }))
    );
  }
};

module.exports = {
  listTasks,
  addTask,
  editTask,
  deleteTask,
  completeTask,
  notCompleteTask,
  listTasksInProgress,
  notDoneTask,
  doneTask,
};
