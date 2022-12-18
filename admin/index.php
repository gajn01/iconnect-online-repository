<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/login.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    
    <!-- Toast -->
    <script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

    
    <title>iConnect</title>
</head>
<body>
    <div class="wrapper vertical-center">
        <div class="container">
            <div id="login-content">
                <div class="row login-form">
                    <div class="col-lg text-center"> 
                        <img src="../assets/logo.png" alt="">
                    </div>
                    <div class="col-md text-center">
                      <h1>Welcome Admin!</h1>
                      <form id="submit_form">
                        <div>
                            <div class="circle"></div>
                            <input  type="text"  id="username" name="username" placeholder="Enter Username">
                        </div>
                        <div>
                            <div class="circle"></div>
                            <input  type="password" id="password" name="password" placeholder="Enter Password">
                        </div>
                        <!-- <a data-bs-toggle="modal" data-bs-target="#forgotPasswordModal" >Forgot Password?</a> -->
                        <button type="button" name="submit" id="submit" class="btn btn-login" >Login</button>

                      </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title fs-5" id="forgotPasswordModalLabel">Forgot Password</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form action="" method="post">
                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <label for="email" class="col-sm-12 col-md-12 col-form-label">Email Address</label>
                    <input class="form-control mb-3"  type="text"  id="email" name="email" >
                  </div>
                </div>

              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Reset </button>
            </div>
          </div>
        </div>
      </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="../js/validation.js"></script>
  </body>
</html>
