# README #

This project aims to make the log more readable and easier to parse. The app makes two API calls and then displays the data on the screen. The user can select a subset of the logs, type of error (data vs timing), and group by customer name. Each row has a button binding that can "export" data.

### Structure,Install,Run ###
The application is seperated into two folders, angular-app and server. In the server file, you need to create an .env file and add your AWS credentials.

For the Express server...

```
npm install
npm run serve
```
Note: Express is running in port 8080

For the Angular app...
```
npm install
npm start
```
Note: Angualr is running on port 4200

__Note: Both folders must be running at the same time for the application to work.__

### Example of the App ###

![This is a alt text.](./sample_app.png "This is a sample image.")

# AngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
