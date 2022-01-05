import AnimationCount from "react-count-animation";
import Skeleton from "@material-ui/lab/Skeleton";
import CasesInfo from "../util/CasesInfo";
import "react-count-animation/dist/count.min.css";
import "./card.scss";

const Card = ({ selectedState }) => {

   const settings = {
      start: 0,
      count: parseInt(selectedState?.cases),
      duration: 3500,
      decimals: 0,
      useGroup: true,
      animation: "up",
   };

   return !selectedState ? (
      <Skeleton
         variant="rect"
         width="100%"
         height="70%"
         style={{ marginBottom: "0.5rem" }}
      />
   ) : (
      <div className="card__Wrapper">
         <div className="TopHeadings">
            <h3>CoronaVirus Cases&nbsp; </h3>
               <h5>- &nbsp; {selectedState?.name || 'worldWide'}</h5>
         </div>
         <p className="uppercase">TOTAL CONFIRMED CASES</p>
         <h1 className="no_Of_Cases">
               {selectedState.cases ? <AnimationCount {...settings} /> : "0"}
         </h1>
         <CasesInfo
            selectedState={selectedState}
         />
      </div>
   );
};

export default Card;
