function $(id) {
    return document.getElementById(id);
};

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
                title.setAttribute('class', ' display-3 col-4 col-md-4 mb-0  d-inline  bg-dark text-white ')
              break;
              default:
                small_title.setAttribute('class', '')
                small_title.innerHTML = "";
                title.setAttribute('class', ' display-3 col-4 col-md-4 mb-0  d-inline  bg-dark text-white ')
          }
}


function show_all_orders() {
  let xhr = new XHR();
  xhr.get('./order/all',{},{}).then((data)=> {
    $('searching').style.display = "block";
    var tbl = $('table');
    tbl.setAttribute("id", "table");
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    for (var i=0; i < 8; i++) {
        var tr = $('table').tHead.children[0], th = document.createElement('th');
        switch(i) {
          case 0:
            th.innerHTML = '# de orden';
          break;
          case 1:
            th.innerHTML = '# de factura';
          break;
          case 2:
            th.innerHTML = 'Nombre y apellido';
          break;
          case 3:
            th.innerHTML = 'Total';
          break;
          case 4:
            th.innerHTML = 'Fecha de facturacion';
          break;
          case 5:
            th.innerHTML = 'Estatus';
          break;
          case 6:
            th.innerHTML = 'Comentarios';
          break;
          case 7:
            th.innerHTML = 'Informacion';
          break;
        }
        tr.appendChild(th);
      }

    for (var i = 0; i < data.orders.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 8; j++) {
          var td = document.createElement('td');
          switch (j) {
            case 0:
              td.innerHTML = data.orders[i].order_number;
            break;
            case 1:
              td.innerHTML = data.orders[i].bill_number;
            break;
            case 2:
              td.innerHTML = data.orders[i].first_name+" "+data.orders[i].last_name;
            break;
            case 3:
              td.innerHTML = data.orders[i].total;
            break;
            case 4:
              var billing_date = data.orders[i].billing_date.substring(0, data.orders[i].billing_date.indexOf('T'));
              var date = billing_date.split('-').reverse().join('-');
              td.innerHTML = date;
            break;
            case 5:
              if (data.orders[i].deliver_date === null) {
                td.innerHTML = "No entregado";
              } else {
                if (data.orders[i].deliver_date === null) {
                  td.innerHTML = "-";
                } else {
                  if (data.orders[i].status === false) {
                    var d = new Date();
                    var default_month = d.getMonth();
                    var month = default_month + 1;
                    var deliver_date = d.getDate()+"-"+month+"-"+d.getFullYear();
                    var second = data.orders[i].payment_date.substring(0, data.orders[i].payment_date.indexOf('T'));
                    var partsFirst = deliver_date.split('-');
                    var partsSecond = second.split('-');
                    var date1 = new Date(partsFirst[2], partsFirst[1]-1, partsFirst[0]);
                    var date2 = new Date(partsSecond[0], partsSecond[1]-1, partsSecond[2]);
                    var diff = Math.floor(date2.getTime() - date1.getTime());
                    var millisecondsPerDay = 1000 * 60 * 60 * 24;
                    var millisBetween = date1.getTime() - date2.getTime();
                    var days = millisBetween / millisecondsPerDay;
                    if (days > 0) {
                      td.innerHTML = days+" dia(s) vencidos";
                      td.style.color = "red";
                    }else {
                      td.innerHTML = "Pago a tiempo";
                    }
                  } else {
                    td.innerHTML = "Pagado"
                  }
                }
              }
            break;
            case 6:
              if (data.orders[i].comment === null) {
                td.innerHTML = " ";
              } else {
                td.innerHTML = data.orders[i].comment;
              }
            break;
            case 7:
              td.innerHTML = "Detalles";
              td.setAttribute("id", data.orders[i].bill_number)
              td.addEventListener('click', order_info);
            break;
            }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
  })
}


function show_specific_orders() {
  let xhr = new XHR();
  var value = $('value').value;
  if ($('tbdy') != null) {
    $('tbdy').remove();
  }
  xhr.post('./order/tag_search',{value:value},{'Content-Type':'application/json'}).then((data)=> {
    var tbl = $('table');
    tbl.setAttribute("id", "table");
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    for (var i = 0; i < data.orders.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 8; j++) {
          var td = document.createElement('td');
          switch (j) {
            case 0:
              td.innerHTML = data.orders[i].order_number;
            break;
            case 1:
              td.innerHTML = data.orders[i].bill_number;
            break;
            case 2:
              td.innerHTML = data.orders[i].first_name+" "+data.orders[i].last_name;
            break;
            case 3:
              td.innerHTML = data.orders[i].total;
            break;
            case 4:
              var billing_date = data.orders[i].billing_date.substring(0, data.orders[i].billing_date.indexOf('T'));
              var date = billing_date.split('-').reverse().join('-');
              td.innerHTML = date;
            break;
            case 5:
              if (data.orders[i].deliver_date === null) {
                td.innerHTML = "No entregado";
              } else {
                if (data.orders[i].deliver_date === null) {
                  td.innerHTML = "-";
                } else {
                  if (data.orders[i].status === false) {
                    var d = new Date();
                    var default_month = d.getMonth();
                    var month = default_month + 1;
                    var deliver_date = d.getDate()+"-"+month+"-"+d.getFullYear();
                    var second = data.orders[i].payment_date.substring(0, data.orders[i].payment_date.indexOf('T'));
                    var partsFirst = deliver_date.split('-');
                    var partsSecond = second.split('-');
                    var date1 = new Date(partsFirst[2], partsFirst[1]-1, partsFirst[0]);
                    var date2 = new Date(partsSecond[0], partsSecond[1]-1, partsSecond[2]);
                    var diff = Math.floor(date2.getTime() - date1.getTime());
                    var millisecondsPerDay = 1000 * 60 * 60 * 24;
                    var millisBetween = date1.getTime() - date2.getTime();
                    var days = millisBetween / millisecondsPerDay;
                    if (days > 0) {
                      td.innerHTML = days+" dia(s) vencidos";
                      td.bgColor = "Red";
                    }else {
                      td.innerHTML = "Pago a tiempo";
                    }
                  } else {
                    td.innerHTML = "Pagado"
                  }
                }
              }
            break;
            case 6:
              if (data.orders[i].comment === null) {
                td.innerHTML = "No hay comentarios";
              } else {
                td.innerHTML = data.orders[i].comment;
              }
            break;
            case 7:
              td.innerHTML = "Detalles";
              td.setAttribute("id", data.orders[i].bill_number)
              td.addEventListener('click', order_info);
            break;
            }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
  })
}

function show_user_orders(id) {
  let xhr = new XHR();
  xhr.get(`./order/user/${id}`,{},{}).then((data)=> {
    var tbl = $('table');
    tbl.setAttribute("id", "table");
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id', 'tbdy')
    for (var i=0; i < 8; i++) {
        var tr = $('table').tHead.children[0], th = document.createElement('th');
        switch(i) {
          case 0:
            th.innerHTML = '# de orden';
          break;
          case 1:
            th.innerHTML = '# de factura';
          break;
          case 2:
            th.innerHTML = 'Nombre y apellido';
          break;
          case 3:
            th.innerHTML = 'Total';
          break;
          case 4:
            th.innerHTML = 'Fecha de facturacion';
          break;
          case 5:
            th.innerHTML = 'Estatus';
          break;
          case 6:
            th.innerHTML = 'Comentarios';
          break;
          case 7:
            th.innerHTML = 'Informacion';
          break;
        }
        tr.appendChild(th);
      }

    for (var i = 0; i < data.orders.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 8; j++) {
          var td = document.createElement('td');
          switch (j) {
            case 0:
              td.innerHTML = data.orders[i].order_number;
            break;
            case 1:
              td.innerHTML = data.orders[i].bill_number;
            break;
            case 2:
              td.innerHTML = data.orders[i].first_name+" "+data.orders[i].last_name;
            break;
            case 3:
              td.innerHTML = data.orders[i].total;
            break;
            case 4:
              var billing_date = data.orders[i].billing_date.substring(0, data.orders[i].billing_date.indexOf('T'));
              var date = billing_date.split('-').reverse().join('-');
              td.innerHTML = date;
            break;
            case 5:
              if (data.orders[i].deliver_date === null) {
                td.innerHTML = "No entregado";
              } else {
                if (data.orders[i].deliver_date === null) {
                  td.innerHTML = "-";
                } else {
                  if (data.orders[i].status === false) {
                    var d = new Date();
                    var default_month = d.getMonth();
                    var month = default_month + 1;
                    var deliver_date = d.getDate()+"-"+month+"-"+d.getFullYear();
                    var second = data.orders[i].payment_date.substring(0, data.orders[i].payment_date.indexOf('T'));
                    var partsFirst = deliver_date.split('-');
                    var partsSecond = second.split('-');
                    var date1 = new Date(partsFirst[2], partsFirst[1]-1, partsFirst[0]);
                    var date2 = new Date(partsSecond[0], partsSecond[1]-1, partsSecond[2]);
                    var diff = Math.floor(date2.getTime() - date1.getTime());
                    var millisecondsPerDay = 1000 * 60 * 60 * 24;
                    var millisBetween = date1.getTime() - date2.getTime();
                    var days = millisBetween / millisecondsPerDay;
                    if (days > 0) {
                      td.innerHTML = days+" dia(s) vencidos";
                      td.bgColor = "Red";
                    }else {
                      td.innerHTML = "Pago a tiempo";
                    }
                  } else {
                    td.innerHTML = "Pagado"
                  }
                }
              }
            break;
            case 6:
              if (data.orders[i].comment === null) {
                td.innerHTML = "No hay comentarios";
              } else {
                td.innerHTML = data.orders[i].comment;
              }
            break;
            case 7:
              td.innerHTML = "Detalles";
              td.setAttribute("id", data.orders[i].bill_number)
              td.addEventListener('click', order_info_for_users);
            break;
            }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
  })
}

function order_info() {
  let xhr = new XHR();
  xhr.get(`./order/show/${this.id}`,{},{}).then((data) => {
      $("table").innerHTML = "";
      $('searching').style.display = "none";
      var order = $("test");
      var bill = document.createElement('p');
      var name = document.createElement('p');
      var status = document.createElement('p');
      var deliver_date = document.createElement('p');
      var payment_date = document.createElement('p');
      var total = document.createElement('p');
      var comments = document.createElement('p');
      var text = document.createElement('input');
      var update = document.createElement('button');
      var delivered_order = document.createElement('button');
      var comment = document.createElement('button');
      var erase = document.createElement('button');
      bill.innerHTML = "Factura #"+data.order.bill_number;
      if (data.order.deliver_date !== null) {
        var delivery = data.order.deliver_date.substring(0, data.order.deliver_date.indexOf('T'));
        var date = delivery.split('-').reverse().join('-');
        deliver_date.innerHTML = "Fecha de entrega: "+date;
        var payment = data.order.payment_date.substring(0, data.order.payment_date.indexOf('T'));
        var date2 = payment.split('-').reverse().join('-');
        payment_date.innerHTML = "Fecha de pago: "+date2;
      }
      name.innerHTML = "Cliente: "+data.order.first_name+" "+data.order.last_name;
      update.innerHTML = "Orden pagada";
      delivered_order.innerHTML = "Orden entregada"
      comment.innerHTML = "Comentar orden";
      erase.innerHTML = "Eliminar order";
      if (data.order.deliver_date === null) {
        status.innerHTML = "No entregado";
      } else {
        if (data.order.deliver_date === null) {
          status.innerHTML = "-";
        } else {
          if (data.order.status === false) {
            var d = new Date();
            var default_month = d.getMonth();
            var month = default_month + 1;
            var today = d.getDate()+"-"+month+"-"+d.getFullYear();
            var second = data.order.payment_date.substring(0, data.order.payment_date.indexOf('T'));
            var partsFirst = today.split('-');
            var partsSecond = second.split('-');
            var date1 = new Date(partsFirst[2], partsFirst[1]-1, partsFirst[0]);
            var date2 = new Date(partsSecond[0], partsSecond[1]-1, partsSecond[2]);
            var diff = Math.floor(date2.getTime() - date1.getTime());
            var millisecondsPerDay = 1000 * 60 * 60 * 24;
            var millisBetween = date1.getTime() - date2.getTime();
            var days = millisBetween / millisecondsPerDay;
            if (days > 0) {
              status.innerHTML = days+" dia(s) vencidos";
            }else {
              status.innerHTML = "Pago a tiempo";
            }
          } else {
            status.innerHTML = "Pagado"
          }
        }
      }
      name.setAttribute("style", "text-align:center");
      bill.setAttribute("style", "text-align:center");
      status.setAttribute("style", "text-align:center");
      deliver_date.setAttribute("style", "text-align:center");
      payment_date.setAttribute("style", "text-align:center");
      erase.style.margin = "0 auto";
      erase.style.display = "block";
      comment.style.margin = "0 auto";
      comment.style.display = "block";
      update.style.margin = "0 auto";
      update.style.display = "block";
      delivered_order.style.margin = "0 auto";
      delivered_order.style.display = "block";
      text.style.margin = "0 auto";
      text.style.display = "block";
      text.setAttribute("placeholder", "observacion");
      text.setAttribute('id', 'comment');
      order.appendChild(name);
      order.appendChild(bill);
      order.appendChild(status);
      order.appendChild(deliver_date);
      order.appendChild(payment_date);
      order.appendChild(text);
      order.appendChild(comment);
      order.appendChild(erase);
      if (data.order.deliver_date === null) {
        //Create array of options to be added
        var array = ["Pre-pago","De contado","3 dias","5 dias","7 dias"];

        //Create and append select list
        var select_list = document.createElement("select");
        select_list.id = "mySelect";

        //Create and append the options
        for (var i = 0; i < array.length; i++) {
            var option = document.createElement("option");
            switch (i) {
              case 0:
                option.value ="paid"
              break;
              case 1:
                option.value = "0"
              break;
              case 2:
                option.value = "3"
              break;
              case 3:
                option.value = "5"
              break;
              case 4:
                option.value = "7";
            }
            option.text = array[i];
            select_list.appendChild(option);
      }
        select_list.style.margin = "0 auto";
        select_list.style.display = "block";
        order.appendChild(select_list);
        order.appendChild(delivered_order);
      } else if (data.order.deliver_date !== null && data.order.status === false) {
        order.appendChild(update)
      }
      delivered_order.addEventListener('click', function() {
          var days = $('mySelect').value;
          if (days === "paid") {
            var bill = data.order.bill_number;
            xhr.post('./order/update_status', {bill_number:data.order.bill_number}, {'Content-Type':'application/json'}).then((data) => {
              if (days === "paid") {
                days = 0;
                xhr.post('./order/deliver_done', {bill_number:bill, pay_days:days}, {'Content-Type':'application/json'}).then((data) => {
                  console.log(data);
                  alert("Orden marcada como pagada");
                });
              }
            });
          } else {
            xhr.post('./order/deliver_done', {bill_number:data.order.bill_number, pay_days:days}, {'Content-Type':'application/json'}).then((data) => {
              alert("Orden marcada como entregada");
            });
          }
      });
      update.addEventListener('click', function() {
          xhr.post('./order/update_status', {bill_number:data.order.bill_number}, {'Content-Type':'application/json'}).then((data) => {
            alert("Orden marcada como pagada");
          });
      });
      comment.addEventListener('click', function() {
        var bill = data.order.bill_number;
        var comment = $('comment').value;
        if (comment === "") {
          comment = null;
        }
        var r = confirm("Segur@ que desea comentar esta orden?")
        if (r == true) {
          xhr.post('./order/comment',{comment:comment, bill:bill},{'Content-Type':'application/json'}).then((data) => {
            alert("Orden comentada");
            window.location.href = "./order.html";
          });
        }
      });
      erase.addEventListener('click', function() {
        var id = data.order.bill_number;
          var r = confirm("Segur@ que desea eliminar esta orden?")
          if (r == true) {
            xhr.get(`./order/delete/${id}`,{},{}).then((data) => {
              alert("Orden eliminada");
              window.location.href = "./order.html";
            });
          }
      });
    });
};

function order_info_for_users() {
  let xhr = new XHR();
  xhr.get(`./order/show/${this.id}`,{},{}).then((data) => {
      $("table").innerHTML = "";
      $('searching').style.display = "none";
      var order = $("test");
      var bill = document.createElement('p');
      var name = document.createElement('p');
      var status = document.createElement('p');
      var deliver_date = document.createElement('p');
      var payment_date = document.createElement('p');
      var total = document.createElement('p');
      var comments = document.createElement('p');
      bill.innerHTML = "Factura #"+data.order.bill_number;
      if (data.order.deliver_date !== null) {
        var delivery = data.order.deliver_date.substring(0, data.order.deliver_date.indexOf('T'));
        var date = delivery.split('-').reverse().join('-');
        deliver_date.innerHTML = "Fecha de entrega: "+date;
        var payment = data.order.payment_date.substring(0, data.order.payment_date.indexOf('T'));
        var date2 = payment.split('-').reverse().join('-');
        payment_date.innerHTML = "Fecha de pago: "+date2;
      }
      name.innerHTML = "Cliente: "+data.order.first_name+" "+data.order.last_name;
      if (data.order.deliver_date === null) {
        status.innerHTML = "No entregado";
      } else {
        if (data.order.deliver_date === null) {
          status.innerHTML = "-";
        } else {
          if (data.order.status === false) {
            var d = new Date();
            var default_month = d.getMonth();
            var month = default_month + 1;
            var today = d.getDate()+"-"+month+"-"+d.getFullYear();
            var second = data.order.payment_date.substring(0, data.order.payment_date.indexOf('T'));
            var partsFirst = today.split('-');
            var partsSecond = second.split('-');
            var date1 = new Date(partsFirst[2], partsFirst[1]-1, partsFirst[0]);
            var date2 = new Date(partsSecond[0], partsSecond[1]-1, partsSecond[2]);
            var diff = Math.floor(date2.getTime() - date1.getTime());
            var millisecondsPerDay = 1000 * 60 * 60 * 24;
            var millisBetween = date1.getTime() - date2.getTime();
            var days = millisBetween / millisecondsPerDay;
            if (days > 0) {
              status.innerHTML = days+" dia(s) vencidos";
            }else {
              status.innerHTML = "Pago a tiempo";
            }
          } else {
            status.innerHTML = "Pagado"
          }
        }
      }
      name.setAttribute("style", "text-align:center");
      bill.setAttribute("style", "text-align:center");
      status.setAttribute("style", "text-align:center");
      deliver_date.setAttribute("style", "text-align:center");
      payment_date.setAttribute("style", "text-align:center");
      order.appendChild(name);
      order.appendChild(bill);
      order.appendChild(status);
      order.appendChild(deliver_date);
      order.appendChild(payment_date);
    });
};


function check_admin() {
  let xhr = new XHR();
    xhr.get('./value',{},{}).then((data)=>{
    console.log(data.session)
    if (data.admin === true){
      show_all_orders();
      $('search').addEventListener('click', show_specific_orders)
    } else if (data.session !== null) {
      show_user_orders(data.id);
    }
  });
}

//making things beautiful:
breakpoint.refreshValue()
responsiveness()

addEventListener('load', check_admin);
