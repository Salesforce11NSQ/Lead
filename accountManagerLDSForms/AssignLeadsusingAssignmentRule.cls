public class AssignLeadsusingAssignmentRule {
    public Boolean useDefaultRule {get; set;}
    public AssignLeadsusingAssignmentRule(apexpages.standardcontroller  stdcontroller){

	}
    
   @AuraEnabled
    public static void assignLeads(List<Id> leadIds){
        
        AssignmentRule AR = new AssignmentRule();
        AR = [SELECT Id from AssignmentRule where SobjectType = 'Lead' and Active = true limit 1];
        Database.DMLOptions dmo = new Database.DMLOptions();
        dmo.assignmentRuleHeader.assignmentRuleId= '3D01Q8a000000yLrF';
        dmo.AssignmentRuleHeader.useDefaultRule = TRUE;
        
        Lead newLead = new Lead();
        newLead.setOptions(dmo);
       	insert newLead;
    }
}