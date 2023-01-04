import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ConObj from '@salesforce/schema/Contact'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateRecordPSA extends LightningElement {
    formFields={}
    Sone(event)
    {
        const {name,value}=event.target
        
        this.formFields[name]=value
    }
    CreateContact(){
        const recordInput={apiName:ConObj.objectApiName, fields:this.formFields}
        createRecord(recordInput).then(result=>{
            this.showToast('SUCCESS',`contact created with is ${result.id}`);
        }).catch(error=>{
            this.showToast('ERROR CREATING RECORD',error.body.message,'error');
        })
    }
    showToast( title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant:variant || 'success'
        }))
    }
}