function clickevent(){
    var user_id = document.getElementById('id').value;
    var password = document.getElementById('password').value;
    var re_password = document.getElementById('re_password').value;
    var user_name = document.getElementById('user_name').value;
    var birth = document.getElementById('birth').value;
    var email = document.getElementById('email').value;
    var phone_number = document.getElementById('phone_number').value;
    var api_key = document.getElementById('api_key').value;
    var sec_key = document.getElementById('sec_key').value;
    /// user_id, password, re_password, user_name, birth, email, phone_number, api_key, sec_key, date
    /// ex. var name = document.getElementByID('user_name').value; <-name = 아래에서 사용할 부분/user_name = html에서 id로 넘어온 부분

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;

    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    var timeString = hours + ':' + minutes  + ':' + seconds;
    // if(user_id == undefined || user_id == ''){
    //     alert("아이디를 입력하세요");
    // }
    // else if (password == undefined){
    //     alert("비밀번호를 입력해주세요");
    // }
    // else if (re_password == undefined){
    //     alert("비밀번호 확인을 입력해주세요");
    // }
    // else if(password != re_password){
    //     alert("비밀번호와 비밀번호 확인이 다릅니다.");
    // }
    // else{
      
            
                    $.ajax({
                        type: "POST",
                        url: post_url,
                        data: {
                            "user_id" : user_id,
                            "password" : password,
                            "re_password": re_password,
                            "user_name": user_name,
                            "birth": birth,
                            "email": email,
                            "phone_number": phone_number,
                            "api_key": api_key,
                            "sec_key": sec_key,
                            "date" : dateString + 'T'+ timeString + 'Z',
                            'csrfmiddlewaretoken': csrf
                        },
                        dataType: "json",
                        success: function() {
                            location.href("../home");
                        },
                    });
                                
            
           
            }
$(document).ready(function(){
    login_ck = $(".navbar_menu");
    seetion_user_id = sessionStorage.getItem("user_id")
    if (seetion_user_id != null){
        login_ck.append(`<li><a href = "../userpage">UserPage</a></li>`);
        
    }
    else{
        login_ck.append(`<li><a href = "../login">Login</a></li>`);
        login_ck.append(`<li><a href = "../sign_up">Register</a></li>`);
    }
});