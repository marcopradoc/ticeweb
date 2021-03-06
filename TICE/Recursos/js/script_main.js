function isEmpty(str) {
    return (!str || 0 === str.length);
}

function buscarCapacitaciones() {
    jQuery.support.cors = true;
    //var codigoTaller = $('select#selectCapaTaller').val();
    var codigoPeriodo = $('select#selectCapaPeriodo').val();
    var nombreCapacitacion = $('input#inputCapaNombre').val();
    //if (isEmpty(codigoTaller)) {
    //    alert('Debe seleccionar un taller');
    //} else if (isEmpty(codigoPeriodo)) {
    if (isEmpty(codigoPeriodo)) {
        notie.alert(1, 'Debe seleccionar un periodo', 2);
    }
    //if (!isEmpty(codigoTaller) && !isEmpty(codigoPeriodo)) {
    if (!isEmpty(codigoPeriodo)) {
        $.ajax({
            url: 'http://localhost:49492/api/Capacitacion?codigoPeriodo=' + codigoPeriodo + '&nombreCapacitacion=' + nombreCapacitacion,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                WriteResponse(data);
                bindTableResult();
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
}

function WriteResponse(capas) {
    var strResult = '';
    $.each(capas, function (index, capa) {
        strResult += '<tr rel="' + capa.codCapacitacion + '">';
        strResult += '<td> ' + capa.nombre + '</td>';
        strResult += '<td>' + capa.periodo + '</td>';
        strResult += '<td>' + capa.estado + '</td>';//estado
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" data-rel="' + capa.codCapacitacion + '">'
        strResult += '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    $("#tbodyResult").html(strResult);
}

function bindTableResult() {
    $('#tblCapacitaciones tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {

            if (event.target.parentElement.className == "btn btn-default btn-xs")
                return;

            $('input#capaSelected').val('');
            $(this).removeClass('success');
            $('#txtCrearCapa').text('Crear Capacitacion');
        } else {
            $('input#capaSelected').val($(this).attr('rel'));
            $(this).addClass('success').siblings().removeClass('success');
            $('#txtCrearCapa').text('Editar Capacitacion');
        }
    });
}

function irCrearCapa() {
    var codigoCapa = $('input#capaSelected').val();
    if (!isEmpty(codigoCapa)) {
        window.location.href = "/Home/EditarCapa/?codigoCapa=" + codigoCapa;
    } else {
        window.location.href = "/Home/CrearCapa";
    }
}

function cargarTalleres() {
    var _url = 'http://localhost:49492/api/Taller';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codigoTaller + "'>" + data.nombreTaller + "</option>";
            });
            //alert("Hola.");
            $("#selectCapaTaller").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}
function cargarPeriodos() {
    var _url = 'http://localhost:49492/api/Periodo';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codPeriodo + "'>" + data.descripcion + "</option>";
            });
            //alert("Hola.");
            //$("#qPeriodo").html(strResult);
            $("#selectCapaPeriodo").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

$(document).ready(function () {
    $('#btnBuscarCapa').on('click', buscarCapacitaciones);
    //cargarTalleres();
    cargarPeriodos();
});