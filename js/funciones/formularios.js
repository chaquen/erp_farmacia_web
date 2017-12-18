    /*Funcion que devuelve un arreglo con los valores del formulario*/
function obtener_valores_formulario(idFormulario){
    
    var formulario=document.getElementById(idFormulario);
    
    if(formulario!=null){       
        var elementos=formulario.elements;
        var arregloElementos={};
        var tam=Object.keys(elementos).length;
        var txt=[];
        var sel=[];
        var chbox=[];
        var rd=[];
        var hd=[];
        var otros=[];
        var fecha=[];
        var correo=[];
        var archivo=[];        
        var clave;
        var hora=[];
        var number=[];
        
        for(var i=0; i<=tam-1 ;i++){
            
          //console.log(elementos[i]);
          if(elementos[i] != undefined){
              
              if( elementos[i].type != "button" && elementos[i].required && elementos[i].value==""){
                 elementos[i].style.borderColor="red";
                 if(elementos[i].type == "file"){
                     mostrarMensaje({mensaje:"Debes ingresar un archivo"});
                 }
                 console.log(elementos[i]);
                 console.log("umm ");
                 return false;
                 break;
              }
                //console.log(elementos[i].type);
                //console.log(elementos[i].value);
                
                    elementos[i].style.borderColor="";
                        switch(elementos[i].type){
                            case "text":
                                txt.push(elementos[i].value);
                                break;
                            case "select-one":
                                //console.log(elementos[i].value);

                                 
                                      sel.push(elementos[i].value);
                                  
                                  /*else{
                                      elementos[i].style.borderColor="red";
                                      return false;
                                      break;
                                  }*/
                                break;
                             case "button":
                                //console.log("SOY UN BOTTON");
                                break;   
                             case "checkbox":
                                if(elementos[i].checked==true){
                                     var ch={
                                      valor:elementos[i].value,
                                      nombre:elementos[i].name
                                     };
                                    chbox.push(ch);
                                } 
                                break;   
                            case "radio" :
                                if(elementos[i].checked==true){
                                    rd.push(elementos[i].value);
                                } 
                              break;
                          case "hidden":
                              if(elementos[i].value!=""){
                                  hd.push(elementos[i].value);
                              }else{
                                  hd.push("0");
                              }

                              break;
                          case "date":
                             fecha.push(elementos[i].value);
                              break;
                          case "email":

                              correo.push(elementos[i].value);


                              break;
                          case "file":

                              var nombreArchivo=elementos[i].value.split("\\");
                              //console.log(elementos[i].value.split('\\'));
                              //archivo.push(nombreArchivo[2]);
                              archivo.push(elementos[i].files);
                              break;
                          case "password":
                            
                              clave=elementos[i].value;
                              break;
                          case "image":
                              break;
                          case "time":
                              hora.push(elementos[i].value);
                            break;    
                          case "number":
                              number.push(elementos[i].value);
                            break;  
                          default:
                              otros.push(elementos[i].value);
                              break;
                        }
                
                
              
          }          
            
        }
        arregloElementos.Texto=txt;
        arregloElementos.Select=sel;
        arregloElementos.Checkbox=chbox;
        arregloElementos.Radio=rd;
        arregloElementos.Hidden=hd;
        arregloElementos.Otros=otros;
        arregloElementos.Email=correo;
        arregloElementos.Fecha=fecha;
        arregloElementos.Archivo=archivo;
        arregloElementos.Clave=clave;
        arregloElementos.Hora=hora;
        arregloElementos.Numero=number;
        //console.log("ELEMENTOS DEL ARREGLO");
        console.log(arregloElementos);
        return arregloElementos;
    }
    else{
        console.log(formulario);
        return false;
    }
}


function validar_campo_formulario(e,name){
    
    switch(name){
        case "letras":
                return true;
            if(rgxLetras.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        case "numeros":
            if(rgxNumero.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        case "correo":
            if(rgxEmail.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        default:
            return true;
        break;
    }
}


function obtener_valores_filas_tabla(id){
    var valores=[];
    console.log(document.getElementById(id));
    var n=document.getElementById(id).childNodes;
    console.log(n);
    console.log(n.childNodes);
    console.log(n.firstChild);
    
    for(var e in n){
        console.log(n[e].nodeName);
        console.log(n[e].firstElementChild);
        if(n[e].nodeName=="TD"){
                var el=n[e];    
                console.log(n[e].firstElementChild);
                if(el.firstElementChild!=null){
                         console.log(el.firstElementChild.value);	
                         valores.push(el.firstElementChild.value);
                }

            }
    }
    console.log(valores);
    return valores;
    
    
}
function limpiar_elemento(id){
    
    if(document.getElementById(id)!= undefined && document.getElementById(id) != null){
        document.getElementById(id).innerHTML="";
    }else{
        mostrarMensaje("estas intentando limpar u elemento que no existe "+ id);
    }
}
/*Funcion para limpiar un formulario*/
function limpiarFormulario(idForm){
    var form=document.getElementById(idForm);
    console.log(form);
    if(form!=null){
            for(var i in form.elements){

            if(form.elements[i].nodeName == "TEXTAREA"){
                form.elements[i].value="";  
            }
            //console.log(form.elements[i].type);
            //console.log(form.elements[i].checked);
            //console.log(form.elements[i].value);


            switch(form.elements[i].type){
                case "text":
                    form.elements[i].value="";
                    break;
                case "email":
                    form.elements[i].value="";
                    break;
                case "number":
                    form.elements[i].value="";
                    break;
                case "password":
                    form.elements[i].value="";
                    break;
                case "select-one":
                    form.elements[i].value="0";
                    break;
                case "checkbox":
                    //form.elements[i].checked=false;
                    break;
                case "radio":
                    form.elements[i].checked=false;
                break;
                 case "file":
                    form.elements[i].value="";
                break;
            }
        }
    }
    
    console.log(form);
    console.log(idForm);
 }   