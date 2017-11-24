Mendix Widget helpers
===

These helpers are used in Mendix Widgets written in ES6 style. This way you do not have to write these helpers yourself.

## Installation

Install the package in your widget package:

```sh
yarn add widget-base-helpers --save
```

or

```sh
npm install widget-base-helpers --save
```

## Widget generator

You do not have to install this if you use the new widget generator. **Note: This is under heavy development and not production ready yet**

## Usage

You can add the whole repo by importing it:

```js
import helpers from 'widget-base-helpers';
```

Better is to import individual helpers:

```js
import { defineWidget } from 'widget-base-helpers';
```

or

```js
import defineWidget from 'widget-base-helpers/helpers/define-widget';
```

### Scoping

If you use these methods inside your widget, it is best to add the as a method to your widget. This has to do with scoping.

```js
import { log, runCallback } from 'widget-base-helpers';
...

    postCreate() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
        this.log('postCreate');

        // Without binding you can use a method like this:
        runCallback.call(this, cb, 'postCreate');
    }
```

## Development

These helpers are constantly in development. They combine best practices. If you have helpers that can be added, please add a PR.

## License

The MIT License (MIT)

Copyright (c) 2017 J.W. Lagendijk <jelte.lagendijk@mendix.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
