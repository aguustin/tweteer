# Tweteer
## Descripcion:
### simulador de X (twitter). 

### IMPORTANTE:
### Para pode ejecutar la app una vez bajada de github hay que realizar los siguientes pasos:
- En la terminal dentro de "C:rutaDeLaCarpeta/tweeterio" instalar nodemon ( npm i nodemon -D ) y ejecutar el comando "npm run dev"
- En otra ventana de la terminal dentro de "C:rutaDeLaCarpeta/tweeterio/client" instalar los scripts de react (npm i react-scripts) y ejecutar el comando "npm start"

## Herramientas utilizadas
- HTML
- CSS
- BOOTSTRAP
- REACT JS
- NODE JS
- EXPRESS JS
- MONGODB
- POSTMAN

## Api ##
__- tweetsRequests.jsx -__
__- userRequests.jsx -__

## Componentes ##
__- form -__
__- retweetForm -__
__- homeLayout -__
__- listsLayout -__
__- nav -__
__- publicTweet -__
__- searchLayout -__
__- trendAndPeople -__
__- tweets -__


## Context ##
__- layoutsContext.jsx -__
__- tweetsContext.jsx -__

## Server ##
__- controllers -__
__- libs -__
__- models -__
__- routes -__
__- config.js -__
__- db.js -__
__- index.js -__

## Descripcion de las funcionalidades: ##

## FRONTEND ##

### __api__: Conecta las peticiones http del frontend con el backend con axios.

### __App__: Componente principal de la app. Instancia todos los componentes de la web para que todos se ejecuten dentro de este.

### __form__: Verificacion de las credenciales de una cuenta admin.

### __retweetForm__: Formulario para poder retweetear una publicacion ya existente.

### __homeLayout__: Contiene imagen de portada, imagen de perfil, nombre del perfil, cantidad de usuarios seguidores y seguidos por el usuario. Tambien es en la seccion donde se puede editar toda la informacion sobre el perfil del usuario

### __nav__: Contiene el boton que despliega la navegacion lateral, el buscador de stickers y el boton que despliega el carrito de compras.

### __publicTweet__: Formulario que permite realizar publicaciones en el perfil propio del usuario.

### __searchLayout__: Buscador de perfiles.

### __trendAndPeople__: Muestra seis trends ordenados de mayoor a menor por la cantidad de publicaciones hechas con un mismo hashtag.

### __tweets__: Muestra toda la informacion respecto a las publicaciones hechas como, descripcion de la publicacion, cantidad de likes, cantidad de retweets, comentarios.

### __imgs__: Contiene imagenes para la vista de la web.

### __context__: Contiene todas las funcionalidades y estados globales de la web para que sean utilizados por cualquier componente.


## BACKEND ##

### __controllers__: Contiene los controladores del backend donde se ejecutan funciones de requerimientos y respuestas con la base de datos.

### __libs__: Contiene las credenciales de la api cloudinary para subir las imagenes a una carpeta del servicio.

### __models__: Configuracion del esquema de la base de datos.

### __routes__: Configuracion de las rutas con las peticiones http de la web.

### __config.js__: Instancia las variables de entorno.

### __database.js__: Funcion con la configuracion para la conexion a la base de datos.

### __index.js__: Configuracion necesaria del servidor para su correcto funcionamiento e iniciacion de este.

### __.env__: Contiene los datos de las variables de entorno.