# movie-api

Ionic App for gastromatic movie test

## Run in Browser

Have the movie-test-api server running at the usual `localhost:3000`. Then:

```
npm ci
ionic serve
```

Test running server by accessing `http://localhost:8100/login`

## Run on Android (Emulator)

Android Studio needs to be installed to run this configuration.

First go into `src/constants/config.ts` and change the `HOST` constant from `localhost` to `10.0.2.2`.
Save changes and execute the following commands: 

```
npm ci
ionic capacitor add android
ionic capacitor run android
```

This will open Android Studio. 
Depending on your emulated Android Version you will have to execute the followin step to allow communication without HTTPS:

Go into the `App/manifests` folder and add the following line to the `AndroidManifests.xml` file in the `application` section:
```
android:usesCleartextTraffic="true"
```

Run the app on your emulated device via Android Studio!

## Run on iOS

Currently there is no tested configuration to run the project on iOS.


<div>Icons erstellt von <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/de/" title="Flaticon">www.flaticon.com</a></div>
