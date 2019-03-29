import React, { Component } from "react"

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
            center: {lat: -34.397, lng: 150.644},
            zoom:8
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