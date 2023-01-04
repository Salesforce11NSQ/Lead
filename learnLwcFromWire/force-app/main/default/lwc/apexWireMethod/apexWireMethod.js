import { LightningElement,wire } from 'lwc';
import accountCtl from '@salesforce/apex/accountController.methodName'
export default class ApexWireMethod extends LightningElement {

@wire(accountCtl)
account

User1(){
    console.log('Sup Naren')
}



}