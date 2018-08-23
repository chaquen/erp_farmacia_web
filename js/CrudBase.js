/* INSERTAR DATOS
 
 * {datos} objeto con la estructura que voy a  enviaren la peticion HTTP
 * {funcion_depues} funcion que se realizara despues de recibir la respuesta del servidor
 * {id_formulario} id id_formulario que desea limpiar
 *  * */    
function registrarDato(url,datos,funcion_despues,formulario,callback){

    
    console.log(url);
    console.log(datos);
    console.log(funcion_despues);
    console.log(formulario);
 
    if(datos){
        var miAjax=new miObjetoAjax(url,datos,"POST");
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.done(function(rs){
            console.log(rs);
            
                                     
                  if(funcion_despues!=undefined){
                    funcion_despues(rs);
                  }
                  if(formulario!=undefined && rs.respuesta== true){
                    limpiarFormulario(  formulario);
                  }  
            
        }).fail(function( jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
           
            
        });
    
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores ☻ en el objeto datos"});
    }
   
}
/* INSERTAR DATOS
 
 * {datos} objeto con la estructura que voy a  enviaren la peticion HTTP
 * {achivo} archivo con la estructura que voy a  enviaren la peticion HTTP
 * {funcion_depues} funcion que se realizara despues de recibir la respuesta del servidor
 * {id_formulario} id id_formulario que desea limpiar
 *  * */    
function registrarDatoArchivo(url,dat,archivo,id_formulario,callback){
    
    
    if(dat){
       var datos={
           operacion:"",
           datos:{}
       };
       var miAjax=new miObjetoAjax(url,datos,"POST");
       var form_data=new FormData();
       form_data.append("miArchivo",archivo.files[0]);
       console.log(archivo.files[0]);
       console.log(form_data);
       datos.datos=dat;
       form_data.append("datos",JSON.stringify(datos));
       miAjax.peticion_ajax_upload(form_data);
        
        
        miAjax.respuestaServidor.done(function(rs){
            
            console.log(rs);
            
                if(id_formulario!=undefined){
                    limpiarFormulario(id_formulario);
                }                 
                 callback(rs);
            
            
        }).fail(function( jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores ☻ en el objeto datos"});
    }
   
}
/* CONSULTAR DATOS 
 
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor*/    
function consultarDatos(url,datos,callback,id_formulario){
    console.log(datos);
    var miAjax=new miObjetoAjax(url,datos,"GET");
    miAjax.peticion_ajax();
    
    miAjax.respuestaServidor.done(function(rs){
        
      
        console.log(rs);
         if(id_formulario!=undefined){
                limpiarFormulario(id_formulario);
         }             
        
        callback(rs);
    }).fail(function( jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    
    
}
/*EDITAR DATOS
 
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor
 * */
function editarDato(url,datos,callback,id_formulario){
    console.log(datos);
    if(datos){
        
        var miAjax=new miObjetoAjax(url,datos,"PUT");
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.done(function(rs){
           
            console.log(rs);
           
            callback(rs);
            if(rs.respuesta){
                limpiarFormulario(id_formulario);
            }
        }).fail(function( jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores ☻ en el objeto datos"});
    }
}
/* ELIMINAR DATOS
 
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor
 *  * 
 * */
function eliminarDato(url,datos,callback,id_formulario){
    
    if(datos){
      //console.log(url);
        var miAjax=new miObjetoAjax(url,datos,'DELETE');
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.done(function(rs){
            
            console.log(rs);
           
            callback(rs);
             if(id_formulario!=undefined && rs.respuesta== true){
                    limpiarFormulario(id_formulario);
                }  
            
        }).fail(function( jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores ☻ en el objeto datos"});
    }
    
}
/*EDITAR DATOS
 
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor
 * */
function editarDatoArchivo(url,dat,archivo,callback,id_formulario){
    
    
    if(dat){
       var datos={
           operacion:"",
           datos:{}
       };
       var miAjax=new miObjetoAjax(url,datos,"PUT");
       var form_data=new FormData();
       form_data.append("miArchivo",archivo.files[0]);
       console.log(archivo.files[0]);
       console.log(form_data);
       datos.datos=dat;
       form_data.append("datos",JSON.stringify(datos));
       miAjax.peticion_ajax_upload(form_data);
        
        
        miAjax.respuestaServidor.done(function(rs){
            
            console.log(rs);
           
                if(id_formulario!=undefined){
                    limpiarFormulario(id_formulario);
                }                 
                 callback(rs);
            
            
        }).fail(function( jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores ☻ en el objeto datos"});
    }
   
}