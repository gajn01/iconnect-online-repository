<?php
    include("connection.php"); 

    /* Fetch module based on subject and teacher ID */
    $sql=("SELECT COUNT(age) AS y, case 
            when age between 21 and 30 then '21-30'
            when age between 31 and 40 then '31-40'
            when age between 41 and 50 then '41-50'
            when age between 51 and 60 then '51-60'
            when age between 61 and 70 then '61-70' end as label
    from tbl_account_profile GROUP BY label");
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