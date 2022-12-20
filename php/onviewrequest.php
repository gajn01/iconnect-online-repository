<?php
    include("connection.php"); 
    $status_id = $_POST['status_id'];
    $sql=("SELECT 
    tbl_account_profile.id,
    tbl_account_profile.account_id,
    tbl_account_profile.firstname,
    tbl_account_profile.lastname, 
    tbl_account_profile.gender, 
    tbl_account_profile.age, 
    tbl_account_profile.birthdate, 
    tbl_account_profile.address, 
    tbl_account_profile.email, 
    tbl_account_profile.mobile_number, 
    tbl_account_profile.rank,
    tbl_account_profile.school_id,
    tbl_account_profile.status, tbl_school.school_name FROM tbl_account_profile INNER JOIN tbl_school ON tbl_school.id = tbl_account_profile.school_id WHERE tbl_account_profile.status = $status_id");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    $form_data = array();
    if($fetch){
        $form_data['success'] = true;
        $form_data['data'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
    echo json_encode($form_data);
?>