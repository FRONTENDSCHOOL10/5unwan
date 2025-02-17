import { create } from "zustand";

interface Marker {
  position: { lat: number; lng: number };
  content: string;
  address?: string;
}

interface Store {
  defaultLocation: { lat: number, lng: number };
  showList: boolean;
  state: {
    center: { lat: number, lng: number };
    errMsg?: string | null;
    isLoading?: boolean;
    showCurrentLocationOnly: boolean;
  };
  search: string;
  markers: Marker[];
  currentPositionMarker: string,
  map: any,
  bookmarkList: Marker[];
  isDropDown: boolean,
  hasSearchResults: boolean,
  searchTypes: string[];
}

interface Action {
  setShowList: (value: boolean) => void;
  setState: (newState: (prevState: Store["state"]) => Store["state"]) => void;
  setSearch: (value: string) => void;
  setMarkers: (newMarkers: Store["markers"]) => void;
  updateMarker: (index: number, marker: Store["markers"][number]) => void;
  setCurrentPositionMarker: (content: string) => void;
  setMap: (map: kakao.maps.Map) => void;
  toggleBookmark: (marker: Marker) => void;
  setIsDropDown: (value: boolean) => void;
  setHasSearchResults: (value: boolean) => void;
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
      showCurrentLocationOnly: false,
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

    currentPositionMarker: "",
    setCurrentPositionMarker: (content: string) => set(() => ({ currentPositionMarker: content })),
  
    map: null,
    setMap: (map) => set(() => ({ map })),

    bookmarkList: [],
    toggleBookmark: (marker: Marker) =>
      set((state) => ({
        bookmarkList: state.bookmarkList.some(
          (bm) => bm.content === marker.content
        )
          ? state.bookmarkList.filter((bm) => bm.content !== marker.content)
          : [...state.bookmarkList, marker],
      })),
    
    isDropDown: false,
    setIsDropDown: (value) => set(() => ({ isDropDown: value })),
    
    hasSearchResults: false,
    setHasSearchResults: (value) => set(() => ({ hasSearchResults: value })),

    searchTypes: ["헬스장", "수영장", "필라테스", "요가", "배드민턴", "클라이밍", "테니스", "런닝"],
  };
});

export default useStore;