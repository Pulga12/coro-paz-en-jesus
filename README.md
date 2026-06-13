# Coro Paz en Jesús - Version 3.9.0

Aplicacion web instalable para celular y laptop del Coro Paz en Jesús.

## Que trae esta version

- Canciones conservadas, con numero, momento y estado para misa.
- Buscador de canciones por numero, nombre o momento de misa.
- Numero de cancion editable de 0 a 1000.
- Estado para misa: Permitida o No permitida.
- Domingo personal por celular con hasta 3 canciones por momento.
- Botones para compartir Mi Domingo por WhatsApp, copiar texto y descargar/imprimir PDF.
- Lecturas y Salmos por fecha.
- Calendario liturgico editable con Adviento, Cuaresma, Semana Santa, Pascua, Tiempo Ordinario, fiestas marianas y solemnidades.
- Miembros con tipo, cargo, grupo liturgico y estado.
- Modo oscuro con lectura revisada para letras, eventos, calendario y formularios.
- Calendario liturgico con colores por tiempo.

## Como editar datos

1. Abre la app.
2. Entra a `Admin`.
3. Agrega o edita canciones, lecturas, calendario, eventos o miembros.
4. En `Ajustes`, presiona `Descargar app-data.json`.
5. Sube ese archivo a GitHub dentro de la carpeta `data`.

## Como subir cambios a GitHub

1. Abre el repositorio en GitHub.
2. Entra a `Code`.
3. Presiona `Add file`.
4. Presiona `Upload files`.
5. Arrastra todos los archivos que estan dentro de `C:\Users\carri\Desktop\app del coro`.
6. No subas la carpeta completa; sube los archivos de adentro.
7. Presiona `Commit changes`.
8. Espera 1 a 3 minutos.
9. Abre la pagina de GitHub Pages o cierra y abre la app instalada.

## Pantalla de carga y actualizacion

La app muestra el logo con `Cargando...` durante 10 segundos. Durante ese tiempo borra cache anterior, carga datos, revisa la version publicada y prepara la pantalla.

La app revisa cambios automaticamente cada 1 minuto. Si GitHub Pages ya publico la version nueva, la app deberia actualizarse en menos de 3 minutos.

## Eventos fijos

La app muestra automaticamente:

- Ensayo general: sabados desde las 4:00 p. m. hasta aproximadamente 7:30-8:30 p. m.
- Misa dominical: domingos desde las 6:30 p. m. hasta aproximadamente 8:30-9:00 p. m.

Tambien puedes agregar mas eventos desde `Admin > Eventos`.

## Nota para celular

La primera vez puede demorarse un poco porque el celular guarda la app para usarla sin internet. Despues de la primera carga normalmente abre mas rapido.

Si la app instalada se queda en una version vieja, abre la web, actualiza, cierra la app instalada y vuelve a abrirla. Si sigue vieja, desinstala la app instalada y vuelve a instalarla desde Chrome.
