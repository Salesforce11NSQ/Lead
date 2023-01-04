import { LightningElement,wire } from 'lwc'
import {getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi'
import accRat from '@salesforce/schema/Account.Industry'
import accInd from '@salesforce/schema/Account.Rating'
import acc from '@salesforce/schema/Account'
import { NavigationMixin } from 'lightning/navigation'
export default class GetPicklistUsingAdapter extends NavigationMixin(LightningElement) 
{    @wire(getObjectInfo,{objectApiName:acc})
 acct



    @wire(getPicklistValues,{recordTypeId:'$acct.data.defaultRecordTypeId',
    fieldApiName: accRat})
    industry({data}) {
    if(data) {
    console.log(data) 
    this.options=[...this.generatePicklist(data)];
        }
    }
    picklistval = '';
   options=[]    
    generatePicklist(data){
        return data.values.map(item=>({label:item.label,value:item.value}))
    }
    handleChange(event) {
        this.picklistval = event.detail.value
    }

    //secondPick=''

    option1=[]
    @wire(getPicklistValues,{recordTypeId:'$acct.data.defaultRecordTypeId',fieldApiName:accInd })
    resp({data})
    {
        if(data)
        {
            console.log(data)
            this.secondPick=[...this.secondPick(data)];
        }
    }
     
    secondPick(data){
        return data.value.map(item=>({ label:item.label ,value:item.value}))
    }


}