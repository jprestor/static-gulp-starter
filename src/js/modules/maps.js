window.initMap = function () {
  function CustomMarker(latlng, map, args) {
    this.latlng = latlng;
    this.args = args;
    this.setMap(map);
  }

  CustomMarker.prototype = new google.maps.OverlayView();

  CustomMarker.prototype.draw = function () {
    const self = this;
    let div = this.div;

    if (!div) {
      div = this.div = document.createElement('div');
      div.append(document.querySelector('.map-marker-template').content.cloneNode(true));

      div.style.position = 'absolute';

      const panes = this.getPanes();
      panes.overlayImage.appendChild(div);
    }

    const point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
      div.style.left = point.x + 'px';
      div.style.top = point.y + 'px';
    }
  };

  CustomMarker.prototype.remove = function () {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  };

  CustomMarker.prototype.getPosition = function () {
    return this.latlng;
  };


  // The location of samara
  const samara = new google.maps.LatLng(53.213363, 50.225208);

  // The map, centered at samara
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 16,
      center: samara
    });

  const overlay = new CustomMarker(
    samara,
    map, {}
  );

  // The marker, positioned at samara
  //  const marker = new google.maps.Marker({
  //    position: samara,
  //    map: map
  //  });
}
