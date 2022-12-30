<?php
    include("connection.php"); 

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT status , COUNT(id) AS counter FROM `tbl_account_profile` GROUP BY status");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['success'] = true;
        $form_data['data'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No record found!";
    }
    echo json_encode($form_data);
?>