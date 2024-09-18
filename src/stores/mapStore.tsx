import { create } from "zustand";

interface Store {
  defaultLocation: { lat: number, lng: number };
  showList: boolean;
  state: {
    center: { lat: number, lng: number };
    errMsg?: string | null;
    isLoading?: boolean;
  };
  search: string;
  markers: {
    position: { lat: number, lng: number };
    content: string;
    address?: string;
    setMap?: any;
  }[];
  selectedMarkerContent: string,
  map: kakao.maps.Map,
}

interface Action {
  setShowList: (value: boolean) => void;
  setState: (newState: (prevState: Store["state"]) => Store["state"]) => void;
  setSearch: (value: string) => void;
  setMarkers: (newMarkers: Store["markers"]) => void;
  updateMarker: (index: number, marker: Store["markers"][number]) => void;
  setSelectedMarkerContent: (content: string) => void;
  setMap: (map: kakao.maps.Map) => void;
}

const useStore = create<Store & Action>((set) => {
  const defaultLocation = {
    lat: 37.5709958592808,
    lng: 126.978914477333
  };

  return {
    defaultLocation,
    
    showList: false,
    setShowList: (value) => set(() => ({ showList: value })),

    state: {
      center: {
        lat: defaultLocation.lat,
        lng: defaultLocation.lng
      },
      errMsg: null,
      isLoading: true,
    },
    setState: (newState) => set((state) => ({
      state: newState(state.state),
    })),
    
    search: "",
    setSearch: (value) => set(() => ({ search: value })),
    
    markers: [],
    setMarkers: (newMarkers) => set(() => ({ markers: newMarkers })),
    updateMarker: (index, marker) => set((state) => {
      const updatedMarkers = [...state.markers];
      updatedMarkers[index] = marker;
      return { markers: updatedMarkers };
    }),

    selectedMarkerContent: "",
    setSelectedMarkerContent: (content: string) => set(() => ({ selectedMarkerContent: content })),
  
    map: null,
    setMap: (map) => set(() => ({ map })),
  };
});

export default useStore;