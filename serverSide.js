class ServerSide {
    constructor(){
        this.url = "http://localhost:3000/todos";
    }
    
    async getTodos(){
        const response = await fetch(this.url);
        const todoData = await response.json();
        return todoData;
    }
    
    async postTodo(data){
        const response = await fetch(this.url,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const responseData = await response.json();
        return responseData;
    }

    async deleteTodo(id){
        await fetch(this.url+"/"+id,{method:'DELETE'});
    }

    async putTodo(id,data){
        const response = await fetch(this.url+"/"+id,{
            method:'PUT',
            body:JSON.stringify(data),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const responseData = await response.json();
        return responseData;
    }
}