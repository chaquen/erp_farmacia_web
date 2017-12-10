
function login(){
	agregarEvento("ingresarSis","click",validar_login);
    agregarEvento("passIng","keypress",validar_login_pass);
    cargar_sedes();	
    agregarEvento("btnRecuperarPass","click",function(){
           var vl=obtener_valores_formulario("formRecuperarClave");
           console.log(vl);
           if(vl.Email[0]!="" && vl.Email[1]!= "" && vl.Email[1]==vl.Email[0]){
                var dat={email:vl.Email[0]};
                registrarDato(_URL+"recuperar_clave",dat,function(rs){
                    mostrarMensaje(rs);
                },"formRecuperarClave");   
            }else{
                mostrarMensaje({mensaje:"por favor ingresa valores"});
            }
    });
}
function cargar_sedes(){
    consultarDatos(_URL+"sedes",{},function(rs){
        console.log(rs);
        if(rs.respuesta==true){
            crear_select_sedes_log_in("selSedes",rs.datos);
            
        }else{
            mostrarMensaje("No hay sedes");
        }
        
    });
}
function validar_login_pass(e){
    if(e.which!=0 && e.which=="13"){
         var vl=obtener_valores_formulario("formLogin");
        console.log(vl);
        if(vl.Texto[0]!="" && vl.Clave!= ""){
             var dia=new Date();
            var dat={usario:vl.Texto[0],password:vl.Clave,sede:vl.Select[0],dia:dia.getDay()};
            registrarDato(_URL+"login",dat,function(rs){
                mostrarMensaje(rs);
                     
                if(rs.respuesta){
                    
                    console.log(rs.datos[0]);
                    agregar_session_storage("ssUsuario",rs.datos[0]);
                     $('#divInicio,#formLogueo, #recuperarUsuario').fadeOut('fast');
                        $('#menuGeneral, #ventas').fadeIn('slow');//
                    //abrir_ventana("admin.html",rs.datos[0]);
                    inicia_app();
                    _usuario=obtener_session_storage("ssUsuario");;
                    //location.href="/";
                }       
                
            },"formLogin");   
        }else{
            mostrarMensaje({mensaje:"por favor ingresa valores"});
        }
    }
   
}
function validar_login(){
	var vl=obtener_valores_formulario("formLogin");
	
	if(vl.Texto[0]!="" && vl.Clave!= ""){
        console.log(vl);
        var dia=new Date();
        var dat={usario:vl.Texto[0],password:vl.Clave,sede:vl.Select[0],dia:dia.getDay()};
            registrarDato(_URL+"login",dat,function(rs){
                	mostrarMensaje(rs);
                	     
                    if(rs.respuesta){
                        
                        console.log(rs.datos[0]);
                        agregar_session_storage("ssUsuario",rs.datos[0]);
                         $('#divInicio, #formLogueo, #recuperarUsuario').fadeOut('fast');
                            $('#menuGeneral, #ventas').fadeIn('slow');//
                        //abrir_ventana("admin.html",rs.datos[0]);
                        inicia_app();
                        _usuario=obtener_session_storage("ssUsuario");;
                        //location.href="/";
                    }       
                
            },"formLogin");   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
}