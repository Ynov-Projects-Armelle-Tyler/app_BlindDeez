<div align="center">

![](https://cdn.discordapp.com/attachments/922178998916767826/935951081228337182/unknown.png)

# BlindDeez - Mobile App

<br />
<p>React Native Application ✨</p>
</div>

## Installation
### Pre-requisites
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) or [npm](https://nodejs.org/en/download/)
- [Android studio](https://developer.android.com/studio/install)
- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) *(for mac users)*

### Install dependencies
check that you are in `~/<repos>`
```bash
#node modules

$ yarn
or
$ npm install
```
check that you are in `~/<repos>/ios`
```bash
#for mac users

$ pod install
```

## Start & Run
You can run the app with your own phone connected by cable or run with emulator.

Run Metro bundler in a first terminal *(let him opened)*
```bash
$ yarn start
```

in other terminal *(you can close him)*
```bash
$ yarn android
or
$ yarn ios
```

## Tools
### `yarn lint`
Run Linter to check the cleanliness of your code

Example:
```bash
$ yarn lint
```

### `yarn test`
Run all the tests you wrote

Example:
```bash
$ yarn test
```
