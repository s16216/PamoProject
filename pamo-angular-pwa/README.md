# PamoAngularPwa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

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


-----------------------------------------

# PamoAndroidPwaApp

This project sets up a new Ionic Angular application with Capacitor, builds it for production, and prepares it for Android development.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed [Node.js](https://nodejs.org/)
* You have installed [Ionic CLI](https://ionicframework.com/docs/cli)
* You have installed [Capacitor CLI](https://capacitorjs.com/docs/getting-started)
* You have [Android Studio](https://developer.android.com/studio) installed and configured (Optional: see note below)

## Setup Instructions

Follow these steps to set up the project:

1. **Build the Angular project for production:**
    ```bash
    ng build --configuration production
    ```

2. **Create a new Ionic project with Capacitor:**
    ```bash
    ionic start PamoAndroidPwaApp tabs --type=angular --capacitor
    ```

3. **Copy production files to the `www` directory:**
    ```powershell
    .\copy_prod_files_to_www.ps1
    ```

4. **Navigate to the newly created project directory:**
    ```bash
    cd PamoAndroidPwaApp
    ```

5. **Install necessary npm packages:**
    ```bash
    npm install @ionic/pwa-elements
    npm install @capacitor/android
    ```

6. **Sync the project with Capacitor and prepare for Android:**
    ```bash
    npx cap sync android
    ```

7. **Open the project in Android Studio:**
    ```bash
    npx cap open android
    ```

8. ***Optional Configuration:
If you encounter issues with opening the project in Android Studio, you can set the `CAPACITOR_ANDROID_STUDIO_PATH` environment variable to the path of your `studio64.exe` file:**
    ```bash
    setx CAPACITOR_ANDROID_STUDIO_PATH "YourPathTo\Android Studio\bin\studio64.exe"
    ```

## Documentation

Follow these steps to run documentation 
```bash
 npm run docs
