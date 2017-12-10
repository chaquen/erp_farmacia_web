agregarEventoLoad(inicia_app);
function inicia_app(){
	
	window.onload=novolver();
	_usuario=obtener_session_storage("ssUsuario");
	if(_usuario!=false){
				_IdSede=_usuario.id_sede
				config_inicial();
				iniciar_factura();
				//iniciar_bodega_offline(_IdSede);
				var valido;
		switch(_usuario.tipo){
			case "administrador":
				valido=true;
				iniciar_inventario(valido);
				iniciar_sedes(valido);
				iniciar_producto(valido);
				iniciar_detalle_entrada_contable(valido);
				iniciar_departamento(valido);
				iniciar_creditos(valido);
				iniciar_corte(valido);
				iniciar_clientes(valido);
				iniciar_cajeros(valido);
				iniciar_importar(valido);
				iniciar_pedidos(valido);
				iniciar_proveedores(valido);
			break;
			case "cajero":
				//Validar permisos
				valido=true;
				iniciar_inventario(valido);
				iniciar_sedes(valido);
				iniciar_producto(valido);
				iniciar_detalle_entrada_contable(valido);
				iniciar_departamento(valido);
				iniciar_creditos(valido);
				iniciar_corte(valido);
				iniciar_clientes(valido);
				iniciar_cajeros(valido);
				iniciar_importar(valido);
				iniciar_pedidos(valido);
				iniciar_proveedores(valido);




				/*iniciar_sedes(valido);
				iniciar_producto(valido);
				iniciar_inventario(valido);
				iniciar_departamento(valido);
				iniciar_creditos(valido);
				iniciar_corte(valido);
				iniciar_clientes(valido);
				iniciar_cajeros(valido);
				iniciar_importar(valido);*/
				
				break;
		}
		
	}else{
		
		login();
	}
	
}