/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MJANtest",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "ba_MJANtest",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "UserBindContract",
    "alias" : "usr",
    "parameterClass" : "com.stibo.core.domain.impl.UserImpl",
    "value" : "SERVICE-ACCOUNT-INTEGRATION",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (usr) {
logger.info(usr.getName());
logger.info(usr.getValue("ForceAuthentication"));
}