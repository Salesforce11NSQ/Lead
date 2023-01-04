public with sharing class getProfileUsers {
    @AuraEnabled(cacheable=true)
    public static List<Profile> ProUser(){
       // List<User> u1= [Select id from profile];
return [Select id,Name,(Select id,Name,Username from Users) from profile where id IN (Select profileid from user)];   
    }
}