let root= document.getElementById('root');
let formgroup= document.querySelector('.form-group');
let tasks= document.getElementById('tasks');
let alert1= document.querySelector('#alert1');
let btnadd= document.getElementById('btnadd');
let todolistcontainer= document.getElementById('todolistcontainer');
let tempTodoList = localStorage.getItem('todolist');
let todolist =tempTodoList && tempTodoList !== '' ? JSON.parse(tempTodoList): [];
 alert1.hidden = true;
 

 function alertmethod()
 {
    if (tasks.value.trim() === "")
    {
    alert1.hidden = false;
    alert1.textContent="Must contain some text";
    
    } else if (tasks.value.length>10) {
        alert1.hidden = false;
        alert1.textContent="Text must not exceed 50 characters"
    }
    else{
        alert1.hidden = true;
    }
 }

// const renderTodoList=() =>{
//     let todo = '';
//     todolist.forEach((task,i) => {
//         todo += "<p>" +(i+1)  + ":" + task + " <button class=btn1 onclick=\"onEdit(" + i + ")\">Edit</button> <button class=btn1 onclick=\"onDel(" + i + ")\">Delete</button></p>";
//     });
//     todolistcontainer.innerHTML = todo;
//  };

const renderTodoList = () => {
    let todo = '';
    todolist.forEach((task, i) => {
        todo += `<div class="todo-item">
                    <span class="todo-text">${i+1}: ${task}</span>
                    <div class="todo-buttons">
                        <button class="btn1" onclick="onEdit(${i})">Edit</button>
                        <button class="btn1" onclick="onDel(${i})">Delete</button>
                    </div>
                </div>`;
    });
    todolistcontainer.innerHTML = todo;
};

btnadd.addEventListener('click',(event)=>{
  
    alertmethod();
    if (!alert1.hidden) return; 

    if (btnadd.textContent === "Update") {
        const editIndex = btnadd.dataset.editIndex;
        todolist[editIndex] = tasks.value;
    } else {
        // If it's not, add a new task to the todo list
        todolist.push(tasks.value);
    }

  //  todolist.push(tasks.value);
   localStorage.setItem('todolist',JSON.stringify(todolist));
    renderTodoList();
    tasks.value = ''; 
    btnadd.textContent = "Add";
})

const onDel =(index)=>{
    todolist.splice(index, 1);
    renderTodoList();
};

const onEdit =(index)=>{
    tasks.value = todolist[index];
    btnadd.textContent ="Update";
    // todolist.splice(index,1);
    btnadd.dataset.editIndex = index;
    renderTodoList();
};

renderTodoList();

formgroup.appendChild(tasks);
formgroup.appendChild(btnadd);
formgroup.appendChild(alert1);
root.appendChild(todolistcontainer);
 