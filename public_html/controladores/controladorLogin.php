<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);
$usuario = $data['username'];
$contrasena = $data['password'];


require('../clases/alumno.class.php');

$cont=new login_model();
$datos=$cont->get_login($usuario, $contrasena);
$rol= $datos['rolmota'];
if ($datos != null){
    $_SESSION['loggedin'] = true;
    $_SESSION['rol'] = $rol;
    $_SESSION['username'] = $usuario;
    $_SESSION['start'] = time();
    $_SESSION['expire'] = $_SESSION['start'] + (30 * 60);
    
    echo json_encode($datos);
}else{
    echo 'Usuario o contraseña incorrectos ';
}

?>
