<?php
    include("connection.php"); 
    $subject_id = $_POST['subject_id'];
    $teacher_id = $_POST['teacher_id'];

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT * FROM tbl_module WHERE subject_id = '$subject_id' AND teacher_id = '$teacher_id' ");
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