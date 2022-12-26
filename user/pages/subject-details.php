<?php



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/landing.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>
    <title>Admin</title>
    <script>
      window.onload = function () {
          const urlParams = new URLSearchParams(window.location.search);
          const subject_id = urlParams.get('id');
          let user_account = sessionStorage.getItem("user_account");
          let json_user = JSON.parse(user_account);

          let subject_list = sessionStorage.getItem("subject_list");
          let json_subject = JSON.parse(subject_list);
          let subject_name;
          json_subject.data.forEach(element => {
            if (element.id == subject_id) {
                document.getElementById('subject_name').innerText = element.subject_name;
            }
          });

          onViewModule(subject_id,json_user.data.id);
          if(!user_account){
              location.href = '../index.html';
          }else{
              document.getElementById('account_name_label').innerText =  json_user.data.firstname + " " + json_user.data.lastname;
          }
      }
    </script>
</head>
<body>
    <div class="wrapper">
        <nav id="topbar-nav">
          <div class="container topbar">
            <div class="logo-container">
                <img src="../../assets/logo.png" width="60px" alt="">
            </div>
            <a href="" id="account_name_label" >user user </a>
        </div>
        </nav>
        <div class="content">
            
            <div class="container">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb mt-5">
                      <li class="breadcrumb-item"><a href="landing.html">Subject</a></li>
                      <li id="subject_name" class="breadcrumb-item active" aria-current="page">Subject Name</li>
                    </ol>
                  </nav>

                  <!-- Table section -->

                  <section >
                    <div class="header-button mt-5">
                        <input class="searchbar" type="text" name="searchbar" id="searchbar" placeholder="Search here...">
                        <!-- <button type="button" class="btn btn-primary btn-add">Filter</button> -->
                        <button type="button" class="btn btn-primary btn-add" data-bs-toggle="modal" data-bs-target="#moduleModal" onClick="onClickAddModuleModal()">Add Module</button>
                      </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="table-content table-responsive-md mt-5">
                          <table class="table">
                            <thead>
                                <th>#</th>
                                <th>Module Name</th>
                                <th>Module Description</th>
                                <th>Grade Level </th>
                                <th>Action</th>
                            </thead>
                            <tbody class="table-group-divider"></tbody>
                          </table>
                        </div>
                        <div class="pagination-container mt-4">
                          <div class="pager">
                            <p>Limit per Page</p>
                            <select class="form-select page-number" aria-label="Default select example">
                              <option value="1">1</option>
                              <option value="5">5</option>
                              <option selected value="10">10</option>
                            </select>
                          </div>
                          <nav aria-label="Page navigation example" class="bottom-pagination">
                            <ul class="pagination justify-content-end">
                              <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                              </li>
                              <li class="page-item"><a class="page-link" href="#">1</a></li>
                              <li class="page-item"><a class="page-link" href="#">2</a></li>
                              <li class="page-item"><a class="page-link" href="#">3</a></li>
                              <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                </section>
                  <!-- Modal -->
            <div class="modal fade" id="moduleModal" tabindex="-1" aria-labelledby="moduleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h2 class="modal-title fs-5" id="moduleModalLabel">Subject Information</h2>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form id="module_form" enctype="multipart/form-data">
                        <input class="form-control mb-3 d-none"   type="text"  id="module_id" name="module_id" >
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                              <label for="module_title" class="col-sm-12 col-md-12 col-form-label">Module Title <span class="require"> * </span></label>
                              <input class="form-control mb-3"   type="text"  id="module_title" name="module_title" >
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for="grade_level" class="col-sm-12 col-md-12 col-form-label">Grade Level <span class="require"> * </span></label>
                                <select class="form-select form-control" aria-label="Default select example" id="grade_level" name="grade_level" >
                                  <option value="Grade 1" selected >Grade 1</option>
                                  <option value="Grade 2">Grade 2</option>
                                  <option value="Grade 3">Grade 3</option>
                                </select>
                              </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <label for="module_description" class="col-sm-12 col-md-12 col-form-label">Module Description <span class="require"> * </span></label>
                                <textarea class="form-control mb-3"   id="module_description" name="module_description" ></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <label for="module_file" class="col-sm-12 col-md-12 col-form-label">Module File <span class="require"> * </span></label>
                                <input class="form-control" type="file" id="module_file" name="module_file" >
                            </div>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" >Cancel</button>
                      <button type="button" class="btn btn-primary" onClick="onAddModule()">Submit</button>
                    </div>
                  </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    <script src="../../js/functions.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>