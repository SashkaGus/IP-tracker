import {addTileLayer, validateIp} from './helpers'
import L, { marker } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import icon from '../images/icon-location.svg';


const mapArea = document.querySelector('.map')
const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('.search-bar__btn')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40]
    // iconAnchor: [22, 94]
})

const map = L.map(mapArea, {
    center:[51.5, 0],
    zoom: 10,
    zoomControl: false
    
});

addTileLayer(map)
L.marker([51.5, 0], {icon: markerIcon}).addTo(map)

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

function getData(){
    if (validateIp(ipInput.value)){  
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_hdeIKxBMpQwxwhNJtqhaBPQkQH9TN&ipAddress=${ipInput.value}`)
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
    const {lat, lng, country, region, timezone} = mapData.location;
    debugger
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = `${mapData.location.country} ${mapData.location.region}`
    timezoneInfo.innerText = mapData.location.timezone
    ispInfo.innerText = mapData.isp
    map.setView([lat, lng]);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}