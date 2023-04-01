import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CITY_CHANNEL from '@salesforce/messageChannel/CitySelected__c';

import getVilleOptions from '@salesforce/apex/PicklistVilleController.getVilleOptions';

export default class picklistVille extends LightningElement {
    selectedCity = '';

    @wire(MessageContext)
    messageContext;

    @wire(getVilleOptions)
    cities;

    handleChange(event) {
        this.selectedCity = event.target.value;
    }

    handleClick(event) {
        const message = {
            city: this.selectedCity
        };

        publish(this.messageContext, CITY_CHANNEL, message);
    }
}
