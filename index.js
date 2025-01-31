const {
  addTask,
  completeTask,
  deleteTask,
  editTask,
  listTasks,
  notCompleteTask,
  listTasksInProgress,
  notDoneTask,
  doneTask,
} = require('./taskManager');

const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  // CRUD de tareas desde el CLI
  case 'add':
    if (!arg) {
      console.log('❌ Debes escribir una tarea');
      return;
    } else {
      addTask(arg);
    }
    break;

  case 'edit':
    const edit = parseInt(arg);
    const description = process.argv[4];
    if (!arg || !description) {
      console.log('❌ Debes escribir un índice y una tarea');
      return;
    } else {
      editTask(edit, description);
    }
    break;

  case 'delete':
    const deleteTasks = parseInt(arg);
    if (!arg) {
      console.log('❌ Debes escribir un índice');
      return;
    } else {
      deleteTask(deleteTasks);
    }
    break;

  //Enumeraciones de tipo lista dependiendo el status y su estado
  case 'list':
    listTasks();
    break;

  case 'list-progress':
    listTasksInProgress();
    break;

  case 'list-not-done':
    notDoneTask();
    break;

  case 'list-done':
    doneTask();
    break;

  /**
   * Por defecto se pone el status en progreso, se cambia de status a completado o no completado
   */

  case 'complete':
    const complete = parseInt(arg);
    if (!arg) {
      console.log('❌ Debes escribir un índice');
      return;
    } else {
      completeTask(complete);
    }
    break;

  case 'not-complete':
    const notComplete = parseInt(arg);
    if (!arg) {
      console.log('❌ Debes escribir un índice');
      return;
    } else {
      notCompleteTask(notComplete);
    }
    break;

    // En caso de no saber que instrucciones se ponen, se deja ayuda

  case 'help':
    console.log('📌 Available commands:');
    console.log('   🟢  - add: Add a task');
    console.log('   🟢  - edit: Edit a task');
    console.log('   🟢  - delete: Delete a task');
    console.log('   🟢  - complete: Mark a task as completed');
    console.log('   🟢  - not-complete: Mark a task as not completed');
    console.log('   🟢  - list: List the tasks there are');
    console.log('   🟢  - list-progress: List tasks in progress');
    console.log('   🟢  - list-not-done: List tasks not completed');
    console.log('   🟢  - list-done: List completed tasks');
    break;
 // Opcion por defecto si no encuentra el comando
  default:
    console.log('❌ Comando no válido');
    break;
}
