/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateTestAssetsSubFolders",
  "type" : "BusinessAction",
  "setupGroups" : [ "RecycleProject" ],
  "name" : "CreateTestAssetsSubFolders",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "TestAssets" ],
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
    "contract" : "ClassificationBindContract",
    "alias" : "rootNode",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "TestAssets",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "objType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "TestAssetsSubFolder",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (rootNode,objType) {
for (var i=0; i<10; i++) {
	rootNode.createClassification("",objType.getID());
}

}