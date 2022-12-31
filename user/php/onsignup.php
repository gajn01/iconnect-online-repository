<?php
include("connection.php"); 

    $username=$_POST['username'];
    $password=$_POST['password'];
    $firstname=$_POST['firstname'];
    $lastname=$_POST['lastname'];
    $gender=$_POST['gender'];
    $age=$_POST['age'];
    $birthdate=$_POST['birthdate'];
    $mobile_number=$_POST['mobile_number'];
    $email=$_POST['email'];
    $address=$_POST['address'];
    $rank=$_POST['rank'];
    $school=$_POST['school'];

    /* ANTI injection */
    $username = stripslashes($username);
    $password = stripslashes($password);
    /* encrypt m5 password */
    $password = md5($password);

    $firstname = stripslashes($firstname);
    $lastname = stripslashes($lastname);
    $gender = stripslashes($gender);
    $age = stripslashes($age);
    $birthdate = stripslashes($birthdate);
    $email = stripslashes($email);
    $address = stripslashes($address);
    $rank = stripslashes($rank);
    $school = stripslashes($school);

    $username = mysqli_real_escape_string($db, $username);
    $password = mysqli_real_escape_string($db, $password);
    $firstname = mysqli_real_escape_string($db, $firstname);
    $lastname = mysqli_real_escape_string($db, $lastname);
    $gender = mysqli_real_escape_string($db, $gender);
    $age = mysqli_real_escape_string($db, $age);
    $birthdate = mysqli_real_escape_string($db, $birthdate);
    $email = mysqli_real_escape_string($db, $email);
    $address = mysqli_real_escape_string($db, $address);
    $rank = mysqli_real_escape_string($db, $rank);
    $school = mysqli_real_escape_string($db, $school);

    /* Check existing username */
    $sql=("SELECT * FROM tbl_account");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    $form_data = array();
    if($fetch){
        foreach ($fetch as $value) {
            if($value['username'] != $username ){
/* if username is avaiable insert into tbl_account */

                $sql=("INSERT INTO tbl_account (username,password) VALUES ('$username','$password')");
                if (mysqli_query($db, $sql)) {
                    $last_id = $db->insert_id;
/* after insert into tbl_account insert into tbl_account_profile */
                    $sql_insert_profile=("INSERT INTO tbl_account_profile (account_id,firstname,lastname,gender,age,birthdate,email,mobile_number,address,rank,school_id) 
                    VALUES ('$last_id','$firstname','$lastname','$gender','$age','$birthdate','$email','$mobile_number','$address','$rank','$school')");
                    $form_data = array();
                    if (mysqli_query($db, $sql_insert_profile)) {
                        $form_data['success'] = true;
                        $form_data['success_msg'] = "Successfully registered";
                    } else {
                        $form_data['success'] = false;
                        $form_data['error_msg'] = $sql_insert_profile;
                    }
                    $db->close();
                } else {
                    $form_data['success'] = false;
                    $form_data['error_msg'] = $sql;
                }
                break;
            }else{
                $form_data['success'] = false ;
                $form_data['error_msg'] = "Username is already taken!" ;
                break;
            }
        }
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "error list";
    }
    echo json_encode($form_data);

?>