import usePlacesAutocomplete, {
   getGeocode,
   getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

import './searchmap.scss';

const SearchMap = ({ panTo, searchedCasesInfo }) => {
   const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
   } = usePlacesAutocomplete({
      requestOptions: {
         location: { lat: () => 32.361538, lng: () => -86.279118 },
         radius: 100 * 1000,
      },
      debounce: 300,
   });

   const ref = useOnclickOutside(() => {
      clearSuggestions();
   });

   const handleInput = (e) => setValue(e.target.value);

   const handleSelect = ({ description }) => async () => {
      setValue(description, false);
      clearSuggestions();
      try {
         const results = await getGeocode({ address: description });
         const { lat, lng } = await getLatLng(results[0]);
         panTo({ lat, lng });
         searchedCasesInfo(lat, lng);
      } catch (error) {
         console.log("😱 Error: ", error);
      }
   };

   const renderSuggestions = () =>
      data.map((suggestion) => {
         const {
            place_id,
            structured_formatting: { main_text, secondary_text },
         } = suggestion;

         return (
            <li key={place_id} onClick={handleSelect(suggestion)}>
               <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
         );
      }); 

   return (
      <div ref={ref} className="SearchBar__Container">
         <input
            type="search"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search US State..."
         />
         {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>

   );
}

export default SearchMap;