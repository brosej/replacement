function $(id) {
    return document.getElementById(id);
};

function session(){
    let xhr = new XHR();
    let username = $('email').value;
    let password = $('password').value;
    xhr.post(`./login`,{username:username, password:password},{'Content-Type':'application/json'}).then((data)=>{
        console.log(data.status.message)
        if (data.status === 200) {
            window.location.href = "./index.html";
        } else if (data.status.message === 'wrong password') {
          alert("Contrasena incorrecta");
        } else if (data.status.message === "email not found") {
          alert("Correo electronico no existe");
        }
    }).catch((err)=>{
      console.log(err);
    });
};

//$('login').addEventListener('click', session);
