function $(id) {
    return document.getElementById(id);
};


function new_account(){
    let xhr = new XHR();
    let email = $('new_email').value;
    let name = $('name').value;
    let lastname = $('lastname').value;
    let password = $('new_password').value;
    let zone = $('zone').value;
    xhr.post(`../signup`,{email:email, password:password, name:name, lastname:lastname, zone:zone},{'Content-Type':'application/json'}).then((data)=>{
      console.log(data);
      if (data.status == 200) {
             $('close_register_modal').click();
             newAccountMessage();


             

            

        //window.location.href = "";
        //alert("Te has registrado, ahora inicia sesion");
      }
    });
};
const newAccountMessage = () => { 
  $('message_modal_title').innerHTML = 'Regístro'
  $('message_modal_body').innerHTML = '¡Listo! Te has registrado con exito' 
  $('message_modal_button').innerHTML = 'Iniciar Sesion'
  $('message_modal_button').setAttribute('onclick','triggerFirstLogin()')
  setTimeout( ()=> { 
    $('trigger_message_modal').click();
   }, 1500);
  
}

const triggerFirstLogin = () => { 
  $('close_message_modal').click();
  setTimeout( ()=> { 
    $('login').click()
   }, 1500); 
  
}

function triggerRegister(){
  $('close_login').click()
  setTimeout( ()=> { 
    console.log($('register'))
    $('register').click()
   }, 1500);

}


  
//$('signup').addEventListener('click', new_account);
