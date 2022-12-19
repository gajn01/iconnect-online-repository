const school_id_input = document.getElementById("school_id");
const school_name_input = document.getElementById("school_name");
const school_address_input = document.getElementById("school_address");

const subject_id_input = document.getElementById("subject_id");
const subject_name_input = document.getElementById("subject_name");
const subject_description_input = document.getElementById("subject_description");


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
function goToSIgnup() {
    location.href = '../user/pages/signup.html';
}
function goToLogin() {
    location.href = '../index.html';
}


function onLogout() {
    let text = "Are you sure you want to logout?";
    if (confirm(text)) {
        sessionStorage.removeItem("account");
        location.href = '../index.php';
    }
}
/* ADMIN */
/* School  Function */
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
                                <span  data-bs-toggle="modal" data-bs-target="#schooModal" class="action-button" onClick="onClickEditSchool(${element.id})" >Edit</span> | <span class="action-button" onClick="onClickDeleteSchool(${element.id})">Delete</span> 
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
    function onGenerateListSchool(data) {

    }
    function onGenerateDropListSchool(data) {
        data.forEach(element => {
            var select = document.getElementById('school');
            var opt = document.createElement('option');
            opt.value = element.id;
            opt.innerHTML = element.school_name;
        
            select.appendChild(opt);
        });
    }
    function onClickAddSchoolModal() {
        document.getElementById("school_submit_btn_update").style.display="none";
        document.getElementById("school_submit_btn_add").style.display="block";
        school_name_input.value = "";
        school_address_input.innerText = "";
    }
    function onClickEditSchool(id) {
        let school_list = sessionStorage.getItem("school_list");
        var jsonData = JSON.parse(school_list);
        document.getElementById("school_submit_btn_update").style.display="block";
        document.getElementById("school_submit_btn_add").style.display="none";
        jsonData.data.forEach(element => {
            if(element.id == id){
                school_name_input.value = element.school_name;
                school_address_input.innerText = element.school_address;
                school_id_input.value = element.id
            }
        });
    }
    function onClickDeleteSchool(id) {
        let text = "Do you want to delete the record?";
        if (confirm(text)) {
            onDeleteSchool(id);
        }
    }
    function onAddSchool() {
        var school_name = $('#school_name').val();
        var school_address = $('#school_address').val();

        if(school_name == '' || school_address == ''){  
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
    function onUpdateSchool() {
        var school_name = $('#school_name').val();
        var school_address = $('#school_address').val();
        if(school_name == '' || school_address == ''){  
            alert('All Fields are required!');
        }else{
            $.ajax({  
                url:"../../php/onupdateschool.php",  
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
    function onDeleteSchool(id) {
        $.ajax({  
            url:"../../php/ondeleteschool.php",  
            method:"POST",  
            data: { school_id : id },  
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
    /* Subject  Function */
    function onViewSubject() {
        $.ajax({  
            url:"../../php/onviewsubject.php",  
            method:"GET",  
            data: "",  
            success: function(response) {
                var jsonData = JSON.parse(response);
                var table = document.querySelector("table");
                var template;
                if (jsonData.success){
                    console.log('subejct:',response);
                    sessionStorage.setItem("subject_list",response);
                    var ctr=0;
                    jsonData.data.forEach(element => {
                            ctr = ctr + 1;
                            template = 
                        `<tr>
                            <td>${ctr}</td>
                            <td>${element.id}</td>
                            <td>${element.subject_name}</td>
                            <td>${element.subject_description}</td>
                            <td>
                                <span  data-bs-toggle="modal" data-bs-target="#subjectModal" class="action-button" onClick="onClickEditSubject(${element.id})" >Edit</span> | <span class="action-button" onClick="onClickDeleteSubject(${element.id})">Delete</span> 
                            </td>
                        </tr>`;
                        table.innerHTML += template;
                    });
                    
                }else{
                    /* alert(jsonData.error_msg); */
                    template = 
                        `<tr >
                            <td colspan="5" >${jsonData.error_msg}</td>
                        </tr>`;
                    table.innerHTML += template;
                }
            },
            error: function() {
                alert('System error: Ajax not working properly');
            }  
        }); 
    }
    function onClickAddSubjectModal() {
        document.getElementById("subject_submit_btn_update").style.display="none";
        document.getElementById("subject_submit_btn_add").style.display="block";
        subject_name_input.value = "";
        subject_description_input.innerText = "";
    }
    function onClickEditSubject(id) {
        let subject_list = sessionStorage.getItem("subject_list");
        var jsonData = JSON.parse(subject_list);
        document.getElementById("subject_submit_btn_update").style.display="block";
        document.getElementById("subject_submit_btn_add").style.display="none";
        jsonData.data.forEach(element => {
            if(element.id == id){
                subject_name_input.value = element.subject_name;
                subject_description_input.innerText = element.subject_description;
                subject_id_input.value = element.id
            }
        });
    }
    function onClickDeleteSubject(id) {
        let text = "Do you want to delete the record?";
        if (confirm(text)) {
            onDeleteSubject(id);
        }
    }
    function onAddSubject() {
        var subject_name = $('#subject_name').val();
        var subject_description = $('#subject_description').val();
        if(subject_name == '' || subject_description == ''){  
            alert('All Fields are required!');
        }else{
            $.ajax({  
                url:"../../php/onaddsubject.php",  
                method:"POST",  
                data: $('#subject_form').serialize(),  
                success: function(response) {
                    console.log('resL:',response);
                    var jsonData = JSON.parse(response);
                    if (jsonData.success){
                        alert(jsonData.success_msg);
                        location.href = '../pages/subject.html';
                        onViewSubject();
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
    function onUpdateSubject() {
        var subject_name = $('#subject_name').val();
        var subject_description = $('#subject_description').val();
        if(subject_name == '' || subject_description == ''){  
            alert('All Fields are required!');
        }else{
            $.ajax({  
                url:"../../php/onupdatesubject.php",  
                method:"POST",  
                data: $('#subject_form').serialize(),  
                success: function(response) {
                    console.log('res:',response);
                    var jsonData = JSON.parse(response);
                    if (jsonData.success){
                        alert(jsonData.success_msg);
                        location.href = '../pages/subject.html';
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
    function onDeleteSubject(id) {
        $.ajax({  
            url:"../../php/ondeletesubject.php",  
            method:"POST",  
            data: { subject_id : id },  
            success: function(response) {
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    alert(jsonData.success_msg);
                    location.href = '../pages/subject.html';
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
/* ADMIN */
function onSignUp() {
    var username = $('#username').val();
    var password = $('#password').val();
    var confirm_password = $('#confirm_password').val();
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var gender = $('#gender').val();
    var age = $('#age').val();

    if(school_name == '' || school_address == ''){  
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

/* USER */


/* USER */



