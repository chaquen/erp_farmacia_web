function funPeticion(){
        $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var datos=JSON.stringify(this);//convierte a una cadena de texto
    //console.log(datos);
    this.respuestaServidor=$.ajax({
        url:this.url,
        data:{datos},
        type:this.peticion,
        dataType:'json'
    });
   // console.log(this.respuestaServidor);
   
}
/*
 *{datos}=>estructura que se va a enviar al servidor 
 */
function funPeticionUpload(datos){
				     	        
       
       
        $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

		this.respuestaServidor = $.ajax({
			data:datos,
			url: this.url,
			type:this.peticion,
            dataType:"json",
			//Requeridos para subir archivo
			cache:false,
			contentType:false,
			processData:false
			
		});		
}

