# Radix Styleguide Example

This is a demo theme for the Radix Styleguide Builder (not released yet). It is built using Markdown, Sass and Gulp.

## Demo

See http://www.arshad.io/radix_styleguide_example/styleguide/public/index.html.

## Installation
1. Clone this repository to your Drupal themes directory: `$ git clone https://github.com/arshad/radix_styleguide_example.git`.
2. Install npm and bower dependencies: `$ cd radix_styleguide_example && npm run setup`.
3. Run Gulp to generate and serve your styleguide: `$ gulp styleguide`.
4. You can now preview your styleguide at `http://localhost:3001`.

Gulp will automatically detect changes from the theme Sass and load it into the styleguide.

## Configuration

The styleguide tree is built using the styleguide config in `config.json`. You can use this to sort and organize the styleguide's sections.

See https://github.com/arshad/radix_styleguide_example/blob/master/config.json#L31.

```
"styleguide": {
    "path": "./styleguide",
    "src": [
      "./styleguide/**/*"
    ],
    "sections": [
      {
        "title" : "Base",
        "tree": [
          "base/colors",
          "base/typography"
        ]
      },
      {
        "title" : "Components",
        "tree": [
          "components/buttons",
          "components/form",
          "components/hero"
        ]
      },
      {
        "title": "Content Types",
        "tree": [
          "content/blog"
        ]
      }
    ]
  }
```

## Editing the styleguide.
The Markdown files for the styleguide is located at `radix_styleguide_example/styleguide/src`. You can edit these files and Gulp will detect changes, build the styleguide and reload your browser.

See https://github.com/arshad/radix_styleguide_example/tree/master/styleguide/src.

## Adding new files
1. Create your Markdown file under `radix_styleguide_example/styleguide/src`.
2. Add it to `config.json` under styleguide.
3. Stop Gulp and run `$ gulp styleguide` again.

## Theming the Styleguide
1. Edit the template file at `radix_styleguide_example/styleguide/templates/index.html`.
2. Stop Gulp and run `$ gulp styleguide` again.
3. You can change the CSS for the Styleguide at `radix_styleguide_example/assets/scss/components/_styleguide.scss`

See https://github.com/arshad/radix_styleguide_example/blob/master/styleguide/templates/index.html.

