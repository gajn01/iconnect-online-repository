<?php
    include("connection.php"); 
    $subject_id = $_POST['subject_id'];
    $school_id = $_POST['school_id'];
    $teacher_id = $_POST['teacher_id'];
    /* Fetch module based on subject and teacher ID */

    $limit = $_POST['limit'];
    $page = $_POST['page'];
    $search = $_POST['search'];
    $form_data = array();

    /* get total items  */
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_module WHERE subject_id = '$subject_id' AND teacher_id = '$teacher_id'  AND school_id = '$school_id' ");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['page_limit'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }

    $sql=("SELECT 
    tbl_module.id,
    tbl_module.teacher_id,
    tbl_module.subject_id,
    tbl_module.school_id,
    tbl_module.module_title,
    tbl_module.module_description,
    tbl_module.grade_level,
    tbl_account_profile.lastname,
    tbl_account_profile.firstname 
    FROM tbl_module RIGHT JOIN tbl_account_profile ON tbl_account_profile.id = tbl_module.teacher_id 
    WHERE NOT tbl_account_profile.id = '$teacher_id' AND tbl_module.subject_id = '$subject_id' AND tbl_module.school_id = '$school_id' AND
    (tbl_account_profile.lastname LIKE '$search%' OR tbl_account_profile.firstname LIKE '$search%' OR tbl_module.module_title LIKE '$search%' OR tbl_module.module_description LIKE '$search%'  OR tbl_module.grade_level LIKE '$search%')  LIMIT $limit OFFSET $page ");

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