class UI {
    constructor(){
        this.list = document.querySelector(".list-group");
        this.input = document.querySelector("#addTodosInput");
        this.wholeCard = document.querySelector(".card");
        this.darkModeBtn = document.querySelector("#darkMode");
        this.editArea = document.querySelector("#editArea");
        this.editInput = document.querySelector("#editTodo");
        this.searchArea = document.querySelector("#searchArea");
        this.searchInput = document.querySelector("#searchTodo");
    }
    newListItem(data,mode){
        if(Array.isArray(data)){
            data.forEach(data => {
                this.list.innerHTML += `
                <li class="list-group-item ${mode === "enabled" ? "list-group-item-dark" : ""} d-flex align-items-center justify-content-between">
                    <span style="display:none;">${data.id}</span>
                    <span>${data.todoName}</span>
                    <span>
                        <button class="btn btn-outline-primary btn-sm">Edit</button>
                        <button class="btn btn-outline-danger btn-sm">Delete</button>
                    </span>
                </li>
                `;
            });
        }else{
            this.list.innerHTML += `
            <li class="list-group-item ${mode === "enabled" ? "list-group-item-dark" : ""} d-flex align-items-center justify-content-between">
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
    // Add to Page One Todo
    addTodoToUI(data){
        darkMode = localStorage.getItem("darkMode");
        if(darkMode !== "enabled"){
            this.newListItem(data,darkMode);
        }else{
            this.newListItem(data,darkMode);
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
        darkMode = localStorage.getItem("darkMode");
        if(darkMode !== "enabled"){
            this.newListItem(todos,darkMode);
        }else{
            this.newListItem(todos,darkMode);
        }
    }
    // Delete One Todo Area
    deleteTodoToUI(parentElement){
        parentElement.remove();
        this.messageCard("success","Todo has been deleted successfully!");
    }
    // Dark Mode Area
    enableDarkMode(){
        document.body.style.backgroundColor = "#313438";
        this.wholeCard.style.backgroundColor = "#464c54";
        this.input.style.backgroundColor = "#bababa";
        this.editInput.style.backgroundColor = "#bababa";
        this.searchInput.style.backgroundColor = "#bababa";
        this.darkModeBtn.children[0].className = "far fa-moon";
        Array.from(this.list.children).forEach(liElement => liElement.classList.add("list-group-item-dark"));

        localStorage.setItem("darkMode","enabled");
    }
    disableDarkMode(){
        document.body.style.backgroundColor = "white";
        this.wholeCard.style.backgroundColor = "white";
        this.input.style.backgroundColor = "white";
        this.editInput.style.backgroundColor = "white";
        this.searchInput.style.backgroundColor = "white";
        this.darkModeBtn.children[0].className = "fas fa-sun";
        Array.from(this.list.children).forEach(liElement => liElement.classList.remove("list-group-item-dark"));

        localStorage.setItem("darkMode",null);
    }
    changeUIMode(){
        darkMode = localStorage.getItem("darkMode");
        
        if(darkMode == "enabled"){
            this.disableDarkMode();
        }else{
            this.enableDarkMode();
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
    }
    // Search Todo Area
    openTheSearchPanel(){
        this.searchArea.classList.toggle("d-none");
        this.searchInput.focus();
    }
    filterTodos(){
        const searchInputValue = this.searchInput.value.trim().toLowerCase();
        const listItems = document.querySelectorAll(".list-group-item");
        
        listItems.forEach(listItem => {
            const text = listItem.textContent.toLowerCase();
            if(text.indexOf(searchInputValue) === -1){
                listItem.classList.add("d-none");
            }else{
                listItem.classList.remove("d-none");
            }
        });
    }
}