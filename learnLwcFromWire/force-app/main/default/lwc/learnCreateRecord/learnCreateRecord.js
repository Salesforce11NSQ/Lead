import { LightningElement } from 'lwc';
import some from '@salesforce/apex/createPermissionSetAssignment.some';
export default class LearnCreateRecord extends LightningElement {
    assignID;
    permissionID;
    handleNameChange(event){
        this.assignID=event.target.value
       console.log(JSON.stringify(this.assignID))
    }
    handleNameChange1(event){
        this.permissionID=event.target.value
        console.log(JSON.stringify(this.permissionID))
    }
    onCreatePSA(){
        some({A: this.assignID,b:this.permissionID})
        .then(result=>{
            console.log("result: "+JSON.stringify(result))
        })
        .catch(error=>{
            console.error(JSON.stringify(error))
        })
    }
    
}