import ymaps from 'ymaps';
import {validateIp} from './helpers'

// function init() {
//     var map = new ymaps.Map('map', {
//         center: [59.94, 30.32],
//         zoom: 10
//     })
// }

ymaps
  .load()
  .then(maps => {
    const map = new maps.Map('your-map-container', {
      center: [-8.369326, 115.166023],
      zoom: 7
    });
  })
  .catch(error => console.log('Failed to load Yandex Maps', error));

// ymaps.ready(init);
const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('.search-bar__btn')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

function getData(){
    if (validateIp(ipInput.value)){  
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_hdeIKxBMpQwxwhNJtqhaBPQkQH9TN&ipAddress=${ipInput.value}`)
    .then(response => response.json())
    .then(setInfo)
    }

}

function handleKey(e){
    if (e.key === 'Enter') {
        getData();        
    }
}

function setInfo(mapData){
    console.log(mapData)
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = `${mapData.location.country} ${mapData.location.region}`
    timezoneInfo.innerText = mapData.location.timezone
    ispInfo.innerText = mapData.isp
}