<?php
    session_start();
    include("connection.php"); 
            
    $sql=("SELECT * FROM tbl_subject");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    $form_data = array();
    $form_data['data'] = $fetch;
    if($fetch){
        $form_data['success'] = true;
        $form_data['data'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }
    echo json_encode($form_data);
?>