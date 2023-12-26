/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "FilterFullConfig",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "FilterFullConfig",
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
    "contract" : "CurrentEventBatchBinding",
    "alias" : "batch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (batch) {
var doInclude = false;
var events = batch.getEvents();
logger.info("PreProcessor events="+events.size());
for (var i = 0; i <  events.size(); i++) {
	var event = events.get(i);
	logger.info("PreProcessor event="+events);
    	var node = event.getNode();
     if (node != null){
		logger.info("PreProcessor node="+node);
		logger.info("PreProcessor node.title="+node.getTitle());
		logger.info("PreProcessor node.value="+node.getValue("ChangePackageDescription").getSimpleValue());
		if (!"FullConfig".equals(node.getName())) {
			logger.info("PreProcessor removing");
			batch.removeEvent(event);
		}
		else {
			logger.info("PreProcessor keeping");
		}
   	}
}




}