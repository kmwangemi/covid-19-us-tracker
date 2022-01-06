import React, { useState } from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {
   GoogleMap,
   useLoadScript,
   Marker,
   InfoWindow
} from '@react-google-maps/api';
import numeral from "numeral";

import SearchMaps from "../searchmap/SearchMap"
import mapStyles from "./MapStyles"
import "./plottedmap.scss";

const libraries = ["places"];
const mapContainerStyle = {
   width: '100%',
   height: '100%'
};
const options = {
   styles: mapStyles,
   disableDefaultUI: true,
   zoomControl: true,
   style: { width: '100%', height: '100%', position: 'relative' },
}
const center = {
   lat: 32.361538,
   lng: -86.279118
};

const PlottedMap = ({ mapStates, searchedCasesInfo }) => {
   const [selected, setSelected] = useState(null);
   const [showInfoWindow, setShowInfoWindow] = useState(false);
   const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
   })

   const mapRef = React.useRef();
   const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
   }, []);

   const panTo = React.useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(8);
   }, [])

   const handleMouseOver = state => {
      setShowInfoWindow(true);
      setSelected(state)
   } 

   const handleMouseExit = () => {
      setShowInfoWindow(false);
      setSelected(null)
   } 

   const renderMarker = () => {
      if (mapStates.length === 0) {
         return;
      }
      return mapStates.map(state => (
         <Marker
            key={`${+state.lat}-${+state.lng}`}
            position={{ lat: (+state.lat), lng: (+state.long) }}
            icon={{
               path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
               fillColor: '#FF0000',
               fillOpacity: .6,
               anchor: new window.google.maps.Point(0, 0),
               strokeWeight: 0,
               scale: Math.log(state.cases) * 0.05
            }}
            onMouseOver={() => handleMouseOver(state)}
            onMouseOut={handleMouseExit}
         />
      )
      )
   }

   if (loadError) return (
      <div className='errorMessage'>
         <p>Error loading Maps</p>
      </div>
   );

   if (!isLoaded) return (
      <div className="spinnerWrapper">
         <CircularProgress />
         <p>Loading Maps...</p>
      </div>
   );

   return (
      <>
         <SearchMaps panTo={panTo} searchedCasesInfo={searchedCasesInfo} />

         <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={4}
            center={center}
            options={options}
            onLoad={onMapLoad}
         >
            {renderMarker()}
            {selected && showInfoWindow ? (
               <InfoWindow
                  position={{ lat: (+selected.lat), lng: (+selected.long) }}
               >
                  <div className="infowindow__Wrapper">
                     <div className="TopHeadings">
                        <h3>{selected.name}</h3>
                     </div>
                     <div className="cases__Info">
                        <div className="info_Row">
                           <div className="leftSide">
                              <p className="cases">TOTAL CONFIRMED CASES</p>
                           </div>
                           <div className="no_of_Cases">
                              {numeral(selected.cases).format("0,0")}
                           </div>
                        </div>
                        <hr />
                        <div className="info_Row">
                           <div className="leftSide">
                              <div className="markerBlue"></div>
                              <p className="cases">Actives</p>
                           </div>
                           <div className="no_of_Cases">
                              {numeral(selected.active).format("0,0")}
                           </div>
                        </div>
                        <div className="info_Row">
                           <div className="leftSide">
                              <div className="markerGreen"></div>
                              <p className="cases">Recovered</p>
                           </div>
                           <div className="no_of_Cases">
                              {numeral(parseInt(selected.recovered)).format("0,0")}
                           </div>
                        </div>
                        <div className="info_Row">
                           <div className="leftSide">
                              <div className="markerRed"></div>
                              <p className="cases">Deaths</p>
                           </div>
                           <div className="no_of_Cases">
                              {numeral(parseInt(selected?.deaths)).format("0,0")}
                           </div>
                        </div>
                     </div>
                  </div>
               </InfoWindow>) : null
            }
         </GoogleMap>
      </>
   );
};

export default PlottedMap;
