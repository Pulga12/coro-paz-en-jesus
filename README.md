# Coro Paz en Jesús - Version 3.4

Aplicacion web instalable para celular y laptop.

Esta version viene en blanco para canciones, miembros, lecturas y eventos manuales.

Todo se agrega desde `Administrador`.

## Pantalla de carga y actualizacion

La app muestra el logo con `Cargando...` durante 10 segundos cuando abre y cuando detecta una actualizacion.

Durante la carga hace tareas reales: borra cache anterior, carga datos, revisa la version publicada y prepara la pantalla.

La app revisa cambios automaticamente cada 1 minuto, asi queda por debajo de 3 minutos despues de que GitHub Pages termine de publicar.

## Administrador

El apartado `Admin` abre directo.

No tiene clave. Solo quien tenga el enlace y sepa administrar debe hacer cambios.

## Como editar datos

1. Abre la app.
2. Entra a `Admin`.
3. Agrega o edita canciones, lecturas y salmos, eventos o miembros.
4. En `Ajustes`, presiona `Descargar app-data.json`.
5. Sube ese archivo a GitHub dentro de la carpeta `data`.

## Como agregar desde el celular

1. Abre la app instalada o el enlace de GitHub Pages.
2. Entra a `Admin`.
3. Elige la seccion que quieres editar.
4. Escribe la informacion.
5. Presiona `Agregar` o `Guardar cambios`.
6. Cuando termines, entra a `Ajustes`.
7. Presiona `Descargar app-data.json`.
8. Ese archivo queda descargado en el celular.
9. Para que todos vean los cambios, sube ese `app-data.json` a GitHub en la carpeta `data`.

## Avisos de eventos

La app usa la fecha del celular o laptop. Si hay eventos de hoy sin leer, el boton `Avisos` muestra un contador.

Al tocar `Avisos`, aparece la lista de eventos del dia y el contador desaparece porque queda marcado como leido en ese dispositivo.

## Eventos fijos

La app muestra automaticamente:

- Ensayo general: sabados desde las 4:00 p. m. hasta aproximadamente 7:30-8:30 p. m.
- Misa dominical: domingos desde las 6:30 p. m. hasta aproximadamente 8:30-9:00 p. m.

Tambien puedes agregar mas eventos desde `Admin > Eventos`.

## Como subir la app a GitHub

1. Abre el repositorio en GitHub.
2. Entra a `Code`.
3. Presiona `Add file`.
4. Presiona `Upload files`.
5. Arrastra todos los archivos que estan dentro de esta carpeta:
   `C:\Users\carri\Desktop\app del coro`
6. No subas la carpeta completa; sube los archivos de adentro.
7. Presiona `Commit changes`.
8. Espera 1 a 3 minutos.
9. Abre la pagina de GitHub Pages.

## Como publicar cambios futuros

Cuando ya tengas datos agregados desde la app:

1. Entra a `Admin`.
2. Edita lo que necesites.
3. Entra a `Ajustes`.
4. Descarga `app-data.json`.
5. En GitHub abre la carpeta `data`.
6. Abre o reemplaza `app-data.json`.
7. Presiona `Commit changes`.
8. Espera 1 a 3 minutos.
9. En el celular, cierra y abre la app otra vez. La app tambien revisa cambios cada 1 minuto.

## Nota para celular

La primera vez puede demorarse un poco porque el celular guarda la app para usarla sin internet. Despues de la primera carga normalmente abre mas rapido.

Si la app instalada se queda en una version vieja, abre la web, actualiza, cierra la app instalada y vuelve a abrirla. Si sigue vieja, desinstala la app instalada y vuelve a instalarla desde Chrome.
