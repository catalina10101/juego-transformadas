TRANSFORMADAS

	* En transformadas.php los archivos js estan configurados para cargarse solo cuando la pagina de wordpress es igual a 'transformadas' (el slug), actualizar el slug si es necesario.
	
	* Eliminar el archivo index, folder .git y transformadas.txt.
	* La url del directorio de los plugins se pasa al archivo sceneLoad.js en la variable wpa_data, que se asigna en transformadas.php.
	* En la pagina de Wordpress cargar el juego poniendo: 
		<div id="emoticones-game"></div>

