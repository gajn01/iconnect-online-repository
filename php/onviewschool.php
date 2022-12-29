<?php
    session_start();
    include("connection.php"); 

    $limit = $_POST['limit'];
    $page = $_POST['page'];
    $search = $_POST['search'];

    $form_data = array();
    $sql=("SELECT COUNT(id) AS ctr FROM tbl_school");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    if($fetch){
        $form_data['page_limit'] = $fetch;
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }

    $sql=("SELECT * FROM tbl_school WHERE school_name LIKE '$search%' LIMIT $limit OFFSET $page  ");
    $result = mysqli_query($db, $sql);
    $fetch = mysqli_fetch_all ($result, MYSQLI_ASSOC);
    $form_data['data'] = $fetch;
    if($fetch){
        $form_data['success'] = true;
        $form_data['data'] = $fetch;
        /* var_dump($form_data); */
    }else{
        $form_data['success'] = false;
        $form_data['error_msg'] = "No records!";
    }
    echo json_encode($form_data);
?>