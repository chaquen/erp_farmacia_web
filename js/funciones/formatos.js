/*Funcion tomada del sitio 
 * http://www.antisacsor.com/articulo/10_98_dar-formato-a-numeros-en-javascript
 * Para dar formato a los numeros*/
/**
 * Da formato a un número para su visualización
 *
 * @param {(number|string)} numero Número que se mostrará
 * @param {number} [decimales=null] Nº de decimales (por defecto, auto); admite valores negativos
 * @param {string} [separadorDecimal=","] Separador decimal
 * @param {string} [separadorMiles=""] Separador de miles
 * @returns {string} Número formateado o cadena vacía si no es un número
 *
 * @version 2014-07-18
 */
function formato_numero(numero, decimales, separador_decimal, separador_miles){ // v2007-08-06
    numero=parseFloat(numero);
    if(isNaN(numero)){
        return "";
    }

    if(decimales!==undefined){
        // Redondeamos
        numero=numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

    if(separador_miles){
        // Añadimos los separadores de miles
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
        while(miles.test(numero)) {
            numero=numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }
    
    return numero;
}
/*Funcion para dar formato a una fecha Mes-Dia-Año*/
function formatoFecha(fecha,formato){
    
    var f=fecha.split("-");
    var m;
    
    switch(formato){
        case "m-d-a":
            switch(f[1]){
                    case "01":
                        m="Enero";
                        break;
                    case "02":
                        m="Febrero";
                        break;
                    case "03":
                        m="Marzo";
                        break;
                    case "04":
                        m="Abril";
                        break;
                    case "05":
                        m="Mayo";
                        break;
                    case "06":
                        m="Junio";
                        break;
                    case "07":
                        m="Julio";
                        break;
                    case "08":
                        m="Agosto";
                        break;
                    case "09":
                        m="Septiembre";
                        break;
                    case "10":
                        m="Octubre";
                        break;
                    case "11":
                        m="Noviembre";
                        break;            
                    case "12":
                        m="Diciembre";
                        break;           
                }
                return m+" - "+f[2]+" - "+f[0];
            break;
        case "d-m-a":
            switch(f[1]){
                    case "01":
                        m="Enero";
                        break;
                    case "02":
                        m="Febrero";
                        break;
                    case "03":
                        m="Marzo";
                        break;
                    case "04":
                        m="Abril";
                        break;
                    case "05":
                        m="Mayo";
                        break;
                    case "06":
                        m="Junio";
                        break;
                    case "07":
                        m="Julio";
                        break;
                    case "08":
                        m="Agosto";
                        break;
                    case "09":
                        m="Septiembre";
                        break;
                    case "10":
                        m="Octubre";
                        break;
                    case "11":
                        m="Noviembre";
                        break;            
                    case "12":
                        m="Diciembre";
                        break;           
                }
                return f[2]+" - "+m+" - "+f[0];
            break;
    }
}

