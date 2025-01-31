export const getStatusEmoji = (status) => {
    if (status.TaskThataAreDone) {
      return 'Task done ✔'; 
    } else if (status.TasksThatAreNotDone) {
      return 'Task not done ❌'; 
    } else if (status.TasksThatAreInProgress) {
      return 'In Progress 🔄'; 
    } else {
      return ''; 
    }
  };