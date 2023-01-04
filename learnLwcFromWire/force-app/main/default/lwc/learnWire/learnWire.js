import { LightningElement , wire } from 'lwc'  //Using Wire
import {getRecord} from 'lightning/uiRecordApi'//one of the adapter to fetch record
import ABC from '@salesforce/user/Id'  //Specifing which object you want

import name_f from '@salesforce/schema/User.Name'
import email_f from '@salesforce/schema/User.Email'
const fields=[name_f,email_f]
export default class LearnWire extends LightningElement {
    Uid=ABC   //0058Z000007bW19QAE just to print userId

    //Using Function
    userInfo
    @wire(getRecord, {recordId:'0058Z000007bW19QAE', fields})
/* using wire and adapter specifing Id and fields we are going to fetch
  userDetail(response){
    console.log(response);     
}*/
    userDetail({ data, error }){
        if(data)
        {
         this.userInfo = data.fields
        }
        if(error)
        {
            console.error(error);
        }
    }
    //usingProperty
    @wire(getRecord, {recordId:'$Uid', fields:['User.Name','User.Email']})
    userDetailProperty
}