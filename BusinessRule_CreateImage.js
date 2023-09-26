/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateImage",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "CreateImage",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "asset",
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
exports.operation0 = function (asset,manager) {


var file = saveToFile(asset);
logger.info("Asset saved to "+file);
var newAsset = manager.getClassificationHome().getClassificationByID("AssetsRoot").createAsset("", "JPEGImage");
logger.info("New asset "+newAsset.getID());
var inFile = new java.io.FileInputStream(file);
newAsset.upload(inFile, asset.getName()+".jpg");
newAsset.setName(asset.getName());
inFile.close();
file.delete();



function saveToFile(pAsset) {
	var tmpFile = java.io.File.createTempFile(pAsset.getID(), ".pdf");
	var outFile = new java.io.FileOutputStream(tmpFile);
	pAsset.download(outFile, "BigPDF");
	outFile.close();
	return tmpFile;
}
}