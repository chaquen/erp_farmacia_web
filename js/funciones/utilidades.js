/**
 * Variables globales con expresiones regulares
 * 
 * */
var rgxEmail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?: |com.es|com|com.co|net.co|co|org|net|biz|info|mobi|cat|es|ar|futbol|rocks|)$/i;
var rgxNumero=/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;

/**
 * url=//Ubicacion del archivo a consultar en la peticion HTTP
 * data= datos enviado en formato Json
 * type=tipo de metodo en este caso con el metodo POST
 * dataType=formato en que se recibe la informacion
 * */
/*funcion para consultar la hora del cliente*/
function horaCliente(){
    var anio= new Date();
    var mes= new Date();
    var dia=new Date();
    var hora=new Date(); 
    var minuto= new Date();
    var segundo= new Date();

    var a=anio.getFullYear();
    if(a<=9){
      a="0"+a;
    }
    var m= mes.getMonth();
    if(m<9){
      m="0"+(m+1);
    }else{  
      m=(m+1);
    }
    var d=dia.getDate();
    if(d<=9){
      d="0"+d;
    }

    
   
    var h=hora.getHours();
    if(h<=9){
        h="0"+h;
    }
    var minutos=minuto.getMinutes();
    if(minutos<=9){
        minutos="0"+minutos;
    }
    var segundos=segundo.getSeconds();
    if(segundos<=9){
        segundos="0"+segundos;
    }
    var ultActividad=a+"-"+m+"-"+d+" "+h+":"+minutos+":"+segundos;
    return ultActividad;
    
}
function horaClientePersonlizada(){
    var anio= new Date();
    var mes= new Date();
    var dia=new Date();
    var hora=new Date(); 
    var minuto= new Date();
    var segundo= new Date();
    var m =mes.getUTCMonth()+1;
    var mes_nombre="";
    switch(m){
      case 1:
      mes_nombre="ENERO";
        break;
      case 2:
      mes_nombre="FEBRERO";
        break;
      case 3:
        mes_nombre="MARZO";
        break;
      case 4:
        mes_nombre="ABRIL";
        break;
      case 5:
        mes_nombre="MAYO";
        break;
      case 6:
      mes_nombre="JUNIO";
        break;
        case 7:
        mes_nombre="JULIO";
        break;
        case 8:
        mes_nombre="AGOSTO";
        break;
        case 9:
        mes_nombre="SEPTIEMBRE";
        break;
        case 10:
        mes_nombre="OCTUBRE";
        break;
        case 11:
        mes_nombre="NOVIEMBRE";
        break;
        case 12:
        mes_nombre="DICIEMBRE";
        break;   
    }
    var ultActividad=dia.getDate()+" DE "+(mes_nombre)+" DE "+anio.getFullYear();
    return ultActividad;
    
}


function ayer(){
  var obj_anio = new Date();
    var obj_mes = new Date();
    var obj_dia =new Date();
    var dia=obj_dia.getDate()-1;
    var mes=obj_mes.getMonth()+1;
    var anio=obj_anio.getFullYear();  
    /*var dia=1;
    var mes=10;
    var anio=2016;*/

    if(dia==1){
        
 
         switch(mes){
           case 1:
              anio=anio-1;
              mes="12";
              dia="31";
            break;
           case 2:
               mes="01";
               dia="31"; 
            break;
           case 3:
                mes="02";
                if ((anio % 4 == 0) && (anio % 100 != 0) || (anio % 400 == 0)){
                  dia="29";
                }else{
                  dia="28";
                }
                
            break;
           case 4:
               mes="03";
               dia="31"; 
            break;
           case 5:
                mes="04";
                dia="30";
            break;
           case 6:
               mes="05";
               dia="31"; 
            break;
           case 7:
               mes="06";
               dia="30"; 
            break;
           case 8:
              mes="07";
              dia="31";
            break;
           case 9:
              mes="08";
              dia="31";
            break;
           case 10:
              mes="09";
              dia="30";
            break;
           case 11:
              mes="10";
              dia="31";
            break;
           case 12:
              mes="11";
              dia="30";
            break;   
         } 
    }
    console.log(anio+"-"+(mes)+"-"+(dia));
    return anio+"-"+(mes)+"-"+(dia);
}
/*function esta_semana(){
  var hoy=new Date();
  var mes1=hoy.getMonth()+1;
  var mes2= hoy.getMonth()+1;
  var primer_dia_semana;
  var ultimo_dia_semana;


  //var dia_del_mes=hoy.getDate();
  var dia_del_mes=29;
  var semana=["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
  var anio=hoy.getFullYear();
  //var dia_de_la_semana=semana[hoy.getDay()];
  var dia_de_la_semana=semana[3];
  mes=12;
  switch(dia_de_la_semana){
      case "domingo":
        primer_dia_semana=dia_del_mes;
        ultimo_dia_semana=dia_del_mes+6;
       break;
      case "lunes":
        primer_dia_semana=dia_del_mes-1;  
        ultimo_dia_semana=dia_del_mes+5;
       break;
      case "martes":
        primer_dia_semana=dia_del_mes-2;
        ultimo_dia_semana=dia_del_mes+4;
       break;
      case "miercoles":
        primer_dia_semana=dia_del_mes-3;
        ultimo_dia_semana=dia_del_mes+3;
       break;
      case "jueves":
        primer_dia_semana=dia_del_mes-4;
        ultimo_dia_semana=dia_del_mes+2;
       break;
      case "viernes":
        primer_dia_semana=dia_del_mes-5;
        ultimo_dia_semana=dia_del_mes+1; 
       break;   
      case "sabado":
        primer_dia_semana=dia_del_mes-6;
        ultimo_dia_semana=dia_del_mes;
       break;
      
  }
  //aqui valido el primer dia de la semana
  if(primer_dia_semana<1){
    switch(mes){
      case 1:
            primer_dia_semana=31+primer_dia_semana;
       break;
      case 2:
        //pilas con los biciestos
        if ((anio % 4 == 0) && (anio % 100 != 0) || (anio % 400 == 0)){
            primer_dia_semana=29+primer_dia_semana; 
        }else{
            primer_dia_semana=28+primer_dia_semana; 
        }
          
        
       break;
      case 3: 
          primer_dia_semana=31+primer_dia_semana;
       break;
      case 4: 
        primer_dia_semana=30+primer_dia_semana;
       break;
      case 5: 
         primer_dia_semana=31+primer_dia_semana; 
       break;
      case 6: 
        
        primer_dia_semana=30+primer_dia_semana;

        
       break;
      case 7: 
        primer_dia_semana=31+primer_dia_semana;
       break;
      case 8: 
        primer_dia_semana=31+primer_dia_semana;
       break;
      case 9: 
        primer_dia_semana=30+primer_dia_semana;
       break;
      case 10: 
        primer_dia_semana=31+primer_dia_semana;
       break;
      case 11: 
        primer_dia_semana=30+primer_dia_semana;
       break;
      case 12: 
        primer_dia_semana=31+primer_dia_semana;

       break;
 

    }
  }
  //aqui valido el ultimo dia de la semana
  switch(mes){
    case 1:
      if(ultimo_dia_semana>31){
          ultimo_dia_semana=ultimo_dia_semana-31;
          mes=mes+1;
      }
      break;
    case 2:
        if ((anio % 4 == 0) && (anio % 100 != 0) || (anio % 400 == 0)){
          if(ultimo_dia_semana>29){
              ultimo_dia_semana=ultimo_dia_semana-29;
              mes=mes+1;
          }
        }else{
           if(ultimo_dia_semana>28){
              ultimo_dia_semana=ultimo_dia_semana-28;
              mes=mes+1;
           } 
        }
      break;
    case 3:
        if(ultimo_dia_semana>31){
          ultimo_dia_semana=ultimo_dia_semana-31;
          mes=mes+1;
        }
      break;
    case 4:
        if(ultimo_dia_semana>30){
          ultimo_dia_semana=ultimo_dia_semana-30;
          mes=mes+1;
        }
      break;
    case 5:
      if(ultimo_dia_semana>31){
        ultimo_dia_semana=ultimo_dia_semana-31;
        mes=mes+1;
      }
      break;
    case 6:
      if(ultimo_dia_semana>30){
        ultimo_dia_semana=ultimo_dia_semana-30;
        mes=mes+1;
      }
      break;
    case 7:
      if(ultimo_dia_semana>31){
          ultimo_dia_semana=ultimo_dia_semana-31;
          mes=mes+1;

      }
      break;
    
    case 8:
      if(ultimo_dia_semana>31){
        ultimo_dia_semana=ultimo_dia_semana-31;  
        mes=mes+1;
      }
      break;
    case 9:
      if (ultimo_dia_semana>30) {
        ultimo_dia_semana=ultimo_dia_semana-30;
        mes=mes+1;

      }
      break;
    case 10:
      if(ultimo_dia_semana>31){
          ultimo_dia_semana=ultimo_dia_semana-31;
          mes=mes+1;
      }
      break;
    
    case 11:
      if(ultimo_dia_semana>30){
          ultimo_dia_semana=ultimo_dia_semana-30;
          mes=mes+1;
      }
      break;
    
    case 12:
      if(ultimo_dia_semana>31){
        ultimo_dia_semana=ultimo_dia_semana-31;
        mes1="01";
        anio=anio+1;
      }
      break;          
    }
  
 
  return [anio+"-"+mes+"-"+primer_dia_semana,anio+"-"+mes1+"-"+ultimo_dia_semana];



}*/
/*function semana_anterior(){

}*/
function este_mes(){
  var mes = new Date();
  switch(mes.getMonth()+1){
    case 1:
      return [mes.getFullYear()+"-01-"+"01",mes.getFullYear()+"-01-"+"31"];
    break;
    case 2:
    //pilas con los biciestos
      
     var ano=mes.getFullYear();
      if ((ano % 4 == 0) && (ano % 100 != 0) || (ano % 400 == 0)){
        return [mes.getFullYear()+"-02-"+"01",mes.getFullYear()+"-02-"+"29"];
      }
        return [mes.getFullYear()+"-02-"+"01",mes.getFullYear()+"-02-"+"28"];
    
    break;
    case 3:
      return [mes.getFullYear()+"-03-"+"01",mes.getFullYear()+"-03-"+"31"];
    break;
    case 4:
      return [mes.getFullYear()+"-04-"+"01",mes.getFullYear()+"-04-"+"30"];
    break;
    case 5:
      return [mes.getFullYear()+"-05-"+"01",mes.getFullYear()+"-05-"+"31"];
    break;
    case 6:
      return [mes.getFullYear()+"-06-"+"01",mes.getFullYear()+"-06-"+"30"];
    break;
    case 7:
      return [mes.getFullYear()+"-07-"+"01",mes.getFullYear()+"-07-"+"31"];
    break;
    case 8:
      return [mes.getFullYear()+"-08-"+"01",mes.getFullYear()+"-08-"+"31"];
    break;
    case 9:
      return [mes.getFullYear()+"-09-"+"01",mes.getFullYear()+"-09-"+"30"];
    case 10:
      return [mes.getFullYear()+"-10-"+"01",mes.getFullYear()+"-10-"+"31"];
    break;
    case 11:
      return [mes.getFullYear()+"-11-"+"01",mes.getFullYear()+"-11-"+"30"];
    break;
    case 12:
      return [mes.getFullYear()+"-12-"+"01",mes.getFullYear()+"-12-"+"31"];
    break;
    
  } 

}

    

/*Funcion para agregar un evento a un elemento del objeto DOCUMENT*/
function agregarEvento(idElemento,evento,funcion){
    if(document.getElementById(idElemento)!=null){
        
        /*console.log("Nombre evento ");
        console.log(evento);
        console.log("Funcion ");
        console.log(funcion);*/
        
        document.getElementById(idElemento).addEventListener(evento,funcion,false);
        if(evento=="click"){
          document.getElementById(idElemento).ondblclick = function() { return false; }
        } 
        
        
        
    }else{
        /*console.log("ERROR");
        console.log("Nombre evento ");
        console.log(evento);
        console.log("Funcion ");
        console.log(funcion);
        console.log("-Elemento");
        console.log(idElemento);
        console.log("el elemento no existe");*/
    }
    
} 
/*Funcion para agregar una funcion al evento load del objeto WINDOW*/
function agregarEventoLoad(funcion){
    window.addEventListener("load",funcion,false);
    
}
/*Funcion para agregar una funcion al evento page show del objeto WINDOW*/
function agregarEventoPageShow(funcion){
    window.addEventListener("pageshow",funcion,false);
}

function redireccionar(url){
    location.href=url;
}
function imprimir(datos){
    console.log(datos);
    console.log(datos.respuesta);
    console.log(datos.valores_consultados);
    
}
function imprimir_en_documento(datos){
    document.write(JSON.stringify(datos.valores_consultados));
}
function mostrarMensaje(dato){
    
    if(dato.msn!=undefined){
        alert(dato.msn);
    }else if(dato.mensaje!=undefined){
        alert(dato.mensaje);
    }else{
        alert(dato);
    }
    
}
function validar_igualdad_campos(id1,id2){
    var v1=document.getElementById(id1);
    var v2=document.getElementById(id2);
    if(v1.value==v2.value){
        return true;
    }
    return false;
}

function abrir_ventana(url,u){
    
    var w=window;
    w.fullScreen=true;
    var ancho= screen.availWidth;
    var largo=screen.availHeight;
    if(w.open(url,u.nombre_usuario,"menubar=no,toolbar=no,width="+ancho+","+"height="+largo+",resizable=no,location=no")==null){
         mostrarMensaje("Parece que tiene desabilitadas las ventanas emergentes en su navegador por favor cambie la configuracion para tener acceso");   
    }else{
        //location.href="/";
    }


}

function consultar_menu_rol(u){
    consultarDatos("consularRol",{id_rol:u.rol},dibujar_menu);
    
    
}
function dibujar_menu(d){
    var dat=d.valores_consultados;
    for(var d in dat){
        console.log(dat[d]);
        if(dat[d].Crear==0){
            if(dat[d].IdCrear!=""){
                $("#"+dat[d].IdCrear).hide();
            }

        }

        if(dat[d].Consultar==0){
            if(dat[d].IdConsultar!=""){
                $("#"+dat[d].IdConsultar).hide();
            }
        }

        if(dat[d].Actualizar==0){
            if(dat[d].IdActualizar!=""){
                $("#"+dat[d].IdActualizar).hide();
            }

        }

        if(dat[d].Eliminar==0){
            if(dat[d].IdEliminar!=""){
                $("#"+dat[d].IdEliminar).hide();
            }

        }

    }
    
       
    
    
    
}
function cerrar_ventana(){
    
    eliminar_session_storage();
    window.close();
}




function salir(){
    
    if(_usuario!=false){
     if(confirm("Desea salir de la aplicacion?")){
            //Creo el objeto que voy a enviar con datos a la peticion
        /*var datos={
            id:_usuario.id_usuario
                     
        };*/
        //Invoco mi funcion 
        cerrar_ventana();
        //eliminarDato("salir/"+usuario.id,datos,cerrar_ventana);
        if(obtener_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede)!=false){
          if(confirm("¿Tienes facturas pendientes por registrar desea eliminarlas?")){
            eliminar_local_storage("mis_tickets_"+_usuario.id_usuario+"_"+_IdSede);
            eliminar_local_storage("btn_tk_"+_usuario.id_usuario+"_"+_IdSede) 
            document.getElementById("tbCuerpoFactura").innerHTML="";
            
          }
        }
        eliminar_session_storage("ssUsuario");

        $('#menuGeneral, #ventas, #clientes, #productos, #inventarios, #configuracion, #cortes, #perfil').fadeOut('fast');
        $('#formLogueo, #divInicio').fadeIn('slow');
        _usuario=false;
        
        inicia_app();
     }
    }else{
       mostrarMensaje({mensaje:"por favor ingresa correctamente al sistema"});
       
    }
}


/*
 * Funcion para convertir los valores enviados por GET 
 * a un array
 * 
 * @returns {recibirValorGet.tmparr}
 */
function recibirValorGet(){
    params=window.location.pathname.split("/")[2];
    if(params!=""){
        return params;
    }else{
        return false;
    }
    
      
}
function cambiarAccion(){
    
    switch(this.id.split("_")[0]){
        //USUARIO
       
         case "buscar":
         accionUsuario="consulta";
            break;
         case "editar":
         accionUsuario="editar";
            break;
         case "eliminar":
            accionUsuario="eliminar";
            break;   
         
         //DEFAULT   
         default:
             mostrarMensaje({mensaje:"Por favor agrega una accion para el usuario "+this.id.split("_")[0]});
             break;
    }
}

function consola(info){
    console.log(info);
}
function obtener_valor_elemento_id(id){
    return document.getElementById(id).value;
};
function obtener_elementos_por_name(id){
    return document.getElementsByName(id);
};
//funcion para el control de teclas 
var combinacion=[];
function control_de_teclas(){
     var isCtrl = false;
        document.onkeyup=function(e){
            if(e.which == 17) isCtrl=false;
        }
        document.onkeydown=function(e){
        if(e.which == 17) {isCtrl=true;}
            
            if(isCtrl && e.which != 17){
                switch(e.which){
                    case 49:
                      //CRTL+1
                      console.log("acción para CTRL+1 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 50:
                      //CRTL+2
                      console.log("acción para CTRL+2 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                     case 51:
                      //CRTL+3
                      console.log("acción para CTRL+3 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                     case 52:
                      //CRTL+4
                      console.log("acción para CTRL+4 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 53:
                      //CRTL+5
                      console.log("acción para CTRL+5 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 54:
                      //CRTL+6
                      console.log("acción para CTRL+6 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 55:
                      //CRTL+7
                      console.log("acción para CTRL+7 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 56:
                      //CRTL+8
                      console.log("acción para CTRL+8 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;
                    case 57:
                      //CRTL+9
                      console.log("acción para CTRL+9 y evitar que ejecute la acción propia del navegador");
                      return false;
                        break;           
                    case 83:
                    //S
                    console.log("acción para CTRL+S y evitar que ejecute la acción propia del navegador");
                    //return false;            
                    break;
                    case 82:
                    //R
                    
                    console.log("acción para CTRL+R y evitar que ejecute la acción propia del navegador");
                    return false;
                    break;
                    case 86:
                      console.log("acción para CTRL+V y evitar que ejecute la acción propia del navegador");
                      //agregar_boton_ticket(1);
                      break;
                      case 67:
                      console.log("acción para CTRL+C y evitar que ejecute la acción propia del navegador");
                     /* if(confirm("¿Desea registrar esta factura?")){
                        crear_factura();  
                      }*/
                      
                    break;
                    case 69:
                      console.log("acción para CTRL+E y evitar que ejecute la acción propia del navegador");
                     // eliminar_ticket(_numero_ticket);
                    break;  
                    default:
                        console.log("acción para CTRL+"+e.which+" y evitar que ejecute la acción propia del navegador");

                        //return false;
                    break;
                }    
            }
            
        }


}
function crear_data_list_cliente(id_data_list,datos){
  var dtl=document.getElementById(id_data_list);
  dtl.innerHTML="";
  for(var o in datos){
      console.log(datos[o].campo_inner_html);
      var opt=document.createElement("option");
      opt.innerHTML=datos[o].nombre_cliente;
      opt.value=datos[o].documento;
      dtl.appendChild(opt);
  }
}
function crear_data_list_producto(id_data_list,datos){
  var dtl=document.getElementById(id_data_list);
  dtl.innerHTML="";
  for(var o in datos){
      console.log(datos[o]);
      var opt=document.createElement("option");
      opt.innerHTML=datos[o].nombre_producto;
      opt.value=datos[o].codigo_producto;
      dtl.appendChild(opt);
  }
}
function crear_data_list_categoria(id_data_list,datos){
  var dtl=document.getElementById(id_data_list);
  dtl.innerHTML="";
  for(var o in datos){
      console.log(datos[o]);
      var opt=document.createElement("option");
      opt.innerHTML=datos[o].nombre_departamento;
      opt.value=datos[o].nombre_departamento;
      dtl.appendChild(opt);
  }
}
function crear_data_list_clientes(id_data_list,datos){
  var dtl=document.getElementById(id_data_list);
  dtl.innerHTML="";
  for(var o in datos){
      console.log(datos[o]);
      var opt=document.createElement("option");
      opt.innerHTML=datos[o].nombre_cliente;
      opt.value=datos[o].documento+"-"+datos[o].id;
      dtl.appendChild(opt);
  }
}
function crear_select_sedes(id_select,datos){

          var cta=document.getElementById(id_select);
          cta.innerHTML="";
          
          var li=document.createElement("option");
          li.innerHTML="SELECCIONA UNA SEDE";
          li.value="--";
          cta.appendChild(li);
          
          var li=document.createElement("option");
          li.innerHTML="TODAS LAS SEDES";
          li.value=0;
          cta.appendChild(li);
        
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].nombre_sede;
          li.value=datos[d].id;
          if(datos[d].id==_IdSede && _usuario.tipo!="administrador"){
            li.setAttribute("selected",true);
          }
          cta.appendChild(li);

        }
}
function crear_select_sedes_log_in(id_select,datos){
        var cta=document.getElementById(id_select);
        cta.innerHTML="";
        
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].nombre_sede;
          li.value=datos[d].id;
          cta.appendChild(li);

        }
}
function crear_select_categorias(id_select,datos){
  var cta=document.getElementById(id_select);
        cta.innerHTML="";
        var li=document.createElement("option");
        
          li.innerHTML="CATEGORIAS";
          li.value=0;
          cta.appendChild(li);
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].nombre_departamento;
          li.value=datos[d].id;
          cta.appendChild(li);

        }
}

function crear_select_roles(id_select,datos){
  var cta=document.getElementById(id_select);
  if(cta!=null){
          cta.innerHTML="";
         var li=document.createElement("option");
        
          li.innerHTML="SELECCIONA UNA OPCION";
          li.value=0;
          cta.appendChild(li);
         
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].nombres+" "+datos[d].apellidos;
          li.value=datos[d].id;
          cta.appendChild(li);

        }
  }else{
    console.log(id_select+"No existe");
  }
    
}
function crear_select_ver_roles(id_select,datos){
  var cta=document.getElementById(id_select);
        cta.innerHTML="";
         var li=document.createElement("option");
        
          li.innerHTML="SELECCIONA UN ROL";
          li.value=0;
          cta.appendChild(li);
         
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].nombre_rol;
          li.value=datos[d].id;
          cta.appendChild(li);

        }
}
function crear_select_proveedores(id_select,datos){
  var cta=document.getElementById(id_select);
        cta.innerHTML="";
         var li=document.createElement("option");
        
          li.innerHTML="PROVEEDORES";
          li.value=0;
          cta.appendChild(li);
         
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].nombre_proveedor;
          li.value=datos[d].id;
          cta.appendChild(li);

        }
}
function crear_select_salida_contable(id_select,datos){
  var cta=document.getElementById(id_select);
        cta.innerHTML="";
         var li=document.createElement("option");
        
          li.innerHTML="SELECCIONA UN MOTIVO";
          li.value=0;
          cta.appendChild(li);
         
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].nombre_salida;
          li.value=datos[d].id;
          cta.appendChild(li);

        }
}
function crear_select_entrada_contable(id_select,datos){
  var cta=document.getElementById(id_select);
        cta.innerHTML="";
         var li=document.createElement("option");
        
          li.innerHTML="SELECCIONA UN MOTIVO";
          li.value=0;
          cta.appendChild(li);
         
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].nombre_entrada;
          li.value=datos[d].id;
          cta.appendChild(li);

        }
}
function crear_select_facturas(id_select,datos){
  var cta=document.getElementById(id_select);
        cta.innerHTML="";
         var li=document.createElement("option");
        
          li.innerHTML="SELECCIONA UNA FACTURA";
          li.value=0;
          cta.appendChild(li);
         
        for(var d in datos){
          var li=document.createElement("option");
        
          li.innerHTML=datos[d].numero_factura;
          li.value=datos[d].id;
          cta.appendChild(li);

        }
}
//FUNCION PARA POSICIONAR CURSOS EN UN PUNTO DETERMINADO
$.fn.selectRange = function(start, end) {
    if(!end) end = start;
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};
//funcion para el redoindeo
function redondeo(numero, decimales)
{
var flotante = parseFloat(numero);
var resultado = Math. round(flotante*Math. pow(10,decimales))/Math. pow(10,decimales);
return resultado;
}

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}