❖══════════《 ✮ 》═══════════ •『 **FOLDERS RULES** 』• ═══════════《 ✮ 》═════════❖

- Cada pagina va a tener su carpeta donde va a existir la carpeta `'components'` y `'page'`.
- Cada componente y pagina tiene su propia carpeta donde va a estar el archivo `.js` y `.css` (si tiene)
- En `'/assets'` se van a encontrar imagenes, archivos `.css` globales y las tipografias utilizadas
- En `'src/components'` se van a encontrar solo los componentes que se utilizan usualmente en el sitio web
- En `'pageName/components'` se van a encontrar los componentes que unicamente son utilizados en esa pagina
- En `'/functions'` se van a entoncontrar funciones puras siempre que sea posible ()
- En caso de querer guardar datos o .json se deberia crear la carpeta `'/data'` directamente en `'/src'`

❖══════════《 ✮ 》═══════════ •『 **CSS RULES** 』• ═══════════《 ✮ 》═════════❖

- Para que cada pagina tenga su archivo unico `.css` sin modificar al resto del sitio web se debe hacer lo siguiente:
- - Todos los archivos `.css` se les debe agregar la extension `.module.` Quedarian asi **=>** fileName.module.css
- - Los import realizados en los archivos `.js` quedarian de la siguiente manera **=>** import '*customName*' from './filename.css'
- - Todos los `'className="className"'` y `'id="idName"'` deberan ser cambiados asi **=>** className={customName.className} o id={customName.idName}

❖══════════《 ✮ 》═══════════ •『 **COMMIT RULES** 』• ═══════════《 ✮ 》═════════❖

- No solucionar o hacer varias cosas en un mismo 'commit' sino, realizarlas en 2 'commit' con distinto message
- Todos los 'commits' realizados se van a realizar de la siguiente manera:
- - <*type*>: <*description*>
- - - <*type*> = El tipo de cambio que se realiza en el 'commit'
- - - - feat   ----->   Cuando se incorpora una nueva feature
- - - - fix    ----->   Cuando se soluciona un error (aclarar el error)
- - - - style  ----->   Cuando se modifica la parte estetica o visual del codigo
- - - <*description*> = Breve y concisa descripcion de lo que se realizo en el codigo
