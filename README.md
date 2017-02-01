# schwarzly

Install Node.js Components :
npm install <Root Folder> --save

Link to iOS and Android :
react-native link


Copy Android Bundle and assets before creating an APK :

react-native bundle --assets-dest ./android/app/src/main/res/ --entry-file ./index.android.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --dev false

Copy iOS bundle before creating an IPA :

react-native bundle --dev false --entry-file index.ios.js --bundle-output ios/main.jsbundle --platform ios


