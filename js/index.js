// Select the Task Form
let taskManager = new TaskManager(0);
// Load task object from local storage 
if(localStorage.getItem('tasks')) {
    taskManager.load();
} else {
  taskManager = new TaskManager(0);  
};

const newTaskForm = document.querySelector('#TaskForm');

// Add an 'onsave' event listener
newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action of refreshing the screen
    event.preventDefault();
   
      // Select the input fields
    const TaskNameInput = document.querySelector('#TaskName');
    const TaskPriority = document.querySelector('#TaskPriority');
    const TaskDescription = document.querySelector('#TaskDesc');
    const TaskAssignedTo = document.querySelector('#TaskAssignedto');
    const TaskStatus = document.querySelector('#TaskStatus');
    const TaskComment = document.querySelector('#TaskComment');
    const TaskDueDate = document.querySelector('#TaskDate');
    
    let errorMessage = document.querySelector('#alertMesg');
           
    const taskname = TaskNameInput.value;
    const priority = TaskPriority.value;
    const description = TaskDescription.value;
    const assignedto = TaskAssignedTo.value;
    const taskstatus = TaskStatus.value;
    const comment = TaskComment.value;
    const duedate = TaskDueDate.value;
    var varDate = new Date(duedate); //dd-mm-YYYY
    var today = new Date();
    today.setHours(0,0,0,0);
     
     /*  Validation code for input fields*/

    if(!validFormFieldInput(TaskNameInput.value)){
        errorMessage.innerHTML = "Please Enter a Valid Task Name";
        errorMessage.style.display = "block";
        }
    else if(!validFormFieldInput(TaskPriority.value)){
               
            errorMessage.innerHTML = "Please Select a Task Priority";
    
            errorMessage.style.display = "block";
        }    
    else if(!validFormFieldInput(TaskDescription.value)){
               
                errorMessage.innerHTML = "Please Enter a Valid Task Description";
        
                errorMessage.style.display = "block";
            }
    else if(!validFormFieldInput(TaskAssignedTo.value)){
                errorMessage.innerHTML = "Please Enter a Valid Task Assignee";
                errorMessage.style.display = "block";
                }
    else if(!validFormFieldInput(TaskStatus.value)){
               
                    errorMessage.innerHTML = "Please Select a Task Status";
            
                    errorMessage.style.display = "block";
                }
    else if(!validFormFieldInput(TaskDueDate.value)){
                    errorMessage.innerHTML = "Please Enter/Select a Valid Task Due Date"
                        errorMessage.style.display = "block";
                    }
     else if (varDate < today){
                  
                    errorMessage.innerHTML = "Please Enter/Select Task Due Date greater than or equal to today"
                    errorMessage.style.display = "block";
                  }
    else{
            errorMessage.style.display = "none";
            //Get the Javascript object new Date, give it the argument duedate, and assign it to a variable
            const taskDate = new Date(TaskDueDate.value);
             // Format date to be dd/mm/yyyy
            const formattedDate = taskDate.getDate() + '/' + (taskDate.getMonth() + 1) + '/' + taskDate.getFullYear();
            // Add the task
            taskManager.addTask(taskname,priority,description,assignedto,taskstatus,comment,formattedDate);
            taskManager.save();
            event.target.reset();

            
        }
   // Render the tasks
   taskManager.render(); 
     
});


// Check to see the input data enetered is not null
function validFormFieldInput(data){
        return data !== null && data !== '';
};

/* Update status */
const taskCard = document.querySelector('#task-card');

// Add an 'onclick' event listener to the Tasks List
taskCard.addEventListener('click', (event) => {
  // Get the parent Task
 const parentTask = event.target.parentElement.parentElement;

  // Get the taskId of the parent Task.
   taskId = Number(parentTask.dataset.taskId);
    
  // Check if a "Mark As done" button was clicked
    if (event.target.classList.contains('done-button')) {
        
       // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);
  
        // Update the task status to 'DONE'
         task.status = "Done";
       
           
    }
     // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
      //smitha
      let result = confirm("Are you sure you Want to delete this task?");
      if (result) {
    //Logic to delete the item

      // Delete the task
      taskManager.deleteTask(taskId);
      
      }
  }

   // Save the tasks to localStorage
   taskManager.save();

 
  // Render the tasks
  taskManager.render();

  });

