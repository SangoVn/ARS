function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function loginUser()
{
    var username = $("#username").val();
    var password = $("#password").val();
    if( username == '')
    {
        $("#username").focus();
        $("#username").addClass("parsley-error");
        return;
    }
    if( password == '')
    {
        $("#password").focus();
        $("#password").addClass("parsley-error");
        return;
    }
    $.post("/admin/user/login", {username: username,password : password}, function(result){
    var HTML = "";
    var VARVAR = {
        MESSAGE: result.message
    }
   
       if(result.status == false)
       {
            HTML = RenderTemplate(HTML_ERROR, VARVAR);
           if(result.error_code == -1)
           {
                
                $("#username").focus();
                $("#username").addClass("parsley-error");
                $("#password").addClass("parsley-error");
                $("#html_error").html(HTML);
                return;
           }
           else if(result.error_code == 1)
           {                           
                $("#password").focus();
                $("#password").addClass("parsley-error");            
                $("#html_error").html(HTML);
                return;
           }
           else
           {
                $("#username").focus();
                $("#html_error").html(HTML);
                return;
           }
       }
       else
       {
          HTML = RenderTemplate(HTML_SUCESSS, VARVAR);
          $("#html_error").html(HTML);
          setCookie('token',result.token,1);
          window.location.href='/admin/user/';
       }
    });
}

function RenderTemplate(source, params) {
    $.each(params, function (i, n) {
        if (typeof n === 'undefined') {
            n = '';
        }
        source = source.replace(new RegExp("\\{{" + i + "\\}}", "g"), n);
    });
    return source;
}