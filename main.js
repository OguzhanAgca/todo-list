const addBtn = document.querySelector("#addTodo");
const input = document.querySelector("#addTodosInput");
const cardBody = document.querySelectorAll(".card-body")[1];
const darkModeBtn = document.querySelector("#darkMode");
const list = document.querySelector(".list-group");

eventListeners();

const ui = new UI();
const restApi = new ServerSide();

function eventListeners(){
    addBtn.addEventListener("click",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    cardBody.addEventListener("click",deleteOneTodo);
    darkModeBtn.addEventListener("click",changeMode);
}

function pageLoaded(){
    restApi.getTodos()
    .then(todos=>ui.addTodosFromAPI(todos))
    .catch(err=>console.log(err));
}

function addTodo(e){
    let inputValue = input.value.trim();
    let Jsondata = {todoName:inputValue};

    if(inputValue === ""){
        ui.messageCard("danger","Please enter a valid value!")
        input.focus();
        input.classList.add("is-invalid");
    }else{
        let isSame = false;
        let arr = [];
        let todos;
        Array.from(list.children).forEach(liElement=>{
            todos = liElement.children[1].innerHTML.toLowerCase();
            arr.push(todos);
        });

        isSame = arr.includes(inputValue.toLowerCase());
        
        if(isSame){
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

function deleteOneTodo(e){
    if(e.target.className == "btn btn-outline-danger btn-sm"){
        let todoId = e.target.previousElementSibling.previousElementSibling.innerHTML;

        ui.deleteTodoToUI(e.target.parentElement);
        restApi.deleteTodo(todoId);
    }
}

function changeMode(){
    const mode = darkModeBtn.children[0].className;
    ui.changeUIMode(mode);
}