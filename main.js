// Todo Enter Area
const addBtn = document.querySelector("#addTodo");
const input = document.querySelector("#addTodosInput");
const cardBody = document.querySelectorAll(".card-body")[1];
const darkModeBtn = document.querySelector("#darkMode");
const list = document.querySelector(".list-group");

// Todo Edit Area
const closeEditTodo = document.querySelector("#closeEditTodo");
const editArea = document.querySelector("#editArea");
const editTodoBtn = document.querySelector("#editTodoBtn");
const editInput = document.querySelector("#editTodo");

// Search Todo Area
const searchTodoBtn = document.querySelector("#searchTodoBtn");
const searchInput = document.querySelector("#searchTodo");

eventListeners();

const ui = new UI();
const restApi = new ServerSide();

function eventListeners(){
    addBtn.addEventListener("click",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    cardBody.addEventListener("click",deleteOrEditTodo);
    darkModeBtn.addEventListener("click",changeMode);
    closeEditTodo.addEventListener("click",closeEditArea);
    editTodoBtn.addEventListener("click",editTodo);
    searchTodoBtn.addEventListener("click",searchTodo);
    searchInput.addEventListener("keyup",keyUpSearchInput);
}

let darkMode;
function pageLoaded(){
    restApi.getTodos()
    .then(todos=>ui.addTodosFromAPI(todos))
    .catch(err=>console.log(err));

    // For Dark-Mode
    darkMode = localStorage.getItem("darkMode");
    if(darkMode === "enabled"){
        ui.enableDarkMode();
    }
}

function addTodo(e){
    let inputValue = input.value.trim();
    let Jsondata = {todoName:inputValue};

    if(inputValue === ""){
        ui.messageCard("danger","Please enter a valid value!")
        input.focus();
        input.classList.add("is-invalid");
    }else{
        if(sameTodoControl(inputValue)){
            ui.messageCard("danger",`Please enter another Todo. You have "<b>${inputValue}</b>" on your list!`);
        }else{
            restApi.postTodo(Jsondata)
            .then(data=>{
                ui.addTodoToUI(data);
                ui.messageCard("success","Todo has been successfully added!");
                input.classList.remove("is-invalid");
            })
            .catch(err=>console.log(err));
        }
    }
    
    ui.clearInput();
    e.preventDefault();
}

function sameTodoControl(inputValue){
    let isSame = false;
    let arr = [];
    let todos;
    Array.from(list.children).forEach(liElement=>{
        todos = liElement.children[1].innerHTML.toLowerCase();
        arr.push(todos);
    });

    isSame = arr.includes(inputValue.toLowerCase());

    return isSame;
}

var todoId;

function deleteOrEditTodo(e){
    // Get id For delete
    todoId = e.target.parentElement.parentElement.firstElementChild.innerHTML;

    if(e.target.className == "btn btn-outline-danger btn-sm"){
        let liElement = e.target.parentElement.parentElement;

        ui.deleteTodoToUI(liElement);
        restApi.deleteTodo(todoId);
    }else if(e.target.className == "btn btn-outline-primary btn-sm"){
        const todoText = e.target.parentElement.previousElementSibling;

        ui.openTheEditPanel(todoText);
    }
}

function changeMode(){
    ui.changeUIMode();
}

function closeEditArea(){
    editArea.classList.add("d-none");
}

function editTodo(){
    const editInputValue = editInput.value.trim();

    if(sameTodoControl(editInputValue)){
        ui.messageCard("danger",`Please enter another Todo. You have "<b>${editInputValue}</b>" on your list!`);
    }else{
        restApi.putTodo(todoId,{todoName:editInputValue})
        .then(data=>{
            ui.updatePrevText(data);
            ui.messageCard("success",`Todo has been successfully updated with: "<b>${data.todoName}</b>"!`);
        })
        .catch(err=>console.log(err));

        closeEditArea();
    }

    ui.clearInput();
}

function searchTodo(){
    ui.openTheSearchPanel();
}

function keyUpSearchInput(){
    ui.filterTodos();
}