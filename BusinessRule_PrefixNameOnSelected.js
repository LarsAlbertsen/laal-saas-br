/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "PrefixNameOnSelected",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "PrefixNameOnSelected",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (web) {
var selection = web.getSelected();
for (var i=0; i<selection.size(); i++) {
	var node = selection.get(i);

	var curName = node.getName();
	if (curName==null) {
		curName = "";
	}
	var newName = "Prefix "+curName;
	node.setName(newName);

}



}