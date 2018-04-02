function $(id) {
    return document.getElementById(id);
};
var brand;
var breakpoint = {};
var title = $('title')
var small_title = $('small_title')

breakpoint.refreshValue = function () {
  this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  console.log(breakpoint.value)
};

function responsiveness(){
  switch(breakpoint.value) {
              case 'smartphone':
                title.setAttribute('class', '')
                title.innerHTML = "";
                small_title.setAttribute('class', 'display-4   d-inline  bg-dark text-white responsive-display')
              break;
              case 'tablet':
                title.setAttribute('class', '')
                title.innerHTML = "";
                small_title.setAttribute('class', 'display-4   d-inline  bg-dark text-white responsive-display')
              break;
              case 'desktop':
                small_title.setAttribute('class', '')
                small_title.innerHTML = "";
                title.setAttribute('class', ' display-4 col-4 col-md-4 mb-0  d-inline  bg-dark text-white ')
              break;
              default:
                small_title.setAttribute('class', '')
                small_title.innerHTML = "";
                title.setAttribute('class', ' display-4 col-4 col-md-4 mb-0  d-inline  bg-dark text-white ')
          }
}


const sendCartButton = (mybutton)=>{
    var send_icon = document.createElement('i');
    mybutton.setAttribute('class','btn btn-success pl-5 pr-4 pt-1 pb-3')
    send_icon.setAttribute('class','ion-icon ion-forward pl-3')
    send_icon.setAttribute('style','font-size:32px;color:white')
    mybutton.innerHTML = ' ENVIAR TU PEDIDO'
    mybutton.appendChild(send_icon)
    return mybutton
  }
  var send_cart = $('send_cart')
   send_cart = sendCartButton(send_cart);

function cart() {

  
  console.log('idk man')
  var xhr = new XHR();
  $('tr').innerHTML = "";

  if ($('tbdy') != null) {
    $('tbdy').remove();
  }

  
  //send_cart.setAttribute('id','send_cart')

  xhr.get('./cart/product',{},{}).then((data)=> {
    console.log(data);
    var tbl = $('table');
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    

    for (var i=0; i < 6; i++) {
        var tr = $('table').tHead.children[0], th = document.createElement('th');
        switch(i) {
          case 0:
            th.innerHTML = 'Codigo';
          break;
          case 1:
            th.innerHTML = 'Precio';
          break;
          case 2:
            th.innerHTML = 'Cantidad';
          break;
          case 3:
            th.innerHTML = 'Total';
          break;
          case 4:
            th.innerHTML = 'Eliminar producto de carro de compras'; 
          break;
          case 5:
            th.appendChild($('send_cart'));
            send_cart.setAttribute('style','display:block')
          break;
        }
          tr.appendChild(th);
    }
    for (var i = 0; i < data.list.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 5; j++) {
          var td = document.createElement('td');
          switch (j) {
            case 0:
              td.innerHTML = data.list[i].product_name;
            break;
            case 1:
              var size = data.list[i].product_price.toString().length;
              var number  = data.list[i].product_price.toString();
              var arr = number.split("").reverse();
              var points = [];
              for (var n=0; n<size; n++) {
                switch (n) {
                  case 6:
                  case 9:
                  case 12:
                    points.push(arr[n] + ",");
                  break;
                  default:
                    points.push(arr[n]);
                  break;
                }
              }
              td.innerHTML = points.reverse().join("");
            break;
            case 2:
              td.innerHTML = data.list[i].quantity;
            break;
            case 3:
              td.innerHTML = data.list[i].total;
            break;
            case 4:
              td.setAttribute('id', data.list[i].product_id)
              var erase = document.createElement('button');
              erase.innerHTML = "Eliminar"
              td.appendChild(erase);
              td.addEventListener('click', function() {
                xhr.get(`./cart/delete/${this.id}`,{},{}).then((data) => {
                alert("Has eliminado un producto del carro de compras!");
                window.location.href = "./cart.html";
                })
               break; 
              })
            
            }
            console.log(td)
            tr.appendChild(td)
          }
         console.log(tr)
        tbdy.appendChild(tr); 
        }
       console.log(tbdy)
    tbl.appendChild(tbdy); 
    
    

  var total = 0;
  for (var i=0; i<data.list.length; i++) {
  total += data.list[i].total;
  }
  var arr_names = [];
  for (var i=0; i<data.list.length; i++) {
  arr_names.push(data.list[i].product_name);
  }
  var arr_quantity = [];
  for (var i=0; i<data.list.length; i++) {
  arr_quantity.push(data.list[i].quantity);
  }
  var arr_price = [];
  for (var i=0; i<data.list.length; i++) {
  arr_price.push(data.list[i].product_price);
  }
  var arr_id = [];
  for (var i=0; i<data.list.length; i++) {
  arr_id.push(data.list[i].product_id);
  }

  var user_name = data.session.name;
  var user_lastname = data.session.last_name;
  var user_id = data.session.id;


 })

}

send_cart.addEventListener('click', function() {
      xhr.post('./order/send_email',{user_name:user_name, user_lastname:user_lastname, 
        products_name:arr_names, total:total, quantity:arr_quantity,
        price:arr_price, user_id:user_id, product_id:arr_id},{'Content-Type':'application/json'}).then((data) => {
        console.log(data);
        if (data.sent === true) {
          alert("Pedido enviado")
        } else {
          alert("Error al enviar el pedido. Por favor intente de nuevo")
        }
      })

  })
  

  






breakpoint.refreshValue()
responsiveness()
//addEventListener('load', cart);
cart()

