<?php
    session_start();
    include("connection.php"); 
            
    $sql=("SELECT * FROM tbl_school");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    $form_data = array();
    
    if($fetch){
        $form_data['success'] = true;
        $form_data['data'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "error list";
    }
    echo json_encode($form_data);
?>