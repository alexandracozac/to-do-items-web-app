window.ToDoList = {

    API_URL: "http://localhost:8081/to-do-items",

    getItems: function () {
        $.ajax({
            url: ToDoList.API_URL,
            method: "GET"
        }).done(function (response) {
            console.log("GET done");
            console.log(response);

            ToDoList.displayItems(JSON.parse(response));

        });
    },


    displayItems: function (items) {
        var tableContent = '';
        items.forEach(item => tableContent += ToDoList.getItemTableRow(item));

        $("#to-do-items tbody").html(tableContent);


    },

    createItem: function(){
        let description = $("#description-field").val();
        let deadline = $("#deadline-field").val();


        var requestBody={

            description: descriptionValue,
            deadline: deadlineValue

        };

        $.ajax({
            url: ToDoList.API_URL,
            method: "POST",
            //MIME type
            contentType: "application/json",
            data: JSON.stringify(requestBody)


        }).done(function() {
            ToDoList.getItems();
        })

    },




    getItemTableRow: function(item){
        //spread
        var deadline = new Date(...item.deadline).toLocaleDateString("en");

        var checkedAttribute = item.done ? "checked" : ""; //ternary operator

        return `<tr>
            <td>$(item.description)</td>
            <td>$(item.deadline)</td>
            <td><input class="mark-done" data-id="($item.id)" type="checkbox"/></td>
            <td><a class="delete-item" data-id="$item.id" href="#"><i class="fas fa-trash-alt"></i></a></td>
        </tr>
`
    },

    bindEvents: function () {

        $("#create-item-form").submit(function (event){
            event.preventDefault();

            ToDoList.createItem();

        })

    }





}

ToDoList.getItems();
ToDoList.bindEvents();