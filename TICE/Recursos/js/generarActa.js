function isEmpty(str) {
    return (!str || 0 === str.length);
}

function cargarInfoActa(){
    jQuery.support.cors = true;
    var codProveedor = $('input#codigos').val();
    if (!isEmpty(codProveedor)) {
        var _url = 'http://localhost:49492/api/Acta?codProveedor=' + codProveedor;
        $.ajax({
            url: _url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, acta) {
                    $('input#inputContrato').val('TICE-032-2016-' + acta.codContrato);
                    $('input#inputVigencia').val(acta.vigencia);
                    $('input#inputProveedor').val(acta.nombre);
                    $('input#inputRUC').val(acta.RUC);
                    $('input#inputImporte').val(acta.importe);
                    $('input#inputSubTotal').val(acta.subtotal);
                    $('input#inputRenta').val(acta.renta);
                    $('input#inputTotal').val(acta.total);
                });
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    } else {
        notie.alert(1, 'Debe seleccionar una actividad', 2);
    }
}

function cargarGruposPagos() {
    var _url = 'http://localhost:49492/api/Pago?codPago=A';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codGrupoPago + "'>" + data.descripcion + "</option>";
            });
            $("#selectGrupoPago").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarTiposDocumentos() {
    var _url = 'http://localhost:49492/api/Pago?codDoc=A';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codTipoDocumento + "'>" + data.descripcion + "</option>";
            });
            $("#selectTipoDoc").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarStrings() {
    var _url = 'http://localhost:49492/api/Pago?codString=A';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codString + "'>" + data.descripcion + "</option>";
            });
            $("#selectString").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}


function cargarTareas() {
    jQuery.support.cors = true;
    var codProveedor = $('input#codigos').val();
    $.ajax({
        url: 'http://localhost:49492/api/Tarea?codProveedor=' + codProveedor,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteResponseActa(data);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function WriteResponseActa(tareas) {
    var strResult = '';
    $.each(tareas, function (index, tarea) {
        strResult += '<tr rel="' + tarea.codTarea + '">';
        strResult += '<td>' + tarea.codTarea + '</td>';
        strResult += '<td>' + tarea.titulo + '</td>';
        strResult += '<td>' + tarea.descripcion + '</td>';
        strResult += '<td>' + tarea.cantidad + '</td>';
        strResult += '<td>' + tarea.importe + '</td>';
        strResult += '<td>' + tarea.total + '</td>';
        strResult += '</tr>';
    });
    $("#tbodyResult").html(strResult);
}

function guardarActa() {
    //Registrar todo

    //Limpiar todo
}

$(document).ready(function () {
    //$("#inputactivfecini").datepicker({ dateformat: "dd/mm/yy" });
    //$("#inputactivfecfin").datepicker({ dateformat: "dd/mm/yy" });
    // add team button click
    cargarInfoActa();
    cargarGruposPagos();
    cargarTiposDocumentos();
    cargarStrings();
    $('#RegistrarActa').on('click', guardarActa);
    cargarTareas();
});