
var miAplicacion = angular.module('miAplicacion', []);

miAplicacion.controller('mainController', ["$scope", "$http", function($scope, $http) {
        $http.get('controladores/IKASLEAKbilatu.php').success(function(data) {
            $scope.ikasle = data;
        });
        
            $scope.misdatos ={
                id:"",
                nombre:"",
                apellido1:"",
                apellido2:"",
                ciclo:"",
                curso:"",
                idBorrar:""
            };
        
        $scope.verBotones = "true";
        
        //////////////////////////////////////////////////////////////////////
        ///Cogemos los datos de los alumnos de la Base de Datos 
        //////////////////////////////////////////////////////////////////////
       $scope.mostrarAlumnos = function (){
            $scope.Ocultar();
            $scope.verAlumnos = "true";
    };

        /////////////////////////////////////////////////////////////////////////////
        ///Cogemos los datos de los ciclos de la Base de Datos .ESTA COMPLETO
        ///////////////////////////////////////////////////////////////////////////////
         $scope.listaZIKLOAK = [];
        var misciclos = {
            method: 'GET',
            url: 'controladores/ZIKLOAKbilatu.php'
        };

        var response = $http(misciclos);
        response.success(function(data) {
            $scope.listaZIKLOAK = data;
        });
        $scope.mostrarCiclos = function (){
        $scope.Ocultar();
        $scope.verCiclos = "true";
    };
       
       /////////////////////////////////////////////////////////////////////////////////
       ////////////////////////////////////////////////////////////////////////////////
       //////////// la función agregar no está completa//////////////////////////////
        $scope.iniciarAgregar = function(){
            $scope.ultimoId = $scope.ikasle[parseInt($scope.ikasle.length)-1].id;
            $scope.misdatos.id = parseInt($scope.ultimoId)+1;
            $scope.verAgregarAlumnos= "true";
            $scope.verBorrarAlumnos= "false";
            $scope.verBotones = "false";
        };
        $scope.agregar = function() {
            DatosalumnoNuevo = {id:$scope.misdatos.id,nombre:$scope.misdatos.nombre,
                apellido1:$scope.misdatos.apellido1,apellido2:$scope.misdatos.apellido2,
                ciclo:$scope.misdatos.ciclo,curso:$scope.misdatos.curso};
            if ($scope.misdatos.nombre === ""){
                alert("Tienes que introducir el nombre");
            }else{
                $http({
                    method: "POST",
                    url: "controladores/IKASLEberria.php",
                    data: DatosalumnoNuevo,                                        //////////
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                        .success(function(response) {
                            alert(response);
                            $scope.ikasle.push(DatosalumnoNuevo);
                            
                            $scope.misdatos.id++;
                            $scope.misdatos.nombre='';
                            $scope.misdatos.apellido1='';
                            $scope.misdatos.apellido2='';
                            $scope.misdatos.ciclo='';
                            $scope.misdatos.curso='';
                            $scope.verAgregarAlumnos = 'false';
                            $scope.verBotones = 'true';
                        });
                    }

               
            };
           
        /////////////////////////////////////////////////////////////////////////////////
       ////////////////////////////////////////////////////////////////////////////////
       //////////// la función borrarAlumno no está completa//////////////////////////////
       $scope.iniciarBorrar = function(){
            $scope.verBorrarAlumnos= "true";
            $scope.verAgregarAlumnos= "false";
            $scope.verBotones = "false";
        };

        
        $scope.borrarAlumno = function() {
            dato = {id:$scope.misdatos.idBorrar};
            if (confirm('¿Seguro que quieres borrar el alumno con id: ' + $scope.misdatos.idBorrar + '?')) {
                $http({
                    method: "POST",
                    url: "controladores/IKASLEAezabatu.php",
                    data: dato,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                        .success(function(response) {
                            ///////////////////borrear de la lista del scope//////////////////////  
                            alert("usuario eliminado correctamente" );
                            var milista = $scope.ikasle;
                            $scope.ikasle=[];
                            angular.forEach(milista, function(item){
                                if(item.id !== $scope.misdatos.idBorrar){
                                    $scope.ikasle.push(item);
                                }
                            $scope.verBorrarAlumnos= "false";
                            $scope.verBotones = "true";
                            
                            $scope.ultimoId = $scope.ikasle[parseInt($scope.ikasle.length)-1].id;
                            $scope.misdatos.id = parseInt($scope.ultimoId)+1;
                            });
                            
                        }); 
                ////// 
            }else{
                $scope.verBorrarAlumnos= "false";
                $scope.verBotones = "true";
            }
            };
            
            $scope.buscar = function (){
                $scope.Ocultar();
                $scope.verConsultas = "true";
            };
            
            $scope.finBuscar = function () {
            $scope.TEXTObusqueda = "";
            $scope.Ocultar();
            };
            
            
            $scope.cancelar = function () {
            $scope.misdatos = {};
            $scope.verAgregarAlumnos = 'false';
            $scope.verBorrarAlumnos = 'false';
            $scope.verBotones = 'true';
            };
        
            $scope.Ocultar = function (){
                $scope.verCiclos = "false";
                $scope.verAlumnos = "false";
                $scope.verAgregarAlumnos = "false";
                $scope.verBorrarAlumnos = "false";
                $scope.verConsultas = "false";
            };

    }]);
