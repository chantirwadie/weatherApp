import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CITY_CHANNEL from '@salesforce/messageChannel/CitySelected__c';
import getWeatherDetails from '@salesforce/apex/WeatherController.getWeatherDetails';

export default class WeatherDetails extends LightningElement {
    @api city;

    @wire(MessageContext)
    messageContext;
    mapMarkers = [];

    subscription;

    @wire(getWeatherDetails, { city: '$city' })
    weatherDetails;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            CITY_CHANNEL,
            (message) => {
                this.city = message.city;
                cityLatLong()
            }
        );
    }
    get weatherInfo() {

        return this.weatherDetails.data.weather[0];
      }
      get weatherIcon() {
        return "http://openweathermap.org/img/w/" +this.weatherDetails.data.weather[0].icon+".png";
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
