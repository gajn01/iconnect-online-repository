    const schoolModalButton = document.getElementById("school_submit_btn");
    const school_id_input = document.getElementById("school_id");
    const school_name_input = document.getElementById("school_name");
    const school_address_input = document.getElementById("school_address");
   
   /* onLogin function */ 
function onLogin() {
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
}
function onViewSchool() {
    $.ajax({  
        url:"../../php/onviewschool.php",  
        method:"GET",  
        data: "",  
        success: function(response) {
            var jsonData = JSON.parse(response);
            console.log(jsonData.data);
            if (jsonData.success){
                sessionStorage.setItem("school_list",response);
                var table = document.querySelector("table");
                var template;
                var ctr=0;
                jsonData.data.forEach(element => {
                        ctr = ctr + 1;
                        template = 
                    `<tr>
                        <td>${ctr}</td>
                        <td>${element.id}</td>
                        <td>${element.school_name}</td>
                        <td>${element.school_address}</td>
                        <td>
                            <span  data-bs-toggle="modal" data-bs-target="#schooModal" class="action-button" onClick="onClickEditSchool(${element.id})" >Edit</span> | <span class="action-button">Delete</span> 
                        </td>
                    </tr>`;
                    table.innerHTML += template;
                });
                
            }else{
                alert(jsonData.error_msg);
            }
        },
        error: function() {
            alert('System error: Ajax not working properly');
        }  
    }); 
    
}
function onClickAddSchoolModal() {
    schoolModalButton.innerText  = "Submit";
    school_name_input.value = "";
    school_address_input.innerText = "";
}
function onAddSchool() {
    if(school_name_input.val() == '' || school_address_input.val() == ''){  
        alert('All Fields are required!');
    }else{
        $.ajax({  
            url:"../../php/onaddschool.php",  
            method:"POST",  
            data: $('#school_form').serialize(),  
            success: function(response) {
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    alert(jsonData.success_msg);
                    location.href = '../pages/school.html';
                    onViewSchool();
                }else{
                    alert(jsonData.error_msg);
                }
                },
                error: function() {
                alert('System error: Ajax not working properly');
                }  
        }); 
    }
}   
function onClickEditSchool(id) {
    let school_list = sessionStorage.getItem("school_list");
    var jsonData = JSON.parse(school_list);
    schoolModalButton.innerText  = "Update";
    jsonData.data.forEach(element => {
        if(element.id == id){
            school_name_input.value = element.school_name;
            school_address_input.innerText = element.school_address;
            school_id_input.value = element.id
        }
    });
}
function onUpdateSchool() {
    if(school_name_input.val() == '' || school_address_input.val() == ''){  
        alert('All Fields are required!');
    }else{
        $.ajax({  
            url:"../../php/onupdateschool.php?id=2",  
            method:"POST",  
            data: $('#school_form').serialize(),  
            success: function(response) {
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    alert(jsonData.success_msg);
                    location.href = '../pages/school.html';
                    onViewSchool();
                }else{
                    alert(jsonData.error_msg);
                }
                },
                error: function() {
                alert('System error: Ajax not working properly');
                }  
        }); 
    }
}