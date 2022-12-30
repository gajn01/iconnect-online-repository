<?php
    include("connection.php"); 

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT tbl_subject.subject_name AS label , COUNT(tbl_module.module_title) AS y FROM tbl_module INNER JOIN tbl_subject ON tbl_subject.id = tbl_module.subject_id GROUP BY tbl_module.subject_id");
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