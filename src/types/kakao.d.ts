declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    panTo(latlng: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  class Marker {
    constructor(options?: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
  }

  interface MarkerOptions {
    position?: LatLng;
    map?: Map;
  }

  namespace event {
    function addListener(target: Map, type: string, handler: (event: any) => void): void;
    function removeListener(target: Map, type: string, handler: (event: any) => void): void;
  }

  namespace services {
    class Geocoder {
      coord2Address(lng: number, lat: number, callback: (result: any[], status: any) => void): void;
    }

    interface Address {
      road_address?: {
        address_name: string;
      };
      address: {
        address_name: string;
      };
    }

    enum Status {
      OK = "OK",
    }
  }
}