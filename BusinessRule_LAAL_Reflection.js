/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_Reflection",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_Reflection",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
var allValues = node.getValues().toArray();
for (var i=0; i<allValues.length; i++) {
	var aValue = allValues[i];
	var attribute = aValue.getAttribute();
	var validatorName = getValidatorName(attribute);
	if ("text".equals(validatorName) || "number".equals(validatorName) || "numeric_text".equals(validatorName)) {
		logger.info("setTEXT");
	}
	else {
		logger.warning("UNKNOWN "+validatorName);
	}
}


function getValidatorName(pAttr) {
	var method = pAttr.getClass().getMethod("getValidatorName");
	//logger.info("Got Method");
	var oo = method.invoke(pAttr);
	return oo;
}

}