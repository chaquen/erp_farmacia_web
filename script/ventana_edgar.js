$(document).ready(function(){    
    
    $('#descargarP').click(function(){

        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #eliminarProducto, #categoriaProducto, #ventasPeriodo, #promo, #pedido, #nuevoPedidoAdmin').fadeOut('fast');
        $('#ventanaImporProd, #importarProductos').fadeIn('slow');
    });
    
     $('#pedidosP').click(function(){
        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #eliminarProducto, #categoriaProducto, #ventasPeriodo, #importarProductos, #adminpedido').fadeOut('fast');
        $('#pedido, #nuevoPedido').fadeIn('slow');
    });
    $('#pedidosAP').click(function(){
        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #eliminarProducto, #categoriaProducto, #ventasPeriodo, #adminpedidosubir, #nuevoPedido').fadeOut('fast');
        $('#adminpedido, #nuevoPedidoAdmin').fadeIn('slow');
    });
    $('#pedidosSP').click(function(){
        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #eliminarProducto, #categoriaProducto, #ventasPeriodo, #adminpedido, #importarProductos').fadeOut('fast');
        $('#adminpedidosubir, #nuevoPedidoAdmin').fadeIn('slow');
    });
     //Proveedores de los Productos
    $('#proveedoresP').click(function(){
    
        $('#nuevoProducto, #editarProducto, #resultadoEdicionP, #eliminarProducto, #ventasPeriodo, #promo, #pedido,#categoriaProducto ').fadeOut('fast');
        $('#proveedoresProducto').fadeIn('slow');
    });
    //nueva Categoria
    $('#nuevoProv').click(function(){
        $('#resultadoSeleccionProv').fadeOut('fast');
        $('#nuevoProveedor').fadeIn('slow');
    });
    //Editar Categoria
    $('.prov').click(function(){
        $('#nuevoProveedor').fadeOut('fast');
        $('#resultadoSeleccionProv').fadeIn('slow');
    });

    $('#nuevoCJ').click(function(){
        $('#editarCajero,  #eliminarCajero').fadeOut('fast');
        $('#nuevoCajero').fadeIn('slow');
    });
    

    //Editar Cajero
    $('#editarCJ').click(function(){
        $('#nuevoCajero, #eliminarCajero').fadeOut('fast');
        $('#editarCajero').fadeIn('slow');
    });

    //eliminar cajero
    $('#eliminarCJ').click(function(){
        $('#nuevoCajero, #editarCajero').fadeOut('fast');
        $('#eliminarCajero').fadeIn('slow');
    });

    $('#menuNotificacion').click(function(){
       
          $('#menusConfiguracion, #ResultadoEditarSede, #editarSede, #eliminarSede, #permisos').fadeOut('fast');
        $('#notificaciones').fadeIn('slow');
    });
    $('#menuPermisos').click(function(){
       
        $('#menusConfiguracion, #ResultadoEditarSede, #editarSede, #eliminarSede').fadeOut('fast');
        $('#permisos').fadeIn('slow');
    });
    $("#menuConfiguracion").click(function(){
          $('#permisos').fadeOut('fast');
    });
    $('#opcionesConfi').click(function(){
        $('#notificaciones, #permisos').fadeOut('fast');
        $('#menusConfiguracion').fadeIn('slow');
    });
    $('#buscarP').click(function(){
        $('#salidaDinero, #entradaDinero').fadeOut('fast');
        $('#buscarProducto').fadeIn('slow');
    });

    $('#menuProducto').click(function(){
        $('#nuevoProducto').fadeOut('fast');
       
    });

    $('#menuInventario').click(function(){
        $('#agregarInventario').fadeOut('fast');
       
    });
    $('#menuPerfil').click(function(){
        $('#ventas, #clientes, #productos, #inventarios, #configuracion, #cortes').fadeOut('fast');
       $('#perfil').fadeIn('slow'); 
    });

    

    $('#liFacturacion').click(function(){
       $('#menusConfiguracion, #ResultadoEditarSede, #editarSede, #eliminarSede').fadeOut('fast');
       $('#facturacion').fadeIn('slow'); 
    });
    /*$(".mascara").click(function(){
         $('.mascara').fadeOut('fast');
    });*/ 
});

