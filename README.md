# Assistance Navigation Maritime

Node : 14.16.1  
NPM : 6.14.12

## Pour lancer l'application en dev

1. Installation de tous les paquets  
`npm install`

2. Lancement de l'application electron  
`cordova run electron --nobuild`

## Pour build l'application (Windows, Linux, MacOS, Android)

`cordova build`

> La configuration du build se fait dans le fichier `build.json`

### Android

L'APK de l'application se situe dans `/platforms/android/app/build/outputs/apk/debug/app-debug.apk`.

### Windows, Linux, MacOS

Les exécutable se situe dans `/platforms/electron/build/*`
