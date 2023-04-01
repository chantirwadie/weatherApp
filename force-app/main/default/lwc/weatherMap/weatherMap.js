import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CITY_CHANNEL from '@salesforce/messageChannel/CitySelected__c';
import getWeatherDetails from '@salesforce/apex/WeatherController.getWeatherDetails';

export default class weatherMap extends LightningElement {
    @api city;

    @wire(MessageContext)
    messageContext;

    subscription;
    mapMarkers=[]

    @wire(getWeatherDetails, { city: '$city' })
    weatherDetails;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            CITY_CHANNEL,
            (message) => {
                this.city = message.city;
                console.log(city)


            }
        );
    }
    get cityLatLong() {
        const Latitude = this.weatherDetails.data.coord.lat;
        const Longitude = this.weatherDetails.data.coord.lon;
        console.log(Latitude)
       return [{
          location: { Latitude, Longitude },
          title: "paris",
          description: `Coords: ${Latitude}, ${Longitude}`,
          icon: 'utility:animal_and_nature'
        }];
  }
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}

