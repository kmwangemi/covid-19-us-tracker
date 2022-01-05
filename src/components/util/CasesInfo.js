import numeral from "numeral";
import "./casesInfo.scss";

const CasesInfo = ({ selectedState }) => {

   return (
      <div className="cases__Info">
         <div className="info_Row">
            <div className="leftSide">
               <div className="markerBlue"></div>
               <p className="cases">Active Cases</p>
            </div>
            <div className="no_of_Cases">
               {numeral(selectedState?.active).format("0,0")}
            </div>
         </div>
         <div className="info_Row">
            <div className="leftSide">
               <div className="markerGreen"></div>
               <p className="cases">Recovered</p>
            </div>
            <div className="no_of_Cases">
               {numeral(parseInt(selectedState?.recovered)).format("0,0")}
            </div>
         </div>
         <div className="info_Row">
            <div className="leftSide">
               <div className="markerRed"></div>
               <p className="cases">Deaths</p>
            </div>
            <div className="no_of_Cases">
               {numeral(parseInt(selectedState?.deaths)).format("0,0")}
            </div>
         </div>
      </div>
   );
};

export default CasesInfo;
