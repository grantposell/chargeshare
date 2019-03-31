var MapStyle = [
  {
    "featureType": "administrative",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "stylers": [
      {
        "weight": 1
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "color": "#F5F5F5"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#FFFFFF"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "stylers": [
      {
        "color": "#F5F5F5"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];
    var ClusterStyle = [{
            url: 'https://chargesharenetwork.com/wp-content/uploads/2018/11/m1.png',
            height: 35,
            width: 35,
            anchor: [16, 0],
            textColor: '#FFFFFF',
            textSize: 12
        },
        {
            url: 'https://chargesharenetwork.com/wp-content/uploads/2018/11/m3.png',
            height: 50,
            width: 50,
            anchor: [32, 0],
            textColor: '#FFFFFF',
            textSize: 14
        },
        {
            url: 'https://chargesharenetwork.com/wp-content/uploads/2018/11/m5.png',
            height: 65,
            width: 65,
            anchor: [32, 0],
            textColor: '#FFFFFF',
            textSize: 16
        }
    ];

    var markerCluster = null;
    var map = null;
    var CurrentYear = 2019;

    function CreateMarker(location) {
        var MarkerIcons = [
            new google.maps.MarkerImage('https://chargesharenetwork.com/wp-content/uploads/2018/11/Level3Icon.png', new google.maps.Size(35, 35)),
        ];

        var marker = new google.maps.Marker({
            position: location.position,
            icon: MarkerIcons[(location.Level - 3)]
        });
        var infowindow = new google.maps.InfoWindow({
            content: location.title
        });
        marker.addListener('mouseover', function () {
            infowindow.open(map, marker);
        });
        marker.addListener('mouseout', function () {
            infowindow.close(map, marker);
        });

        return marker;
    }

    function onPlanHovered(bHovering, year) {
        if (CurrentYear != Number(year.value)) {
            if (bHovering == true) {
                refreshMap(year.value)
            } else {
                refreshMap(CurrentYear);
            }
        }
    }

    function onPlanSelected(year) {
        CurrentYear = year.value;
        /*map.setZoom(4);
        map.setCenter({
            lat: 38.8403,
            lng: -97.6114
        });
        */
    }

    function refreshMap(year) {
        if (markerCluster) {
            markerCluster.clearMarkers();
        }
        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = [];

        for (var i = 0; i < locations.length; i++) {
            if (locations[i].Year <= year) {
                markers.push(CreateMarker(locations[i]));
            }
        }

        // Add a marker clusterer to manage the markers.
        markerCluster = new MarkerClusterer(map, markers, {
            styles: ClusterStyle,
            gridSize: 90
        });
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 38.8403,
                lng: -97.6114
            },
            zoom: 4,
            minZoom: 4,
            maxZoom: 8,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: MapStyle,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        var icons = {
            L3: {
                name: 'Fast',
                icon: 'https://chargesharenetwork.com/wp-content/uploads/2018/11/Level3Icon.png'
            },
        };

        var legend = document.createElement('div');
        legend.id = "legend";
        legend.style = "opacity: 0.9;";
        for (var key in icons) {
            var type = icons[key];
            var name = type.name;
            var icon = type.icon;
            var div = document.createElement('div');
            div.innerHTML = '<img src="' + icon + '"> ' + name;
            legend.appendChild(div);
        }

        var PlanYears = document.getElementById("PlanYears");
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
        map.controls[google.maps.ControlPosition.TOP].push(PlanYears);

        refreshMap(2019);
    }

    var locations = [{
            position: {
                lat: 34.87234,
                lng: -86.92665
            },
            title: 'Piney Chapel, AL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.53024,
                lng: -86.80521
            },
            title: 'Birmingham, AL',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 32.3728,
                lng: -86.31755
            },
            title: 'Montgomery, AL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 30.69895,
                lng: -88.04921
            },
            title: 'Mobile, AL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.91703,
                lng: -111.46215
            },
            title: 'Page, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.9443,
                lng: -109.59592
            },
            title: 'Mexican Water, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.11649,
                lng: -111.3787
            },
            title: 'Moenave, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.9443,
                lng: -109.59592
            },
            title: 'Mexican Water, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 35.21766,
                lng: -114.076
            },
            title: 'Kingman, AZ',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 35.19354,
                lng: -111.69054
            },
            title: 'Flagstaff, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.90426,
                lng: -110.17119
            },
            title: 'Holbrook, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 35.28327,
                lng: -109.20763
            },
            title: 'Houck, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.32333,
                lng: -112.12906
            },
            title: 'Spring Valley, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.97442,
                lng: -112.73638
            },
            title: 'Wickenburg, AZ',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 33.6597,
                lng: -114.25293
            },
            title: 'Quartzsite, AZ',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 33.42391,
                lng: -112.09412
            },
            title: 'Phoenix, AZ',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 32.9458,
                lng: -112.70386
            },
            title: 'Gila Bend, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 32.69883,
                lng: -114.62647
            },
            title: 'Yuma, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 32.22888,
                lng: -110.97873
            },
            title: 'Tuscon, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 32.37484,
                lng: -109.68553
            },
            title: 'Raso, AZ',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.31508,
                lng: -91.47969
            },
            title: 'Hardy, AR',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.05513,
                lng: -94.15743
            },
            title: 'Fayetteville, AR',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 35.83673,
                lng: -90.72666
            },
            title: 'Jonesboro, AR',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 35.38591,
                lng: -94.41893
            },
            title: 'Fort Smith, AR',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.75215,
                lng: -92.28604
            },
            title: 'Little Rock, AR',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.44211,
                lng: -94.05064
            },
            title: 'Texarkana, AR',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 41.41024,
                lng: -122.38401
            },
            title: 'Wood, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 41.4893,
                lng: -120.54887
            },
            title: 'Alturas, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 41.19236,
                lng: -120.94987
            },
            title: 'Adin, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.59096,
                lng: -122.41696
            },
            title: 'Redding, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.55553,
                lng: -124.14686
            },
            title: 'Ferndale, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 39.53297,
                lng: -122.20273
            },
            title: 'Willows, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 39.41496,
                lng: -123.36134
            },
            title: 'Wilits, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 38.61038,
                lng: -121.51609
            },
            title: 'Sacramento, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 38.43206,
                lng: -122.71315
            },
            title: 'Santa Rosa, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 37.78325,
                lng: -122.40937
            },
            title: 'San Francisco, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 37.63853,
                lng: -120.99162
            },
            title: 'Modesto, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 37.81123,
                lng: -118.48981
            },
            title: 'Benton, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 37.2466,
                lng: -121.78715
            },
            title: 'San Jose, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.98303,
                lng: -122.02214
            },
            title: 'Santa Cruz, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.99019,
                lng: -121.38122
            },
            title: 'San Felipe, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 37.05641,
                lng: -120.96754
            },
            title: 'Volta, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.72055,
                lng: -119.80167
            },
            title: 'Fresno, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.43233,
                lng: -120.39504
            },
            title: 'Centua Creek, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.59617,
                lng: -118.06135
            },
            title: 'Lone Pine, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.25368,
                lng: -120.24124
            },
            title: 'Huron, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.12042,
                lng: -121.02017
            },
            title: 'San Lucas, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 35.99522,
                lng: -119.96521
            },
            title: 'Murray, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 35.61598,
                lng: -119.65765
            },
            title: 'Lost Hills, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 35.39926,
                lng: -119.39563
            },
            title: 'Buttonwillow, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 35.37462,
                lng: -119.0174
            },
            title: 'Bakersfield, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 35.68122,
                lng: -117.86084
            },
            title: 'Ridgecrest, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 34.99386,
                lng: -120.43047
            },
            title: 'Santa Maria, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 35.09255,
                lng: -118.14679
            },
            title: 'Mojave, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 34.9417,
                lng: -118.93301
            },
            title: 'Wheelridge, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.81732,
                lng: -118.88773
            },
            title: 'Gorman, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.9899,
                lng: -117.54829
            },
            title: 'Boron, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.41173,
                lng: -119.72665
            },
            title: 'Santa Barbara, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.89737,
                lng: -117.01789
            },
            title: 'Barstow, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 35.28749,
                lng: -116.06515
            },
            title: 'Baker, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.438,
                lng: -118.59424
            },
            title: 'Santa Clarita, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.14305,
                lng: -116.40315
            },
            title: 'Yucca Valley, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.88744,
                lng: -114.76602
            },
            title: 'Needles, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.08062,
                lng: -117.27692
            },
            title: 'San Bernardino, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.92454,
                lng: -116.58443
            },
            title: 'Palm Springs, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 34.17588,
                lng: -114.58521
            },
            title: 'Vidal Junction, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.05969,
                lng: -118.41952
            },
            title: 'Beverly Hills, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 34.06161,
                lng: -118.30889
            },
            title: 'Central LA, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 34.04824,
                lng: -118.24033
            },
            title: 'LA Downtown, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 34.04824,
                lng: -118.24033
            },
            title: 'USC, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 34.04824,
                lng: -118.24033
            },
            title: 'Exposition Park, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 34.04824,
                lng: -118.24033
            },
            title: 'Ladera Heights, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.92389,
                lng: -118.3264
            },
            title: 'Hawthorne, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.79369,
                lng: -118.12637
            },
            title: 'Long Beach, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.43401,
                lng: -117.62718
            },
            title: 'San Clemente, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.17369,
                lng: -117.35245
            },
            title: 'Carlsbad, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 33.12425,
                lng: -117.10526
            },
            title: 'Escondido, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 32.85125,
                lng: -117.18216
            },
            title: 'North San Diego, CA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 32.77854,
                lng: -117.00364
            },
            title: 'La Mesa, CA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 32.82932,
                lng: -116.62873
            },
            title: 'Pine Valley, CA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 32.64103,
                lng: -116.14808
            },
            title: 'Jacumba Hot Springs, CA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 32.77524,
                lng: -115.50812
            },
            title: 'El Centro, CA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 40.57404,
                lng: -105.09237
            },
            title: 'Fort Collins, CO',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.62431,
                lng: -103.21938
            },
            title: 'Sterling, CO',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.508,
                lng: -107.5621
            },
            title: 'Craig, CO',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 39.09257,
                lng: -108.49637
            },
            title: 'Grand Junction, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.55363,
                lng: -107.33457
            },
            title: 'Glenwood Springs, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.58856,
                lng: -106.10135
            },
            title: 'Frisco, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.71746,
                lng: -104.83968
            },
            title: 'Aurora, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.26999,
                lng: -103.67674
            },
            title: 'Limon, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.304,
                lng: -102.27644
            },
            title: 'Burlington, CO',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 38.47462,
                lng: -107.8696
            },
            title: 'Montrose, CO',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 38.81588,
                lng: -104.79334
            },
            title: 'Colorado Springs, CO',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 38.26592,
                lng: -104.61995
            },
            title: 'Pueblo, CO',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 37.99561,
                lng: -103.53554
            },
            title: 'La Junta, CO',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 37.6289,
                lng: -104.78249
            },
            title: 'Walsenburg, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 37.4784,
                lng: -105.84178
            },
            title: 'Alamosa, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 37.27761,
                lng: -107.01732
            },
            title: 'Pagosa Springs, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 37.27268,
                lng: -107.8829
            },
            title: 'Durango, CO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 41.7499,
                lng: -72.65473
            },
            title: 'Hartford, CT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.3956,
                lng: -73.48579
            },
            title: 'Danbury, CT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.37096,
                lng: -72.19414
            },
            title: 'New London, CT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.29172,
                lng: -72.92295
            },
            title: 'New Haven, CT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.04564,
                lng: -73.57934
            },
            title: 'Samford, CT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.68214,
                lng: -75.65965
            },
            title: 'New Castle, DE',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 39.14387,
                lng: -75.50447
            },
            title: 'Dover, DE',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 38.77509,
                lng: -75.13294
            },
            title: 'Lewes, DE',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 30.4952,
                lng: -87.2556
            },
            title: 'Pensacola, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 30.19964,
                lng: -85.80191
            },
            title: 'Panama City Beach, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 30.78596,
                lng: -85.52749
            },
            title: 'Chipley, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 30.45559,
                lng: -84.31867
            },
            title: 'Tallahassee, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 30.18952,
                lng: -82.64756
            },
            title: 'Lake City, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 30.32057,
                lng: -81.65674
            },
            title: 'Jacksonville, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 29.63131,
                lng: -82.3676
            },
            title: 'Gainesville, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 29.32638,
                lng: -82.76841
            },
            title: 'Otter Creek, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 29.17949,
                lng: -82.17938
            },
            title: 'Ocala, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 29.20007,
                lng: -81.02257
            },
            title: 'Daytona Beach, FL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 28.52738,
                lng: -82.24653
            },
            title: 'Ridge Manor, FL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 28.54943,
                lng: -81.34647
            },
            title: 'Orlando, FL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 28.35832,
                lng: -80.80458
            },
            title: 'Cocoa Beach, FL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 27.96026,
                lng: -82.42411
            },
            title: 'Tampa, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 28.10759,
                lng: -81.97034
            },
            title: 'Lakeland, FL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 27.24481,
                lng: -80.35796
            },
            title: 'Port St. Lucie, FL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 26.69063,
                lng: -81.80253
            },
            title: 'Fort Myers, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 26.69957,
                lng: -80.07139
            },
            title: 'West Palm Beach, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 26.16983,
                lng: -81.72665
            },
            title: 'Naples, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 26.26074,
                lng: -80.13428
            },
            title: 'Boca Raton, FL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 25.76088,
                lng: -80.17094
            },
            title: 'Miami, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 25.08124,
                lng: -80.46322
            },
            title: 'Key Largo, FL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 24.57767,
                lng: -81.74198
            },
            title: 'Key West, FL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 33.73451,
                lng: -84.37242
            },
            title: 'Atlanta, GA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.47218,
                lng: -82.00504
            },
            title: 'Augusta, GA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.86044,
                lng: -83.60831
            },
            title: 'Macon, GA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.11111,
                lng: -81.10285
            },
            title: 'Savannah, GA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 31.46922,
                lng: -83.53215
            },
            title: 'Tifton, GA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 21.37455,
                lng: -157.91479
            },
            title: 'Halawa, HI',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 48.69353,
                lng: -116.32542
            },
            title: 'Bonners Ferry,ID',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.41346,
                lng: -117.02176
            },
            title: 'Lewiston,ID',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.97295,
                lng: -116.28568
            },
            title: 'McCall,ID',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.18437,
                lng: -113.87835
            },
            title: 'Salmon,ID',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.22079,
                lng: -114.92831
            },
            title: 'Stanley,ID',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 43.59934,
                lng: -116.2294
            },
            title: 'Boise,ID',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.51176,
                lng: -112.07657
            },
            title: 'Idaho Falls,ID',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.56426,
                lng: -114.49356
            },
            title: 'Twin Falls,ID',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.84614,
                lng: -87.60925
            },
            title: 'Chicago,IL',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 40.50595,
                lng: -89.01293
            },
            title: 'Bloomington,IL',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 40.13176,
                lng: -88.26462
            },
            title: 'Champaign,IL',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.12493,
                lng: -88.5336
            },
            title: 'Effingham,IL',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 38.28173,
                lng: -88.91328
            },
            title: 'Mt Vernon,IL',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.68417,
                lng: -86.22258
            },
            title: 'South Bend,IN',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 41.10158,
                lng: -85.1624
            },
            title: 'Fort Wayne,IN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.7593,
                lng: -87.12006
            },
            title: 'Remington,IN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.77712,
                lng: -86.13309
            },
            title: 'Indianapolis,IN',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.18011,
                lng: -87.46092
            },
            title: 'Elberfeld,IN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.51884,
                lng: -96.42983
            },
            title: 'Sioux City,IA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.60376,
                lng: -93.63456
            },
            title: 'Des Moines,IA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.00555,
                lng: -91.69326
            },
            title: 'Cedar Rapids,IA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 41.55688,
                lng: -90.54977
            },
            title: 'Davenport,IA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.3786,
                lng: -101.07137
            },
            title: 'Colby,KS',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.57944,
                lng: -97.6599
            },
            title: 'Concordia,KS',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.10434,
                lng: -94.48679
            },
            title: 'Kansas City,KS',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.88835,
                lng: -99.32112
            },
            title: 'Hays,KS',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 38.82582,
                lng: -97.66908
            },
            title: 'Salina,KS',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.04304,
                lng: -95.6265
            },
            title: 'Topeka,KS',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.04321,
                lng: -102.01394
            },
            title: 'Coolidge,KS',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.00342,
                lng: -100.86502
            },
            title: 'Garden City,KS',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 37.55691,
                lng: -99.63735
            },
            title: 'Bucklin,KS',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 37.6819,
                lng: -97.35483
            },
            title: 'Wichita,KS',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 37.06525,
                lng: -88.10562
            },
            title: 'Kuttawa,KY',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 36.98233,
                lng: -86.47352
            },
            title: 'Bowling Green,KY',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 38.24774,
                lng: -85.8093
            },
            title: 'Louisville,KY',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.02954,
                lng: -84.51152
            },
            title: 'Lexington,KY',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 37.14073,
                lng: -84.07103
            },
            title: 'London,KY',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 32.47718,
                lng: -93.77414
            },
            title: 'Shreveport,LA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.51115,
                lng: -92.12035
            },
            title: 'Monroe,LA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 31.30665,
                lng: -92.44441
            },
            title: 'Alexandria,LA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 30.26275,
                lng: -93.21026
            },
            title: 'Lake Charles,LA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 30.4616,
                lng: -91.13813
            },
            title: 'Baton Rouge,LA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 30.30612,
                lng: -89.80153
            },
            title: 'Slidell,LA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 29.97092,
                lng: -90.11976
            },
            title: 'New Orleans,LA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 46.86497,
                lng: -68.00005
            },
            title: 'Caribou,ME',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.129,
                lng: -67.83983
            },
            title: 'Houlton,ME',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.1236,
                lng: -67.35657
            },
            title: 'Alexander,ME',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.80148,
                lng: -68.77825
            },
            title: 'Bangor,ME',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.61971,
                lng: -70.36226
            },
            title: 'Portland,ME',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.30798,
                lng: -79.45867
            },
            title: 'Redhouse,MD',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 39.68656,
                lng: -79.24938
            },
            title: 'Keysers Ridge,MD',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 39.64358,
                lng: -78.7997
            },
            title: 'Ridgely,MD',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 39.64545,
                lng: -77.74316
            },
            title: 'Hagerstown,MD',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 39.29012,
                lng: -76.62899
            },
            title: 'Baltimore,MD',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 38.87488,
                lng: -77.00137
            },
            title: 'Washington DC,MD',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.98538,
                lng: -76.16193
            },
            title: 'Queenstown,MD',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 38.39773,
                lng: -75.57278
            },
            title: 'Salisbury,MD',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.61675,
                lng: -72.5913
            },
            title: 'Greenfield,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.5278,
                lng: -71.73447
            },
            title: 'Leominster,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.37114,
                lng: -71.0728
            },
            title: 'Boston,MA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 42.44987,
                lng: -73.26502
            },
            title: 'Pittsfield,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.29863,
                lng: -73.2965
            },
            title: 'Stockbridge,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.1612,
                lng: -72.60899
            },
            title: 'Springfield,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.13731,
                lng: -72.04533
            },
            title: 'Sturbridge,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.19511,
                lng: -71.84248
            },
            title: 'Auburn,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 41.68362,
                lng: -71.12217
            },
            title: 'Fall River,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 41.78066,
                lng: -70.54343
            },
            title: 'Sandwich,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.0597,
                lng: -70.18353
            },
            title: 'Provincetown,MA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 44.77082,
                lng: -85.63497
            },
            title: 'Traverse City,MI',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 44.56567,
                lng: -84.71478
            },
            title: 'Roscommon,MI',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 43.42396,
                lng: -83.89425
            },
            title: 'Saginaw,MI',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.93553,
                lng: -85.67619
            },
            title: 'Grand Rapids,MI',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.72581,
                lng: -84.54716
            },
            title: 'Lansing,MI',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.3353,
                lng: -83.08288
            },
            title: 'Detroit,MI',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 42.31375,
                lng: -85.03652
            },
            title: 'Battle Creek,MI',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 47.94778,
                lng: -97.09999
            },
            title: 'Grand Forks,MN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 47.46717,
                lng: -94.88819
            },
            title: 'Bemidiji,MN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 47.22897,
                lng: -93.53687
            },
            title: 'Grand Rapids,MN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.77576,
                lng: -92.1122
            },
            title: 'Duluth,MN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.84549,
                lng: -95.39533
            },
            title: 'Alexandria,MN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.02324,
                lng: -93.2421
            },
            title: 'Minneapolis,MN',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 43.67002,
                lng: -93.29872
            },
            title: 'Albert Lea,MN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 34.26793,
                lng: -88.69102
            },
            title: 'Tupelo,MS',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.77166,
                lng: -89.84459
            },
            title: 'Granada,MS',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.50401,
                lng: -88.41032
            },
            title: 'Columbus,MS',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.31949,
                lng: -90.18562
            },
            title: 'Jackson,MS',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.37409,
                lng: -88.71743
            },
            title: 'Meridian,MS',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 31.5381,
                lng: -91.39659
            },
            title: 'Natchez,MS',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 31.24715,
                lng: -90.4662
            },
            title: 'McComb,MS',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 31.33449,
                lng: -89.32362
            },
            title: 'Hattiesburg,MS',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 30.36026,
                lng: -89.09839
            },
            title: 'Gulfport,MS',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 40.47694,
                lng: -93.99093
            },
            title: 'Eagleville,MO',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.4226,
                lng: -95.55299
            },
            title: 'Rock Port,MO',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.82194,
                lng: -94.81141
            },
            title: 'St. Joseph,MO',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 38.94982,
                lng: -92.33461
            },
            title: 'Columbia,MO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.60921,
                lng: -90.24778
            },
            title: 'St. Louis,MO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 37.84309,
                lng: -94.337
            },
            title: 'Nevada,MO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 37.95063,
                lng: -91.77163
            },
            title: 'Rolla,MO',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 37.21007,
                lng: -93.27538
            },
            title: 'Springfield,MO',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.8995,
                lng: -89.53118
            },
            title: 'Sikeston,MO',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 48.5227,
                lng: -111.87332
            },
            title: 'Shelby,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 48.3642,
                lng: -107.85533
            },
            title: 'Malta,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.92303,
                lng: -114.03256
            },
            title: 'Missoula,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 47.516,
                lng: -111.35697
            },
            title: 'Great Falls,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 47.09883,
                lng: -104.76517
            },
            title: 'Glendive,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.60294,
                lng: -112.03812
            },
            title: 'Helena,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.00646,
                lng: -112.5073
            },
            title: 'Butte,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.81918,
                lng: -108.46433
            },
            title: 'Billings,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.44911,
                lng: -105.41841
            },
            title: 'Broadus,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.68825,
                lng: -111.10261
            },
            title: 'West Yellowstone,MT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.84161,
                lng: -103.0316
            },
            title: 'Chandron,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.87382,
                lng: -100.55968
            },
            title: 'Valentine,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.0508,
                lng: -97.44125
            },
            title: 'Norfolk,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.85596,
                lng: -103.66654
            },
            title: 'Scott Bluff,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.15585,
                lng: -100.74746
            },
            title: 'North P{position: {latte,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.93236,
                lng: -98.31948
            },
            title: 'Grand Island,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.81743,
                lng: -98.3708
            },
            title: 'Alda,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.52131,
                lng: -97.59398
            },
            title: 'Geneva,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.82409,
                lng: -96.72303
            },
            title: 'Lincoln,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.24118,
                lng: -95.89735
            },
            title: 'Omaha,NE',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.98343,
                lng: -117.71382
            },
            title: 'McDermitt,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.97477,
                lng: -117.74552
            },
            title: 'Winnemucca,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 41.27033,
                lng: -114.82267
            },
            title: 'Melandco,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.82518,
                lng: -115.7649
            },
            title: 'Elko,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.73343,
                lng: -114.0945
            },
            title: 'West Wendover,NV',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.53154,
                lng: -119.80222
            },
            title: 'Reno,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 39.4662,
                lng: -118.779
            },
            title: 'Fallon,NV',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.48379,
                lng: -117.00919
            },
            title: 'Austin,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 39.23587,
                lng: -114.8888
            },
            title: 'Ely,NV',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.14108,
                lng: -119.7706
            },
            title: 'Carson City,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 38.04036,
                lng: -117.29845
            },
            title: 'Tonopah,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 37.51066,
                lng: -115.23302
            },
            title: 'Crystal Springs,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.17898,
                lng: -115.14556
            },
            title: 'Las Vegas,NV',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 43.23041,
                lng: -71.52596
            },
            title: 'Concord,NH',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.93415,
                lng: -75.09306
            },
            title: 'Portland,NJ',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.71664,
                lng: -74.16087
            },
            title: 'Newark,NJ',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.64319,
                lng: -74.81923
            },
            title: 'Lebanon,NJ',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.27799,
                lng: -74.69745
            },
            title: 'Trenton,NJ',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.39605,
                lng: -74.53334
            },
            title: 'Atlantic City,NJ',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 36.72006,
                lng: -107.99191
            },
            title: 'Bloomfield,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.93422,
                lng: -104.46375
            },
            title: 'Raton,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.4497,
                lng: -103.18933
            },
            title: 'Clayton,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.41237,
                lng: -105.58815
            },
            title: 'Taos,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.37258,
                lng: -104.60366
            },
            title: 'Springer,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.70633,
                lng: -105.91499
            },
            title: 'Santa Fe,NM',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 35.58578,
                lng: -105.21889
            },
            title: 'Las Vegas,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.15615,
                lng: -107.86956
            },
            title: 'Grants,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.08499,
                lng: -106.67764
            },
            title: 'Albuquerque,NM',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 34.95904,
                lng: -104.71109
            },
            title: 'Santa Rosa,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 34.38611,
                lng: -103.2063
            },
            title: 'Clovis,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.91932,
                lng: -106.87782
            },
            title: 'San Antonio,NM',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 33.42607,
                lng: -104.54195
            },
            title: 'Roswell,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.37281,
                lng: -108.72104
            },
            title: 'Lordsburg,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.28463,
                lng: -107.77957
            },
            title: 'Deming,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.31029,
                lng: -106.76319
            },
            title: 'Las Cruces,NM',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.7121,
                lng: -73.46428
            },
            title: 'lattsburgh,NY',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 43.66803,
                lng: -73.78549
            },
            title: 'Chestertown,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.05238,
                lng: -76.14792
            },
            title: 'Syracuse,NY',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 43.03686,
                lng: -75.06611
            },
            title: 'Herkimer,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.78124,
                lng: -74.01212
            },
            title: 'Rotterdam,NY',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 42.6376,
                lng: -73.69597
            },
            title: 'Albany,NY',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 42.87695,
                lng: -78.88299
            },
            title: 'Buffalo,NY',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 43.04279,
                lng: -77.64084
            },
            title: 'Rochester,NY',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 42.09542,
                lng: -78.63657
            },
            title: 'Carrolton,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.45129,
                lng: -76.51201
            },
            title: 'Ithica,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.09843,
                lng: -75.8437
            },
            title: 'Binghampton,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.44535,
                lng: -75.06048
            },
            title: 'Oneonta,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.36172,
                lng: -74.48938
            },
            title: 'Grand Gorge,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.24433,
                lng: -73.89067
            },
            title: 'Leeds,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.80686,
                lng: -74.73188
            },
            title: 'Liberty,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.52368,
                lng: -74.08858
            },
            title: 'Newburgh,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.01527,
                lng: -73.71861
            },
            title: 'White Plains,NY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.79969,
                lng: -73.27068
            },
            title: 'Brentwood,NY',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.01564,
                lng: -79.84201
            },
            title: 'Greensboro,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.01898,
                lng: -78.8601
            },
            title: 'Durham,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.97879,
                lng: -77.87867
            },
            title: 'Nashville,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.5748,
                lng: -77.07155
            },
            title: 'Washington,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.08401,
                lng: -84.03332
            },
            title: 'Murphy,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.6031,
                lng: -82.55516
            },
            title: 'Asheville,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.24172,
                lng: -80.86946
            },
            title: 'Charlotte,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.00559,
                lng: -78.86305
            },
            title: 'Fayetteville,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 34.75707,
                lng: -77.43534
            },
            title: 'Jacksonville,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 34.21601,
                lng: -77.88002
            },
            title: 'Wilmington,NC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 48.19455,
                lng: -103.63221
            },
            title: 'Williston,ND',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 48.23481,
                lng: -101.29861
            },
            title: 'Minot,ND',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.87519,
                lng: -96.76606
            },
            title: 'Fargo,ND',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.83217,
                lng: -100.80239
            },
            title: 'Bismarck,ND',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 46.19348,
                lng: -103.39564
            },
            title: 'Bowman,ND',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.62478,
                lng: -83.54431
            },
            title: 'Toledo,OH',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.49012,
                lng: -81.70166
            },
            title: 'Cleveland,OH',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.0939,
                lng: -81.51489
            },
            title: 'Akron,OH',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.74651,
                lng: -84.20342
            },
            title: 'Dayton,OH',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.001,
                lng: -83.00159
            },
            title: 'Columbus,OH',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.04489,
                lng: -81.57947
            },
            title: 'Cambridge,OH',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.0434,
                lng: -84.58362
            },
            title: 'Cincinnati,OH',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.42989,
                lng: -99.3853
            },
            title: 'Woodard,OK',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.13331,
                lng: -95.89663
            },
            title: 'Tulsa,OK',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 35.218,
                lng: -99.88144
            },
            title: 'Erick,OK',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.47661,
                lng: -97.51303
            },
            title: 'Oklahoma City,OK',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.18959,
                lng: -97.16348
            },
            title: 'Ardmore,OK',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 45.89465,
                lng: -123.96894
            },
            title: 'Cannon Beach,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.60196,
                lng: -121.1462
            },
            title: 'The Dalles,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.79571,
                lng: -119.42122
            },
            title: 'Echo,OR',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 45.60823,
                lng: -122.76853
            },
            title: 'Portland,OR',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 44.94337,
                lng: -123.07614
            },
            title: 'Salem,OR',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 44.06583,
                lng: -123.12009
            },
            title: 'Eugene,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.06255,
                lng: -121.34237
            },
            title: 'Bend,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.42491,
                lng: -119.13022
            },
            title: 'Mt. Vernon,OR',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 44.75319,
                lng: -117.80786
            },
            title: 'Baker City,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.30367,
                lng: -122.87839
            },
            title: 'Medford,OR',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 42.21858,
                lng: -121.77735
            },
            title: 'Klamanth Falls,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.4962,
                lng: -120.28395
            },
            title: 'Valley Falls,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.61087,
                lng: -119.01339
            },
            title: 'Burns,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.77469,
                lng: -117.84789
            },
            title: 'Rome,OR',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.11387,
                lng: -80.08164
            },
            title: 'Erie,PA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.80918,
                lng: -77.08528
            },
            title: 'Mansfield,PA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 41.41076,
                lng: -75.61262
            },
            title: 'Scranton,PA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 41.20792,
                lng: -80.16331
            },
            title: 'Mercer,PA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.94718,
                lng: -77.74777
            },
            title: 'Bellefonte,PA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.58064,
                lng: -75.55425
            },
            title: 'Allentown,PA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.41903,
                lng: -79.97489
            },
            title: 'Pittsburgh,PA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 40.05242,
                lng: -78.53829
            },
            title: 'Bedford,PA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 40.30736,
                lng: -76.84579
            },
            title: 'Harrisburg,PA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.94483,
                lng: -75.14388
            },
            title: 'Philadelphia,PA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 41.80494,
                lng: -71.42777
            },
            title: 'Providence,RI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 34.85551,
                lng: -82.39729
            },
            title: 'Greenville,SC',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 34.24366,
                lng: -79.7294
            },
            title: 'Florence,SC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.69763,
                lng: -78.88854
            },
            title: 'Myrtle Beach,SC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.99494,
                lng: -81.03935
            },
            title: 'Columbia,SC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.31148,
                lng: -80.56784
            },
            title: 'Holly Hill,SC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.78192,
                lng: -79.92049
            },
            title: 'Charleston,SC',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.51351,
                lng: -100.05353
            },
            title: 'Selby,SD',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 45.3272,
                lng: -97.05605
            },
            title: 'Summit,SD',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.06933,
                lng: -103.21286
            },
            title: 'Rapid City,SD',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.91916,
                lng: -100.08176
            },
            title: 'Presho,SD',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.60263,
                lng: -96.75063
            },
            title: 'Sioux Falls,SD',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.11062,
                lng: -86.76572
            },
            title: 'Nashville,TN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.96802,
                lng: -83.92344
            },
            title: 'Knoxville,TN',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 36.57838,
                lng: -82.27156
            },
            title: 'Bristol,TN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.17185,
                lng: -90.06815
            },
            title: 'Memphis,TN',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 35.66615,
                lng: -88.81081
            },
            title: 'Jackson,TN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.06024,
                lng: -85.29506
            },
            title: 'Chattanooga,TN',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.05989,
                lng: -102.51917
            },
            title: 'Dalhart,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 35.20005,
                lng: -101.79856
            },
            title: 'Amarillo,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 34.44511,
                lng: -100.22025
            },
            title: 'Childress,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.56789,
                lng: -101.87467
            },
            title: 'Lubbock,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.93178,
                lng: -98.50618
            },
            title: 'Wichita Falls,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 33.12254,
                lng: -95.61534
            },
            title: 'Sulphur Springs,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.75646,
                lng: -101.95467
            },
            title: 'Lamesa,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.4454,
                lng: -99.72874
            },
            title: 'Abilene,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 32.73522,
                lng: -97.43814
            },
            title: 'Fort Worth,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 32.78547,
                lng: -96.78445
            },
            title: 'Dallas,TX',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 32.33744,
                lng: -95.30988
            },
            title: 'Tyler,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 31.92846,
                lng: -102.20336
            },
            title: 'Midland,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 31.48442,
                lng: -100.45004
            },
            title: 'San Angelo,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 31.55338,
                lng: -97.14937
            },
            title: 'Waco,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 31.74254,
                lng: -96.17361
            },
            title: 'Fairfield,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 31.33687,
                lng: -94.73108
            },
            title: 'Lufkin,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 31.78431,
                lng: -106.43812
            },
            title: 'El Paso,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 31.03751,
                lng: -104.84175
            },
            title: 'Van Horn,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 30.89666,
                lng: -102.88719
            },
            title: 'Fort Stockton,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 30.70523,
                lng: -101.20521
            },
            title: 'Ozona,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 30.49081,
                lng: -99.77987
            },
            title: 'Junction,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 30.35581,
                lng: -97.71444
            },
            title: 'Austin,TX',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 30.94908,
                lng: -95.85323
            },
            title: 'Madisonville,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 30.20229,
                lng: -103.24033
            },
            title: 'Marathon,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 29.45263,
                lng: -100.90299
            },
            title: 'Del Rio,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 29.42464,
                lng: -98.42395
            },
            title: 'San Antonio,TX',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 29.65749,
                lng: -97.66082
            },
            title: 'Luling,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 29.76484,
                lng: -96.17218
            },
            title: 'Sealy,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 30.09439,
                lng: -94.11224
            },
            title: 'Beaumont,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 28.72255,
                lng: -100.47816
            },
            title: 'Elm Creek,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 28.44175,
                lng: -99.23338
            },
            title: 'Cotulla,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 28.49523,
                lng: -98.14552
            },
            title: 'Three Rivers,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 28.77629,
                lng: -96.97815
            },
            title: 'Victoria,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 29.53397,
                lng: -95.81243
            },
            title: 'Rosenburg,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 29.30231,
                lng: -94.79939
            },
            title: 'Galveston,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 27.61306,
                lng: -99.47987
            },
            title: 'Laredo,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 27.79478,
                lng: -97.3967
            },
            title: 'Corpus Christi,TX',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 26.21258,
                lng: -98.19036
            },
            title: 'McAllen,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 25.93632,
                lng: -97.50828
            },
            title: 'Brownsville,TX',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 40.9767,
                lng: -111.43039
            },
            title: 'Echo,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.70058,
                lng: -111.88503
            },
            title: 'Salt Lake City,UT',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 40.4594,
                lng: -109.53364
            },
            title: 'Vernal,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 40.08848,
                lng: -111.58972
            },
            title: 'Spanish Fork,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.7117,
                lng: -111.82968
            },
            title: 'Nephi,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.53357,
                lng: -111.46577
            },
            title: 'Mt Pleasant,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.34994,
                lng: -112.58523
            },
            title: 'Delta,UT',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.93086,
                lng: -111.85695
            },
            title: 'Aurora,UT',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.98086,
                lng: -110.24833
            },
            title: 'Green River,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 38.5753,
                lng: -112.60147
            },
            title: 'Sulpharale,UT',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 38.58498,
                lng: -112.25653
            },
            title: 'Sewer,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 37.86773,
                lng: -109.35259
            },
            title: 'Monticello,UT',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 37.08944,
                lng: -113.582
            },
            title: 'St. George,UT',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 37.04637,
                lng: -112.52586
            },
            title: 'Kanab,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.47072,
                lng: -73.18556
            },
            title: 'Burlington,UT',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 44.40073,
                lng: -72.02899
            },
            title: 'Danville,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.61106,
                lng: -72.97642
            },
            title: 'Rutland,UT',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 39.18765,
                lng: -78.2042
            },
            title: 'Winchester,VA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 38.44694,
                lng: -78.87111
            },
            title: 'Harrisburg,VA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 38.22889,
                lng: -77.51648
            },
            title: 'Fredericksburg,VA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 38.02808,
                lng: -78.54052
            },
            title: 'Charlottesville,VA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 37.41329,
                lng: -79.11747
            },
            title: 'Lynchburg,VA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 37.51794,
                lng: -77.46707
            },
            title: 'Richmond,VA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 36.95571,
                lng: -81.07679
            },
            title: 'Wytheville,VA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.72816,
                lng: -78.12124
            },
            title: 'South Hill,VA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 36.89669,
                lng: -76.30252
            },
            title: 'Norfolk,VA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 48.75954,
                lng: -122.47587
            },
            title: 'Bellingham,WA',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 48.41799,
                lng: -122.34404
            },
            title: 'Mt. Vernon,WA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 47.65124,
                lng: -117.39195
            },
            title: 'Spokane,WA',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 47.64846,
                lng: -122.18748
            },
            title: 'Seattle,WA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 47.23608,
                lng: -122.41545
            },
            title: 'Tacoma,WA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 47.03616,
                lng: -122.90792
            },
            title: 'Olympia,WA',
            Level: 3,
            Year: 2019
        },
        {
            position: {
                lat: 46.96592,
                lng: -120.46812
            },
            title: 'Ellensburg,WA',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.57901,
                lng: -79.97795
            },
            title: 'Morgantown,WV',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 39.24494,
                lng: -81.51647
            },
            title: 'Parkersburg,WV',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 38.38442,
                lng: -81.64283
            },
            title: 'Charlestown,WV',
            Level: 3,
            Year: 2020
        },
        {
            position: {
                lat: 37.82027,
                lng: -80.42058
            },
            title: 'Lewisburg,WV',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 45.8765,
                lng: -91.83182
            },
            title: 'Trego,WI',
            Level: 3,
            Year: 2021
        },
        {
            position: {
                lat: 44.79174,
                lng: -91.43105
            },
            title: 'Eau Claire,WI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.59345,
                lng: -89.63291
            },
            title: 'Stevens Point,WI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.49471,
                lng: -87.98134
            },
            title: 'Green Bay,WI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.03051,
                lng: -88.56362
            },
            title: 'Oshkosh,WI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.10837,
                lng: -89.28191
            },
            title: 'Madison,WI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.02676,
                lng: -87.95669
            },
            title: 'Milwaukee,WI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.49791,
                lng: -108.06083
            },
            title: 'Grey Bull,WY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 44.36579,
                lng: -106.67679
            },
            title: 'Buffalo,WI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 43.32292,
                lng: -110.71692
            },
            title: 'Hoback,WI',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.83247,
                lng: -108.7429
            },
            title: 'Lander,WY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 42.86258,
                lng: -106.3472
            },
            title: 'Carper,WY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.31073,
                lng: -110.73858
            },
            title: 'Evanston,WY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.54961,
                lng: -109.9201
            },
            title: 'Little America,WY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.5911,
                lng: -109.22035
            },
            title: 'Rock Springs,WY',
            Level: 3,
            Year: 2022
        },
        {
            position: {
                lat: 41.79945,
                lng: -107.23778
            },
            title: 'Rawlins,WY',
            Level: 3,
            Year: 2022
        }];