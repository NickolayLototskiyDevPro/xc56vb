//---------------------------------------------------Default state 
const project = {
    participants: [],
    pricing: { },
    isBusy: false,    //boolean, flag isBusy should be false by default

//----------------------------------------------------Method init
    /* implement initialization of the object */
    /* participants - predefined array of participants */
    /* pricing - predefined object (keyvalue collection) of pricing */
    init: function (participants, pricing) {
//      if (this.participants) return this.participants; 
      if (participants && typeof participants !== 'undefined' && typeof pricing !== 'undefined' && Array.isArray(participants)) {
        this.participants = participants;
      };
      
//      if (this.pricing) return this.pricing; 
      if (pricing) {
        this.pricing = pricing;
      }; 
    },     

//--------------------------------------------------Method findParticipant
    /* pass found participant into callback, stops on first match */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with found participant as argument or with null if not */
    /* callbackFunction (participant) => {} */
    findParticipant: function (functor, callbackFunction) {
      if (this.isBusy || typeof functor !== 'function') {
        return false;
      };
      this.isBusy = true;

        setTimeout(() => {
            let length = this.participants.length;
            
            for (let i = 0; i < length; i++) {
                if ( functor(this.participants[i]) ) {
                    callbackFunction(this.participants[i]); 
                    break;
                } 
            };
           this.isBusy = false;
           callbackFunction(null);
        });
    },   

//----------------------------------------------Method findParticipants    
    /* pass array of found participants into callback */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
    findParticipants: function (functor, callbackFunction) {
        if (this.isBusy || typeof functor !== 'function') {
          return false;
        };
        this.isBusy = true;
  
          setTimeout(() => {

              let length = this.participants.length;
              var result = [];
              for (let i = 0; i < length; i++) {
                  if ( functor(this.participants[i]) ) {
                      result.push(this.participants[i]); 
                  } 
              };
              this.isBusy = false;
              callbackFunction(result);
          });
      },   

 //----------------------------------------------Method addParticipant  
    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
    addParticipant: function (participantObject, callbackFunction) {
          if (this.isBusy || typeof participantObject === 'undefined') {
            return false;
          };
          this.isBusy = true;
          var err = 'в объекте participant отсутствует обязательный кключ seniorityLevel'
            setTimeout(() => {
                if ( participantObject.hasOwnProperty('seniorityLevel') ) {
                  this.participants.push(participantObject);
                  this.isBusy = false;  
                  callbackFunction(); 
                 
                };

                // for (key in participantObject) {
                //     if (key == 'seniorityLevel') {
                //       this.participants.push(participantObject);  
                //       callbackFunction();  
                //     };
                // };

                this.isBusy = false;
                callbackFunction(err);
                
            });
     },

//-------------------------------------------------------Method removeParticipant     
    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
    removeParticipant: function (participantObject, callbackFunction) { 
    //    if (this.isBusy) {
    //      return false;
    //    };
       this.isBusy = true;
          setTimeout(() => {
           
            if (this.participants.length > 0 && participantObject && typeof participantObject !== 'undefined') {
                
                var participantToRemove = JSON.stringify(participantObject);
                let length = this.participants.length;
                
                    
                 for (let i = 0; i < length; i++) {
                    if ( this.participants[i] === participantObject ) {
//                    if ( JSON.stringify( this.participants[i] ) === participantToRemove ) {
                      this.participants.splice(i, 1);
                      callbackFunction(participantObject);
     
                    }; 
                 };
              };
              
              this.isBusy = false;
              callbackFunction(null); 

           });
   },

//---------------------------------------------------Method setPricing
    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
    setPricing: function (participantPriceObject, callbackFunction) {
    if (this.isBusy) {
      return false;
    };
        this.isBusy = true;
        
          setTimeout(() => {

            for (key in participantPriceObject) {
                if (typeof participantPriceObject[key] === 'number') {
//                if ( !this.pricing.hasOwnProperty(key) ) { 
                    this.pricing[key] = participantPriceObject[key];
//                };
                };
             };
             this.isBusy = false;
             callbackFunction();
          });
     },

//------------------------------------------------------------Method setPricing     
    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
    calculateSalary: function (periodInDays) { 
       var salary = 0;
       let length = this.participants.length;
       
          for (let i = 0; i < length; i++) {
       
             for (key in this.participants[i]) {
                 if (key == 'seniorityLevel') {
                     var worker = this.participants[i][key];

                       if ( this.pricing[worker] ) {
                        salary += periodInDays * 8 * this.pricing[worker];
                       } else {
                       throw Error('pricing wasn\'t found');    
                       };
                 };
             };
          };
         this.calculateSalary = +salary;
         return this.calculateSalary;
        }
 }

//------------------------------------------------------------------------------------------------

 
const ProjectModule = {           
    getInstance: function ()  {

//        if (!ProjectModule.getInstance) {
//            instance = function () {
                for (key in project) {
                  this[key] = project[key]; 
                 };
                 return ProjectModule.getInstance;
 //             }
 //       };
 //   ProjectModule.getInstance = this; 
    }
 };

 ProjectModule.getInstance();



//-------------------Экспорт результатов
module.exports = {
    firstName: 'andrei',
    secondName: 'zuikov',
    task: ProjectModule   
}

