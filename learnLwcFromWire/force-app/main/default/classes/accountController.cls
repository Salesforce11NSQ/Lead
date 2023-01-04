public with sharing class accountController {
        @AuraEnabled(cacheable=true)
        public static List<Profile> methodName(){           
                return [select Id,Name from Profile ];          
        }
    }