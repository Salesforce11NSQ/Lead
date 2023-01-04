public with sharing class createPermissionSetAssignment {
    @AuraEnabled
   public static PermissionSetAssignment some(String A,String B){
       // public static Account some(String A,String B){

       // List<PermissionSetAssignment> A1= new List<PermissionSetAssignment>();
        
           PermissionSetAssignment A23=new PermissionSetAssignment();
          //  Account A23=new Account();

           A23.AssigneeId=A;
            A23.PermissionSetId=B;
           // A23.Name=A;
           // A23.Fax=B;
            insert A23;
            return A23;
           // A1.add(A23);
        
       
            //System.debug(A1);

            //insert A1;
           // return A1;

        }
        
    }

