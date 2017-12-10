agregarEventoLoad(iniciar_recuperar_clave);
function iniciar_recuperar_clave(){
	
	agregarEvento("btnRecuperar","click",recuperar_clave);
}

function recuperar_clave(){
	var fm=obtener_valores_formulario("formRecuperar");
	if(fm!=false){
		var dat={email:fm.Email[0]};
		registrarDato("cambio_pass",dat,mostrarMensaje);   
	}
}




