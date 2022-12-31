/* Module fields */
const module_id_input = document.getElementById("module_id");
const module_title_input = document.getElementById("module_title");
const grade_level_input = document.getElementById("grade_level");
const module_description_input = document.getElementById("module_description");

/* User fields */
const firstname_input = document.getElementById("firstname");
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
const username_input = document.getElementById("username");
const account_id_input = document.getElementById("account_id");

var ctr=  0;
var page = 0;
let items =0;
let limit =  $('#page_limit').val();

let setPage = items / limit
let totalPage = Math.trunc(items / limit)
if( setPage % 1){
    totalPage = totalPage +1
}


function onLoginUser() {
    var username = $('#username').val();  
    var password = $('#password').val();  
    
    if(username == '' || password == ''){  
        alert('All Fields are required!');
    }else{
        $.ajax({  
            url:"php/loginuser.php",  
            method:"POST",  
            data: $('#login_form_user').serialize(),  
            success: function(response) {
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    if(jsonData.data.status == 1){
                        alert("Successfully login ");
                        localStorage.setItem("user_account",response);
                        location.href = '../user/pages/landing.html';
                    }else if(jsonData.data.status == 0){
                        alert("Your account is still pending for approval");
                    }
                   /*  else if(jsonData.data.status == 3){
                        alert("Your account is deactivated");
                    } */
                    
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
    var terms = document.getElementById("terms").checked ;

    if(password != confirm_password ){
        alert('Password and confirm password does not match!');
    }else{
        if(username == '' || firstname == '' || lastname == '' || gender == '' || age == '' || birthdate == '' || mobile_number == ''|| email == '' || address == '' || rank == '' || school == ''){  
            alert('All Fields are required!');
        }else{
            /* Check if Username is existing */
            if(terms){
                $.ajax({  
                    url:"../php/onsignup.php",  
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
            }else{
                alert('Please agree with the Terms & Condition!');
            }
        }
    }
  




  
}  

function onLogoutUser() {
    let text = "Are you sure you want to logout?";
    if (confirm(text)) {
        location.href = '../index.html';
        localStorage.clear();

    }
}
function goToSIgnup() {
    location.href = '../user/pages/signup.html';
}
function goToLogin() {
    location.href = '../index.html';
}
function goToMainPage() {
    location.href = '../pages/landing.html';
}
function goToOtherModule(subject_id) {
    location.href = "../pages/module.html?id=" + subject_id ;
}
function goToSubject(subject_id) {
    location.href = "../pages/subject-details.html?id=" + subject_id ;
}
function onSelectLimit(table,subject_id,teacher_id,school_id) {
    page = 0;
    ctr  = 0;
    document.getElementById("page_number").innerText = page+1;
    if(table == 'own_module'){
        onViewModule(subject_id,teacher_id);
    }else if(table == 'other_module'){
        onViewOtherModule(subject_id,school_id,teacher_id);
    }
}
function onSearch(table,subject_id,teacher_id,school_id) {
    ctr =0;
    page = 0;
    if(table == 'own_module'){
        onViewModule(subject_id,teacher_id);
    }else if(table == 'other_module'){
        onViewOtherModule(subject_id,school_id,teacher_id);
    }
}
function onPage(params,table,subject_id,teacher_id,school_id) {
    limit =  $('#page_limit').val();
    setPage = items / limit
    totalPage = Math.trunc(items / limit)
    if( setPage % 1){
        totalPage = totalPage +1
    }
    if(params == 1){
        if(totalPage > page+1){
            page +=1;
            ctr = (ctr-1) + 1;
            console.log("ctr:",ctr);
            document.getElementById("page_number").innerText = page+1;
            document.getElementById("prev").style.display = "block";
        }
    }else{
        ctr--;
        if(page != 0){
            page -=1;
            ctr-=limit;
            if(page == 0){
                ctr = 0;
            }
            console.log("ctr:",ctr);
            document.getElementById("page_number").innerText = page+1;
            document.getElementById("prev").style.display = "none";
            document.getElementById("prev").style.display = "block";
        }
    }
    if(table == 'own_module'){
        onViewModule(subject_id,teacher_id);
    }else if(table == 'other_module'){
        onViewOtherModule(subject_id,school_id,teacher_id);
    }
}

    /* Subject  Function */
function onViewSubject() {
    var limit = 10000;
    var search = ""; 
    $.ajax({  
        url:"../php/onviewsubject.php",  
        method:"POST",  
        data: {limit:limit,page:page*limit,search:search},  
        success: function(response) {
            localStorage.removeItem("subject_list");
            var jsonData = JSON.parse(response);
            console.log("subject",response);
            if (jsonData.success){
                localStorage.setItem("subject_list",response);
                    subject_container = document.querySelector('#thumbnail-container');
                    const color_array = ['primary','secondary','purple','green','primary','purple'];
                    var counter =0;
                    jsonData.data.forEach(element => {
                        let newCard = document.createElement('div');
                        newCard.classList.add('secondary');
                        newCard.classList.add('card');
                        subject_description = element.subject_description;
                        newCard.setAttribute("onclick","onClickViewSubjectUser( "+ element.id +")");
                        let card_template = `
                            <h3>${element.subject_name}</h3>
                            <p>${subject_description}</p>`;
                        /*  <footer class="mt-4">
                        <p class="modules-count">Modules: <span>20</span></p>
                    </footer> */
                        subject_container.appendChild(newCard);
                    // Inject the template html on DOM's new append item
                    newCard.innerHTML = card_template;
                    counter += 1;
                    });
            }else{
                
            }
        },
        error: function() {
            alert('System error: Ajax not working properly');
        }  
    }); 
}
function onGenerateDropListSchool() {
    var limit = 10000;
    var search = ""; 
    $.ajax({  
        url:"../php/onviewschool.php",  
        method:"POST",  
        data: {limit:limit,page:page*limit,search:search},  
        success: function(response) {
            localStorage.removeItem("school_list");
            var jsonData = JSON.parse(response);
            if (jsonData.success){
                localStorage.setItem("school_list",response);
                jsonData.data.forEach(element => {
                    var select = document.getElementById('school');
                    var opt = document.createElement('option');
                    opt.value = element.id;
                    opt.innerHTML = element.school_name;
                    select.appendChild(opt);
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
function onViewModule(subject_id,teacher_id) {
    limit =  $('#page_limit').val();
    search =  $('#searchbar').val();

    $.ajax({  
        url:"../php/onviewmodule.php",  
        method:"POST",  
        data: {subject_id: subject_id,
                teacher_id: teacher_id,
                limit:limit,
                page:page*limit,
                search:search},  
        success: function(response) {
            localStorage.removeItem("module_list");
            var jsonData = JSON.parse(response);
            var table = document.querySelector("table");
            var template;
            if (jsonData.success){
                localStorage.setItem("module_list",response);
                items = jsonData.page_limit[0].ctr;
                setPage = items / limit
                totalPage = Math.trunc(items / limit)
                if( setPage % 1){
                    totalPage = totalPage +1
                }
                if(parseInt(limit) > parseInt(items)){
                    document.getElementById("next").style.display = "none";
                    document.getElementById("prev").style.display = "none";
                }else{
                    if(page <= 0){
                        document.getElementById("prev").style.display = "none";
                        document.getElementById("next").style.display = "block";

                    }else if(totalPage <= page+1){
                        document.getElementById("next").style.display = "none";
                        document.getElementById("prev").style.display = "block";
                    }
                }
                table.innerHTML =  "";
                var template =`
                    <thead>
                        <th>#</th>
                        <th>Module Tittle</th>
                        <th>Module Description</th>
                        <th>Grade Level </th>
                        <th>Action</th>
                    </thead>`;
                table.innerHTML += template;
                onGenerateListModule(jsonData.data);
            }else{
                /* alert(jsonData.error_msg); */
                table.innerHTML =  "";
                var template =`
                    <thead>
                        <th>#</th>
                        <th>Module Tittle</th>
                        <th>Module Description</th>
                        <th>Grade Level </th>
                        <th>Action</th>
                    </thead>`;
                table.innerHTML += template;
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
function onGenerateListModule(data) {
    var table = document.getElementById("module_list");
    var template;
    data.forEach(element => {
        ctr = ctr + 1;
        template = 
            `<tr>
                <td>${ctr}</td>
                <td>${element.module_title}</td>
                <td>${element.module_description}</td>
                <td>${element.grade_level}</td>
                <td>
                    <span  data-bs-toggle="modal" data-bs-target="#downloadModal" onClick="onViewDownloadableList(${element.id})" class="action-button">Files</span> |
                    <span  data-bs-toggle="modal" data-bs-target="#moduleModal" class="action-button" onClick="onClickEditModule(${element.id})">Edit</span> | 
                    <span class="action-button" onClick="onDeleteModule(${element.id})" >Delete</span> 
                </td>
            </tr>`;
        table.innerHTML += template;
    });
}
function onClickViewSubjectUser(subject_id) {
    localStorage.removeItem("module_list");
    window.location.href = "../pages/subject-details.html?id=" + subject_id ;
}
function onClickAddModuleModal() {
    var table = document.getElementById("file_table");
    table.innerHTML = "";
    document.getElementById("module_submit_btn_update").style.display="none";
    document.getElementById("module_submit_btn_add").style.display="block";
    document.getElementById("file_container").style.display="none";

    module_title_input.value = "";
    module_description_input.value = "";
    grade_level_input.selectedIndex = null;
    $("#module_file").val('');
}
function onClickEditModule(id) {
    document.getElementById("module_submit_btn_update").style.display="block";
    document.getElementById("module_submit_btn_add").style.display="none";
    document.getElementById("file_container").style.display="block";
    onViewDownloadableList(id);
    let module_list = localStorage.getItem("module_list");
    var jsonData = JSON.parse(module_list);
    jsonData.data.forEach(element => {
        if(element.id == id){
            module_id_input.value = element.id;
            module_title_input.value = element.module_title;
            module_description_input.value = element.module_description;
            grade_level_input.value = element.grade_level
        }
    });
}
function onViewDownloadableList(module_id) {
    $.ajax({  
        url:"../php/onviewfile.php",  
        method:"POST",  
        data: {module_id: module_id},  
        success: function(response) {
            var table = document.getElementById("file_table");
            table.innerHTML = "";
            var ul = document.getElementById("module_file_list");
            ul.innerHTML = "";
            localStorage.removeItem("file_list");
            var jsonData = JSON.parse(response);
            if (jsonData.success){
                localStorage.setItem("file_list",response);
                onGenerateListFile(jsonData.data);
            }else{
                document.getElementById("no_record").innerText ="No records!";
                /* alert(jsonData.error_msg); */
            }
        },
        error: function() {
            alert('System error: Ajax not working properly');
        }  
    }); 
}

function onGenerateListFile(data){
    document.getElementById("no_record").innerText ="";
    var ul = document.getElementById("module_file_list");
    var table = document.getElementById("file_table");
    var template;
    ul.innerHTML = "";
    
    data.forEach(element => {
        template = 
            `<li><a href="http://iconnect.unaux.com/uploads/${element.file_path}" download >  ${element.file_path} </a> </li>`;
        ul.innerHTML += template;
    });

    table.innerHTML = "";
    template =`
        <thead>
            <th>#</th>
            <th>File Name</th>
            <th>Action</th>
        </thead>
    `;
    table.innerHTML += template;
    var ctr=0;
    data.forEach(element => {
        ctr = ctr + 1;
        template = 
            `<tr>
                <td>${ctr}</td>
                <td>${element.file_path}</td>
                <td>
                    <span class="action-button" onClick="onDeleteModule_file(${element.id})">Delete</span> 
                </td>
            </tr>`;
        table.innerHTML += template;
    });
}
function onAddModule() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject_id = urlParams.get('id');
    let user_account = localStorage.getItem("user_account");
    var user_json = JSON.parse(user_account);

    var module_title = $('#module_title').val();
    var grade_level = $('#grade_level').val();
    var module_description = $('#module_description').val();
    var file = $('#module_file').val();

    var form = $('#module_form')[0];
    var formData = new FormData(form);
    formData.append( 'teacher_id', user_json.data.id );
    formData.append( 'school_id', user_json.data.school_id );
    formData.append( 'subject_id', subject_id);
    if(module_title == '' || grade_level == ''|| module_description == ''|| file == ''){  
        alert('All Fields are required!');
    }else{
        $.ajax({  
            url:"../php/onaddmodule.php",  
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
                    location.reload();
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
function onUpdateModule() {
    var module_title = $('#module_title').val();
    var module_description = $('#module_description').val();
    var form = $('#module_form')[0];
    var formData = new FormData(form);
    if(module_title == '' || module_description == ''){  
        alert('All Fields are required!');
    }else{
        $.ajax({  
            url:"../php/onupdatemodule.php",  
            method:"POST",  
            contentType: false,
            cache: false,
            processData:false,
            data: formData,  
            success: function(response) {
                console.log('res:',response);
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    alert(jsonData.success_msg);
                    location.reload();
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
function onDeleteModule(id) {
    let text = "Do you want to delete the record?";
    if (confirm(text)) {
        $.ajax({  
            url:"../php/ondeletemodule.php",  
            method:"POST",  
            data: { module_id : id },  
            success: function(response) {
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    alert(jsonData.success_msg);
                    location.reload();
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
function onDeleteModule_file(id) {
    let text = "Do you want to delete the file?";
    if (confirm(text)) {
        $.ajax({  
            url:"../php/ondeletefile.php",  
            method:"POST",  
            data: { file_id : id },  
            success: function(response) {
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    alert(jsonData.success_msg);
                    /* location.reload(); */
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
function onViewOtherModule(subject_id,school_id,teacher_id) {
    limit =  $('#page_limit').val();
    search =  $('#searchbar').val();

    $.ajax({  
        url:"../php/onviewothermodule.php",  
        method:"POST",  
        data: {subject_id: subject_id,
                school_id: school_id,
                teacher_id:teacher_id,
                limit:limit,
                page:page*limit,
                search:search},  
        success: function(response) {
            localStorage.removeItem("other_module_list");
            var jsonData = JSON.parse(response);
            var table = document.querySelector("table");
            var template;
            if (jsonData.success){
                localStorage.setItem("other_module_list",response);
                
                items = jsonData.page_limit[0].ctr;
                setPage = items / limit
                totalPage = Math.trunc(items / limit)
                if( setPage % 1){
                    totalPage = totalPage +1
                }
                if(parseInt(limit) > parseInt(items)){
                    document.getElementById("next").style.display = "none";
                    document.getElementById("prev").style.display = "none";
                }else{
                    if(page <= 0){
                        document.getElementById("prev").style.display = "none";
                        document.getElementById("next").style.display = "block";

                    }else if(totalPage <= page+1){
                        document.getElementById("next").style.display = "none";
                        document.getElementById("prev").style.display = "block";
                    }
                }
                table.innerHTML =  "";
                var template =`
                    <thead>
                        <th>#</th>
                        <th>Uploaded By</th>
                        <th>Module Tittle</th>
                        <th>Module Description</th>
                        <th>Grade Level </th>
                        <th>Action</th>
                    </thead>`;
                table.innerHTML += template;
                onGenerateListOtherModule(jsonData.data);
            }else{
                table.innerHTML =  "";
                var template =`
                    <thead>
                        <th>#</th>
                        <th>Module Tittle</th>
                        <th>Module Description</th>
                        <th>Grade Level </th>
                        <th>Action</th>
                    </thead>`;
                table.innerHTML += template;
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
function onGenerateListOtherModule(data) {
    var table = document.getElementById("module_list");
    var template;
    data.forEach(element => {
        ctr = ctr + 1;
        template = 
            `<tr>
                <td>${ctr}</td>
                <td>${element.firstname} ${element.lastname} </td>
                <td>${element.module_title}</td>
                <td>${element.module_description}</td>
                <td>${element.grade_level}</td>
                <td>
                    <span  data-bs-toggle="modal" data-bs-target="#downloadModal" onClick="onViewDownloadableList(${element.id})" class="action-button">Files</span>
                </td>
            </tr>`;
        table.innerHTML += template;
    });
}
/* Account PRofile */
function onPopulateUserProfile() {
    let user_account = localStorage.getItem("user_account");
    let json_user = JSON.parse(user_account);

    lastname_input.value = json_user.data.lastname;
    firstname_input.value = json_user.data.firstname;
    gender_input.value  = json_user.data.gender;
    age_input.value  = json_user.data.age;
    birthdate_input.value  = json_user.data.birthdate;
    mobile_number_input.value  = json_user.data.mobile_number;
    email_input.value  = json_user.data.email;
    address_input.value  = json_user.data.address;
    rank_input.value  = json_user.data.rank;
    school_input.value  = json_user.data.school_id;
    username_input.value  = json_user.data.username;
    account_id_input.value  = json_user.data.id;
}
function onUpdateProfile() {
    $.ajax({  
        url:"../php/onupdateprofile.php",  
        method:"POST",  
        data: $('#update_profile_form').serialize(),  
        success: function(response) {
            console.log('res:',$('#update_profile_form').serialize());
            var jsonData = JSON.parse(response);
            if (jsonData.success){
                localStorage.setItem("user_account",response);
                alert(jsonData.success_msg);
                location.reload();
            }else{
                alert(jsonData.error_msg);
            }
        },
        error: function() {
            alert('System error: Ajax not working properly');
        }  
    }); 
}
function onUpdatePassword() {
    var username = $('#username').val();
    var old_password = $('#old_password').val();
    var new_password = $('#new_password').val();
    var confirm_password = $('#confirm_password').val();
    if(new_password == confirm_password){
        $.ajax({  
            url:"../php/onupdatepassword.php",  
            method:"POST",  
            data: { username:username,
                    new_password:new_password,
                    old_password:old_password},  
            success: function(response) {
                console.log('res:',response);
                var jsonData = JSON.parse(response);
                if (jsonData.success){
                    alert(jsonData.success_msg);
                    /* location.reload(); */
                }else{
                    alert(jsonData.error_msg);
                }
            },error: function() {
                alert('System error: Ajax not working properly');
            }  
        }); 
    }else{
        alert('New password and confirm password is not match!');
    }
}








