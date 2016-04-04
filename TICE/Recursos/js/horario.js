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
            $("#selectCurso").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarDocentes(codDireccion) {
    var _url = 'http://localhost:49492/api/Docente?codDireccion=' + codDireccion;

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codDocente + "'>" + data.nombres + "</option>";
            });
            $("#selectDocente").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarSemanas() {
    var _url = 'http://localhost:49492/api/Tiempo';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                //strResult += "<option value = '" + data.anio + ';' + data.mes + ';' + data.dia + ';' + "'>" + data.semana + "</option>";
                strResult += "<option>" + data.semana + "</option>";
            });
            $("#selectSemana").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarHorario() {
    var codCurso = $('#selectCurso').val();
    var codModalidad = $('#selectModalidad').val();
    var semana = $('#selectSemana').val();
    var codDocente = $('#selectDocente').val();

    if (codCurso == 0) {
        notie.alert(1, 'Debe seleccionar un Curso', 2);
    } else if (codModalidad == 0) {
        notie.alert(1, 'Debe seleccionar una Modalidad', 2);
    } else if (semana == 0) {
        notie.alert(1, 'Debe seleccionar una Semana', 2);
    } else if (codDocente == 0) {
        notie.alert(1, 'Debe seleccionar un Docente', 2);
    } else {
        var _url = 'http://localhost:49492/api/Horario?codCurso=' + codCurso + '&codModalidad=' + codModalidad + '&semana=' + semana + '&codDocente=' + codDocente;

        $.ajax({
            url: _url,
            type: "GET",
            dataType: 'json',
            success: function (data) {
                armarHorario(data);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        })
    }
}

function armarHorario(fechas) {
    var strResult = '';
    var colFechas = {};

    $.each(fechas, function (index, dia) {
        var fecha = new Date(dia.fechaFormato);
        colFechas[dia.horaInicio.substring(0, 2) + '' + fecha.getDay()] = dia.nombre;
        //alert(colFechas);
    });

    for (var i = 7; i < 24; i++) {
        var hora = '', horaSig;
        if (i > 9) {
            hora = i;
            horaSig = (i + 1);
        }
        else if (i == 9){
            hora = '0' + i;
            horaSig = (i + 1);
        } else {
            hora = '0' + i;
            horaSig = '0' + (i + 1);
        }

        strResult += '<tr>';
        for (var j = 0; j < 8; j++) {
            if (j == 0)
                strResult += '<td> ' + hora + ':00 - ' + horaSig + ':00 </td>';
            else {
                if(colFechas[hora + '' + j] == null)
                    strResult += '<td> - </td>';
                else
                    strResult += '<td>' + colFechas[hora + '' + j] + '</td>';
            }
        }
        strResult += '</tr>';
    }

    $("#tbodyResult").html(strResult);
}

$(document).ready(function () {
    cargarModalidades();
    cargarCursos(82);
    cargarDocentes(82);
    cargarSemanas();

    $('#btnBuscarHorario').on('click', cargarHorario);
});