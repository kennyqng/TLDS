$(document).ready(function(){
    
    $.ajax({

        url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyNzIzOX0',
        type: 'GET',
        dataType: 'json',

        success: function(data){
            console.log(data);
        }
    })
})