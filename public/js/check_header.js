var xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};
function log(){
     xhr.get('./value',{},{}).then((data)=>{
       console.log(data)
       if (data.session){
          $('cart').style.display = "block";
          if (data.admin === true) {
            $('upload').style.display = "block";
          }
          $('logout').style.display = "block";
          $('order').style.display = "block";
          $('logout').addEventListener('click', function() {
             xhr.get('./logout',{},{}).then((data) => {
               if (data.status == "Bye!") {
                 alert("Has cerrado sesion")
                 window.location.href = "./index.html"
               }
             })
           });
       } else {
         $('login').style.display = "block";
         $('register').style.display = "block";
          }
       });
     };

addEventListener('load', log);
