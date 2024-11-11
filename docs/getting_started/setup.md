---
sidebar_position: 2
---

# Installing Orium's Accelerator

## Pre-Requisites

Ensure that you have:

* Installed Node.js v20.16.0 or higher on the local development machine. For checking the current version on your machine, run following command:
  `node -v`
  For changing the Node.js version, follow the instructions in the [nvm documentation](https://github.com/nvm-sh/nvm).
* Installed `pnpm` v8.3.1. For checking the current version on your machine, run the following command:

  ```shell
    pnpm --version
  ```

  If the current version is older than 8.0, run the following command:   

  ```shell
     npm uninstall pnpm -g
     npm install -g pnpm
  ```
  For installing pnpm, run the following command:

  ```shell
    npm install -g pnpm
  ```

* GitHub Access (SSH) and local development utilities.
* Installed code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

## Procedure

1. Clone the source repository to your local development environment.
1. Follow the instructions in the README file located at the root of the source repository.

## Enabling Theme Typing and Autocomplete

You can improve your developer experience by enabling automatic theme typing and autocomplete with your custom theme.

1. To enable automatic theme typing and autocomplete with your custom theme, run the following command:

  ```shell
  cd packages/chakra
  pnpm install
  pnpm theme
  ```

  :::caution
  When you use @next/font in Chakra UI theme configuration, you must manually configure the use of the `@next/font` assets in the `packages/ui/src/chakra/theme/foundations/typography.ts` file to successfully run the `pnpm theme` command. For instructions, see the `typography.ts` file.
  :::

1. **(Optional)** To watch the theme file and auto-regenerate, run the following command:

  ```shell
  pnpm theme:watch
  ```

1. Restart the Typescript Server in Visual Studio Code and do the following:
   1. Press `Command + Shift + P` and view a TS file.
   1. From the drop-down menu, select `Typescript: Restart TS server`.

## Recommended Visual Studio Code Extensions

The following Visual Code Extensions are recommended to improve the developer experience.

| Extension Name | Extension ID | Description |
| ------------ | -------------- | ----------- |
| Markdown All in One | `yzhang.markdown-all-in-one` | Provides markdown shortcuts, including table of content generator.|
| ES7+ React/Redux/React-Native Snippets | `dsznajder.es7-react-js-snippets` | Provides a [snippet generator](https://github.com/ults-io/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md) for common React code.|
| Prettier - Code formatter | `esbenp.prettier-vscode` | Provides a code formatter. |
| Code Spell Checker | `streetsidesoftware.code-spell-checker` | Provides basic spell check. |
| Color Highlight | `naumovs.color-highlight` | Highlights web colours in your code.|
| Git History | `donjayamanne.githistory `| Displays git log, file history, branch comparison, or commits. |
| GraphQL: Language Feature Support | `GraphQL.vscode-graphql` | Improves GraphQL developer experience. |
| markdownlint | `DavidAnson.vscode-markdownlint` | Provides Markdown linting and style checking. |
| Jest | ` Orta.vscode-jest `| Supports full jest features to make testing more intuitive. |
| Test Adapter Converter | `ms-vscode.test-adapter-converter` | Converts Test Explorer UI API into native VS code testing. |
| TODO Highlight | `wayou.vscode-todo-highlight` |Highlights TODO, FIXME ,and other annotations within your code. |

You can automate the installation of these extensions by creating a `.vscode/extensions.json` file with the following contents:

```json
{
    "recommendations": [
        "yzhang.markdown-all-in-one",
        "dsznajder.es7-react-js-snippets",
        "esbenp.prettier-vscode",
        "streetsidesoftware.code-spell-checker",
        "naumovs.color-highlight",
        "donjayamanne.githistory",
        "GraphQL.vscode-graphql",
        "DavidAnson.vscode-markdownlint",
        "Orta.vscode-jest",
        "ms-vscode.test-adapter-converter",
        "wayou.vscode-todo-highlight"
    ]
}
```
