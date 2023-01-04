import { LightningElement, wire } from 'lwc';
import {getObjectInfo,getObjectInfos} from 'lightning/uiObjectInfoApi' //name should be same naren
import accobj from '@salesforce/schema/Account'  //saving the ref
import cont from '@salesforce/schema/Contact'

export default class ObjectWireLearning extends LightningElement {
a
@wire(getObjectInfo, { objectApiName:accobj })  //pass obj namefrom above

objDet({data,error})
{
    if(data)
    {
        console.log(data)
        this.a =data.labelPlural
    }
    if (error)
    {
        console.error(error)
    }
}

@wire(getObjectInfo, { objectApiName:accobj })  //pass obj namefrom above
b
}