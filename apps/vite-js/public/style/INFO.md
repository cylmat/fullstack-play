
# info

STRUCTURE
    align-items, justify-content, place-items
        fonctionnent avec les conteneurs Flexbox et Grid.
    text-align
        aligne le contenu inline (texte, liens, images inline), pas les blocs.

SIZING
    width: fit-content;

FONT
    em: relative to the font-size of the element (2em means 2 times the size of the current font).

## structure
  /*
    BODY (GRID = structure)
  ├── HEADER (full width, text-align center)
  └── MAIN (contains centered container)
          └── .container (controls width + layout)
  */

## default width

- block elements (div, header, main) take the full width of their parent container by default (width: auto).
- inline elements (span, a, img) take only the width of their content by default (width: fit-content).
    * cannot set width/height (ignored).
- inline-block elements (button, input) take only the width of their content by default (width: fit-content).
    * you can set width manually.
- flex items (direct children of a flex container) take only the width of their content by default (width: fit-content).
    * flex: 0 1 auto (width depends on content, does NOT stretch automatically)
- grid items (direct children of a grid container) take only the width of their content by default (width: fit-content).
    * justify-self: stretch, align-self: stretch
- table cells (td, th) take only the width of their content by default (width: fit-content).
- replaced elements (input, textarea, select) take only the width of their content by default (width: fit-content).
