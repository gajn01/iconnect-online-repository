<?php
    include("connection.php"); 
    $account_id=$_POST['account_id'];
    $firstname=$_POST['firstname'];
    $lastname=$_POST['lastname'];
    $age=$_POST['age'];
    $mobile_number=$_POST['mobile_number'];
    $email=$_POST['email'];
    $address=$_POST['address'];
    $rank=$_POST['rank'];

    $firstname = stripslashes($firstname);
    $lastname = stripslashes($lastname);
    $age = stripslashes($age);
    $email = stripslashes($email);
    $address = stripslashes($address);
    $rank = stripslashes($rank);

    $firstname = mysqli_real_escape_string($db, $firstname);
    $lastname = mysqli_real_escape_string($db, $lastname);
    $age = mysqli_real_escape_string($db, $age);
    $email = mysqli_real_escape_string($db, $email);
    $address = mysqli_real_escape_string($db, $address);
    $rank = mysqli_real_escape_string($db, $rank);

    $sql=("UPDATE tbl_account_profile SET firstname ='$firstname', lastname ='$lastname',  age ='$age', email ='$email', address ='$address', rank ='$rank' WHERE id='$account_id'");
    $form_data = array();
    if (mysqli_query($db, $sql)) {
        $sql=("SELECT 
        tbl_account_profile.id,
        tbl_account_profile.firstname,
        tbl_account_profile.lastname, 
        tbl_account_profile.gender, 
        tbl_account_profile.age, 
        tbl_account_profile.birthdate, 
        tbl_account_profile.email, 
        tbl_account_profile.mobile_number, 
        tbl_account_profile.rank,
        tbl_account_profile.address,
        tbl_account_profile.school_id,
        tbl_account_profile.status, 
        tbl_account.username FROM tbl_account_profile RIGHT JOIN tbl_account ON 
        tbl_account.id = tbl_account_profile.account_id WHERE tbl_account_profile.id = '$account_id' ");
        $result= mysqli_query($db,$sql);
        $form_data = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $form_data['success'] = true;
                $form_data['success_msg'] = "Profile updated successfully";
                $form_data['data'] = $row;
            }
        }
        echo json_encode($form_data);

    } else {
        $form_data['success'] = false;
        $form_data['error_msg'] = $sql;
    }

    $db->close();

?>