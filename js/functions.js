/* School fields */
const school_id_input = document.getElementById("school_id");
const school_name_input = document.getElementById("school_name");
const school_address_input = document.getElementById("school_address");
/* Subject fields */
const subject_id_input = document.getElementById("subject_id");
const subject_name_input = document.getElementById("subject_name");
const subject_description_input = document.getElementById("subject_description");
/* Request fields */
const firstname_input = document.getElementById("firstname");
const firstname_teacher_input = document.getElementById("firstname_teacher");

const lastname_input = document.getElementById("lastname");
const gender_input = document.getElementById("gender");
const age_input = document.getElementById("age");
const birthdate_input = document.getElementById("birthdate");
const mobile_number_input = document.getElementById("mobile_number");
const email_input = document.getElementById("email");
const address_input = document.getElementById("address");
const rank_input = document.getElementById("rank");
const school_input = document.getElementById("school");
const status_input = document.getElementById("status");
const request_id_input = document.getElementById("request_id");

/* Module fields */
const module_title_input = document.getElementById("module_title");
const grade_level_input = document.getElementById("grade_level");
const module_description_input = document.getElementById("module_description");



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
    function onGenerateDropListSchool(data) {
        data.forEach(element => {
            var select = document.getElementById('school');
            var opt = document.createElement('option');
            opt.value = element.id;
            opt.innerHTML = element.school_name;
        
            select.appendChild(opt);
        });
    }
/* School  Function */
    function onViewSchool() {
        $.ajax({  
            url:"../../php/onviewschool.php",  
            method:"GET",  
            data: "",  
            success: function(response) {
                sessionStorage.removeItem("school_list");
                var jsonData = JSON.parse(response);
                console.log(jsonData.data);
                if (jsonData.success){
                    sessionStorage.setItem("school_list",response);
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
        var table = document.querySelector("table");
        var template;
        var ctr=0;
        data.forEach(element => {
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
                        onViewSchool();
                        alert(jsonData.success_msg);
                        location.href = '../pages/school.html';
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
                        onViewSchool();
                        alert(jsonData.success_msg);
                        location.href = '../pages/school.html';
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
                    onViewSchool();
                    alert(jsonData.success_msg);
                    location.href = '../pages/school.html';
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
                sessionStorage.removeItem("subject_list");
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    sessionStorage.setItem("subject_list",response);
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
    function onGenerateListSubject(data) {
        var table = document.querySelector("table");
        var template;
        var ctr=0;
        data.forEach(element => {
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
    /* Request Function */
    function onViewRequest() {
        $.ajax({  
            url:"../../php/onviewrequest.php",  
            method:"POST",  
            data: {status_id: 0},  
            success: function(response) {
                sessionStorage.removeItem("request_list");
                var jsonData = JSON.parse(response);
                var table = document.querySelector("table");
                var template;
                if (jsonData.success){
                    console.log('request:',response);
                    sessionStorage.setItem("request_list",response);
                }else{
                    /* alert(jsonData.error_msg); */
                    template = 
                        `<tr >
                            <td colspan="9" >${jsonData.error_msg}</td>
                        </tr>`;
                    table.innerHTML += template;
                }
            },
            error: function() {
                alert('System error: Ajax not working properly');
            }  
        }); 
    }
    function onGenerateListRequest(data) {
        var table = document.querySelector("table");
        var template;
        var ctr=0;
        data.forEach(element => {
            ctr = ctr + 1;
            var status;
            if(element.status == 0){
                status ="Pending";
            }else if(element.status == 1){
                status = "Approved";
            }
            template = 
                `<tr>
                    <td>${ctr}</td>
                    <td>${element.account_id}</td>
                    <td>${element.firstname+' '+element.lastname}</td>
                    <td>${element.age}</td>
                    <td>${element.gender}</td>
                    <td>${element.school_name}</td>
                    <td>${element.rank}</td>
                    <td>${status}</td>
                    <td>
                        <span  data-bs-toggle="modal" data-bs-target="#viewTeacherModal" class="action-button" onClick="onClickEditRequest(${element.id})" >Edit</span>  
                    </td>
                </tr>`;
            table.innerHTML += template;
        });
    }
    function onClickEditRequest(id) {
        let request_list = sessionStorage.getItem("request_list");
        var jsonData = JSON.parse(request_list);
        console.log("check data: ",jsonData.data);
        jsonData.data.forEach(element => {
            if(element.id == id){
                 firstname_input.value = element.firstname;
                 lastname_input.value = element.lastname;
                 gender_input.value = element.gender;
                 age_input.value = element.age;
                 birthdate_input.value = element.birthdate;
                 mobile_number_input.value = element.mobile_number;
                 email_input.value = element.email;
                 address_input.value = element.address;
                 rank_input.value = element.rank;
                 school_input.value =element.school_name;
                 status_input.value = element.status;
                 request_id_input.value = element.id
            }
        });
    }
    function onUpdateRequest() {
        $.ajax({  
            url:"../../php/onupdaterequest.php",  
            method:"POST",  
            data: $('#request_form').serialize(),  
            success: function(response) {
                console.log('res:',response);
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    onViewRequest();
                    alert(jsonData.success_msg);
                    location.href = '../pages/request.html';
                }else{
                    alert(jsonData.error_msg);
                }
                },
                error: function() {
                alert('System error: Ajax not working properly');
                }  
        }); 
    }
    /* Teacher Function */
    function onViewTeacher() {
        $.ajax({  
            url:"../../php/onviewrequest.php",  
            method:"POST",  
            data: {status_id: 1},  
            success: function(response) {
                sessionStorage.removeItem("teacher_list");
                var jsonData = JSON.parse(response);
                var table = document.querySelector("table");
                var template;
                if (jsonData.success){
                    sessionStorage.setItem("teacher_list",response);
                }else{
                    /* alert(jsonData.error_msg); */
                    template = 
                        `<tr >
                            <td colspan="9" >${jsonData.error_msg}</td>
                        </tr>`;
                    table.innerHTML += template;
                }
            },
            error: function() {
                alert('System error: Ajax not working properly');
            }  
        }); 
    }
    function onGenerateListTeacher(data) {
        var table = document.querySelector("table");
        var template;
        var ctr=0;
        data.forEach(element => {
            ctr = ctr + 1;
            template = 
                `<tr>
                    <td>${ctr}</td>
                    <td>${element.account_id}</td>
                    <td>${element.firstname+' '+element.lastname}</td>
                    <td>${element.age}</td>
                    <td>${element.gender}</td>
                    <td>${element.school_name}</td>
                    <td>${element.rank}</td>
                    <td>
                        <span  data-bs-toggle="modal" data-bs-target="#viewTeacherModal" class="action-button" onClick="onClickViewTeacher(${element.id})" >Edit</span>  
                    </td>
                </tr>`;
            table.innerHTML += template;
        });
    }
    function onClickViewTeacher(id) {
        let teacher_list = sessionStorage.getItem("teacher_list");
        var jsonData = JSON.parse(teacher_list);
        console.log("check data: ",jsonData.data);
        jsonData.data.forEach(element => {
            if(element.id == id){
                 firstname_input.value = element.firstname;
                 lastname_input.value = element.lastname;
                 gender_input.value = element.gender;
                 age_input.value = element.age;
                 birthdate_input.value = element.birthdate;
                 mobile_number_input.value = element.mobile_number;
                 email_input.value = element.email;
                 address_input.value = element.address;
                 rank_input.value = element.rank;
                 school_input.value =element.school_name;
                 status_input.value = element.status;
                 request_id_input.value = element.id
            }
        });
    }
/* ADMIN */
 

/* USER */
    function onSignUp() {
        var username = $('#username').val();
        var password = $('#password').val();
        var confirm_password = $('#confirm_password').val();
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var gender = $('#gender').val();
        var age = $('#age').val();
        var birthdate = $('#birthdate').val();
        var mobile_number = $('#mobile_number').val();
        var email = $('#email').val();
        var address = $('#address').val();
        var rank = $('#rank').val();
        var school = $('#school').val();
        if(password != confirm_password ){
            alert('Password and confirm password does not match!');
        }else{
            if(username == '' || firstname == '' || lastname == '' || gender == '' || age == '' || birthdate == '' || mobile_number == ''|| email == '' || address == '' || rank == '' || school == ''){  
                alert('All Fields are required!');
            }else{
                /* Check if Username is existing */
                $.ajax({  
                    url:"../../php/onsignup.php",  
                    method:"POST",  
                    data: $('#signup_form').serialize(),  
                    success: function(response) {
                        console.log('check result: ',response);
                        var jsonData = JSON.parse(response);
                        if (jsonData.success){
                            alert(jsonData.success_msg);
                            goToLogin();
                        }else{
                            alert(jsonData.error_msg);
                        }
                        },
                        error: function() {
                        alert('System error: Ajax not working properly');
                        }  
                }); 

                /* Check if Username is existing */
/* 
                $.ajax({  
                    url:"../../php/onsignup.php",  
                    method:"POST",  
                    data: $('#signup_form').serialize(),  
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
                });  */
            }
        }
    }  
    function onLoginUser() {
        var username = $('#username').val();  
        var password = $('#password').val();  
        
        if(username == '' || password == ''){  
            alert('All Fields are required!');
        }else{
            $.ajax({  
                url:"../php/loginuser.php",  
                method:"POST",  
                data: $('#login_form_user').serialize(),  
                success: function(response) {
                    var jsonData = JSON.parse(response);
                    if (jsonData.success){
                        alert("Successfully login ");
                        sessionStorage.setItem("user_account",response);
                        location.href = '../user/pages/landing.html';
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
    function onClickViewSubjectUser(data) {
        location.href = '../pages/subject-details.html';
    }
    function onClickAddModuleModal() {
        module_title_input.value = "";
        module_description_input.value = "";
        grade_level_input.selectedIndex =null;
        $("#module_file").val('');
    }
    function onAddModule() {

        let user_account = sessionStorage.getItem("user_account");
        var user_json = JSON.parse(user_account);

        var module_title = $('#module_title').val();
        var grade_level = $('#grade_level').val();
        var module_description = $('#module_description').val();
        var file = $('#module_file').val();

        var form = $('#module_form')[0];
        var formData = new FormData(form);
        console.log("teahcer data: ",user_json.data );
        formData.append( 'teacher_id', user_json.data.id );
        if(module_title == '' || grade_level == ''|| module_description == ''|| file == ''){  
            alert('All Fields are required!');
        }else{
            $.ajax({  
                url:"../../php/onaddmodule.php",  
                method:"POST",  
                contentType: false,
                cache: false,
                processData:false,
                data: formData,  
                success: function(response) {
                    console.log('resL:',response);
                    var jsonData = JSON.parse(response);
                    if (jsonData.success){
                        alert(jsonData.success_msg);
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








