import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { getSObjectValue } from '@salesforce/apex';
//import leadAssign from '@salesforce/apex/AssignLeadsusingAssignmentRule.assignLeads';
import RULE_OBJECT from '@salesforce/schema/Assignment_Filter__c';
import FNAME_FIELD from '@salesforce/schema/Assignment_Filter__c.Field_Name__c';
import OPERATOR_FIELD from '@salesforce/schema/Assignment_Filter__c.Operator__c';
import VALUES_FIELD from '@salesforce/schema/Assignment_Filter__c.Values__c';
export default class AccountManagerLDSForms extends NavigationMixin(LightningElement) {

    @api recordId;
    selectedFields = [FNAME_FIELD, OPERATOR_FIELD, VALUES_FIELD];

    //@wire (leadAssign) assignLeads;

    // get name(){
    //     return this.assignLeads.data ? getSObjectValue(this.assignLeads.data, FNAME_FIELD) : '';
    // }

    // get  operator(){
    //      return this.assignLeads.data ? getSObjectValue(this.assignLeads.data, OPERATOR_FIELD) : '';
    // }

    // get value(){
    //      return this.assignLeads.data ? getSObjectValue(this.assignLeads.data, VALUES_FIELD) : '';
    // }
    
    


    selectedUser;
    objectApiName = RULE_OBJECT;

    keyIndex = 0;
    @track itemList = [
        {
            id: 0
        }
    ];

    addRow() {
        ++this.keyIndex;
        var newItem = [{ id: this.keyIndex }];
        this.itemList = this.itemList.concat(newItem);
    }

    removeRow(event) {
        if (this.itemList.length >= 2) {
            this.itemList = this.itemList.filter(function (element) {
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
        }
    }

    @api handleSuccess() {
        
        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) {
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                element.submit();
            });

           

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Rule Saved successfully',
                    variant: 'success',
                }),
            );

            // Navigate to the Account home page
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Assignment_Filter__c',
                    actionName: 'home',
                },
            });
        } 

          
    }


    @api handleUserSelection(event){
        this.value = event.detail.value;
    }

}