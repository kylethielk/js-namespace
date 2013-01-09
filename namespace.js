/**
 * @description js-namespace: A simple way to create and use namespaces in javascript
 * @author <a href="http://www.bitofnothing.com" alt="Kyle Thielk Personal Blog">Kyle Thielk</a>
 *
 **/

/**
 * @license LICENSED UNDER THE MIT LICENSE
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * The name of your root namespace object. You should probably replace Company with your company name.
 * @type {String}
 */
var rootNamespaceIdentifier = "Company";

//////////////////////////////////////////////
// ALL ITEMS BELOW THIS POINT SHOULD NOT    //
// NEED ANY MODIFICATION, UNLESS OF COURSE  //
// YOU WANT TO ;)                           //
//////////////////////////////////////////////

/**
 * The root namespace object.
 * @type {Object}
 */
window[rootNamespaceIdentifier] = window[rootNamespaceIdentifier] || {};

/**
 * Marks an object as a namespace object. Since we dynamically build namespaces,
 * this lets us know where to stop traversing the namespace tree.
 *
 * Namespace objects can only be contained within other namespace objects.
 *
 * Valid: RootNamespace.SubNamespace1.Object1
 * Valid: RootNamespace.SubNamespace1.Object1 and RootNamespace.SubNamespace1.SubNamespace2.Object1
 * Invalid: RootNamespace.SubNamespace1.Object1.SubNamespace2
 *
 * In the example RootNamespace.SubNamespace1.Object1 isNamespace would be set as follows automatically:
 *
 * RootNamespace.isNamespace = true;
 * SubNamespace1.isNamespace = true;
 * Object1.isNamespace = false;
 *
 * @type {Boolean}
 */
window[rootNamespaceIdentifier].isNamespace = true;

window.JsNamespace = [];

/**
 * Retrieves a namespace from the global namespace and creates it if it does not exist.
 *
 * Sample Usage:
 *
 * var model = JsNamespace("RootNamespace.SubNamespace1");
 * model.MyClass = function(){}
 *
 * OR
 *
 * JsNamespace("RootNamespace.SubNamespace1").MyClass = function(){}
 *
 * @param {String} namespaceString The name of the namespace i.e RootNamespace.SubNamespace1 .
 * @return {Object} The object containing the namespace.
 */
window.JsNamespace = function (namespaceString)
{
    var parts = namespaceString.split('.'),
        parent = window[rootNamespaceIdentifier],
        currentPart = '';

    //strip the rootIdentifier global if it appears
    if (parts[0] === rootNamespaceIdentifier)
    {
        parts = parts.slice(1);
    }

    for (var i = 0, length = parts.length; i < length; i++)
    {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent[currentPart]['isNamespace'] = true;
        parent = parent[currentPart];
    }

    return parent;
};
/**
 * Builds class names for each element including namespace tree so we can
 * use for example RootNamespace.SubNamespace1.Object1.className
 *
 * @param {*} parent Initial call to this method should be undefined.
 * @param {*} name The name so far. Undefined on initial call to this method.
 */
window.JsNamespace.buildClassNames = function (parent, name)
{
    parent = parent || window[rootNamespaceIdentifier];
    name = name || rootNamespaceIdentifier;

    if (parent && parent['isNamespace'] && parent['isNamespace'] == true)
    {
        for (var id in parent)
        {
            if (id != "isNamespace")
            {
                parent[id].className = name + "." + id;
            }
        }
        for (var id in parent)
        {
            VMC.buildClassNames(parent[id], name + "." + id);
        }
    }

};