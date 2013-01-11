/**
 * @description js-namespace: A simple way to create and use namespaces in javascript. No dependencies.
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

(function (window)
{
    /**
     * @private
     * @type {Array}
     */
    var rootNamespaces = [];

    /**
     * Retrieves a namespace from the global namespace and creates it if it does not exist.
     *
     * Sample Usage:
     *
     * var model = JsNamespace("Company.SubNamespace1");
     * model.MyClass = function(){}
     *
     * OR
     *
     * JsNamespace("RootNamespace.SubNamespace1").MyClass = function(){}
     *
     * @param {String} namespaceString The name of the namespace i.e RootNamespace.SubNamespace1 .
     * @return {Object} The object containing the namespace.
     */
    var JsNamespace = function (namespaceString)
    {
        return new JsNamespace.fn.init(namespaceString);
    };

    /**
     * @private
     * @type {Object}
     */
    JsNamespace.fn = {

        /**
         * See JsNamespace() for more thorough description.
         * @param {String} namespaceString The string for the namespace i.e Company.SubNamespace.SubNamespace2.
         * @return {Object} The object containing the namespace.
         */
        init:function (namespaceString)
        {
            var partNames = namespaceString.split('.'),
                parent = {},
                currentPartName = '';

            //Add the root object to the global namespace if it does not exist
            if (!window[partNames[0]])
            {
                window[partNames[0]] = {};
                window[partNames[0]].isNamespace = true;
                parent = window[partNames[0]];
                rootNamespaces[partNames[0]] = parent;
            }
            else
            {
                parent = window[partNames[0]];
            }
            //Remove root partName
            partNames = partNames.slice(1);

            for (var i = 0, length = partNames.length; i < length; i++)
            {
                currentPartName = partNames[i];
                if(parent[currentPartName] && !parent[currentPartName]['isNamespace'])
                {
                    throw "Cannot define a namespace inside a non-namespace object.";
                }
                parent[currentPartName] = parent[currentPartName] || {};
                parent[currentPartName]['isNamespace'] = true;
                parent = parent[currentPartName];
            }

            return parent;
        }
    };

    JsNamespace.buildClassNames = function ()
    {
        for (var namespaceName in rootNamespaces)
        {
            JsNamespace.buildClassNamesForRoot(rootNamespaces[namespaceName], namespaceName);
        }
    };
    /**
     * @private
     * @param {*=} parent Initial call to this method should be undefined.
     * @param {*=} name The name so far. Undefined on initial call to this method.
     */
    JsNamespace.buildClassNamesForRoot = function (parent, name)
    {
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
                JsNamespace.buildClassNamesForRoot(parent[id], name + "." + id);
            }
        }
    };
    window.JsNamespace = JsNamespace;


})(window);
