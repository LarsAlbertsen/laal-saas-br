/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "SystemChangeGenerateEvent",
  "type" : "BusinessAction",
  "setupGroups" : [ "TrackChanges" ],
  "name" : "System Change Generate Event",
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
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "SystemChangesRoot",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "SystemChangesRoot",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChange",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeDateObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChangeDate",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeUserObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChangeUser",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeYearObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChangeYear",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "SystemChangeMonthObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "SystemChangeMonth",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,step,SystemChangesRoot,SystemChangeObjType,SystemChangeDateObjType,SystemChangeUserObjType,SystemChangeYearObjType,SystemChangeMonthObjType) {

handleNode(node);

function handleNode(pNode) {
	if (pNode!=null) {
		var url = pNode.getURL();
		logger.info("SystemChangeGenerateEvent Type="+pNode.getClass().getName()+" URL="+url);
		var type = pNode.getClass().getSimpleName().replace("Front", "").replace("Impl", "");
		var id = pNode.getID();
		var user = pNode.getManager().getCurrentUser();
	
		var now = new java.util.Date();
		var currentLocale = java.util.Locale.getDefault();
		var dateFormat = java.text.DateFormat.getDateInstance(java.text.DateFormat.DEFAULT, currentLocale);
		var dateString = dateFormat.format(now);


		var userDateClassification = getUserClassification2(user, now);

		
		//var userDateClassification = getUserClassification(user, dateString);
		var changeName = type+" ID="+id;
		var existingChanges = userDateClassification.getChildren();
		for (var i=0; i<existingChanges.size(); i++) {
			if (changeName.equals(existingChanges.get(i).getName())) {
				logger.info("Found existing change for "+existingChanges.get(i).getTitle());
				return;
			}
		}
		var c = userDateClassification.createClassification("", SystemChangeObjType.getID());
		c.setName(changeName);
	}
	else {
		logger.info("SystemChangeGenerateEvent No Node");
	}
}

//
// get or create classification for the given date
//
function getDateClassification(pDateString) {
	var id = "SystemChange "+ pDateString;
	var root = step.getClassificationHome().getClassificationByID(id);
	if (root==null) {
		root = SystemChangesRoot.createClassification(id, SystemChangeDateObjType.getID());
		root.setName(pDateString);
	}
	return root;
}

//
// get or create classification for the give user on the given date
//
function getUserClassification(pUser, pDateString) {
	var id = "SystemChange "+pUser.getID()+" "+pDateString;
	var root = step.getClassificationHome().getClassificationByID(id);
	if (root==null) {
		var dateRoot = getDateClassification(pDateString);
		root = dateRoot.createClassification(id, SystemChangeUserObjType.getID());
		root.setName(pUser.getTitle());
	}
	return root;
}


//
// get or create classification for the give user on the given date organized in data hierarchy
//
/*function getUserClassification2(pUser, pNow) {
	logger.info("getUserClassification2 user="+pUser+" data="+pDateString);
	var id = "SystemChange2 "+pUser.getID()+" "+pDateString;
	var root = step.getClassificationHome().getClassificationByID(id);
	if (root==null) {
		var dateRoot = getDateClassification2(pDateString);
		root = dateRoot.createClassification(id, SystemChangeUserObjType.getID());
		root.setName(pUser.getTitle());
	}
	return root;
}*/

function getUserClassification2(pUser, pNow) {
	var formatter = new java.text.SimpleDateFormat("yyyy/MM/dd");  
	var dateString = formatter.format(pNow);

	var id = "SystemChange "+dateString+"/"+pUser.getID();
	var userCls = step.getClassificationHome().getClassificationByID(id);
	if (userCls==null) {
		logger.info("Did not userCls ["+id+"]");
		var dateCls = getDateClassification2(pNow);
		userCls = dateCls.createClassification(id, SystemChangeUserObjType.getID());
		userCls.setName(pUser.getTitle());
	}
	return userCls;
}

function getDateClassification2(pNow) {
	//var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
	var formatter = new java.text.SimpleDateFormat("yyyy/MM/dd");  
	var dateString = formatter.format(pNow);

	var id = "SystemChange "+ dateString;
	var dateCls = step.getClassificationHome().getClassificationByID(id);
	if (dateCls==null) {
		logger.info("create date ["+id+"]");
		var monthCls = getMonthClassification2(pNow);
		dateCls = monthCls.createClassification(id, SystemChangeDateObjType.getID());
		dateCls.setName(dateString);
	}
	return dateCls;
}

function getMonthClassification2(pNow) {
	//var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
	var formatter = new java.text.SimpleDateFormat("yyyy/MM");  
	var dateString = formatter.format(pNow);

	var id = "SystemChange "+ dateString;
	var monthCls = step.getClassificationHome().getClassificationByID(id);
	if (monthCls==null) {
		logger.info("create month ["+id+"]");
		var yearCls = getYearClassification2(pNow);
		monthCls = yearCls.createClassification(id, SystemChangeMonthObjType.getID());
		monthCls.setName(dateString);
	}
	return monthCls;
}

function getYearClassification2(pNow) {
	//var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
	var formatter = new java.text.SimpleDateFormat("yyyy");  
	var dateString = formatter.format(pNow);

	var id = "SystemChange "+ dateString;
	var yearCls = step.getClassificationHome().getClassificationByID(id);
	if (yearCls==null) {
		logger.info("Create year "+id);
		yearCls = SystemChangesRoot.createClassification(id, SystemChangeYearObjType.getID());
		yearCls.setName(dateString);
	}
	return yearCls;
}
}