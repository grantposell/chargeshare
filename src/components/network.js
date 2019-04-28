import React, { Component } from "./node_modules/react"

class Network extends Component{

    componentDidMount(){
        this.renderMap()
    }
    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC7wr6koSKXrM6FExgj_SF5oEEp3Ybxe0c&callback=initMap")
        window.initMap = this.initMap
    }
    initMap= () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 38.8403,
            lng: -97.6114},
            zoom: 4,
            minZoom: 4,
            maxZoom: 8,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        })
  
    }
    render(){
        return(
            <main>
            <div id="map"></div>
            </main>
        )
    }
}

function loadScript(url){
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}
export default Network;