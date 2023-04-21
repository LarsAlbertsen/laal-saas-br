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
  "validObjectTypes" : [ "TestAssetsSubFolder" ],
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "assetType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ProductImage",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,assetType) {
var n = 100;
while (node.getAssets().size()<n) {
	logger.info("Classification Count "+node.getAssets().size());
	node.createAsset("",assetType.getID());
}

}