$(document).ready(function(){  
    /* onLogin function */    
    $('#submit').click(function(){  
        var username = $('#username').val();  
        var password = $('#password').val();  
        if(username == '' || password == ''){  
            console.log('error');
            alert('All Fields are required!');
        }else{
            $.ajax({  
                url:"../php/login.php",  
                method:"POST",  
                data:{
                    username:username, 
                    password:password
                },  
                success: function(response) {
                    var jsonData = JSON.parse(response);
                    if (jsonData.success == "1")
                    {
                        alert("Successfully login ");
                        sessionStorage.setItem("account",response);
                        location.href = '../admin/pages/dashboard.html';
                    }else{
                        alert('Invalid Credentials!');
                    }
                  },
                  error: function() {
                    alert('System error: Ajax not working properly');
                  }  
            }); 
        }
    });  
});  