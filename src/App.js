import React, { useEffect, useState, useCallback } from "react";
import Card from "./components/card";
import PlottedMap from "./components/map/PlottedMap";
import worldWideCases from "./data/worldWide.json";
import usCases from "./data/usStates.json";

import "./app.scss";

const App = () => {
   const [worldWide, setWorldWide] = useState(null);
   const [statesCases, setStatesCases] = useState([]);
   const [selectedState, setSelectedState] = useState(null);

   useEffect(() => {
      const getStatesData = Object.entries(usCases).map(([key, value]) => value);
      setStatesCases(getStatesData);
      setWorldWide(worldWideCases);
   }, []);

   const searchedCasesInfo = useCallback((lat = '', long = '') => {
      statesCases.forEach(state => {
         if ((+state.lat) === +lat && (+state.long) === +long) {
            setTimeout(() => {
               setSelectedState(state);
            }, 1000);
         } else {
            setSelectedState(worldWide);
         }
      })
      setSelectedState(worldWide);
   }, [statesCases, worldWide]);

   useEffect(() => {
      searchedCasesInfo()
   }, [searchedCasesInfo]);

   return (
      <div className="homePage__Wrapper">
         <div className="inner__Wrapper">
            <div className="upper__Section">
               <div className="upper__leftSide">
                  <Card
                     selectedState={selectedState}
                  />
               </div>
               <div className="upper__rightSide">
                  <div className="plotted__Map">
                     <PlottedMap
                        mapStates={statesCases}
                        searchedCasesInfo={searchedCasesInfo}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );

}

export default App;
