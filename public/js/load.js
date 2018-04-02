function $(id) {
    return document.getElementById(id);
};

const iconifyEraseButton = (mybutton)=>{
    var erase_icon = document.createElement('i');
    mybutton.setAttribute('class','btn btn-danger p-1 ml-2')
    erase_icon.setAttribute('class','ion-icon ion-android-delete p-1')
    erase_icon.setAttribute('style','font-size:22px;color:white')
    //mybutton.innerHTML = ""
    mybutton.appendChild(erase_icon)
    return mybutton
  }

function sendFile(){
  let xhr = new XHR();
    let formData = new FormData();
    let precio = $("precio").value;
    let description = $("description").value;
    let stock = $("stock").value;
    let type_supplier = $("type_supplier").value;
    let brand = $("brand").value;
    let department = $("department").value;
    let code = $("code").value;
    formData.append('price', precio);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('type_supplier', type_supplier);
    formData.append('brand', brand);
    formData.append('department', department);
    formData.append('code', code);
     xhr.post(`./product/create`,{price:precio, description:description, stock:stock, type_supplier:type_supplier, brand:brand, department:department, code:code},{'Content-Type':'application/json'}).then((data)=>{
       if (data.status === 200) {
          alert("Producto cargado");
          window.location.href = './upload.html';
        } else {
          alert("Error al cargar el producto")
        }
  }).then( () =>{ $('close_upload_modal').click() } );
};

function select() {
  let xhr = new XHR();
  //$('add_stuff').style.margin = "0 auto";
  //$('add_stuff').style.display = "block";
  //$('show_stuff').style.margin = "0 auto";
  //$('show_stuff').style.display = "block";
  xhr.get('./stuff/get_brands_and_departments',{},{}).then((data)=> {
      for (var i=0; i<data.brands.length; i++) {
        var brand_option = document.createElement("option");
        brand_option.value = data.brands[i].name;
        brand_option.innerHTML = data.brands[i].name;
        if (data.brands[i].name !== null) {
          $('brand_select').appendChild(brand_option);
        }
      }
      for (var i=0; i<data.departments.length; i++) {
          var department_option = document.createElement("option");
          department_option.value = data.departments[i].name;
          department_option.innerHTML = data.departments[i].name;
          if (data.departments[i].name !== null) {
            $('department_select').appendChild(department_option);
          }
      }

      //CREAR MODAL DE AGREGAR NUEVAS MARCAS.

      $('add_stuff_btn').addEventListener('click', function() {
          //fuck all this
          
          //till here
            //  $('message_modal_button').setAttribute('id', 'new_add');
          //esta linea de abajo no va 
              
              
          //esto si
              
              var add_stuff_div= document.createElement('div')
              add_stuff_div.setAttribute('class','col')
              var firstspan = document.createElement('span')
              firstspan.innerHTML = 'Nueva marca'
              firstspan.setAttribute('class','pb-2')
              var secondspan = document.createElement('span')
              secondspan.innerHTML = 'Nuevo departamento'
              var new_brand = document.createElement('input')
              new_brand.setAttribute('class','pb-2')
              new_brand.setAttribute('id','new_brand_input')
              new_brand.setAttribute('class','form-control')
              new_brand.setAttribute('type','text')
              new_brand.setAttribute('placeholder','marca')
              var new_dept = document.createElement('input')
              new_dept.setAttribute('id','new_dept_input')
              new_dept.setAttribute('class','form-control')
              new_dept.setAttribute('type','text')
              new_dept.setAttribute('placeholder','departamento')
              $('message_modal_title').innerHTML = "Agregar nueva marca y/o departamento"
              $('message_modal_button').innerHTML = "Agregar"
              $('message_modal_body').appendChild(firstspan)
              $('message_modal_body').appendChild(new_brand)
              $('message_modal_body').appendChild(secondspan)
              $('message_modal_body').appendChild(new_dept)


              
              

              $('close_upload_modal').click()
              $('trigger_message_modal').click()
              

              $('message_modal_button').addEventListener('click', () => {

                //var new_brand_input = $(new_brand_input)
                //var new_dept_input = $(new_dept_input)
                var marca = new_brand.value;
                var departamento = new_dept.value;
                console.log(marca)
                console.log(departamento)

              if (marca !== "" && departamento === "") {
                xhr.post('./stuff/add_brand',{brand:marca},{'Content-Type':'application/json'}).then((data) => {
                   if (data.status === 200) {
                     alert('Marca agregada');
                   } else {
                     alert('Error al agregar marca');
                   }
                });
              } else if (departamento !== "" && marca === "") {
                xhr.post('./stuff/add_department',{department:departamento},{'Content-Type':'application/json'}).then((data) => {
                   if (data.status === 200) {
                     alert('Departamento agregado');
                   } else {
                     alert('Error al agregar departamento');
                   }
               });
             } else if (departamento !== "" && marca !== "") {
               xhr.post('./stuff/add_department',{department:departamento},{'Content-Type':'application/json'}).then((data) => {
                 xhr.post('./stuff/add_brand',{brand:marca},{'Content-Type':'application/json'}).then((data) => {
                    if (data.status === 200) {
                      alert('Marca y departamento agregados');
                    } else {
                      alert('Error al agregar marca y departamento');
                    }
                 });
              });
             }
              
            })

         });

        $('show_stuff_btn').addEventListener('click', function() {
          $('tr').innerHTML = "";
          if ($('tbdy') != null) {
            $('tbdy').remove();
          }
          //las 3 lineas de abajo no van
          xhr.get('./stuff/get_brands_and_departments',{},{}).then((data) => {
                        var tbl = $('table');
                        tbl.setAttribute('class','table table-striped table-hover table-responsive-sm table-bordered')
                        var tbdy = document.createElement('tbody');
                        tbdy.setAttribute('id', 'tbdy')
                        for (var i=0; i < 2; i++) {
                            var tr = $('table').tHead.children[0], th = document.createElement('th');
                            switch(i) {
                              case 0:
                                th.innerHTML = 'Marca';
                                
                              break;
                              case 1:
                                th.innerHTML = 'Departamento';
                              break;
                              }
                            tr.appendChild(th);
                            }

                            var size = data.brands.length > data.departments.length ? data.brands.length : data.departments.length;

                            buttons =[]
                            for (var i = 0; i < size; i++) {
                                var tr = document.createElement('tr');
                                
                                tr.setAttribute('id', i);
                                for (var j = 0; j < 2; j++) {

                                  var td = document.createElement('td');
                                  buttons[i] = document.createElement('button')
                                  buttons[i] = iconifyEraseButton(buttons[i])
                                  switch (j) {
                                    case 0:
                                      if (data.brands[i] !== undefined) {

                                        td.setAttribute("id", data.brands[i].name)
                                        buttons[i].setAttribute('id',data.brands[i].name)
                                        td.appendChild(buttons[i])

                                      }
                                      if (data.brands[i] === undefined) {

                                        td.innerHTML = "";

                                      } else {

                                        var name = data.brands[i].name;
                                        td.innerHTML = name;
                                        td.appendChild(buttons[i])
                                        buttons[i].addEventListener('click', function(){
                                          var r = confirm("Segur@ que desea eliminar la marca: "+this.id)
                                          if (r == true) {
                                            xhr.get(`./stuff/delete_brand/${this.id}`,{},{}).then((data) => {
                                              alert('Marca eliminada');
                                            })
                                          }
                                        });

                                      }
                                    break;
                                    case 1:
                                      if (data.departments[i] !== undefined) {
                                        buttons[i].setAttribute('id', data.departments[i].name )
                                        td.setAttribute("id", data.departments[i].name)
                                      }
                                      if (data.departments[i] === undefined) {
                                        td.innerHTML = "";
                                      } else {
                                        td.innerHTML = data.departments[i].name;
                                        td.appendChild(buttons[i])
                                        buttons[i].addEventListener('click', function(){
                                          var r = confirm("Segur@ que desea eliminar el departamento: "+this.id)
                                          if (r == true) {
                                            xhr.get(`./stuff/delete_department/${this.id}`,{},{}).then((data) => {
                                              alert('Departamento eliminado');
                                            })
                                          }
                                        });
                                      }
                                    break;
                                  }

                                    tr.appendChild(td)
                                }
                                tbdy.appendChild(tr);
                            }
                        tbl.appendChild(tbdy);
                        $('message_modal_title').innerHTML= "Marcas y departamentos"
                        $('message_modal_body').innerHTML= ""
                        $('message_modal_button').setAttribute('style','display:none;')
                        $('message_modal_body').appendChild(tbl)
          }).then( () => { 
            $('close_upload_modal').click()
            

          } ).then(()=> { $('trigger_message_modal').click() })
        });
      });
     };

$('sendFile').addEventListener('click',sendFile);
addEventListener('load', select);
