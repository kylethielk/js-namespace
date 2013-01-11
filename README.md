Welcome to js-namespace
=======================

js-namespace is a simple javascript 'class' designed to simplify the initialization and use of namespaces in javascript.

Javascript does not have a built in syntax for namespaces so we have to implement them ourselves. Out of all the different approaches I've tried, this is an amalgamation of those I've found to be most useful.

Usage
-----

Start by downloading and including js-namespace.js (for development, 5.09KB) or js-namespace.min.js (for production, 1.73KB), of course it must be included in your code before you use it. In other words:

```html
<script src="js-namespace.js"></script>
<script src="money-maker.js"></script>
```

Usage is then as simple as:

```javascript
var namespace = JsNamespace("MyCompany.Organization.Project"); 
namespace.MyObject = {};
```

or shorter:

```javascript
JsNamespace("MyCompany.Organization.Project").MyObject = {};
```

MyObject can then be accessed globally as follows:

```javascript
var someProperty = MyCompany.Organization.Project.MyObject.someProperty;
```

All namespace objects and their immediate children will also have a new property 'className'. This will contain the full name of the object and/or namespace. For example:

```javascript
JsNamespace("MyCompany.Organization.Project").MyObject = 
{
  logger: function()
  {
    //Will print "MyCompany.Organization.Project.MyObject"
    console.log(this.className);
  }
};
JsNamespace.buildClassNames();

MyCompany.Organization.Project.MyObject.logger();
```

Running the Tests
-----------------

Simply load test/index.html in your browser.

License
-------
Note: This is project is released under the [MIT license](http://opensource.org/licenses/MIT). It is the least restrictive of licenses. Use the software and prosper.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
