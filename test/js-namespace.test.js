module("js-namespace Core Tests");

test("js-namespace Core Functionality Test", function ()
{
    var namespaceName = "MyCompany.CoreTest";

    var namespace = JsNamespace(namespaceName);

    ok(namespace, "Namespace is defined");
    ok(window.MyCompany.CoreTest, "Namespace is defined globally.");

    namespace.Util = (function ()
    {
        this.foobar = function ()
        {
            return true;
        };

        return this;
    })();


    JsNamespace.buildClassNames();


    ok(namespace.Util && namespace.Util.foobar() === true, "Namespace child is defined.");

    //Ensure redefining namespace does not overwrite existing object tree
    namespace = JsNamespace(namespaceName);
    ok(namespace.Util && namespace.Util.foobar() === true, "Namespace child is still defined after re-calling JsNamespace().");

    try
    {
        namespace = JsNamespace(namespaceName + ".Util");
        ok(false, "Incorrectly allowed namespace to be defined inside non-namespace object.");
    }
    catch (error)
    {
        ok(true, "Correctly prevented namespace being defined inside non-namespace object.");
    }

});

module("className Tests");
test("js-namespace className Test", function ()
{
    var namespaceName = "MyCompany.ClassNameTest";

    var namespace = JsNamespace(namespaceName);
    namespace.Util = (function ()
    {
        this.foo = {
            bar:false
        };
        return this;
    })();


    JsNamespace.buildClassNames();

    ok(namespace.className == namespaceName, "Namespace className is defined.");
    ok(namespace.Util.className == namespaceName + ".Util", "Namespace child className is defined.");
    ok(!namespace.Util.foo.className, "Namespace child property does not have className defined.");


});

module("isNamespace Tests");
test("js-namespace isNamespace Test", function ()
{

    var namespaceName = "MyCompany.IsNamespaceTest";

    var namespace = JsNamespace(namespaceName);
    namespace.Util = {
        foo:{
            bar:false
        }
    };


    JsNamespace.buildClassNames();

    //Ensure isNamespace is set correctly
    ok(MyCompany && MyCompany.isNamespace === true, "Root Namespace is defined and isNamespace == true.");
    ok(MyCompany.IsNamespaceTest && MyCompany.IsNamespaceTest.isNamespace === true, "Sub namespace is defined and isNamespace == true.");
    ok(!MyCompany.IsNamespaceTest.Util.isNamespace, "isNamespace is not defined on non-namespace object.");


});