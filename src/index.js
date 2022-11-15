import {validateIp} from './helpers'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';


const mapArea = document.querySelector('.map')
const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('.search-bar__btn')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')


const map = L.map(mapArea, {
    center:[51.5, 0],
    zoom: 10
    
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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