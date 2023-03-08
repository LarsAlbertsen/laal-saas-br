/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateGarbageData",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "CreateGarbageData",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "refType",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "Accessory",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "ItemAttr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ItemAttr",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,refType,ItemAttr) {
var productCount = 10000;
node.approve();

for (var i=0; i<5; i++) {
	node.setSimpleValue(ItemAttr, ""+i);
	var targetID = "LAAL-"+Math.floor(Math.random() * productCount);
	//logger.info("TargetID="+target);
	var target = node.getManager().getProductHome().getProductByID(targetID);
	if (target!=null) {
		//logger.info("Create ref");
		node.createReference(target, refType);
	}
	node.approve();
}

}