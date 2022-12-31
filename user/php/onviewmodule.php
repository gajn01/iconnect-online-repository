<?php
    include("connection.php"); 
    $subject_id = $_POST['subject_id'];
    $teacher_id = $_POST['teacher_id'];

    $limit = $_POST['limit'];
    $page = $_POST['page'];
    $search = $_POST['search'];
    $form_data = array();

    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_module WHERE subject_id = '$subject_id' AND teacher_id = '$teacher_id' ");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['page_limit'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT * FROM tbl_module WHERE subject_id = '$subject_id' AND teacher_id = '$teacher_id' AND (module_title LIKE '$search%' OR module_description LIKE '$search%'  OR grade_level LIKE '$search%')  LIMIT $limit OFFSET $page ");
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