function isEmpty(str) {
    return (!str || 0 === str.length);
}

function bindDeleteActividad() {
    $('#myModalDelActividad').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this);
        $('#codActividadToDel').val(recipient);
    });
}

function bindNuevaTarea() {
    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this)
        jQuery.support.cors = true;
        var codigoActividad = $('input#actividadSelected').val();
        var codigoCurso = $('input#codigoCurso').val();
        if (!isEmpty(codigoCurso)) {
            var _url = 'http://localhost:49492/api/Actividad?codigoCurso=' + codigoCurso+'&codigoActividad='+codigoActividad;
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, actividad) {
                        $('input#inputTareaCursoCodigo').val(actividad.codCurso);
                        $('input#inputTareaCursoNombre').val(actividad.Curso);
                        $('input#inputTareaActividadCodigo').val(actividad.codActividad);
                        $('input#inputTareaActividadNombre').val(actividad.titulo);
                    });
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });
        } else {
            notie.alert(1, 'Debe seleccionar una actividad', 2);
        }
    })
}

function bindEditarActividad() {
    $('#myModalEditActividad').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('rel');
        var modal = $(this)
        jQuery.support.cors = true;
        var codigoCurso = $('input#codigoCurso').val();
        if (!isEmpty(codigoCurso)) {
            var _url = 'http://localhost:49492/api/Actividad?codigoCurso=' + codigoCurso + '&codigoActividad=' + recipient;
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, actividad) {
                        $('#inputActivNombreCurso').val(actividad.Curso);
                        $('#selectActivUnidad').val(actividad.codUnidad);
                        $('#selectActivSemana').val(actividad.codSemana);
                        $('#inputActivCodigoCurso').val(actividad.codCurso);
                        $('#inputActivCodigoActividad').val(actividad.codActividad);
                        $('#inputActivTitulo').val(actividad.titulo);
                        $('#selectActivEstado').val(actividad.estado);
                        $('#textareaActivDesc').val(actividad.descripcion);
                    });
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });
        }
    })
}

function cargarCursoHeader() {
    jQuery.support.cors = true;
    var codigoCurso = $('input#codigoCurso').val();
    var _url = 'http://localhost:49492/api/AsignacionCurso?codigo=' + codigoCurso;
    $.ajax({
        url: _url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, curso) {
                $('#spanCurso').text(curso.Curso);
                $('#spanModalidad').text(curso.Modalidad);
            });
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}
function cargarCursoActividades() {
    jQuery.support.cors = true;
    var codigocurso = $('input#codigoCurso').val();
    $.ajax({
        url: 'http://localhost:49492/api/Actividad?codigoCurso=' + codigocurso,
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            WriteResponse(data);
            bindTableResult();
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function bindTableResult() {
    $('#tblActividades tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {
            $('input#actividadSelected').val('');
            $('#tbTareas').addClass('disabled');
            $(this).removeClass('success');
            $('.btn-tarea').addClass('disabled');
        } else {
            $('input#actividadSelected').val($(this).attr('rel'));
            $('#tbTareas').removeClass('disabled');
            $(this).addClass('success').siblings().removeClass('success');
            $('.btn-tarea').removeClass('disabled');
        }
    });
}

function formatDate(date) {
    var d = new Date(date);
    return d.toDateString();
}

function WriteResponse(actividades) {
    var strResult = '';
    //var strResult = "<table><th>Codigo</th><th>Curso</th><th>Fecha</th><th>Periodo</th><th>Modalidad</th><th>Docente</th><th>Estado</th>";
    $.each(actividades, function (index, actividad) {
        strResult += '<tr rel="' + actividad.codActividad + '">';
        strResult += '<td>' + actividad.codActividad + '</td>';
        strResult += '<td>' + actividad.fechaCreacion + '</td>';
        strResult += '<td>' + actividad.unidad + '</td>';
        strResult += '<td>' + actividad.semana + '</td>';
        strResult += '<td> ' + actividad.titulo + '</td>';
        strResult += '<td></td>';
        strResult += '<td>' + actividad.DescEstado + '</td>';
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalEditActividad" data-rel="' + actividad.codActividad + '">'
        strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalDelActividad" data-rel="' + actividad.codActividad + '">'
        strResult += '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>'
        strResult += '</button>'
        strResult += '</td></tr>';
    });
    //strResult += "</table>";
    $("#tbodyResult").html(strResult);
}

function find() {
    var periodo = $('#periodo').val();
    var estado = $('#estado').val();

    $.getJSON(uri + 'periodo=' + periodo + '&estado=' + estado)
      .done(function (data) {
          $.each(data, function (key, item) {
              // Add a list item for the product.
              $('<li>', { text: formatItem(item) }).appendTo($('#products'));
          });
      });
}

function guardarTarea(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarTarea input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {        
        var nuevaTarea = {
            'codigoCurso': $('#guardarTarea input#inputTareaCursoCodigo').val(),
            'codigoActividad': $('#guardarTarea input#inputTareaActividadCodigo').val(),
            'titulo': $('#guardarTarea input#inputTitulo').val(),
            'estado': $('#guardarTarea select#selectEstado').val(),
            'porcentajeCompletado': $('#guardarTarea input#inputCompletado').val(),
            'codigoTipoRecurso': $('#guardarTarea select#selectTipoRecurso').val(),
            'codigoRecurso': '1',//$('#guardarTarea input#inputRecurso').val(),
            'descripcion': $('#guardarTarea textarea#textareaDesc').val(),
            'fechaInicio': $('#guardarTarea input#datepicker1').val(),
            'fechaFin': $('#guardarTarea input#datepicker2').val(),
            'usuarioCreacion': 'admin'
        }
        $.ajax({
            type: 'POST',
            data: nuevaTarea,
            url: 'http://localhost:49492/api/Tarea',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            if (response == '-1') {
                // Clear the form inputs
                $('#guardarTarea input').val('');
                $('#guardarTarea select').val('');
                $('#guardarTarea textarea').val('');
                              
                $('#myModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });

    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function deleteActividad(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    var codigoActividad = $('#codActividadToDel').val();
    var codigoCurso = $('input#codigoCurso').val();
    if (!isEmpty(codigoActividad)) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:49492/api/Actividad?codigoCurso='+codigoCurso+'&codigoActividad='+codigoActividad,
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            if (response == '-1') {
                //actualizar lista de actividades
                cargarCursoActividades();
            }
            else {
                alert('Error al eliminar actividad');
            }
        });

    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function detTareas() {
    var codigoActividad = $('input#actividadSelected').val();
    var codigoCurso = $('input#codigoCurso').val();
    if (!isEmpty(codigoActividad)) {
        window.location.href = "/Home/Tarea/?codigoCurso="+codigoCurso+"&codigoActividad=" + codigoActividad;
    } else {
        notie.alert(1, 'Debe seleccionar una actividad', 2);
    }
}

function editarActividad(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorcount = 0;
    $('#guardarActividad input').each(function (index, val) {
        if ($(this).val() === '') { errorcount++; }
    });
    if (errorcount === 0) {

        var editactividad = {
            'codigoActividad': $('#guardarActividad input#inputActivCodigoActividad').val(),
            'codigoCurso': $('#guardarActividad input#inputActivCodigoCurso').val(),
            'codUnidad': $('#guardarActividad select#selectActivUnidad').val(),
            'codSemana': $('#guardarActividad select#selectActivSemana').val(),
            'titulo': $('#guardarActividad input#inputActivTitulo').val(),
            'codigoEstado': $('#guardarActividad select#selectActivEstado').val(),
            'descripcion': $('#guardarActividad textarea#textareaActivDesc').val(),
            'usuarioModificacion': 'admin'
        }

        $.ajax({
            type: 'POST',
            data: editactividad,
            url: 'http://localhost:49492/api/Actividad',
            datatype: 'JSON'
        }).done(function (response) {
            // check for successful (blank) response
            if (response == '-1') {
                // clear the form inputs
                $('#guardarActividad input').val('');
                $('#guardarActividad select').val('');
                $('#guardarActividad textarea').val('');
                $('#myModalEditActividad').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                cargarCursoActividades();
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

function cargarUnidades() {
    var _url = 'http://localhost:49492/api/Unidad';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codUnidad + "'>" + data.descripcion + "</option>";
            });
            //alert("Hola.");
            //$("#qPeriodo").html(strResult);
            $("#selectActivUnidad").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

function cargarSemanas() {
    var _url = 'http://localhost:49492/api/Semana';

    $.ajax({
        url: _url,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var strResult = '';
            $.each(data, function (index, data) {
                strResult += "<option value = '" + data.codSemana + "'>" + data.descripcion + "</option>";
            });
            //alert("Hola.");
            //$("#qPeriodo").html(strResult);
            $("#selectActivSemana").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

$(document).ready(function () {
    //$("#inputactivfecini").datepicker({ dateformat: "dd/mm/yy" });
    //$("#inputactivfecfin").datepicker({ dateformat: "dd/mm/yy" });
    // add team button click
    $('#btnGuardarTarea').on('click', guardarTarea);
    $('#btnEditarActividad').on('click', editarActividad);
    $('#btnConfirmDelete').on('click', deleteActividad);
    bindDeleteActividad();
    bindEditarActividad();
    bindNuevaTarea();
    cargarCursoActividades();
    cargarCursoHeader();
    cargarUnidades();
    cargarSemanas();
});