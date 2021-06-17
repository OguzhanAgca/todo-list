class UI {
    constructor(){
        this.list = document.querySelector(".list-group");
        this.input = document.querySelector("#addTodosInput");
        this.wholeCard = document.querySelector(".card");
        this.darkModeBtn = document.querySelector("#darkMode");
        this.editArea = document.querySelector("#editArea");
        this.editInput = document.querySelector("#editTodo");
    }
    // Add to Page One Todo
    addTodoToUI(data){
        const mode = this.darkModeBtn.children[0].className;
        if(mode == "fas fa-sun"){
            this.list.innerHTML += `
            <li class="list-group-item d-flex align-items-center justify-content-between">
                <span style="display:none;">${data.id}</span>
                <span>${data.todoName}</span>
                <span>
                    <button class="btn btn-outline-primary btn-sm">Edit</button>
                    <button class="btn btn-outline-danger btn-sm">Delete</button>
                </span>
            </li>
            `;
        }else{
            this.list.innerHTML += `
            <li class="list-group-item list-group-item-dark d-flex align-items-center justify-content-between">
                <span style="display:none;">${data.id}</span>
                <span>${data.todoName}</span>
                <span>
                    <button class="btn btn-outline-primary btn-sm">Edit</button>
                    <button class="btn btn-outline-danger btn-sm">Delete</button>
                </span>
            </li>
            `;
        }
    }
    clearInput(){
        this.input.value = "";
        this.editInput.value = "";
    }
    messageCard(type,message){
        const div = document.createElement("DIV");
        div.className = `alert alert-${type}`;
        div.innerHTML = message;

        this.list.prepend(div);

        setTimeout(() => {
            div.remove();
        }, 2000);
    }
    // Get All Todo's and Upload to Page
    addTodosFromAPI(todos){
        todos.forEach(todo => {
            this.list.innerHTML += `
            <li class="list-group-item d-flex align-items-center justify-content-between">
                <span style="display:none;">${todo.id}</span>
                <span>${todo.todoName}</span>
                <span>
                    <button class="btn btn-outline-primary btn-sm">Edit</button>
                    <button class="btn btn-outline-danger btn-sm">Delete</button>
                </span>
            </li>
            `;
        });
    }
    // Delete One Todo Area
    deleteTodoToUI(parentElement){
        parentElement.remove();
        this.messageCard("success","Todo has been deleted successfully!");
    }
    // Dark Mode Area
    changeUIMode(mode){
        if(mode == "fas fa-sun"){
            document.body.style.backgroundColor = "#313438";
            this.wholeCard.style.backgroundColor = "#464c54";
            this.input.style.backgroundColor = "#bababa";
            this.editInput.style.backgroundColor = "#bababa";
            this.darkModeBtn.children[0].className = "far fa-moon";
            Array.from(this.list.children).forEach(liElement => liElement.classList.add("list-group-item-dark"));
        }else{
            document.body.style.backgroundColor = "white";
            this.wholeCard.style.backgroundColor = "white";
            this.input.style.backgroundColor = "white";
            this.darkModeBtn.children[0].className = "fas fa-sun";
            Array.from(this.list.children).forEach(liElement => liElement.classList.remove("list-group-item-dark"));
        }
    }
    // Update Todo Area
    openTheEditPanel(prevText){
        this.editArea.classList.toggle("d-none");
        
        this.editInput.value = prevText.innerHTML;
        this.editInput.focus();
    }
    updatePrevText(data){
        Array.from(this.list.children).filter(liElement=>{
            const id = liElement.firstElementChild.innerHTML;
            if(id == data.id){
                liElement.firstElementChild.nextElementSibling.innerHTML = data.todoName;
            }
        });
        console.log(data);
    }
}