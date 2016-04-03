# Radix Styleguide Example

This is a demo theme for the Radix Styleguide Builder.

The Radix Styleguide Builder is bundled inside the Radix theme (dev version). It is built using Markdown and Gulp.

The styleguide tree is built using the styleguide tree in `config.json`.

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

## Installation
1. Clone this repository to your Drupal themes directory: `$ git clone https://github.com/arshad/radix_styleguide_example.git`.
2. Install npm and bower dependencies: `$ cd radix_styleguide_example && npm run setup`.
3. Run Gulp to generate and serve your styleguide: `$ gulp styleguide`.
4. You can now preview your styleguide at `http://localhost:3001`.

Gulp will automatically detect changes from your theme Sass and load it into your styleguide.

## Editing the styleguide.
The Markdown files for the styleguide is located at `radix_styleguide_example/styleguide/src`. You can edit these files and Gulp will detect changes, build the styleguide and reload your browser.

## Adding new files to the styleguide
1. Create your Markdown file under `radix_styleguide_example/styleguide/src`.
2. Add it to `config.json` under styleguide.
3. Stop Gulp and run `$ gulp styleguide` again.

## Theming the Styleguide
1. Edit the template file at `radix_styleguide_example/styleguide/templates/index.html`.
2. Stop Gulp and run `$ gulp styleguide` again.
3. You can change the CSS for the Styleguide at `radix_styleguide_example/assets/scss/components/_styleguide.scss`
