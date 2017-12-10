agregarEventoLoad(function(){
	agregarEvento("btnRegistroEntrada","click",function(){
		var datos={
			fk_id_proveedor:"",
			fk_id_det_inventario:"",
			cantidad_entrada:"",
			fecha_caducidad:"",
			Observaciones:"",

		};
		registrarDatos(_URL+"",datos,function(rs){
			consola(rs);
		});
	});
});