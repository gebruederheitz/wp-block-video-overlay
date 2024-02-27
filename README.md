# WP Block: Video Overlay

_A Gutenberg block creating a video in a lightbox_

ES-module for a Gutenberg block allowing you to include videos in lightboxes
with the matching frontend initializer using Glide.js.

It's a PHP-rendered "dynamic block", so you'll also need to register the block,
provide a template and supply some basic data to the block via script translations
([see below](#data-supplied-by-the-backend)). To make this easier, you can use
the matching Composer package `gebruederheitz/wp-block-video-overlay`, which will
do most of the heavy lifting for you.

In order to achieve maximum GDPR compliance, the `plyr` CDN script used by Glide
needs to be replaced with your own local instance of the script.
You will also need to bundle this module in your own editor script.

## Installation

```shell
> npm i @gebruederheitz/wp-block-video-overlay
```

## Usage

### In the editor

```js
import VideoOverlay from '@gebruederheitz/wp-block-video-overlay';

VideoOverlay.register();
```

You may provide custom attributes, methods / components etc.:
```js
import {register, attributes} from '@gebruederheitz/wp-block-video-overlay';
import {MyIconComponent} from 'your/icon/components/path';

const customAttributes = {
    newAttr: {
        type: 'string',
        default: 'default value',
    },
    ...attributes,
};

const edit = ({attributes: {newAttr}}) => {
    return (
        <p>{newAttr}</p>
    );
};

register({
    attributes: customAttributes,
    edit,
    icon: <MyIconComponent />,
});

```

If you're only adding an attribute, you can simply add controls to the existing
Edit component:

```js
import { components } from 'wp';
import {register, attributes, edit as Edit} from '@gebruederheitz/wp-block-video-overlay';
import {MyIconComponent} from 'your/icon/components/path';

const { SelectControl } = components;

const customAttributes = {
    newAttr: {
        type: 'string',
        default: 'default value',
    },
    ...attributes,
};

const edit = (props) => {
    const { attributes: { newAttr }, setAttributes } = props;
    return (
        <Edit {...props}>
            <SelectControl 
                options={myAttributeSelectOptions} 
                value={newAttr}
                label={'My new attribute'}
                onChange={(newAttr) => {
                    setAttributes({ newAttr });
                }}
            />
        </Edit>
    );
};

register({
    attributes: customAttributes,
    edit,
    icon: <MyIconComponent />,
});
```

### On the frontend

```js
import {LightboxFactory} from './lightbox';

const lbf = new LightboxFactory();
// Create lightboxes for all links to image files
lbf.images();
// Initialize only the video overlay blocks provided in this module
lbf.videos();
// Do both of the above
lbf.all();
// Supply an additional selector
lbf.all('#my-lightbox');
lbf.all('[href$=".webp"]');
// Use a custom selector
lbf.create('.lightbox');
// Init from an element – this method respects the "cc_lang_pref" query parameter
// in the link's URL in order to enable caption loading on the video.
const myTrigger = document.querySelector('a[href^="https://youtu"]');
lbf.createFromElement(myTrigger);
// Use a custom configuration object for GLightbox
lbf.custom({
  /* GLightbox configuration object */
});
```


#### Avoiding the `plyr` script from CDN

In order to be on the safe side in terms of data protection you can avoid using
the instance of `plyr` that GLightbox loads from a CDN by default.

##### Install plyr 

``` shell
> npm i plyr
```

##### Provide URLs

Provide the URLs to the plyr script, stylesheet and icon to the LightboxFactory:

```js
const plyrOptions = {
    js: 'http://my.site/node_modules/plyr.js',  
    css: 'http://my.site/node_modules/plyr.css',
    config: {
        iconUrl: 'http://my.site/node_modules/plyr.css',     
    },          
};
const lbf = new LightboxFactory(plyrOptions);I
lbf.all();
```

You can also skip the customization by passing `false` to the constructor:

```js
const lbf = new LightboxFactory(false);I
```

This way, the default assets will be loaded from a CDN.


### Rendering the block's output

You will need to register the block on the backend and provide a template to 
render the output. The composer library `gebruederheitz/wp-block-video-overlay`
will take care of that for you.


### Data supplied by the backend

The block expects some data to be present on the global window object, which 
need to be supplied by the WP backend. Again, the composer library 
`gebruederheitz/wp-block-video-overlay` does that out of the box.

```js
window.editorData = {
    restCustomUrl: 'string', // REST API URL for the image Sideloader
    restApiNonce: 'string',  // The API nonce for request validation (CSRF/XSS)
    embedTypes: [], // An array of possible embed types when used with a consent management solution. Pass `null` to skip.
    ccLangPrefs: [], // An array of language codes for the consent management solution. Pass an empty array to skip.
}
```

### Styling

You may use and extend the default styles provided by this package in your 
(S)CSS:
```sass
// Your frontend SASS file

// Override the default variable values if you need to
$ghwp-vo-icon-class: icon-play-circle;
$ghwp-vo-icon-fg: #fff;
$ghwp-vo-icon-fill: currentColor;
$ghwp-vo-icon-size: 128px;
$ghwp-vo-icon-z-index: 10;
$ghwp-vo-vertical-margin: 1rem;

// Import the stylesheet
@use 'node_modules/@gebruederheitz/wp-block-video-overlay/scss/video-overlay';
```

```sass
// Your editor SASS file

// Override the default variable values if you need to
$ghwp-vo-bg-color: #ccc;
$ghwp-vo-max-width: 50%;
$ghwp-vo-help-font-size: 0.666em;

// Import the stylesheet
@use 'node_modules/@gebruederheitz/wp-block-video-overlay/scss/video-overlay.editor';
```

Or use the precompiled CSS files:
```html
<link 
  rel="stylesheet"
  href="/path/to/node_modules/@gebruederheitz/wp-block-video-overlay/dist/video-overlay.css"
/>
<link 
  rel="stylesheet"
  href="/path/to/node_modules/@gebruederheitz/wp-block-video-overlay/dist/video-overlay.editor.css"
/>
```
