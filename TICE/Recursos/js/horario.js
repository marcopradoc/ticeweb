
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

$(document).ready(function () {
    //cargarCursos();
});