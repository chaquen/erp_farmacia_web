agregarEventoLoad(function(){
	agregarEvento("btnRegistroAbono","click",function(){
		var datos={
			fk_id_credito:"",
			observacion:"",
			abono:"",

		};
		
		registrarDato(_URL+"",datos,function(rs){
			consola(rs);
		});
	});
});