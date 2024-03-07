/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "LYRE-558",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "LYRE-558",
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
    "contract" : "QueryHomeBindContract",
    "alias" : "queryHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a1",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "a1",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a2",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "a2",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a3",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "a3",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,queryHome,a1,a2,a3) {
var c = com.stibo.query.condition.Conditions;

var conditions = c.valueOf(a1).eq("1")
     .or(c.valueOf(a2).eq("2"))
     .or(c.valueOf(a3).eq("3"));


}