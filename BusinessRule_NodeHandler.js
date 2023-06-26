/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "NodeHandler",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "NodeHandler",
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
    "contract" : "OutboundBusinessProcessorNodeHandlerSourceBindContract",
    "alias" : "nodeHandlerSource",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorNodeHandlerResultBindContract",
    "alias" : "nodeHandlerResult",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorExecutionReportLoggerBindContract",
    "alias" : "executionReportLogger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (nodeHandlerSource,nodeHandlerResult,executionReportLogger) {
// Node Handler Source bound to nodeHandlerSource
// Node Handler Result bound to nodeHandlerResult
// ExecutionReportLogger bound to executionReportLogger

var simpleEventType = nodeHandlerSource.getSimpleEventType();
if (simpleEventType == null) {
  executionReportLogger.logInfo("No event information available in node handler");
} else {
  executionReportLogger.logInfo("Event with ID '" + simpleEventType.getID()+ "' passed to node handler");
}
var node = nodeHandlerSource.getNode();
if (node != null && node instanceof com.stibo.core.domain.Product) {
  executionReportLogger.logInfo("Node handler handling product with URL: " + node.getURL());
  var mesg = {};
  mesg.stepid = node.getID() + "";
  mesg.name = node.getValue("6d030ff8-72ce-4f42-ba53-023f55c53a20").getSimpleValue() + "";   // UPC
  if (nodeHandlerSource.isDeleted()) {
    nodeHandlerResult.addMessage("delete", JSON.stringify(mesg));	
  } else {
    mesg.category = node.getParent() == null ? null : node.getParent().getTitle() + "";
    mesg.productName = node.getValue("a40be0d3-5c49-446d-a835-ef6af29c016e").getSimpleValue() + "";  // Product Name
    mesg.manufacturerName = node.getValue("37f3fed4-5bf3-4bf8-88bd-310bd2addb56").getSimpleValue()+ ""; // MFG Name Name
    nodeHandlerResult.addMessage("upsert", JSON.stringify(mesg));	
  }
}
}