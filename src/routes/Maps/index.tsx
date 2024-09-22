import mapStore from '@/stores/mapStore';
import { useEffect, useCallback } from 'react';
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import styles from './map.module.css';
import SearchForm from './SearchForm';
import MapBoard from './MapBoard';
import SearchList from '@/routes/Maps/SearchList';
import { debounce } from 'lodash-es';

interface MarkerTypes {
  position: { lat: number; lng: number };
  content: string;
  address?: string;
}

export function Component() {
  const { showList, search, setMarkers, updateMarker, map, setHasSearchResults } = mapStore();
  const { user } = useOutletContext<UserContext>();

  function getAddressFromCoords(lat: number, lng: number, callback: (address: string) => void) {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(lng, lat, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const detailAddr = result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;
        callback(detailAddr);
      }
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPlaces = useCallback(
    debounce((searchKeyword :string) => {
      if (!map || !searchKeyword) return;

      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchKeyword, (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const newMarkers: MarkerTypes[] = [];

          data.forEach((place: any, index: number) => {
            const marker: MarkerTypes = {
              position: {
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              },
              content: place.place_name,
              address: '',
            };


            getAddressFromCoords(marker.position.lat, marker.position.lng, (address) => {
              marker.address = address;
              updateMarker(index, marker);
            });

            bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng));
            newMarkers.push(marker);
          });

          setMarkers(newMarkers);
          setHasSearchResults(true);
          map.setBounds(bounds);
        } else {
          setHasSearchResults(false);
        }
      });
    }, 500),
    [map, setMarkers, updateMarker]
  );

  useEffect(() => {
    fetchPlaces(search);
  }, [search, fetchPlaces]);

  return (
    <div className={styles.container}>
      <div className="sr-only">
        <p>현재 사용자: {user?.nickname}</p>
        <br />
      </div>
      <SearchForm />
      {showList && <SearchList />}
      <MapBoard />
    </div>
  );
}

Component.displayName = "MapsRoute";
