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
  };
  search: string;
  // markers: {
  //   position: { lat: number, lng: number };
  //   content: string;
  //   address?: string;
  //   setMap?: any;
  // }[];
  markers: Marker[];
  currentPositionMarker: string,
  map: any,
  // bookmarkToggle: boolean,
  bookmarkList: Marker[];
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

    currentPositionMarker: "",
    setCurrentPositionMarker: (content: string) => set(() => ({ currentPositionMarker: content })),
  
    map: null,
    setMap: (map) => set(() => ({ map })),

    bookmarkList: [], // 북마크 상태를 저장하는 배열
    toggleBookmark: (marker: Marker) =>
      set((state) => ({
        bookmarkList: state.bookmarkList.some(
          (bm) => bm.content === marker.content
        )
          ? state.bookmarkList.filter((bm) => bm.content !== marker.content) // 이미 있으면 제거
          : [...state.bookmarkList, marker], // 없으면 추가
    })),
  };
});

export default useStore;