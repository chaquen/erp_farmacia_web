agregarEventoLoad(function(){
	agregarEvento("btnRegistroDetalleImpuesto","click",function(){
		var datos={
			fk_id_impuesto:"",
			fk_id_detalle_inventario:"",
		};
		registrarDato(_URL+"",datos,function(rs){
			consola(rs);
		});
	});
});