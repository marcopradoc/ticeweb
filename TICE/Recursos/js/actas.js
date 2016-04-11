
function cargarModalidades() {
    var _url = 'http://localhost:49492/api/Modalidad';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codModalidad + "'>" + data.descripcion + "</option>";
            });
            $("#selectModalidad").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarTiposRecursos() {
    var _url = 'http://localhost:49492/api/TipoRecurso';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codTipoRecurso + "'>" + data.descripcion + "</option>";
            });
            $("#selectTipoRecurso").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarTareas() {
    jQuery.support.cors = true;
    var codigoModalidad = $('#selectModalidad').val();
    var estadoTarea = $('#selectEstadoTarea').val();
    var estadoActa = $('#selectEstadoActa').val();
    $.ajax({
        //url: 'http://localhost:49492/api/Tarea?codModalidad=' + codigoModalidad + '&codTipoRecurso=' + codTipoRecurso + '&estadoTarea=' + estadoTarea + '&estadoActa=' + estadoActa,
        url: 'http://localhost:49492/api/Tarea?codModalidad=' + codigoModalidad + '&estadoTarea=' + estadoTarea + '&estadoActa=' + estadoActa,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteResponseActa(data);
            bindTableResultActa();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function WriteResponseActa(tareas) {
    var strResult = '';
    $.each(tareas, function (index, tarea) {
        strResult += '<tr rel="' + tarea.codProveedor + '">';
        strResult += '<td>' + tarea.Curso + '</td>';
        strResult += '<td>' + tarea.Actividad + '</td>';
        strResult += '<td>' + tarea.Unidad + '</td>';
        strResult += '<td>' + tarea.Semana + '</td>';
        strResult += '<td>' + tarea.Tarea + '</td>';
        strResult += '<td>' + tarea.NombreRecurso + '</td>';
        strResult += '<td>' + tarea.FechaTermino + '</td>';
        strResult += '<td>' + tarea.codigo + '</td>';
        strResult += '<td>' + tarea.EstadoActa + '</td>';
        strResult += '<td>';
        strResult += '<input type="checkbox" data-rel="' + tarea.codTarea + '">'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    $("#tbodyResult").html(strResult);
}

function bindTableResultActa() {
    $("input[type='checkbox']").change(function (e) {
        if ($(this).is(":checked")) {
            $(this).closest('tr').addClass("success");
        } else {
            $(this).closest('tr').removeClass("success");
        }
    });
}

function irGenerarActa() {
    var codTarea = '';
    var codProveedor = '';
    $('#tblTareas').find('tr').each(function () {
        var row = $(this);
        if (row.find('input[type="checkbox"]').is(':checked')) {
            codTarea = codTarea + $(this).attr('rel') + '-';
            codProveedor = $(this).attr('rel');
        }
    });

    if (codTarea == '')
        notie.alert(1, 'Debe seleccionar tareas antes de generar un acta', 2);
    else
        window.location.href = "/Home/GenerarActa/?codigos=" + codProveedor;
    //window.location.href = "/Home/GenerarActa/?codigos=" + codTarea.substring(0, codTarea.length - 1);
}

$(document).ready(function () {
    cargarModalidades();
    $('#btnBuscarTareas').on('click', cargarTareas);
    $('#btnGenerarActa').on('click', irGenerarActa);
});