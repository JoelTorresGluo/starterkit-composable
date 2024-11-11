# Contentful-CLI App for composable

Simple CLI application using [`ts-node`](https://typestrong.org/ts-node/).

To start with the project Run:

```
pnpm install
```

Then you will have contentful-cli installed in the project node_modules.
To run the cli without installing it globally you can run:

```
npx contenful <options>
```

Remember to setup your `.env.local` with the appropriate management token, space id and environment id if you need.

To create your own management token go to [this page](https://app.contentful.com/spaces/hq3wnkrjh1cr/api/cma_tokens).
Remember that you can see your token once, so copy it and save it into 1password for further usage.

## Sample commands

Yo will find some commands in the package.json files. Here's what are they for:

#### List spaces
```
"list-spaces": "env-cmd -x -f ./.env.local contentful space list --management-token \\$MANAGEMENT_TOKEN",
```
with a management token setup you can list all the spaces available into your organization. You don't need to add any extra param here.

#### List environments

```
"list-environments": "env-cmd -x -f ./.env.local contentful space environment list --space-id \\$SPACE_ID --management-token \\$MANAGEMENT_TOKEN",
```

Here with a given space id, you can list all the environments into the space.

#### Create a space
```
"create-space": "env-cmd -x -f ./.env.local contentful space create --management-token \\$MANAGEMENT_TOKEN",
```
:warning: With this you can create a Space but be careful **you may generate extra charges into the account**, validate with it@orium.com before you proceed.
To use this script you need to pass some extra params, otherwise you will get an error.

```
pnpm run create-space --name "[NEW SPACE NAME]"
```
you should include the quotes, since you can add spaces.

#### Create environment

```
 "create-environment": "env-cmd -x -f ./.env.local contentful space environment create --space-id \\$SPACE_ID --management-token \\$MANAGEMENT_TOKEN",
```
With this script you can create an environment, useful to migrate content and not flood the master one with unwanted content.
You need to provide an environment name and an environment id (usually the same as the name and also unique to the space):

```
pnpm run create-environment --name composable-playground --environment-id [environment-id]
```

#### Exporting a space 
There are 3 script for exporting a space, Full, Content Model and Content only. You can only export an environment at a time, not all the environments of the sapce

```
"export-full": "env-cmd -x -f ./.env.local contentful space export --save-file --space-id \\$SPACE_ID --management-token \\$MANAGEMENT_TOKEN" ,
"export-content-model": "env-cmd -x -f ./.env.local contentful space export --skip-content --save-file --space-id \\$SPACE_ID --management-token \\$MANAGEMENT_TOKEN" ,
"export-content": "env-cmd -x -f ./.env.local contentful space export --content-only --save-file --space-id \\$SPACE_ID --management-token \\$MANAGEMENT_TOKEN" ,
```
`export-full` will export the content model, the content entries, the assets and roles.

`export-content-model` will export only the content model, the structure to start adding entries.

`export-content` will export only the content, if you want to fill an environment with sample content.

You don't need to add any parameter to these command, but if you want to customize the export file name you can add
`-- --conten-file [EXPORT_FILE_NAME].json` if you want to use a different folder you can, but it should exist.

#### Importing a space
This is to populate a new space with a content model and/or content. I recomment to use a new environment to do this, so will be easily undone.

```
"import-full": "env-cmd -x -f ./.env.local contentful space import --space-id \\$SPACE_ID --environment-id \\$ENVIRONMENT_ID --management-token \\$MANAGEMENT_TOKEN",
"import-content-model": "env-cmd -x -f ./.env.local contentful space import --content-model-only --space-id \\$SPACE_ID --environment-id \\$ENVIRONMENT_ID --management-token \\$MANAGEMENT_TOKEN",
"import-content": "env-cmd -x -f ./.env.local contentful space import --skip-content-model --space-id \\$SPACE_ID --environment-id \\$ENVIRONMENT_ID --management-token \\$MANAGEMENT_TOKEN"
```

`import-full` will import the content model, the content entries, the assets and roles.

`import-content-model` will import only the content model, the structure to start adding entries

`import-content` will import only the content, if you want to fill an environment with sample content.

For more detailes information to import/export content visit [this page](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/)

To run these commands you need to specify the path to the json file with the data `-- --content-file [PATH/TO/FILENAME.json]`.
