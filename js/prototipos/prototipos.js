/**
 * {url}=>nombre del controlador
 * {operacion}=>nombre de la operacion que va a realizar en el controlador
 * {datos}=> estructira json que va a enviar al servidor
 *	{peticion}=> GET,POST,DELETE,PUT
 * */
function miObjetoAjax(url,datos,peticion){
   
    this.datos=datos;
    this.url=url;    
    this.peticion=peticion;
    this.respuestaServidor;    
    this.peticion_ajax=funPeticion;    
    this.peticion_ajax_upload=funPeticionUpload;
    this.hora_cliente=horaCliente();
    console.log(this.url);
}






