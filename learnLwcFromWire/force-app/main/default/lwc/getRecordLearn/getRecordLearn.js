import { LightningElement,wire,api } from 'lwc'
import { getRecord } from 'lightning/uiRecordApi'
import name1 from '@salesforce/schema/Account.Name'
import phone1 from '@salesforce/schema/Account.Phone' 
export default class GetRecordLearn extends LightningElement   {
    @api recordId
    @wire(getRecord,
        {
            recordId:'$recordId',fields:[name1,phone1]
        }
         )
    resp({data})
    {
    if(data)
    {
    console.log(JSON.stringify(data))
    }
}
}