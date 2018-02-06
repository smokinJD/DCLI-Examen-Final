<?php
$nuevo=array();
require('../clases/alumno.class.php');
//$phpAlumnoNuevo=json_decode($_POST['ikaslea']);
$data = json_decode(file_get_contents('php://input'), true);

$id = $data["id"];
$nombre = $data["nombre"];
$apellido1 = $data["apellido1"];
$apellido2 = $data["apellido2"];
$ciclo = $data["ciclo"];
$curso = $data["curso"];

    $alumno=New Alumno();
    $alumno->insertar($id, $nombre,$apellido1,$apellido2,$ciclo,$curso);
    $mensaje="El alumno se ha insertado correctamente";



print $mensaje;
return $mensaje;
?>




  