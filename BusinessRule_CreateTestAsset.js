/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateTestAsset",
  "type" : "BusinessAction",
  "setupGroups" : [ "RecycleProject" ],
  "name" : "CreateTestAsset",
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
var n = 100;
while (rootNode.getChildren().size()<n) {
	logger.info("Classification Count "+rootNode.getChildren().size());
	rootNode.createClassification("",objType.getID());
}

}