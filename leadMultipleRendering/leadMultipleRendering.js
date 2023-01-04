import { LightningElement, track, wire } from 'lwc';
import getLeadLabal from '@salesforce/apex/GetLeadFieldLable.getLeadLabal';
import GetFieldLabelMethod from '@salesforce/apex/GetFieldLabel.GetFieldLabelMethod';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import mappingTemplate1 from './mappingTemplate.html'
import mappingTemplate2 from './mappingTemplate.html'
import mappingTemplate3 from './mappingTemplate.html'
import leadMultipleRendering from './leadMultipleRendering.html'

export default class LeadMultipleRendering extends LightningElement {
    selected =null;
    @track LeadLabals=[];
    @track ObjectLabals=[];
    @track Leadvalue = '';
    @track Objectfieldvalue = '';

    get Leadoptions(){
        return this.LeadLabals;
    }

    render(){
        return this.selected == 'Account' ?mappingTemplate1:
        this.selected == 'Contact' ?mappingTemplate2:
        this.selected == 'Opportunity' ?mappingTemplate3:
        
       
        leadMultipleRendering
        
    

    }

    handleClick(event){
        this.selected=event.target.label;
        getLeadLabal()
        .then((result) => {
            
            console.log('result', result);
            var LeadLablas = [];
            for (var key in result) {
                LeadLablas.push({ label: key, value: result[key] });
                console.log('key', key, result[key]);
                
            }
            this.LeadLabals = LeadLablas;
            console.log(this.LeadLabals);
        }).catch((error) => {
            console.log(error);
            this.showToast('ERROR', error.body.message, 'error');
        });

        GetFieldLabelMethod({keyword: this.selected})
        .then((result) => {
            
            console.log('result', result);
            var ObjectLabals = [];
            for (var key in result) {
                ObjectLabals.push({ label: key, value: result[key] });
                console.log('key', key, result[key]);
                
            }
            this.ObjectLabals = ObjectLabals;
            console.log(this.ObjectLabals);
        }).catch((error) => {
            console.log(error);
            this.showToast('ERROR', error.body.message, 'error');
        });
    }

    LeadhandleChange(event){
        this.Leadvalue = event.detail.value;

    }

    ObjectfieldhandleChange(event){
        this.Objectfieldvalue = event.detail.value;

    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);

    }
}