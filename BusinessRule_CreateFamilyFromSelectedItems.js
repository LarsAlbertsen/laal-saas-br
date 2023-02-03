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
	logger.info("currentChild ["+n.getName()+"]");
	if (n.getName()!=null) {
		var nameParts = n.getName().split(" ");
		if (familyName.size()==0) {
			for (var j=0; j<nameParts.length; j++) {
				familyName.add(nameParts[j].trim());
			}
			logger.info("Initial familyName="+familyName);
		}
		else {
			logger.info("before checking familyName="+familyName +" with "+n.getName());

			var l = new java.util.ArrayList();
			for (var j=0; j<familyName.size(); j++) {
				var checkName = familyName.get(j);
				//var nameParts = n.getName().split(" ");
				logger.info("checkName "+j+" "+checkName+" in "+n.getName() +" partsSize="+nameParts.length);

				/*for (var j=0; j<nameParts.length; j++) {
					var part = nameParts[j].trim();
					logger.info("Compare "+ j+" "+checkName+"="+part);
					if (j
					l.add(part);
				}*/
				/*
				for (var j=0; j<nameParts.length; j++) {
					var part = nameParts[j].trim();
					logger.info("Checking "+ part);
					if (checkName.equalsIgnoreCase(part)) {
						logger.info("Keeping "+part);
						l.add(part);
					}
					else {
						logger.info("Removing "+part);
					}
				}*/
			}
			familyName = l;
			logger.info("after checking familyName="+familyName +" with "+n.getName());

		}
	}
}

logger.info("familyName="+familyName);

}