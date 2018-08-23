function iniciar_importar(valido){
	
	if(valido){
			agregarEvento("btnImportar","click",function(e){
				
				//$("#mensaje_importar").fadeIn("fast");
				//e.preventDefault();
				$('selector').click(function(){return false;});
				importar();
			
		});
		agregarEvento("btnBuscarFtp","click",function(){
			consultarDatos(_URL+"mi_ftp",{},function(rs){
				if(rs.respuesta){
					var sel=document.getElementById("mi_arch_ftp");
					sel.innerHTML="";
					var opt=document.createElement("option");
						opt.innerHTML="0";
						opt.value="0";
						sel.appendChild(opt);
					for(var f in rs.datos){
						var opt=document.createElement("option");
						opt.innerHTML=rs.datos[f];
						opt.value=rs.datos[f];
						sel.appendChild(opt);
					}
				}
			});
		});	

		agregarEvento("accion_esperar_importar","click",importar);
		agregarEvento("accion_continuar_exportar_bajo_inv","click",importar);

	}else{
		mostrarMensaje("No tiene permisos para usar esta seccion");
	}


}
 
function importar(){
	var mail;
	if(this.value=="accion_esperar_importar"){
		mail=false;
	}else if(this.value=="accion_continuar_importar"){
		mail:_usuario.email;
	}else{
		mostrarMensaje("Este proceso puede tardar un poco asi que tan pronto termine recibiras una notificacion ");
		mail:_usuario.email;
	}
				

				console.log(document.getElementById("mi_arch_ftp").value);
				if(document.getElementById("mi_arch_ftp").value!="0" && document.getElementById("mi_arch_ftp").value!=""){

					if(document.getElementById("selSedesImportar").value != "--"){
						$('#btnImportar').click(function(){return false;});
						registrarDato(_URL+"importacion_ftp",{
							sede:document.getElementById("selSedesImportar").value,
							tipo_importacion:document.getElementById("selTipoImportacion").value,
							hora_cliente:horaCliente(),
							id_usuario:_usuario.id_usuario,
							nombre_archivo:document.getElementById("mi_arch_ftp").value,
							mail_notificacion:mail,
							
						},function(rs){
							
							consola(rs);
							mostrarMensaje(rs);
							if(rs.no_existen!=undefined){
								document.getElementById("aErroresImportar1").innerHTML="Archivo no registrados";
								document.getElementById("aErroresImportar1").href=_URL+rs.no_existen;
								document.getElementById("aErroresImportar1").target="_blank";	
							}
							if(rs.repetidos!=undefined){
								document.getElementById("aErroresImportar2").innerHTML="Archivo productos repetidos";
								document.getElementById("aErroresImportar2").href=_URL+rs.repetidos;
								document.getElementById("aErroresImportar2").target="_blank";
							
							}
							

							
							if(rs.sin_categoria!=undefined){
								document.getElementById("aErroresImportar3").innerHTML="Archivo productos sin categoria";
								document.getElementById("aErroresImportar3").href=_URL+rs.sin_categoria;
								document.getElementById("aErroresImportar3").target="_blank";
							}

							

						},"formImpoArch");
					}else{
						mostrarMensaje("Por favor seleciona una opcion para las sedes que quieres importar");
					}
				}
}