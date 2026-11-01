# AFK Bot Panel for Android

This Android app puts the existing AFK Bot Panel web interface inside an installable Android application. It preserves the panel served by the Node.js backend, including its Socket.IO controls and live viewer.

## Important architecture note

The APK is the Android client. The Minecraft bot engine (Mineflayer), viewer server, and Socket.IO backend still run on a Node.js host. The app asks for that server's HTTP or HTTPS address the first time it opens. It does not run Mineflayer inside Android.

The backend must be reachable from the phone and must be running a current version of this repository. Use HTTPS for a public server and set a strong `PASSWORD` environment variable on the backend.

## Build

The GitHub Actions workflow `.github/workflows/android-apk.yml` builds a debug APK whenever Android project files change and uploads it as the `afk-bot-panel-debug-apk` workflow artifact.

For a local build, use Android SDK platform 35, JDK 17, and Gradle 8.9:

```sh
cd android
gradle --no-daemon :app:assembleDebug
```

The output is `android/app/build/outputs/apk/debug/app-debug.apk`.
