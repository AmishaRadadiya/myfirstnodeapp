// import { uuidv4 } from "./uuid";

var pending = []
var completed = []
const url="http://127.0.0.1:5555/";
class todo{
    constructor(url){
        $.get(url , function(data){
            $("#pan h4").empty();
            $("#com h4").empty();
            pending =[];
            completed = [];
            $.each(data, function(key, val){
                if (val.Completed) {
                    completed.push(val);
                }
                else {
                    pending.push(val);
                }
        });
        newTodo.Pending();
        newTodo.Completed();
    })
    }
    Pending(){
        pending.forEach(val => {
            var todo = "";
            todo += `<div class = "${val.id} todo-item ">`
            todo += `<div class="one">`
            todo += `<input type="checkbox" id="${val.id}" onclick="checkbox('${val.id}','${val.title}','${val.description}')" class="check">`
            todo += `<ul style="list-style: none;">`;
            todo += `<li>` +val.title+ `</li>`;
            todo += `<li style="font-style: italic; font-weight: lighter;">` +val.description+ `</li>`;
            todo += `</ul>`;
            todo += `</div>`;
            todo += `<div class="two">`
            todo += `<i class="fa-sharp fa-solid fa-trash" id="${val.id}" onclick= "del('${val.id}')" >` + `</i>`
            todo += `</div>`;
            todo += `</div>`;
            $("#pan h4").append(todo);
        });
    }
     Completed(){
        completed.forEach(val => {
            var todo = "";
            todo += `<div class = "${val.id} todo-item" >`
            todo += `<div class="one">`
            todo += `<input type="checkbox" id="${val.id}" onclick="again('${val.id}','${val.title}','${val.description}')" class="check" checked>`
            todo += `<ul style="list-style: none;">`;
            todo += `<li>` +val.title+ `</li>`;
            todo += `<li style="font-style: italic; font-weight: lighter;">` +val.description+ `</li>`;
            todo += `</ul>`;
            todo += `</div>`;
            todo += `<div class="two">`
            todo += `<i class="fa-sharp fa-solid fa-trash" id="${val.id}" onclick= "del('${val.id}')" >` + `</i>`
            todo += `</div>`;
            todo += `</div>`;
            $("#com h4").append(todo);
        });
    }
     get(url){
        $.get(url , function(data){
            $("#pan h4").empty();
            $("#com h4").empty();
            pending =[];
            completed = [];
            $.each(data, function(key, val){
                // if (val.title === "" && val.description === "") {
                //     $("#first").text("Task Required")
                //     $("#second").text("Description Required")
                //   }
                //   else{
                    if (val.Completed) {
                        completed.push(val)
                    }
                    else {
                        pending.push(val)
                    }
                //   }
   
        })
        newTodo.Pending();
        newTodo.Completed();
    })
    } 
     del(id){
        $.ajax({
            url : url + id,
            type : "DELETE",
            success : function(){
                newTodo.get(url)
            }
        })
    }
     checkbox(id,title,description){
        if ($("input.check").is(':checked')) {
            var data = {
                id,
                title,
                description,
                Completed : true
            }
            $.ajax({
                url: url + id,
                method : "PUT",
                data : JSON.stringify(data),
                contentType : "application/json",
                success : function(data){
                        completed.push(data)
                newTodo.get(url)
                }
                })
        }  
        } 
         again(id,title,description){
            var pending = []
                            var data = {
                                id,
                                title,
                                description,
                                Completed : false
                        }
                        $.ajax({
                            url: url + id,
                            method : "PUT",
                            data : JSON.stringify(data),
                            contentType : "application/json",
                            success : function(data){
                                    pending.push(data)
                              newTodo.get(url)
                            }
                            })
                        }
     post(url){
            var data = {
                id : "",
                title : $("#task").val(),
                description: $("#des").val(),
                Completed : false
            }
            $.ajax({
                url: url,
                method : "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(){
                        $("#pan h4").empty()
                        $("#task").val('')
                        $("#des").val('')
                        $("#task").focus()
                        newTodo.get(url);
                        newTodo.Pending();
                }
        })
    }
}
const newTodo = new todo(url)
$("#Addtask").click(function(e){
    console.log("Clicked..")
    e.preventDefault();
    var data = {
        id : "",
        title : $("#task").val(),
        description: $("#des").val(),
        Completed : false
    }
    if (data.title == "" && data.description == "") {
      $("#first").text("*Task Required")
      $("#second").text("*Description Required")
    }
    else if (data.title == "") {
        $("#first").text("*Task Required")
        $("#second").text("")
    }
    else if (data.description == "") {
        $("#second").text("*Description Required")
        $("#first").text(" ")
    }
    else{  

        // newTodo.get(url)
        newTodo.post(url);
        $("#first").text(" ")
        $("#second").text(" ")
    }

    // newTodo.get(url)
    
})

function del(id){
    newTodo.del(id)
}

function checkbox(id,title,description){
    newTodo.checkbox(id,title,description)
}
function again(id,title,description){
    newTodo.again(id,title,description)
}

