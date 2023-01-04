import { LightningElement, wire } from 'lwc';
import { getObjectInfos } from 'lightning/uiObjectInfoApi';
import Acc from '@salesforce/schema/Account'
import Cont from '@salesforce/schema/Contact'
//objp=[Acc,Cont]
export default class MultiObjApiCalling extends LightningElement {

     
    @wire(getObjectInfos,
    {
    objectApiName: Acc,Cont 
    })
    abc({data})
    {
        if(data)
        {
            console.log(data)
        }
    }
}