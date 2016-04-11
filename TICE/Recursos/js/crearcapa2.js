function isEmpty(str) {
    return (!str || 0 === str.length);
}

function cancelar() {
    window.location.href = "/Home/Main";
}

function cargarTalleres(){
    var codigoCapacitacion = $('input#codigoCapa').val();
    jQuery.support.cors = true;
    var _url = 'http://localhost:49492/api/Taller?codigoCapacitacion='+codigoCapacitacion;
    $.ajax({
        url: _url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteResponseTalleres(data);
            bindTableResultTalleres();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}
function WriteResponseTalleres(talleres) {
    var strResult = '';
    $.each(talleres, function (index, taller) {
        strResult += '<tr rel="' + taller.codigoTaller + '"><td>' + taller.nombreTaller + '</td><td> ' + taller.fechaInicio + '</td><td> ' + taller.fechaFin + '</td><td> ' + taller.invitados + '</td><td> ' + taller.participantes + '</td>';
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalSearchTaller" data-rel="' + taller.codigoTaller + '">'
        strResult += '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalEditTaller" data-rel="' + taller.codDetalleCapacitacion + '">'
        strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalParticipantes" data-rel="' + taller.codigoTaller + '">'
        strResult += '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    $("#tBodyResult").html(strResult);
}

function bindTableResultTalleres() {
    $('#tblTalleres tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {

            if (event.target.parentElement.className == "btn btn-default btn-xs")
                return;

            $('input#tallerSelected').val('');
            $(this).removeClass('success');
        } else {
            $('input#tallerSelected').val($(this).attr('rel'));
            jQuery.support.cors = true;
            var _url = 'http://localhost:49492/api/Taller?codigoTaller=' + $(this).attr('rel');
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var len = data.length;
                    $.each(data, function (index, taller) {
                        $('#spNombreEditTaller').text(taller.nombreTaller);
                    });
                    //$('#myModal').modal('toggle');
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });
            $(this).addClass('success').siblings().removeClass('success');
        }
    });
}

function crearCapa() {
    var codigoCapa = $('input#codigoCapa').val();
    if (!isEmpty(codigoCapa)) {
        window.location.href = "/Home/CrearCapa/?codigoCapa=" + codigoCapa;
    } else {
        notie.alert(1, 'Debe guardar la capacitación', 2);
    }
}

function crearTallerMaterial() {
    var codigoCapa = $('input#codigoCapa').val();
    if (!isEmpty(codigoCapa)) {
        window.location.href = "/Home/CrearCapa2/?codigoCapa=" + codigoCapa;
    } else {
        notie.alert(1, 'Debe guardar la capacitación', 2);
    }
}

//function crearParticipante() {
//    var codigoCapa = $('input#codigoCapa').val();
//    if (!isEmpty(codigoCapa)) {
//        window.location.href = "/Home/CrearCapa3/?codigoCapa=" + codigoCapa;
//    } else {
//        notie.alert(1, 'Debe guardar la capacitación', 2);
//    }
//}


function cargarCapacitacion() {
    var codigoCapa = $('input#codigoCapa').val();
    if (!isEmpty(codigoCapa)) {
        jQuery.support.cors = true;
        var _url = 'http://localhost:49492/api/Capacitacion?codigoCapacitacion=' + codigoCapa;
        $.ajax({
            url: _url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, capa) {
                    $('#spNombreCapacitacion').text(capa.nombre);
                    $('#spNombreEditCapacitacion').text(capa.nombre);
                    $('#spNombrePartCapacitacion').text(capa.nombre);
                });
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
}

function cargarSedes() {
    var _url = 'http://localhost:49492/api/Sede';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codSede + "'>" + data.descripcion + "</option>";
            });
            //alert("Hola.");
            //$("#qPeriodo").html(strResult);
            $("#selectSede").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarAulas() {
    var _url = 'http://localhost:49492/api/Aula';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codAula + "'>" + data.descripcion + "</option>";
            });
            //alert("Hola.");
            //$("#qPeriodo").html(strResult);
            $("#selectAula").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cancelar() {
    window.location.href = "/Home/Main";
}

function editarDetalle(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorcount = 0;
    $('#guardarDetalle input').each(function (index, val) {
        if ($(this).val() === '') { errorcount++; }
    });
    if (errorcount === 0) {

        var editDetalle = {
            'codDetalleCapacitacion': $('#detalleSelected').val(),
            'codCapacitacion': $('input#codigoCapa').val(),
            'codTaller': $('input#tallerSelected').val(),//
            'codAulaVirtual': $('#guardarDetalle input#inputCodigoAV').val(),
            'fechaInicio': $('#inputFecIni').val(),
            'fechaFin': $('#inputFecFin').val(),
            'codSede': $('#guardarDetalle select#selectSede').val(),
            'lugar': $('#guardarDetalle select#selectAula').val(),
            'sesionesPresenciales': $('#guardarDetalle input#inputSesPre').val(),
            'sesionesVirtuales': $('#guardarDetalle input#inputSesVir').val(),
            'fechaEnvioNotificacion': $('#inputFecEnv').val(),
            'usuarioModificacion': 'admin'
        }

        $.ajax({
            type: 'POST',
            data: editDetalle,
            url: 'http://localhost:49492/api/DetalleCapacitacion',
            datatype: 'JSON'
        }).done(function (response) {
            // check for successful (blank) response
            if (response == '-1') {
                // clear the form inputs
                //$('#guardarDetalle input').val('');
                //$('#guardarDetalle select').val('');
                //$('#guardarDetalle textarea').val('');
                $('#myModalEditTaller').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                cargarTalleres();
            }
            else {
                alert('error al actualizar actividad');
            }
        });
    } else {
        // if errorcount is more than 0, error out
        alert('por favor, ingresar todos los campos');
        return false;
    }
}

function bindNuevoDetalle() {
    $('#myModalEditTaller').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        //var modal = $(this);
        //alert(recipient);
        $('#detalleSelected').val(recipient);
        if (recipient > '0') {
            var _url = 'http://localhost:49492/api/DetalleCapacitacion?codDetalleCapacitacion=' + recipient;
            $.ajax({
                url: _url,
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    //var strResult = '';
                    $.each(data, function (index, data) {
                        //strResult += "<option value = '" + data.codAula + "'>" + data.descripcion + "</option>";

                        $('#inputCodigoAV').val(data.codAulaVirtual);
                        $('#inputFecIni').val(data.fechaInicio);
                        $('#inputFecFin').val(data.fechaFin);
                        $('#selectSede').val(data.codSede);
                        $('#selectAula').val(data.lugar);
                        $('#inputSesPre').val(data.sesionesPresenciales);
                        $('#inputSesVir').val(data.sesionesVirtuales);
                        $('#inputFecEnv').val(data.fechaEnvioNotificacion);
                    });
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            })
        } else {
            $('#inputCodigoAV').val('');
            $('#inputFecIni').val('');
            $('#inputFecFin').val('');
            $('#selectSede').val('');
            $('#selectAula').val('');
            $('#inputSesPre').val('');
            $('#inputSesVir').val('');
            $('#inputFecEnv').val('');
        }
    });
}

$(document).ready(function () {
    $("#inputFecIni").datepicker({ dateFormat: "dd/mm/yy" });
    $("#inputFecFin").datepicker({ dateFormat: "dd/mm/yy" });
    $("#inputFecEnv").datepicker({ dateFormat: "dd/mm/yy" });
    //bindSeleccionarTaller();
    $('#btnCancelar').on('click', cancelar);
    $('#btnGuardarDetalle').on('click', editarDetalle);
    cargarCapacitacion();
    cargarSedes();
    cargarAulas();
    cargarTalleres();
    bindNuevoDetalle();
    //bindTableModalResult();
});