public with sharing class GetLeadFieldLable {
    @AuraEnabled
    public static Map<String,String> getLeadLabal(){
        Map<String,String> mapOfNameAndLabel=new Map<String,String>();
        Map<String, Schema.SObjectType> detail = Schema.getGlobalDescribe();
for(Schema.SObjectField fields :detail.get('Lead').getDescribe().fields.getMap().Values()) {
    mapOfNameAndLabel.put(fields.getDescribe().getName(),fields.getDescribe().getLabel());

}            
return mapOfNameAndLabel;

}
}
