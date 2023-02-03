/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateFamilyFromSelectedItems",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "CreateFamilyFromSelectedItems",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
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
  }, {
    "contract" : "ListOfValuesBindContract",
    "alias" : "FamilyObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "Family Variant",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "VariantObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Variant",
    "description" : null
  }, {
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
exports.operation0 = function (web,FamilyObjType,VariantObjType,node) {
var selection = web.getSelection();
logger.info("node="+node.getTitle());
logger.info("selection="+selection);

var familyName = new java.util.ArrayList();
for (var i=0; i<selection.size(); i++) {
	var n = selection.get(i);
	logger.info("["+n.getName()+"]");
	if (n.getName()!=null) {
		var nameParts = n.getName().split(" ");
		if (familyName.size()==0) {
			for (var j=0; j<nameParts.length; j++) {
				familyName.add(nameParts[j].trim());
			}
		}
		else {
			logger.info("checking familyName="+familyName);

			var l = new java.util.ArrayList();
			for (var j=0; j<familyName.length; j++) {
				var ckeckName = familyName.get(j);
				
				for (var j=0; j<nameParts.length; j++) {
					var part = nameParts[j].trim();
					logger.info("Checking "+ckeckName+" "+ part);
					if (checkName.equalsIgnoreCase(part)) {
						logger.info("Keeping "+part);
						l.add(part);
					}
				}
			}
			familyName = l;
		}
	}
}

logger.info("familyName="+familyName);

}