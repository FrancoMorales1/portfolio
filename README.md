# CV — Franco Morales

Sitio web que es directamente mi CV, en español (`/es`) e inglés (`/en`), con modo claro/oscuro
y descarga del PDF. `/` redirige según el idioma del navegador.

## Estructura

- `src/data/cv.ts` — **fuente única** del contenido (ambos idiomas). Web, PDF y test salen de acá.
- `src/components/cv/CurriculumVitae.tsx` — la página. En pantalla, dos columnas; en impresión,
  una sola columna en orden de lectura ATS.
- `public/cv/Franco-Morales-CV-{ES,EN}.pdf` — PDFs descargables, generados desde la propia página.
- `tests/ats-score.test.ts` + `tests/ats/` — test de score ATS (ver abajo).
- `src/fonts/` — Geist (OFL) en instancias estáticas: la versión variable se embebe en el PDF como
  Type3 y rompe la extracción de texto.

## Comandos

```bash
npm run dev        # desarrollo
npm run build      # build de producción
npm test           # score ATS de los PDFs (falla si < 70/100 o si el PDF está desactualizado)
npm run cv:pdf     # build + regenera los PDFs (requiere Chromium de Playwright)
npm run ats -- <archivo.pdf> [es|en]   # score de cualquier PDF contra los avisos de referencia
```

Después de editar `src/data/cv.ts`, corré `npm run cv:pdf` y commiteá los PDFs; el test lo verifica.
El teléfono solo aparece en el PDF: el script lo inyecta antes de imprimir, no está en el HTML.

## Test de score ATS

No existe un "score" oficial de Workday/Greenhouse/Lever; lo que hay son (a) parsers que convierten
el PDF a texto y (b) matching de keywords/título contra el aviso, con capas semánticas en los más
nuevos. El test reproduce de forma determinística lo que miden los checkers públicos (Jobscan,
Resume Worded) sobre el **texto extraído del PDF**, contra los avisos de `tests/ats/job-descriptions/`:

| Categoría | Peso | Qué mide |
|---|---|---|
| Parseo y formato | 25 | texto extraíble, 1 página, contacto, encabezados estándar, sin fuentes Type3, sin íconos ni palabras pegadas |
| Hard skills | 35 | % de keywords técnicas del aviso presentes (Jobscan recomienda ≥ 75 %) |
| Título del puesto | 10 | título del aviso literal en el CV |
| Soft skills | 5 | habilidades blandas del aviso |
| Redacción | 15 | verbos de acción, sin verbos débiles/pronombres/clichés, largo de bullets y resumen, fechas consistentes |
| Impacto | 10 | % de bullets con números/métricas |

Para evaluar el CV contra un aviso real, agregá un `.txt` en `tests/ats/job-descriptions/`
(prefijo `es-` o `en-`, primera línea `Title:`/`Título:`).

Fuentes: [Jobscan](https://jobscan.co/jobscan-tutorial),
[Resume Worded](https://resumeworded.com/score-guide),
[ATS parsing benchmark](https://atsverification.com/blog/ats-parsing-benchmark-2026/),
[columnas y ATS](https://recruitbpm.com/?p=20244).
