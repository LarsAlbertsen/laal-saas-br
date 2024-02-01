/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Is_CP_BusinessRules",
  "type" : "BusinessAction",
  "setupGroups" : [ "ChangePackagesConditions" ],
  "name" : "Is_CP_BusinessRules",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
exports.operation0 = function (manager,batch) {
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
		if (!"CP_BusinessRules".equals(node.getID())) {
			logger.info("PreProcessor removing");
			batch.removeEvent(event);
		}
		else {
			logger.info("PreProcessor keeping");
		}
   	}
}




}