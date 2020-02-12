import styledMapData from "./styled-map-data.js";

let map;
const centerCords = {
  lat: 59.913559,
  lng: 30.299869
};

function styleMap() {
  const styledMapType = new google.maps.StyledMapType(styledMapData, {
    name: "Styled Map"
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set("styled_map", styledMapType);
  map.setMapTypeId("styled_map");
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: centerCords
    // disableDefaultUI: true
  });
  // styleMap();

  var marker = new google.maps.Marker({
    position: centerCords,
    map: map
  });
}

window.onload = function() {
  initMap();
};
