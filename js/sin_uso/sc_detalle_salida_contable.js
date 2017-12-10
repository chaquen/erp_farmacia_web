agregarEventoLoad(function(){
	agregarEvento("btnRegistroDetalleSalida","click",function(){
		var datos={
			fk_id_salida_contable:"",
			fk_id_usuario:_usuario.id,
			fk_id_sede:_IdSede,
			valor_salida:"",
		};
		registrarDato(_URL,datos,function(rs){
			consola(rs);
		});
	});
});