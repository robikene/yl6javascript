(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            let timeString = h + ":" + m + ":" + s;
            const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
                .toLocaleTimeString({},
                    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                );
            c.innerHTML = timeString12hr
        };
        
    });
    
    // forms

    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if (linn.value == "tln") {
            e.innerHTML = "0,00 &euro;";
        } else if (linn.value == "trt") {
            e.innerHTML = "2,50 &euro;";
        } else if (linn.value == "nrv") {
            e.innerHTML = "2,50 &euro;";
        } else {
            e.innerHTML = "3,00 &euro;";
        }    
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AtxGu-T-mjzvY3DVIQM8RiyxmgMIheae9-Owrxygcf_f0msvttH3q4yIdRtOkIie";

let map, infobox1, infobox2;

function GetMap() {
    
    "use strict";

    let firstPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let secondPoint = new Microsoft.Maps.Location(
            58.223418,
            26.417623
        );

    let centerPoint = new Microsoft.Maps.Location(
            (58.38104+58.223418)/2,
            (26.71992+26.417623)/2
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(firstPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    let secondPin = new Microsoft.Maps.Pushpin(secondPoint, {
            title: 'Elva keskväljak',
        });

    infobox1 = new Microsoft.Maps.Infobox(firstPoint, {
        visible: false
    });

    infobox2 = new Microsoft.Maps.Infobox(secondPoint, {
        visible: false
    });

    infobox1.setMap(map);
    infobox2.setMap(map);

    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Tartu Ülikool asutati aastal 1632.'
    }; 

    secondPin.metadata = {
        title: 'Elva keskväljak',
        description: 'Siin elavad paljud mu sõbrad.'
    };

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(secondPin, 'click', secondPinClicked);

    map.entities.push(pushpin);
    map.entities.push(secondPin);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox1.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}    

function secondPinClicked(e) {
    if (e.target.metadata) {
        infobox2.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}  

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

function validateForm() {
    let x = document.forms["form"]["fname"].value;
    if (x == "" || hasNumber(x)) {
        alert("Eesnimi ei saa olla tühi ja seal ei saa olla numbreid!");
        return false;
    }
    let y = document.forms["form"]["lname"].value;
    if (y == "" || hasNumber(y)) {
        alert("Perekonnanimi ei saa olla tühi ja seal ei saa olla numbreid!");
        return false;
    }
    let radios = document.getElementsByName("radio");
    let radioChecked = false;
    let i = 0;
    while (i < radios.length) {
        if (radios[i].checked) radioChecked = true;
    }
    if (!radioChecked) alert("Maksetüüp peab olema valitud!");
    return radioChecked;
}

function hasNumber(myString) {
    return /\d/.test(myString);
  }

