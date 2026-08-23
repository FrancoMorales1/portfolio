---
title: "De 250 a 0 caracteres: mi historia con Pydle"
date: "2026-08-23"
excerpt: "Un juego de acertijos en Python me llevó por el camino clásico del code golf... y después por uno bastante menos clásico: hackear el propio intérprete."
---

Hace poco descubrí [Pydle](https://pydle.net), un juego de acertijos donde tenés que escribir código en Python para recrear un patrón de colores en una grilla de 5×5, usando una única función: `pydle(x, y, icono, color)`.

La regla es simple: cada acertijo tiene un límite de **250 caracteres**. Yo me puse una regla propia, mucho más entretenida: llegar a cada patrón con la menor cantidad de caracteres posible. Esto es el recorrido completo, de lo prolijo a lo absurdo.

## Primeros patrones: aprendiendo el terreno

Al principio, cada acertijo era una excusa para probar una herramienta distinta del lenguaje. Nada de golf todavía, solo entender qué forma de escribir Python se llevaba mejor con este tipo de problema.

Bucles anidados con `match` para separar filas:

```python
b = "brown"
r = "red"
for x in range(5):
    for y in range(5):
        c = "purple"
        match x:
            case 0:
                if y == 1 or y == 4: c = "white"
            case 1:
                if y > 2: c = r
            case 2:
                if y > 0: c = r
            case 3:
                if y == 0: c = b
                else: c = r
            case 4:
                c = b
        pydle(x, y, "", c)
```

Condicionales para bordes, esquinas y centros:

```python
for x in range(5):
    for y in range(5):
        if (x == 0 and y == 0) or (x == 4 and y == 0) or (x == 0 and y == 4) or (x == 4 and y == 4):
            c = "blue"
        elif x == 0 or x == 4 or y == 0 or y == 4:
            c = "orange"
        elif (x == 1 and y == 1) or (x == 1 and y == 3) or (x == 3 and y == 1) or (x == 3 and y == 3):
            c = "yellow"
        else:
            c = "black"
        pydle(x, y, "", c)
```

Cuadrantes generales con excepciones puntuales encima:

```python
for x in range(5):
    for y in range(5):
        if x > 2 and y <= 2:
            color = "purple"
        elif x < 2 and y >= 2:
            color = "yellow"
        elif y > 2:
            color = "green"
        elif y < 2:
            color = "blue"
        pydle(x, y, "", color)

pydle(2, 1, "", "red")
pydle(2, 2, "", "red")
pydle(2, 3, "", "red")
pydle(1, 2, "", "red")
pydle(3, 2, "", "red")
```

Y funciones auxiliares devolviendo íconos, combinando color y glifo en la misma celda:

```python
def t(x):
    match x:
        case 1: r = "◁"
        case 2: r = "△"
        case 3: r = "▷"
        case _: r = ""
    return r

g = "green"
a = "blue"
b = "black"
for x in range(5):
    for y in range(5):
        i = ""
        if x == 0:
            c = a
            i = t(y)
        elif x == 1:
            c = g
            i = t(y - 1)
        elif x == 3:
            c = b
            i = "."
        else:
            c = g
        pydle(x, y, i, c)

pydle(3, 2, "△", b)
pydle(1, 0, "▽", a)
```

Funcional, legible, y completamente alejado de los 250 caracteres. El código real empezó cuando decidí dejar de escribir para mí y empezar a escribir para el contador de caracteres.

## El desafío de los 250

Con un acertijo puntual entre manos, empecé a iterar sobre la misma idea: dejar de describir el patrón celda por celda y empezar a *codificarlo*.

**Paso 1 — arrays y cadenas.** En vez de nombrar colores, los mapeé a un vector y representé la grilla completa como una cadena de dígitos, uno por celda:

```python
v = ["black", "green", "white", "blue", "yellow", "orange"]
s = "0123324332243222253322232"

for i, char in enumerate(s):
    pydle(i % 5, i // 5, "", v[int(char)])
```

25 celdas, 25 dígitos, un solo bucle. Ya no había lógica que mantener, solo datos que transcribir.

**Paso 2 — compresión numérica.** El siguiente paso fue preguntarme por qué seguía gastando caracteres en representar cada dígito como texto, si en el fondo era información con muy poca entropía: apenas 3 colores posibles por celda. Empaqueté las 25 celdas en un único número en base 3 y las fui extrayendo con módulo y potencias sobre la marcha:

```python
for i in range(25): pydle(i % 5, i // 5, "", ("red", "white", "green")[31519147990 // 3**i % 3])
```

Una sola línea. Un entero gigante haciendo de estructura de datos. En ese punto ya no estaba resolviendo el acertijo, estaba comprimiéndolo.

## Cuando dejé de resolver el acertijo y empecé a resolver el intérprete

Después de la compresión a nivel de bits quería llevar el límite todavía más lejos, y ahí noté algo: el script se ejecutaba de forma demasiado fluida en el navegador para estar viajando a un servidor. Eso significaba que el intérprete de Python corría **localmente**, en el cliente.

Si el intérprete vive en mi navegador, ¿por qué limitarme a escribirle instrucciones? ¿Y si en cambio modificaba el entorno de ejecución para que resolviera el acertijo de forma implícita?

Primero, un script de consola para leer el estado actual de la grilla directamente del DOM: colores por clase CSS, contenido de cada celda:

```javascript
(() => {
  const PAL = ["white","black","red","green","blue","yellow","orange","brown","purple"];
  const grid = document.querySelector(".columns-2").children[1];
  const cells = [...grid.children].flatMap(r => [...r.children]);
  const vals = [], cols = [], raros = new Set();

  for (const c of cells) {
    const cls = c.className.match(/(?:^|\s)bg-([a-z]+(?:-\d+)?)/)?.[1] ?? "black";
    let name = cls.replace(/-\d+$/, "");
    if (name === "amber") name = "brown";
    if (!PAL.includes(name)) { raros.add(cls); name = "black"; }
    cols.push(PAL.indexOf(name));
    vals.push(c.textContent.trim());
  }

  const n = s => s.replace(/\s/g, "").length;
  const A = String.fromCharCode(42);
  const HOOK = [
    "import io,sys",
    `def H(${A}a,_O=io.StringIO,${A}${A}k):`,
    "    try:",
    '        w=sys._getframe(1).f_locals["self"]',
    '        v=io.PV.split("|")',
    "        for i in range(25):w.pydle(i%5,i//5,v[i],io.PL[int(io.PC[i])])",
    "    except:pass",
    `    return _O(${A}a,${A}${A}k)`,
    "io.StringIO=H",
  ].join("\n");

  const runs = [
    `import io;io.PV=${JSON.stringify(vals.join("|"))}`,
    `import io;io.PC="${cols.join("")}"`,
    `import io;io.PL="${PAL.join(" ")}".split()`,
    HOOK,
  ];

  if (raros.size) console.warn("Colores no reconocidos:", [...raros]);
  runs.forEach((p, i) => console.log(`%c--- RUN ${i + 1} (${n(p)}/250) ---`, "font-weight:bold", "\n" + p));
})();
```

La pieza importante es el `HOOK`. En vez de tocar `pydle()` directamente, parcheo `io.StringIO`, una clase interna del intérprete que el propio motor del juego usa cada vez que ejecuta el script del jugador para capturar la salida estándar. Como esa llamada ocurre **siempre**, incluso con el editor completamente vacío, mi versión parchada se ejecuta antes de que el motor haga nada:

1. Sube un frame en el stack con `sys._getframe(1)` y agarra la instancia `self` del motor del juego desde sus variables locales.
2. Reconstruye los valores originales de la grilla (los que leí por JS) desde variables globales que dejé colgadas en el propio módulo `io`.
3. Llama directamente a `w.pydle(...)` para cada una de las 25 celdas, dibujando el patrón desde *afuera* de cualquier lógica que yo hubiera escrito.
4. Devuelve un `StringIO` normal para no romper nada más del motor.

El resultado: un editor vacío, **0 caracteres**, patrón resuelto. Por supuesto, esto no es una solución "real" al acertijo — es un ejercicio de curiosidad sobre cómo vive el intérprete dentro del navegador y qué tan lejos se puede llegar si en vez de jugar el juego, se juega con el motor que lo corre.

## Cierre

Lo que más me gustó de este recorrido no fue llegar a 0 caracteres, fue el camino: cada etapa obligó a pensar el problema con una herramienta distinta — control de flujo, estructuras de datos, teoría de la información, y finalmente introspección del propio runtime (`sys._getframe`, monkeypatching sobre `io`). Ese último salto, de resolver el problema a entender la máquina que lo evalúa, es básicamente el mismo instinto que me llevó a meterme con smart contracts y con todo lo que tenga una capa de "reglas" para explorar por debajo.
