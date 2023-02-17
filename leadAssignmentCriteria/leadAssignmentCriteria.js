import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FILTER_OBJECT from '@salesforce/schema/Assignment_Filter__c';
import getUsers from '@salesforce/apex/getUsersOrQueues.getUsers';
import getQueues from '@salesforce/apex/getUsersOrQueues.getQueues';
import getRuleData from '@salesforce/apex/getUsersOrQueues.getRuleData';
import getObjects from '@salesforce/apex/getUsersOrQueues.getObjects';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import SOURCE_FIELD from '@salesforce/schema/Assignment_Filter__c.Source__c';
import OPERATOR_FIELD from '@salesforce/schema/Assignment_Filter__c.Operator__c';
import MODE_FIELD from '@salesforce/schema/Assignment_Filter__c.Assignment_Mode__c';
import GetFieldLabelMethod from '@salesforce/apex/GetFieldLabel.GetFieldLabelMethod';
import createAssignmentFilterRecord from '@salesforce/apex/getUsersOrQueues.createAssignmentFilterRecord';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import allRules from './allRules.html'
import leadAssignmentCriteria from './leadAssignmentCriteria.html'

// columns for all rules datatable
const columns = [
    {label: 'Rule Name' , fieldName : 'Rule_Name__c'},
    {label: 'Description' , fieldName : 'Description__c'},
    {label: 'Object Name' , fieldName : 'Object_Name__c'},
    {label: 'Active' , type: 'boolean', fieldName : 'Active__c', editable: true},
    {label: 'Field Name' , fieldName : 'Field_Name__c'},
    {label: 'Operator' , fieldName : 'Operator__c'},
    {label: 'Value' , fieldName : 'Value__c'},
    {label: 'Assignment Mode' , fieldName : 'Assignment_Mode__c'},
    {label: 'Source' , fieldName : 'Source__c'},
    {label: 'Assign to' , fieldName : 'Assign_To__c'},
    {type: 'button-icon', typeAttributes: {  
        name: 'X', 
        iconName: 'utility:delete',
        title: 'X', 
        variant: 'brand',
        disabled: false,  
        iconPosition: 'middle'  
    }}
]

// columns for user datatable which will show when source is user
const columnForUsers = [
    {label: 'User Name' , fieldName : 'Name'},
    {label: 'Skills' , fieldName : 'Skills__c'}
]
export default class LeadAssignmentCriteria extends LightningElement {

    objectApiName = FILTER_OBJECT;
    selected = null;
    @track UserOption=[];
    @track QueueOption=[];
    @track fieldLabals=[];
    @track objectOptions=[];
    saveDraftValues = [];
    @track value = '';
    @track objvalue = '';
    @track SelectedSourceValue='';
    @track SelectedMode='';
    @track SelectedOperator='';
    @track selectedFieldvalue = '';
    @track valueVal='';
    @track rulenameVal='';
    @track descriptionVal='';
    @track sourceUser=false;
    @track sourceQueue=false;
    @track columns = columns;
    @track columnForUsers = columnForUsers;
    @track checkboxValue=false;


    render(){
        if(this.selected == 'View All Rules'){
            return allRules;
        }
        else if(this.selected == 'Back'){
            return leadAssignmentCriteria;
        }      
        return leadAssignmentCriteria;
    }

    //datatable for user
    @wire(getUsers, {})
    fetchedUsers;

    get options() {
        return this.UserOption;
    }

    //combobox for Queue
    @wire(getQueues)
    fetchedQueues({data, error}){
        if(data){
            let arr = [];
            for(var i=0; i<data.length; i++){
                arr.push({label: data[i].Name, value: data[i].Name})
            }
            this.QueueOption = arr;
        }
        else if(error){
            console.log(error);
        }
    }

    get optionss() {
        return this.QueueOption;
    }

    //combobox for Objects
    @wire(getObjects)
    fetchedObjects({data, error}){
        if(data){
            let ar = [];
            for(var i=0; i<data.length; i++){
                ar.push({label: data[i], value: data[i]})
            }
            this.objectOptions = ar;
        }
        else if(error){
            console.log(error);
        }
    }

    get objOptions(){
        return this.objectOptions;
    }

    //combobox for Field Names of Object
    @wire(GetFieldLabelMethod, {keyword : '$objvalue'})
    fetchedFieldLabels({data, error}){
        if (data) {
            var fieldLabals = [];
            for (var key in data) {
                fieldLabals.push({ label: data[key], value: key });                
            }
            this.fieldLabals = fieldLabals;
        }
        else if(error) {
            console.log(error);
            //this.ShowToast('ERROR', error.body.message, 'error', 'dismissable');
        }
    }

    get fieldOptions(){
        return this.fieldLabals;
    }

    //combobox for Source
    @wire(getObjectInfo, { objectApiName: FILTER_OBJECT })
    objInfo;

    @wire(getPicklistValues, { recordTypeId:'$objInfo.data.defaultRecordTypeId', fieldApiName: SOURCE_FIELD })
    sourcepickVal;

    //combobox for Operator
    @wire(getPicklistValues, { recordTypeId:'$objInfo.data.defaultRecordTypeId', fieldApiName: OPERATOR_FIELD })
    operatorpickVal;

    //combobox for Mode
    @wire(getPicklistValues, { recordTypeId:'$objInfo.data.defaultRecordTypeId', fieldApiName: MODE_FIELD })
    modepickVal;

    handleAllRulesClick(event){
        this.selected = event.target.label;
    }

    handleBackClick(event){
        this.selected = event.target.label;
    }

    handleObjectChange(event){
        this.objvalue = event.detail.value;
    }

    handleRuleNameChange(event){
        this.rulenameVal = event.detail.value;
    }

    handleDescriptionChange(event){
        this.descriptionVal = event.detail.value;
    }

    handleCheckBoxChange(event){
        this.checkboxValue = event.target.checked;
    }

    handleFieldNameChange(event){
        this.selectedFieldvalue = event.detail.value;
    }

    handleOperatorChange(event){
        this.SelectedOperator = event.detail.value;
    }

    handleValueChange(event){
        this.valueVal = event.detail.value;
    }

    handleModeChange(event){
        this.SelectedMode = event.detail.value;
    }

    handleSourceChange(event){
        this.SelectedSourceValue = event.detail.value;
        if(this.SelectedSourceValue === 'User'){
            this.sourceUser = true;
            this.sourceQueue = false;
        }
        else if(this.SelectedSourceValue === 'Queue'){
            this.sourceQueue = true;
            this.sourceUser = false;
        }
    }

    handleQueueChange(event){
        this.value = event.detail.value;
    }

    //Method to create the rule record in Assignment_Filter__c object
    handleSaveRecord(){
       
            if(this.objvalue != '' && this.rulenameVal != '' && this.SelectedMode != '' && this.SelectedSourceValue != '' && this.value != ''){
                createAssignmentFilterRecord({objectName: this.objvalue, ruleName: this.rulenameVal, description: this.descriptionVal, active: this.checkboxValue, fieldName: this.selectedFieldvalue, oprtr: this.SelectedOperator, val: this.valueVal, mode: this.SelectedMode, source: this.SelectedSourceValue, assignTo: this.value})
                .then(result => {
                    this.ShowToast('Success', 'Rule Created Successfully!', 'success', 'dismissable');
                    this.handleReset();
                    refreshApex(this.ruledata);
                    refreshApex(this.fetchedUsers);
                })
                .catch(error => {
                    this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
                    console.log(error);
                })
            }
            else{
                window.alert('Please complete the required fields');
            }     
    }

    // datatable for the rules created
    @wire(getRuleData, {})
    ruledata;

    // deletion of the rule from datatable
    handlerowaction(event){
        const actionName = event.detail.action.name;
        if ( actionName === 'X' ) {  
           deleteRecord(event.detail.row.Id)
           .then(() => {
            refreshApex(this.ruledata);
            this.ShowToast('Success', 'Rule Deleted Successfully!', 'success', 'dismissable');
           })
           .catch(error => {
            this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
            console.log(error);
           })
        }
    }

    // Method to handle the multiple user selected to assign
    handleUserSelected(event){
        let arr=[];
        let selectedRowsId = event.detail.selectedRows;
        selectedRowsId.forEach(ad => {
            let type1 = ad.Id;
            arr.push(type1);
        })
        this.value = arr.toString();
    }

    // Method to reset the form
    handleReset(){
        this.template.querySelectorAll('lightning-input').forEach(element => {
          if(element.type === 'checkbox'){
            element.checked = false;
          }else{
            element.value = null;
          }      
        });
        this.template.querySelectorAll('lightning-textarea').forEach(element => {
            element.value = null;   
        });
        this.selectedFieldvalue=null;
        this.SelectedOperator=null;
        this.SelectedMode=null;
        this.SelectedSourceValue=null;
        this.value=null;
        this.selectedFilter=null;
        this.sourceUser = false;
        this.sourceQueue = false;
        this.objvalue = false;
      }

    //Updating the edited record from the datatable
    handleSave(event){
        this.saveDraftValues = event.detail.draftValues;
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
 
        // Updateing the records using the UiRecordAPi for datatable with inline editing
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.ShowToast('Success', 'Rule Updated Successfully!', 'success', 'dismissable');
            this.saveDraftValues = [];
            return this.refresh();
        }).catch(error => {
            this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
            console.log(error);
        }).finally(() => {
            this.saveDraftValues = [];
        });
    }
      
    // This function is used to refresh the datatable once data updated
    async refresh() {
        await refreshApex(this.ruledata);
    }

    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
                title: title,
                message:message,
                variant: variant,
                mode: mode
        });
        this.dispatchEvent(evt);
    }
 
}