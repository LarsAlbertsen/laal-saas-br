/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Joiner",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "Joiner",
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
    "contract" : "OutboundBusinessProcessorJoinerSourceBindContract",
    "alias" : "joinerSource",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorJoinerResultBindContract",
    "alias" : "joinerResult",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (joinerSource,joinerResult) {
// Joiner Source bound joinerSource
// Joiner Result bound to joinerResult

function appendFromGroup(messageGroup) {
  var seen = [];
  var first = true;
  while(joinerSource.hasNext(messageGroup)) {
    var messageString = joinerSource.getNextMessage(messageGroup);
    var hash = messageString.hashCode();
    if (seen.indexOf(hash) == -1) {
      seen.push(hash);
      if (first) {
        first = false;
      } else {
        joinerResult.appendToMessage(",");
      }
      joinerResult.appendToMessage(messageString);
    }
  }
}

joinerResult.appendToMessage("{\"products\":{\"upsert\":[");
appendFromGroup("upsert");
joinerResult.appendToMessage("],\"delete\":[");
appendFromGroup("delete");
joinerResult.appendToMessage("]}}");
}