    /* onLogin function */    
    $('#submit').click(function(){  
        var username = $('#username').val();  
        var password = $('#password').val();  
        
        if(username == '' || password == ''){  
            alert('All Fields are required!');
        }else{
            $.ajax({  
                url:"../php/login.php",  
                method:"POST",  
                data: $('#submit_form').serialize(),  
                success: function(response) {
                    var jsonData = JSON.parse(response);
                    if (jsonData.success){
                        alert("Successfully login ");
                        sessionStorage.setItem("account",response);
                        location.href = '../admin/pages/dashboard.html';
                    }else{
                        alert(jsonData.error_msg);
                    }
                  },
                  error: function() {
                    alert('System error: Ajax not working properly');
                  }  
            }); 
        }
    });  
    /* onLogin function */    


    /* onAdd function */    

