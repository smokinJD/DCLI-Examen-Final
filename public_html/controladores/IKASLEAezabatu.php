<?php
require('../clases/alumno.class.php');
$data = json_decode(file_get_contents('php://input'), true);

$id = $data["id"];
$objAlumno=new Alumno();
    
$consulta=$objAlumno->eliminar($id);
print $id;
return $id;
?>