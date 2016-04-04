
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
        strResult += '<tr rel="' + tarea.codTarea + '">';
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
    //$('#tblTareas tbody tr').on('click', function (event) {
    //    if ($(this).hasClass('success')) {
    //        $('input#tareaSelected').val('');
    //        //$('#tblTareas').addClass('disabled');
    //        $(this).removeClass('success');
    //        //$('.btn-documento').addClass('disabled');
    //    } else {
    //        $('input#tareaSelected').val($(this).attr('rel'));
    //        //$('#tblTareas').removeClass('disabled');
    //        $(this).addClass('success').siblings().removeClass('success');
    //        //$('.btn-documento').removeClass('disabled');
    //    }
    //});
    $("input[type='checkbox']").change(function (e) {
        if ($(this).is(":checked")) {
            $(this).closest('tr').addClass("success");
            //$('input#tareaSelected').val($(this).closest('tr').attr('rel'));
            //alert($(this).closest('tr').attr('rel'));
        } else {
            $(this).closest('tr').removeClass("success");
        }
    });
}

$(document).ready(function () {
    cargarModalidades();
    $('#btnBuscarTareas').on('click', cargarTareas);
});