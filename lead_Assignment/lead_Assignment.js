import { LightningElement, track} from 'lwc';

//import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import LightningAlert from 'lightning/alert';

//import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ASSIGNMENT_OBJECT from '@salesforce/schema/Lead_Assignment__c';

//import LeadAssign from '@salesforce/apex/AssignLeadsusingAssignmentRule.LeadAssign'

export default class Lead_Assignment extends LightningElement {
    
    @track isVisible= false;
    objectApiName = ASSIGNMENT_OBJECT;
    
    // @wire (leadAssign) leadsassign;

    // @track leadNames;
    // @track errors;
    // @wire(leadAssign)
    // wiredLeads({ error, data }) {
    //     if (data) {
    //         this.leadNames = data;
    //     } else if (error) {
    //         this.errors = error;
    //     }
    // }

    
    handleSuccess(event) {

        this.value = event.detail.value;

    }

    async changeHandler(event) {
       
        this.isVisible = event.target.checked;
        

        await LightningAlert.open({
            message: 'Lead Assignment Rules are used to automatically assign lead records to a particular user or queue based on different conditions. It can contain many rule entries that determine the assignee of a lead. ' ,
            theme: 'Success',
            label: 'Guidline on Lead Assignment'
        });
        this.template.querySelector('c-account-manager-l-d-s-froms').handleSuccess();

        
    }
}