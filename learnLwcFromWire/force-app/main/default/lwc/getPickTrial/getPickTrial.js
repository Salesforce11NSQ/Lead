import { LightningElement,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import acct from '@salesforce/schema/account'
import rati from '@salesforce/schema/Account.Rating'
export default class GetPickTrial extends LightningElement {
    value1 = '';

    options=[]
    handleChange(event) {
        this.value1 = event.detail.value;
    }
}