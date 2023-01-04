import { LightningElement,track,api } from 'lwc';
import apeCls from '@salesforce/apex/getProfileUsers.ProUser'
export default class TreeGridProfileSetup extends LightningElement  
{
    @api abc
    @track gridCol=[{
        type:'text',
        fieldName:'Name',
        label:'Profile Name'
       } ,
       {
        type:'text',
        fieldName:'Id',
        label:'Id'
       } ,
       {
        type:'text',
        fieldName:'Description',
        label:'Description'
    } 
    ];
    @track gridData  
    connectedCallback(){
        apeCls()
        .then(result =>{
    console.log("Result"+JSON.stringify(result));
            var tempConts=JSON.parse(JSON.stringify(result));
    //console.log("tempConts"+JSON.stringify(tempConts));
            for(var i=0;i<tempConts.length;i++){
                var newuser=tempConts[i]['Users'];
    //console.log("newuser"+JSON.stringify(newuser));
                if(newuser){
                    tempConts[i]._children= newuser;
    //console.log("tempConts[i]._children: "+JSON.stringify(tempConts[i]._children))
                delete tempConts[i].Users;
                }
            }
this.gridData=tempConts;
console.log("this.gridData "+JSON.stringify(this.gridData));
        }) 
        .catch(error=>{
            console.error(JSON.stringify(error));
        })
    }
    getlabel(event){
         const getlabel1= event.detail.selectedRows;
        console.log(JSON.stringify(getlabel1))
       // this.abc=getlabel1.Id        
        for(var i=0;i<getlabel1.length;i++){
            console.log("Selected Rows ID "+getlabel1[i].Id)
            var abc1=getlabel1[i].Id;
          console.log(abc1)
          this.abc=abc1
        }  
       // console.log(abc1)
    }
    
//abc=abc1   
      Abc(){
        console.log(this.abc)
       }
}