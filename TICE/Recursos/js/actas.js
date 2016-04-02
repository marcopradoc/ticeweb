
function cargarModalidades() {
    var _url = 'http://localhost:49492/api/Modalidad';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codigo + "'>" + data.descripcion + "</option>";
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
    //var codigoTipoRecurso = $('#selectTipoRecurso').val();
    var estadoTarea = $('#selectEstadoTarea').val();
    var estadoActa = $('#selectEstadoActa').val();
    $.ajax({
        //url: 'http://localhost:49492/api/Tarea?codModalidad=' + codigoModalidad + '&codTipoRecurso=' + codTipoRecurso + '&estadoTarea=' + estadoTarea + '&estadoActa=' + estadoActa,
        url: 'http://localhost:49492/api/Tarea?codModalidad=' + codigoModalidad + '&estadoTarea=' + estadoTarea + '&estadoActa=' + estadoActa,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteResponseActa(data);
            //bindTableResult();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function WriteResponseActa(tareas) {
    var strResult = '';
    //var strResult = "<table><th>Codigo</th><th>Curso</th><th>Fecha</th><th>Periodo</th><th>Modalidad</th><th>Docente</th><th>Estado</th>";
    $.each(tareas, function (index, tarea) {
        strResult += '<tr rel="' + tarea.codTarea + '">';
        strResult += '<td>' + tarea.Curso + '</td>';
        strResult += '<td>' + tarea.Actividad + '</td>';
        strResult += '<td>' + tarea.Unidad + '</td>';
        strResult += '<td>' + tarea.Semana + '</td>';
        strResult += '<td>' + tarea.Tarea + '</td>';//asignado
        strResult += '<td>' + tarea.NombreRecurso + '</td>';
        strResult += '<td>' + tarea.FechaTermino + '</td>';
        strResult += '<td>' + tarea.codigo + '</td>';
        strResult += '<td>' + tarea.EstadoActa + '</td>';
        strResult += '<td>';
        strResult += '<input type="checkbox" data-rel="' + tarea.codTarea + '">'
        //strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    //strResult += "</table>";
    $("#tbodyResult").html(strResult);
}

function bindTableResult() {
    $('#tblTareas tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {
            $('input#tareaSelected').val('');
            $('#tblTareas').addClass('disabled');
            $(this).removeClass('success');
            $('.btn-documento').addClass('disabled');
        } else {
            $('input#tareaSelected').val($(this).attr('rel'));
            $('#tblTareas').removeClass('disabled');
            $(this).addClass('success').siblings().removeClass('success');
            $('.btn-documento').removeClass('disabled');
        }
    });
}

$(document).ready(function () {
    cargarModalidades();
    //cargarTiposRecursos();
    $('#btnBuscarTareas').on('click', cargarTareas);
});