function bindEditarCurso(){
    $('#myModalCurso').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('rel') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        //modal.find('.modal-title').text('New message to ' + recipient)
        //modal.find('.modal-body input').val(recipient)
        jQuery.support.cors = true;
        var _url = 'http://localhost:49492/api/AsignacionCurso?codigo=' + recipient;
        $.ajax({
            url: _url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, curso) {
                    $('input#inputCursoCodigo').val(curso.Codigo);
                    $('input#inputCursoNombre').val(curso.Curso);
                    $('select#selectCursoEstado').val(curso.Estado);
                    $('textarea#textareaObs').val('');
                });
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    })
}

function bindNuevaActividad() {
    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this)
        jQuery.support.cors = true;
        var codigoCurso = $('input#cursoSelected').val();
        if (!isEmpty(codigoCurso)) {
            /*var _url = 'http://localhost:49492/api/AsignacionCurso?codigo=' + codigoCurso;
            $.ajax({
                url: _url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, curso) {
                        $('input#inputActividadCursoCodigo').val(curso.Codigo);
                        $('input#inputActividadCursoNombre').val(curso.Curso);
                    });
                },
                error: function (x, y, z) {
                    alert(x + '\n' + y + '\n' + z);
                }
            });*/
        } else {
            notie.alert(1, 'Debe seleccionar un curso', 2);
        }        
    })
}

function buscarCursosxAsignacion(qPeriodo, qEstado) {
    if (qPeriodo === '') {
        notie.alert(1, 'Debe seleccionar un Periodo', 2);
    } else if (qEstado === '') {
        notie.alert(1, 'Debe seleccionar un Estado', 2);
    } else {
        $('#qPeriodoLast').val(qPeriodo);
        $('#qEstadoLast').val(qEstado);
        var _url = 'http://localhost:49492/api/AsignacionCurso?idperiodo=' + qPeriodo + '&estado=' + qEstado;
        //var _url = 'http://localhost:49492/api/AsignacionCurso?periodo=' + qPeriodo + '&estado=' + qEstado;
        //ttp://localhost:49492/api/Actividad?periodo=2015-03&estado=A
        $.ajax({
            url: _url,
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

function cursosxAsignacion(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var qPeriodo = $('#qPeriodo').val();
    var qEstado = $('#qEstado').val();
    buscarCursosxAsignacion(qPeriodo, qEstado);
}

function actualizarCursosxAsignacion(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var qPeriodo = $('#qPeriodoLast').val();
    var qEstado = $('#qEstadoLast').val();
    if (isEmpty(qPeriodo))
        cursosxAsignacion(event);
    else
        buscarCursosxAsignacion(qPeriodo, qEstado);
}

function WriteResponse(cursos) {
    var strResult = '';
    //var strResult = "<table><th>Codigo</th><th>Curso</th><th>Fecha</th><th>Periodo</th><th>Modalidad</th><th>Docente</th><th>Estado</th>";
    $.each(cursos, function (index, cursos) {
        var estadoBotonCarga = "", estadoBotonDescarga = "";
        //$.ajax({
        //    url: '/Home/ValidarCarpetas/?codigoCurso=' + cursos.Codigo,
        //    type: 'POST',
        //    dataType: 'json',
        //    success: function (data) {
        //        estadoBotonCarga = 'btn btn-default btn-xs ' + data;
        //        if (data == "")
        //            estadoBotonDescarga = 'btn btn-default btn-xs disabled';

        //        strResult += '<tr rel="' + cursos.Codigo + '"><td>' + cursos.Modalidad + '</td><td>' + cursos.Codigo + '</td><td> ' + cursos.Curso + '</td><td>' + cursos.Fecha + '</td><td>' + cursos.Periodo + '</td><td>' + cursos.Docente + '</td><td>' + cursos.Estado + '</td>';
        //        strResult += '<td>';
        //        strResult += '<button type="button" class="btn btn-default btn-xs"' + estadoBotonCarga + ' data-toggle="modal" data-target="#myModalUpload" data-rel="' + cursos.Codigo + '">';
        //        strResult += '<span class="glyphicon glyphicon-upload" aria-hidden="true"></span></button>';
        //        strResult += '<button type="button" class="btn btn-default btn-xs"' + estadoBotonDescarga + ' data-toggle="modal" data-target="#myModalDownload" data-rel="' + cursos.Codigo + '">';
        //        strResult += '<span class="glyphicon glyphicon-download" aria-hidden="true"></span></button>';
        //        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalCurso" data-rel="' + cursos.Codigo + '">';
        //        strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
        //        strResult += '</td></tr>';
        //    },
        //    error: function (x, y, z) {
        //        alert(x + '\n' + y + '\n' + z);
        //    }
        //});
        strResult += '<tr rel="' + cursos.Codigo + '"><td>' + cursos.Modalidad + '</td><td>' + cursos.Codigo + '</td><td> ' + cursos.Curso + '</td><td>' + cursos.Fecha + '</td><td>' + cursos.Periodo + '</td><td>' + cursos.Docente + '</td><td>' + cursos.Estado + '</td>';
        strResult += '<td>';
        strResult += '<button type="button" class="btn btn-default btn-xs"' + estadoBotonCarga + ' data-toggle="modal" data-target="#myModalUpload" data-rel="' + cursos.Codigo + '">';
        strResult += '<span class="glyphicon glyphicon-upload" aria-hidden="true"></span></button>';
        strResult += '<button type="button" class="btn btn-default btn-xs"' + estadoBotonDescarga + ' data-toggle="modal" data-target="#myModalDownload" data-rel="' + cursos.Codigo + '">';
        strResult += '<span class="glyphicon glyphicon-download" aria-hidden="true"></span></button>';
        strResult += '<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModalCurso" data-rel="' + cursos.Codigo + '">';
        strResult += '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
        strResult += '</td></tr>';
    });
    $("#tbodyResult").html(strResult);
}

function bindTableResult() {
    $('#tblCursos tbody tr').on('click', function (event) {
        if ($(this).hasClass('success')) {

            if (event.target.parentElement.className == "btn btn-default btn-xs")
                return;

            $('input#cursoSelected').val('');
            $('#tbActividades').addClass('disabled');
            $(this).removeClass('success');
            $('.btn-actividad').addClass('disabled');
        } else {
            $('input#cursoSelected').val($(this).attr('rel'));
            var codigoCurso = $('input#cursoSelected').val();
            if (!isEmpty(codigoCurso)) {
                var _url = 'http://localhost:49492/api/AsignacionCurso?codigo=' + codigoCurso;
                $.ajax({
                    url: _url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        $.each(data, function (index, curso) {
                            $('input#inputActividadCursoCodigo').val(curso.Codigo);
                            $('input#inputActividadCursoNombre').val(curso.Curso);
                        });
                    },
                    error: function (x, y, z) {
                        alert(x + '\n' + y + '\n' + z);
                    }
                });
            }

            $('#tbActividades').removeClass('disabled');
            $(this).addClass('success').siblings().removeClass('success');
            $('.btn-actividad').removeClass('disabled');
        }
    });
}

function guardarActividad(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarActividad input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {
        var codCurso = $('#guardarActividad input#inputActividadCursoCodigo').val();
        var nuevaActividad = {
            'codigoCurso': codCurso,
            'codUnidad': $('#guardarActividad select#selectUnidad').val(),
            'codSemana': $('#guardarActividad select#selectSemana').val(),
            'titulo': $('#guardarActividad input#inputTitulo').val(),
            'codigoEstado': $('#guardarActividad select#selectEstado').val(),
            'descripcion': $('#guardarActividad textarea#textareaDesc').val(),
            'usuarioCreacion': 'admin'
        }

        $.ajax({
            type: 'POST',
            data: nuevaActividad,
            url: 'http://localhost:49492/api/Actividad',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            //alert(response);
            if (response == '-1') {
                // Clear the form inputs
                $('#guardarActividad input').val('');
                $('#guardarActividad select').val('');
                $('#guardarActividad textarea').val('');
                // Update the table
                $('#myModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                
                window.location.href = "/Home/Actividad/?codigoCurso=" + codCurso;
            }
            else {
                alert('Error al guardar actividad');
            }
        });

    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function editarCurso(event) {
    jQuery.support.cors = true;
    event.preventDefault();
    var errorCount = 0;
    $('#guardarCurso input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {

        var editCurso = {
            'codigoCurso': $('#guardarCurso input#inputCursoCodigo').val(),
            'nombreCurso': $('#guardarCurso input#inputCursoNombre').val(),
            'estado': $('#guardarCurso select#selectCursoEstado').val(),
            'observaciones': $('#guardarCurso textarea#textareaObs').val(),
            'usuarioModificacion': 'admin'
        }

        $.ajax({
            type: 'POST',
            data: editCurso,
            url: 'http://localhost:49492/api/AsignacionCurso',
            dataType: 'JSON'
        }).done(function (response) {
            // Check for successful (blank) response
            if (response == '2') {
                // Clear the form inputs
                $('#guardarCurso input').val('');
                $('#guardarCurso select').val('');
                $('#guardarCurso textarea').val('');
                // Update the table
                $('#myModalCurso').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                actualizarCursosxAsignacion(event);
            }
            else {
                alert('Error al actualizar curso');
            }
        });

    } else {
        // If errorCount is more than 0, error out
        alert('Por favor, ingresar todos los campos');
        return false;
    }
}

function detActividades() {
    //var codigoCurso = $('input#cursoSelected').val();
    var codigoCurso = $('input#inputActividadCursoCodigo').val();
    if (!isEmpty(codigoCurso)) {
        window.location.href = "/Home/Actividad/?codigoCurso=" + codigoCurso;
    } else {
        notie.alert(1, 'Debe seleccionar un curso', 2);
    }
}

function isEmpty(str) {
    return (!str || 0 === str.length);
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
            $("#qPeriodo").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
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
            $("#selectUnidad").append(strResult);
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
            $("#selectSemana").append(strResult);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    })
}

$(document).ready(function () {
    $("#datepicker1").datepicker({ dateFormat: "dd/mm/yy" });
    $("#datepicker2").datepicker({ dateFormat: "dd/mm/yy" });
    // Add Team button click
    $('#btnGuardarActividad').on('click', guardarActividad);
    $('#btnEditarCurso').on('click', editarCurso);
    $('#btnBuscarCurso').on('click', cursosxAsignacion);
    bindEditarCurso();
    //bindNuevaActividad();
    cargarPeriodos();
    cargarUnidades();
    cargarSemanas();

    document.getElementById('uploader').onsubmit = function () {
        var formdata = new FormData(); //FormData object
        var fileInput = document.getElementById('fileInput');
        //Iterating through each files selected in fileInput
        for (i = 0; i < fileInput.files.length; i++) {
            //Appending each file to FormData object
            formdata.append(fileInput.files[i].name, fileInput.files[i]);
        }
        //Creating an XMLHttpRequest and sending
        var codigoCurso = $('input#inputActividadCursoCodigo').val();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Home/Upload/?codigoCurso=' + codigoCurso);
        xhr.send(formdata);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert(xhr.responseText);
            }
        }
        return false;
    }
});