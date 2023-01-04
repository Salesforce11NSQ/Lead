public with sharing class GetFieldLabel {
    @AuraEnabled
    public static Map<String,String> GetFieldLabelMethod(String keyword){
        Map<String,String> mapOfNameAndLabel=new Map<String,String>();
        Map<String, Schema.SObjectType> detail = Schema.getGlobalDescribe();
for(Schema.SObjectField fields :detail.get(keyword).getDescribe().fields.getMap().Values()) {
    mapOfNameAndLabel.put(fields.getDescribe().getName(),fields.getDescribe().getLabel());
    System.debug('object value'+mapOfNameAndLabel);
}
        
            
return mapOfNameAndLabel;


}
}
