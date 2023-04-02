/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_LotsOfGarbage",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_LotsOfGarbage",
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
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager) {
for (var r=0; r<1000; r++) {
	if (node.getRevisions().size()<30) {
		//logger.info("r="+r);
		for (var i=1; i<=100; i++) {
			var attrID = "Garbage-"+i;
			var attr = manager.getAttributeHome().getAttributeByID(attrID);
			//logger.info(attr.getTitle());
			node.setSimpleValue(attr, java.util.UUID.randomUUID().toString());
		}
		node.approve();
	}
}
}