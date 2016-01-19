# gulp-cordova-preference [![Build Status](https://travis-ci.org/SamVerschueren/gulp-cordova-preference.svg?branch=master)](https://travis-ci.org/SamVerschueren/gulp-cordova-preference)

> Set a preference of your cordova project

## Installation

```bash
npm install --save-dev gulp-cordova-preference
```
## Usage

This plugin can be used in two different ways. The first way is by passing an object with key-value pairs
as parameter. The key will be used as name of the preference, the value will be used as value.

```javascript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    pref = require('gulp-cordova-preference');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(pref({
            'AndroidLaunchMode': 'singleTop',
            'ShowTitle': true
        });
});
```

> Tip: You can add the preferences in a file called `prefs.json` and call the plugin with `pref(require('./prefs.json'))`.

The second way is by providing two parameters, the first one being the name of the preference, the second
one as the value of the preference.

```javascript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    pref = require('gulp-cordova-preference');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(pref('AndroidLaunchMode', 'singleTop'))
        .pipe(pref('ShowTitle', true));
});
```

If a preference with the name `ShowTitle` or `AndroidLaunchMode` already exists, it will overwrite the old value
with the new value.

Notice that the second way of adding preferences to your config file is slower because it has to parse the XML file
every time the plugin is executed. If you pass in an object with key-value pairs, it will only parse the config file
once.

## API

### preference(prefs [, platform])

#### prefs

*Required*  
Type: `object`

A key-value pair object where the key is the name of the preference and the value the value.

#### platform

Type: `string`

The name of the platform that these preferences are specific to. The preferences will be put under the corresponding platform tag in the XML.

### preference(name, value [, platform])

##### name

*Required*  
Type: `string`

The name of the preference.

##### value

*Required*  
Type: `string`

The value of the preference.

#### platform

Type: `string`

The name of the platform that this preference is specific to. The preference will be put under the corresponding platform tag in the XML.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Author

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
