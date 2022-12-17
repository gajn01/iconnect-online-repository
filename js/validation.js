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
                    alert(jsonData.success);

                 /*    if (jsonData.success == "1")
                    {
                        location.href = '../admin/pages/dashboard.html';
                    } */



                    /* if (jsonData.success == "1")
                    {
                        location.href = '../admin/pages/dashboard.html';
                    }
                    else
                    {
                        alert('Invalid Credentials!');
                    } */
                   
                  },
                  error: function() {
                    alert('There was some error performing the AJAX call!');
                  }  
            }); 
        }
    });  
});  



/* $(document).ready(function(){  
    $('#submit').click(function(){  
        var email = $('#username').val();  
        var message = $('#password').val();  
        if(email == '' || message == ''){  
            $('#error_message').html("All Fields are required");
            $('.toast').toast('show');
        }else{  
            $.ajax({  
                url:"insert.php",  
                method:"POST",  
                data:{email:email, message:message},  
                success:function(data){
                    $('.toast').toast('show');
                    $('#error_message').html(data);  
                }  
            });  
        }  
    });  
});  
 */