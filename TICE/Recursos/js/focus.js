function isEmpty(str) {
    return (!str || 0 === str.length);
}

function cargarDirecciones() {
    var _url = 'http://localhost:49492/api/Direccion';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codDireccion + "'>" + data.descripcion + "</option>";
            });
            //alert("Hola.");
            //$("#qPeriodo").html(strResult);
            $("#selectDireccion").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarCursos(codDireccion) {
    var _url = 'http://localhost:49492/api/Curso?codDireccion=' + codDireccion;

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codCurso + "'>" + data.nombre + "</option>";
            });
            $('#selectCurso')
                .find('option')
                .remove()
                .end()
                .append('<option value="0" selected>Seleccione</option>');
            $("#selectCurso").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function buscarFocus() {
    jQuery.support.cors = true;
    //var codDireccion = $('select#selectDireccion').val();
    var codCurso = $('select#selectCurso').val();
    var estado = $('select#selectEstado').val();
    //if (isEmpty(codDireccion)) {
    //    notie.alert(1, 'Debe seleccionar una dirección', 2);
    //} else if (isEmpty(codCurso)) {
    //    notie.alert(1, 'Debe seleccionar un curso', 2);
    //} else if (isEmpty(estado)) {
    //    notie.alert(1, 'Debe seleccionar un estado', 2);
    //}
    if (!isEmpty(codCurso) && !isEmpty(estado)) {
        $.ajax({
            url: 'http://localhost:49492/api/FocusGroup?codCurso=' + codCurso + '&estado=' + estado,
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

function WriteResponse(focus) {
    var strResult = '';
    $.each(focus, function (index, data) {
        strResult += '<tr rel="' + data.codCurso + '">';
        strResult += '<td> ' + data.nombre + '</td>';
        strResult += '<td> ' + data.nombres + '</td>';
        strResult += '<td>' + data.confirmacionPsicologo + '</td>';
        strResult += '<td>' + data.confirmacionDocente + '</td>';
        strResult += '<td>' + data.estado + '</td>';
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalDelete" data-rel="' + data.codCurso + '">'
        strResult += '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalBusqueda" data-rel="' + data.codCurso + '">'
        strResult += '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    $("#tbodyResult").html(strResult);
}

function bindTableResult() {
    $('#tblFocus tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {
            $('input#cursoSelected').val('');
            $(this).removeClass('success');
            //$('#txtCrearCapa').text('Crear Capacitacion');
        } else {
            $('input#cursoSelected').val($(this).attr('rel'));
            $(this).addClass('success').siblings().removeClass('success');
            //$('#txtCrearCapa').text('Editar Capacitacion');
        }
    });
}

function bindBuscarFocus() {
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
    $('#btnBuscarFocus').on('click', buscarFocus);
    cargarDirecciones();
    $('select#selectDireccion').change(function () {
        cargarCursos($(this).val());
    })
    //cargarCursos();
});