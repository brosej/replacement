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
                small_title.setAttribute('class', 'display-4 col-4 col-md-4  d-inline  bg-dark text-white responsive-display')
              break;
              case 'tablet':
                title.setAttribute('class', '')
                title.innerHTML = "";
                small_title.setAttribute('class', 'display-4 col-4 col-md-4  d-inline  bg-dark text-white responsive-display')
              break;
              case 'desktop':
                small_title.setAttribute('class', '')
                small_title.innerHTML = "";
                title.setAttribute('class', ' display-3 col-4 col-md-4 mb-0  d-inline  bg-dark text-white p-2')
              break;
              default:
                small_title.setAttribute('class', '')
                small_title.innerHTML = "";
                title.setAttribute('class', ' display-3 col-4 col-md-4 mb-0  d-inline  bg-dark text-white p-2')
          }
}


  //making your buttons beautiful

  const buyButton = (mybutton)=>{
    var buy_icon = document.createElement('i');
    mybutton.setAttribute('class','btn btn-success pl-5 pr-5')
    buy_icon.setAttribute('class','ion-icon ion-android-cart pl-1')
    buy_icon.setAttribute('style','font-size:22px;color:white')
    mybutton.innerHTML ='Añadir al '
    mybutton.appendChild(buy_icon)
    return mybutton
  }
  const eraseButton = (mybutton)=>{
    var erase_icon = document.createElement('i');
    mybutton.setAttribute('class','btn btn-danger pl-5 pr-5')
    erase_icon.setAttribute('class','ion-icon ion-android-delete pl-1 ml-2')
    erase_icon.setAttribute('style','font-size:22px;color:white')
    mybutton.innerHTML = "  Eliminar"
    mybutton.appendChild(erase_icon)
    return mybutton
  }
 

  const editButton = (mybutton)=>{
    var edit_icon = document.createElement('i');
    mybutton.setAttribute('class','btn btn-primary pl-5 pr-5')
    edit_icon.setAttribute('class','ion-icon ion-edit pl-1 ml-2')
    edit_icon.setAttribute('style','font-size:22px;color:white') 
    mybutton.innerHTML = "  Editar";
    mybutton.appendChild(edit_icon)
    return mybutton

  }
  //bitch
  




function load_products_by_brands() {
  var xhr = new XHR();
  second_function();
   brand = $('brand').value;
  xhr.post('./product/prices',{brand:brand},{'Content-Type':'application/json'}).then((data)=> {
    var br = document.createElement('br')
    var brand_name = document.createElement('h3');
   // brand_name.setAttribute('id','this_brand')


    switch(breakpoint.value) {
              case 'smartphone':
                var brand_name = document.createElement('h3');
                $('small_search_by').innerHTML = ""
                brand_name.setAttribute('class', 'd-inline p-2 col')  
                brand_name.innerHTML = `Marca: ${brand}`;
                $('small_search_by').appendChild(brand_name);
              break;
              case 'tablet':
                var brand_name = document.createElement('h3');
                $('small_search_by').innerHTML = ""
                brand_name.setAttribute('class', 'd-inline p-2 col')  
                brand_name.innerHTML = `Marca: ${brand}`;
                $('small_search_by').appendChild(brand_name);
              break;
              case 'desktop':
                var brand_name = document.createElement('h3');
                $('search_by').innerHTML = ""
                brand_name.setAttribute('class', 'd-inline bg-dark text-white pb-3 pl-2')  
                brand_name.innerHTML = `Marca: ${brand}`;
                $('search_by').appendChild(brand_name);

              break;
              default:
                var brand_name = document.createElement('h3');
                $('search_by').innerHTML = ""
                brand_name.setAttribute('class', 'd-inline bg-dark text-white pb-3 p-2')  
                brand_name.innerHTML = `Marca: ${brand}`;
                $('search_by').appendChild(brand_name);
          }


    /*$('search_by').innerHTML = ""
    brand_name.setAttribute('class', 'd-inline p-2 bg-dark text-white')  
    brand_name.innerHTML = `Marca: ${brand}`;
    $('search_by').appendChild(brand_name);  */


    $('tr').innerHTML = "";
    if ($('tbdy') != null) {
      $('tbdy').remove();
    }
    var tbl = $('table');
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    if (data.id !== null && data.admin === false) {
      console.log("a");
        for (var i=0; i < 5; i++) {
            var tr = $('table').tHead.children[0], th = document.createElement('th');
            th.setAttribute('scope','col')
            switch(i) {
              case 0:
               th.innerHTML = 'Codigo';
              break;
              case 1:
                th.innerHTML = 'Descripcion';
              break;
              case 2:
                th.innerHTML = 'Precio';
              break;
              case 3:
                th.innerHTML = 'Existencia';
              break;
              case 4:
                th.innerHTML = 'Anadir a carro de compra';
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
                td.innerHTML = data.list[i].code;
              break;
              case 1:
                td.innerHTML = data.list[i].description;
              break;
              case 2:
                var size = data.list[i].price.toString().length;
                var number  = data.list[i].price.toString();
                var arr = number.split("").reverse();
                var points = [];
                for (var n=0; n<size; n++) {
                  switch (n) {
                    case 5:
                    case 8:
                    case 11:
                      points.push(arr[n] + ",");
                    break;
                    default:
                      points.push(arr[n]);
                    break;
                  }
                }
                td.innerHTML = points.reverse().join("");
              break;
              case 3:
              if (data.list[i].stock < 0) {
                td.innerHTML = "0";
              } else {
                td.innerHTML = data.list[i].stock;
              }
              break;
              case 4:
                //var add_button = document.createElement('button');
               // var buy_icon = document.createElement('i');
                //add_button.setAttribute('class','btn btn-success pl-5 pr-5')
               // buy_icon.setAttribute('class','ion-icon ion-android-cart pl-1')
               // buy_icon.setAttribute('style','font-size:22px;color:white')
                var add_button1 = document.createElement('button');
                add_button1 = buyButton(add_button1)
                var product_id = data.list[i].id;
                td.setAttribute("id", i)
                //add_button.innerHTML ='Añadir al '
                //add_button.appendChild(buy_icon)
                td.appendChild(add_button1);
                td.addEventListener('click', function() {
                  var quantity = prompt("Cantidad a comprar: ");
                  var reg = /^\d+$/;
                  if (reg.test(quantity)) {
                    var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                    if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                      alert("No hay producto en existencia")
                    } else {
                      xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].code, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
                        console.log(data);
                        if (data.msg === 200) {
                          alert("Producto agregado");
                          window.location.href = "./index.html";
                        } else {
                          alert("Producto ya esta agregado a carro de compras");
                          window.location.href = "./index.html";
                        }
                      });
                    }
                } else if (quantity === null) {
                  alert("Producto no anadido")
              } else {
                alert("Error al anadir producto a carro de compras. Debe ingresar un numero. Intente de nuevo");
              }
            });
            break;
            }
            tr.appendChild(td)
          }
          tbdy.appendChild(tr);
      }
      tbl.appendChild(tbdy);
    } else if (data.admin === true) {
        for (var i=0; i < 7; i++) {
            var tr = $('table').tHead.children[0], th = document.createElement('th');
            switch(i) {
              case 0:
                th.innerHTML = 'Codigo';
              break;
              case 1:
                th.innerHTML = 'Descripcion';
              break;
              case 2:
                th.innerHTML = 'Precio';
              break;
              case 3:
                th.innerHTML = 'Existencia';
              break;
              case 4:
                th.innerHTML = 'Anadir a carro de compra';
              break;
              case 5:
                th.innerHTML = 'Eliminar producto';
              break;
              case 6:
                th.innerHTML = 'Editar producto';
              break;
            }
            tr.appendChild(th);
          }


        for (var i = 0; i < data.list.length; i++) {
            var tr = document.createElement('tr');
            tr.setAttribute('id', i);
            for (var j = 0; j < 7; j++) {
              var td = document.createElement('td');
              switch (j) {
                case 0:
                  td.innerHTML = data.list[i].code;
                break;
                case 1:
                  td.innerHTML = data.list[i].description;
                break;
                case 2:
                  var size = data.list[i].price.toString().length;
                  var number  = data.list[i].price.toString();
                  var arr = number.split("").reverse();
                  var points = [];
                  for (var n=0; n<size; n++) {
                    switch (n) {
                      case 5:
                      case 8:
                      case 11:
                        points.push(arr[n] + ",");
                      break;
                      default:
                        points.push(arr[n]);
                      break;
                    }
                  }
                  td.innerHTML = points.reverse().join("");
                break;
                case 3:
                if (data.list[i].stock < 0) {
                  td.innerHTML = "0";
                } else {
                  td.innerHTML = data.list[i].stock;
                }
                break;
                case 4:
                  var add_button2 = document.createElement('button');
                  add_button2 = buyButton(add_button2);
                  var product_id = data.list[i].id;
                  td.setAttribute("id", i)
                  //button.innerHTML = "Anadir";
                  td.appendChild(add_button2);
                  td.addEventListener('click', function() {
                    var quantity = prompt("Cantidad a comprar: ");
                    var reg = /^\d+$/;
                    if (reg.test(quantity)) {
                      var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                      if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                        alert("No hay producto en existencia")
                      } else {
                        console.log(data.list[this.id])
                        xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].code, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
                          if (data.msg === 200) {
                            alert("Producto agregado");
                            window.location.href = "./index.html";
                          } else {
                            alert("Producto ya esta agregado a carro de compras");
                            window.location.href = "./index.html";
                          }
                        });
                      }
                  } else if (quantity === null) {
                    alert("Producto no agregado")
                  } else {
                    alert("Error al anadir producto a carro de compras. Debe ingresar un numero. Intente de nuevo");
                  }
                });
                break;
                case 5:
                  var erase_button1 = document.createElement('button');
                  erase_button1 = eraseButton(erase_button1);
                  td.setAttribute("id", i)
                  //button.innerHTML = "Eliminar";
                  td.appendChild(erase_button1);
                  var product_id = data.list[i].id;
                  td.addEventListener('click', function() {
                      var r = confirm("Segur@ que desea eliminar esta orden?")
                      if (r == true) {
                        xhr.get(`./product/delete/${product_id}`,{},{}).then((data)=>{
                          alert("Has eliminado un producto");
                          window.location.href = "./index.html";
                      });
                    }
                  });
                break;
                case 6:
                  var edit_button1 = document.createElement('button');
                  edit_button1 = editButton(edit_button1);
                  td.setAttribute("id", i)
                  //button.innerHTML = "Editar";
                  td.appendChild(edit_button1);
                  td.addEventListener('click', function() {
                    select();
                    $('edit').style.display = "block";
                    $('table').style.display = "none";
                    $('title').innerHTML = "Editar producto";
                    var price = $('precio');
                    price.setAttribute('placeholder', data.list[this.id].price);
                    var description = $('description');
                    description.setAttribute('placeholder', data.list[this.id].description);
                    var code = $('code');
                    code.setAttribute('placeholder', data.list[this.id].code);
                    var stock = $('stock');
                    stock.setAttribute('placeholder', data.list[this.id].stock);
                    var type_supplier = $('type_supplier');
                    type_supplier.setAttribute('placeholder', data.list[this.id].type_supplier);
                    var brand = $('brand').value;
                    var department = $('department').value;
                    var product_id = data.list[this.id].id;
                    var td_id = this.id;
                    $('update').addEventListener('click', function() {
                      if (price.value === "") {
                        price.value = data.list[td_id].price;
                      }
                      if (description.value === "") {
                        description.value = data.list[td_id].description;
                      }
                      if (stock.value === "") {
                        stock.value = data.list[td_id].stock;
                     }
                     if (type_supplier.value === "nothing") {
                        type_supplier.value = data.list[td_id].type_supplier;
                     }
                     if (brand === "not") {
                        brand = data.list[td_id].brand;
                     }
                     if (department === "not_two") {
                        department = data.list[td_id].department;
                     }
                     if (code.value === "") {
                        code.value = data.list[td_id].code;
                     }
                     var producto = data.list[td_id].id;
                      xhr.post(`./product/update`,{price:price.value, description:description.value, stock:stock.value, type_supplier:type_supplier.value, brand:brand, department:department, code:code.value, product_id:producto}, {'Content-Type':'application/json'}).then((data)=>{
                        alert("Producto editado con exito")
                      });
                    });
                 });
                break;
                }

                tr.appendChild(td)
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
    } else {
        for (var i=0; i < 4; i++) {
          var tr = $('table').tHead.children[0], th = document.createElement('th');
          switch(i) {
            case 0:
              th.innerHTML = 'Codigo';
            break;
            case 1:
              th.innerHTML = 'Descripcion';
            break;
            case 2:
              th.innerHTML = 'Precio';
            break;
            case 3:
              th.innerHTML = 'Existencia';
            break;
          }
          tr.appendChild(th);
        }

        for (var i = 0; i < data.list.length; i++) {
            var tr = document.createElement('tr');
            tr.setAttribute('id', i);
            for (var j = 0; j < 4; j++) {
              var td = document.createElement('td');
              switch (j) {
                case 0:
                  td.innerHTML = data.list[i].code;
                break;
                case 1:
                  td.innerHTML = data.list[i].description;
                break;
                case 2:
                  var size = data.list[i].price.toString().length;
                  var number  = data.list[i].price.toString();
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
                case 3:
                if (data.list[i].stock < 0) {
                  td.innerHTML = "0";
                } else {
                  td.innerHTML = data.list[i].stock;
                }
                break;
                }
                tr.appendChild(td)
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
       }
      });
    };


    function load_products_by_departments() {
      var xhr = new XHR();
      var department = $('department').value;
      xhr.post('./product/show_products_by_stuff',{brand:brand, department:department},{'Content-Type':'application/json'}).then((data)=> {
        if($('this') !== null) {
          $('this').remove();
        }


        switch(breakpoint.value) {
              case 'smartphone':
                var department_name = document.createElement('h3');     
                department_name.setAttribute('id', 'this');
                department_name.innerHTML = `Departamento: ${department}`;
                department_name.setAttribute('class', 'd-inline p-2 col');
                $('small_search_by').appendChild(department_name);
              break;
              case 'tablet':
                var department_name = document.createElement('h3');   
                department_name.setAttribute('id', 'this');
                department_name.innerHTML = `Departamento: ${department}`;
                department_name.setAttribute('class', 'd-inline p-2 col');
                $('small_search_by').appendChild(department_name);
              break;
              case 'desktop':
                var department_name = document.createElement('h3');       
                department_name.setAttribute('id', 'this');
                department_name.innerHTML = `- Departamento: ${department}`;
                department_name.setAttribute('class', 'd-inline  bg-dark text-white pb-3 pl-2 pr-2 ');
                $('search_by').appendChild(department_name);

              break;
              default:
                var department_name = document.createElement('h3');       
                department_name.setAttribute('id', 'this');
                department_name.innerHTML = `- Departamento: ${department}`;
                department_name.setAttribute('class', 'd-inline  bg-dark text-white pb-3 pl-2 pr-2');
                $('search_by').appendChild(department_name);
          }
        /*var department_name = document.createElement('h3');       
        department_name.setAttribute('id', 'this');
        department_name.innerHTML = `- Departamento: ${department}`;
        department_name.setAttribute('class', 'd-inline p-2 bg-dark text-white');
        $('search_by').appendChild(department_name);

        var department_name = document.createElement('h3');
        department_name.setAttribute('class', 'row')     
        department_name.setAttribute('id', 'this');
        department_name.innerHTML = `- Departamento: ${department}`;
        department_name.setAttribute('class', 'd-inline p-2 bg-dark text-white');
        $('small_search_by').appendChild(department_name);*/
       
        $('tr').innerHTML = "";
        if ($('tbdy') != null) {
          $('tbdy').remove();
        }
        var tbl = $('table');
        var tbdy = document.createElement('tbody');
        tbdy.setAttribute('id', 'tbdy')
        if (data.id !== null && data.admin === false) {
            for (var i=0; i < 5; i++) {
                var tr = $('table').tHead.children[0], th = document.createElement('th');
                switch(i) {
                  case 0:
                    th.innerHTML = 'Codigo';
                  break;
                  case 1:
                    th.innerHTML = 'Descripcion';
                  break;
                  case 2:
                    th.innerHTML = 'Precio';
                  break;
                  case 3:
                    th.innerHTML = 'Existencia';
                  break;
                  case 4:
                    th.innerHTML = 'Anadir a carro de compra';
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
                    td.innerHTML = data.list[i].code;
                  break;
                  case 1:
                    td.innerHTML = data.list[i].description;
                  break;
                  case 2:
                    var size = data.list[i].price.toString().length;
                    var number  = data.list[i].price.toString();
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
                  case 3:
                  if (data.list[i].stock < 0) {
                    td.innerHTML = "0";
                  } else {
                    td.innerHTML = data.list[i].stock;
                  }
                  break;
                  case 4:
                    var add_button3 = document.createElement('button');
                    add_button3 = buyButton(add_button3);

                    var product_id = data.list[i].id;
                    td.setAttribute("id", i)
                    //button.innerHTML = "Anadir al ";
                    //let buy_icon = document.createElement('i');
                    //button.setAttribute('class','btn btn-success pl-5 pr-5')
                   // buy_icon.setAttribute('class','ion-icon ion-android-cart pl-1')
                   // buy_icon.setAttribute('style','font-size:22px;color:white')
                    //button.appendChild(buy_icon)
                    td.appendChild(add_button3);
                    td.addEventListener('click', function() {
                      var quantity = prompt("Cantidad a comprar: ");
                      var reg = /^\d+$/;
                      if (reg.test(quantity)) {
                        var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                        if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                          alert("No hay producto en existencia")
                        } else {
                          xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].code, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
                            console.log(data);
                            if (data.msg === 200) {
                              alert("Producto agregado");
                              window.location.href = "./index.html";
                            } else {
                              alert("Producto ya esta agregado a carro de compras");
                              window.location.href = "./index.html";
                            }
                          });
                        }
                    } else if (quantity === null) {
                      alert("Producto no anadido")
                  } else {
                    alert("Error al anadir producto a carro de compras. Debe ingresar un numero. Intente de nuevo");
                  }
                });
                break;
                }
                tr.appendChild(td)
              }
              tbdy.appendChild(tr);
          }
          tbl.appendChild(tbdy);
        } else if (data.admin === true) {
            for (var i=0; i < 7; i++) {
                var tr = $('table').tHead.children[0], th = document.createElement('th');
                switch(i) {
                  case 0:
                    th.innerHTML = 'Codigo';
                  break;
                  case 1:
                    th.innerHTML = 'Descripcion';
                  break;
                  case 2:
                    th.innerHTML = 'Precio';
                  break;
                  case 3:
                    th.innerHTML = 'Existencia';
                  break;
                  case 4:
                    th.innerHTML = 'Anadir a carro de compra';
                  break;
                  case 5:
                    th.innerHTML = 'Eliminar producto';
                  break;
                  case 6:
                    th.innerHTML = 'Editar producto';
                  break;
                }
                tr.appendChild(th);
              }


            for (var i = 0; i < data.list.length; i++) {
                var tr = document.createElement('tr');
                tr.setAttribute('id', i);
                for (var j = 0; j < 7; j++) {
                  var td = document.createElement('td');
                  switch (j) {
                    case 0:
                      td.innerHTML = data.list[i].code;
                    break;
                    case 1:
                      td.innerHTML = data.list[i].description;
                    break;
                    case 2:
                      var size = data.list[i].price.toString().length;
                      var number  = data.list[i].price.toString();
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
                    case 3:
                    if (data.list[i].stock < 0) {
                      td.innerHTML = "0";
                    } else {
                      td.innerHTML = data.list[i].stock;
                    }
                    break;
                    case 4:

                       var add_button4 = document.createElement('button');
                       add_button4 = buyButton(add_button4);
                      //var buy_icon = document.createElement('i');
                      //button.setAttribute('class','btn btn-success pl-5 pr-5')
                      //buy_icon.setAttribute('class','ion-icon ion-android-cart pl-1')
                      //buy_icon.setAttribute('style','font-size:22px;color:white')
                      var product_id = data.list[i].id;
                      td.setAttribute("id", i)
                      //button.innerHTML = "Anadir al ";
                      //button.appendChild(buy_icon)
                      td.appendChild(add_button4);
                      td.addEventListener('click', function() {
                        var quantity = prompt("Cantidad a comprar: ");
                        var reg = /^\d+$/;
                        if (reg.test(quantity)) {
                          var total = parseInt(data.list[this.id].price) * parseInt(quantity);
                          if ((parseInt(data.list[this.id].stock) - parseInt(quantity)) < 0 && data.list[this.id].type_supplier === false) {
                            alert("No hay producto en existencia")
                          } else {
                            console.log(data.list[this.id])
                            xhr.post('./cart/new', {product_id:data.list[this.id].id, product_name:data.list[this.id].code, product_price:data.list[this.id].price, quantity:quantity, total:total, stock:data.list[this.id].stock}, {'Content-Type':'application/json'}).then((data)=>{
                              if (data.msg === 200) {
                                alert("Producto agregado");
                                window.location.href = "./index.html";
                              } else {
                                alert("Producto ya esta agregado a carro de compras");
                                window.location.href = "./index.html";
                              }
                            });
                          }
                      } else if (quantity === null) {
                        alert("Producto no agregado")
                      } else {
                        alert("Error al anadir producto a carro de compras. Debe ingresar un numero. Intente de nuevo");
                      }
                    });
                    break;
                    case 5:
                       var erase_button3 = document.createElement('button');
                       erase_button3 = eraseButton(erase_button3);
                      //var erase_icon = document.createElement('i');
                      //button.setAttribute('class','btn btn-danger pl-5 pr-5')
                      //erase_icon.setAttribute('class','ion-icon ion-android-delete pl-1')
                      //erase_icon.setAttribute('style','font-size:22px;color:white')
                      td.setAttribute("id", i)
                      //button.innerHTML = " Eliminar";
                      td.appendChild(erase_button3);
                      var product_id = data.list[i].id;
                      td.addEventListener('click', function() {
                          var r = confirm("Segur@ que desea eliminar esta orden?")
                          if (r == true) {
                            xhr.get(`./product/delete/${product_id}`,{},{}).then((data)=>{
                              alert("Has eliminado un producto");
                              window.location.href = "./index.html";
                          });
                        }
                      });
                    break;
                    case 6:
                      var edit_button3 = document.createElement('button');
                      edit_button3 = editButton(edit_button3)
                      //var edit_icon = document.createElement('i');
                      //button.setAttribute('class','btn btn-primary pl-5 pr-5')
                      //erase_icon.setAttribute('class','ion-icon ion-android-edit pl-1')
                      //erase_icon.setAttribute('style','font-size:22px;color:white')
                      td.setAttribute("id", i)
                      //button.innerHTML = " Editar";
                      td.appendChild(edit_button3);
                      td.addEventListener('click', function() {
                        select();
                        $('edit').style.display = "block";
                        $('table').style.display = "none";
                        $('title').innerHTML = "Editar producto";
                        var price = $('precio');
                        price.setAttribute('placeholder', data.list[this.id].price);
                        var description = $('description');
                        description.setAttribute('placeholder', data.list[this.id].description);
                        var code = $('code');
                        code.setAttribute('placeholder', data.list[this.id].code);
                        var stock = $('stock');
                        stock.setAttribute('placeholder', data.list[this.id].stock);
                        var type_supplier = $('type_supplier');
                        type_supplier.setAttribute('placeholder', data.list[this.id].type_supplier);
                        var brand = $('brand').value;
                        var department = $('department').value;
                        var product_id = data.list[this.id].id;
                        var td_id = this.id;
                        $('update').addEventListener('click', function() {
                          if (price.value === "") {
                            price.value = data.list[td_id].price;
                          }
                          if (description.value === "") {
                            description.value = data.list[td_id].description;
                          }
                          if (stock.value === "") {
                            stock.value = data.list[td_id].stock;
                         }
                         if (type_supplier.value === "nothing") {
                            type_supplier.value = data.list[td_id].type_supplier;
                         }
                         if (brand === "not") {
                            brand = data.list[td_id].brand;
                         }
                         if (department === "not_two") {
                            department = data.list[td_id].department;
                         }
                         if (code.value === "") {
                            code.value = data.list[td_id].code;
                         }
                         var producto = data.list[td_id].id;
                          xhr.post(`./product/update`,{price:price.value, description:description.value, stock:stock.value, type_supplier:type_supplier.value, brand:brand, department:department, code:code.value, product_id:producto}, {'Content-Type':'application/json'}).then((data)=>{
                            alert("Producto editado con exito")
                          });
                        });
                     });
                    break;
                    }

                    tr.appendChild(td)
                }
                tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
        } else {
            for (var i=0; i < 4; i++) {
              var tr = $('table').tHead.children[0], th = document.createElement('th');
              switch(i) {
                case 0:
                  th.innerHTML = 'Codigo';
                break;
                case 1:
                  th.innerHTML = 'Descripcion';
                break;
                case 2:
                  th.innerHTML = 'Precio';
                break;
                case 3:
                  th.innerHTML = 'Existencia';
                break;
              }
              tr.appendChild(th);
            }

            for (var i = 0; i < data.list.length; i++) {
                var tr = document.createElement('tr');
                tr.setAttribute('id', i);
                for (var j = 0; j < 4; j++) {
                  var td = document.createElement('td');
                  switch (j) {
                    case 0:
                      td.innerHTML = data.list[i].code;
                    break;
                    case 1:
                      td.innerHTML = data.list[i].description;
                    break;
                    case 2:
                      var size = data.list[i].price.toString().length;
                      var number  = data.list[i].price.toString();
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
                    case 3:
                    if (data.list[i].stock < 0) {
                      td.innerHTML = "0";
                    } else {
                      td.innerHTML = data.list[i].stock;
                    }
                    break;
                    }
                    tr.appendChild(td)
                }
                tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
           }
          });
        };

function delete_product(id) {
  let xhr = new XHR();
  xhr.get(`./product/delete/${id}`,{},{}).then((data)=>{
    window.location.href = "./index.html"
  });
};

function logout(){
  let xhr = new XHR();
  xhr.get('./logout',{},{}).then((data)=>{
    window.location.href = "./login.html"
  });
};


function select() {
  let xhr = new XHR();
  xhr.get('./stuff/get_brands_and_departments',{},{}).then((data)=> {
    console.log(data);
      for (var i=0; i<data.brands.length; i++) {
        var brand = document.createElement("option");
        brand.value = data.brands[i].name;
        brand.innerHTML = data.brands[i].name;
        $('brands').appendChild(brand);

      }

      for (var i=0; i<data.departments.length; i++) {
          var department = document.createElement("option");
          department.value = data.departments[i].name;
          department.innerHTML = data.departments[i].name;
          $('departments').appendChild(department);
      }
  });
}

function second_function() {
  let xhr = new XHR();
  //$('department_input_group').style.display = 'block';
  $('department_div').style.display = 'block';
  $('department_h4').style.display = 'block';
  $('show2').style.display = 'block';
  //$('brand_input_group').style.display = 'none';
  //$('show').style.display = 'none';
  //$('brand').style.display = 'none';
  xhr.get('./stuff/get_brands_and_departments',{},{}).then((data)=> {
    $('department').innerHTML="";
    for (var i=0; i<data.departments.length; i++) {
      var department_option = document.createElement("option");
      department_option.value = data.departments[i].name;
      department_option.innerHTML = data.departments[i].name;
      $('department').appendChild(department_option);
    }
    
  });
}

//making things beautiful:
breakpoint.refreshValue()
responsiveness()

$('show').addEventListener('click', load_products_by_brands)
$('show2').addEventListener('click', load_products_by_departments)
