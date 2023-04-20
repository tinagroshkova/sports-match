import React, { useState } from 'react';
import placesData from "./placesData";
import PlacesCard from "../../components/PlacesCard/PlacesCard";
import "./Places.scss";


export default function PlacesPage() {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const sportsTypes = [...new Set(placesData.map(place => place.type))].sort((a, b) => a.localeCompare(b));

  // const sportsTypes = [...new Set(placesData.map(place => place.type))].sort((a, b) => a.localeCompare(b));

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    if (searchText === "") {
      setItems([]);
    } else {
      const filteredItems = placesData.filter((item) => item.type.toLowerCase().includes(searchText.toLowerCase()));
      setItems(filteredItems);
    }
  };

  const handleSelect = (event) => {
    const selectedType = event.target.value;
    if (selectedType === "") {
      setItems([]);
    } else {
      const filteredItems = placesData.filter((item) => item.type === selectedType);
      setItems(filteredItems);
      setSelectedItem(null);
    }
  };

  return (
    <div className="placesPage">
      <h2 style={{ display: "flex", justifyContent: "center" }} className="siteSloganTitle">Choose your favorite sport and get suggestions where to play in Sofia</h2>

      <div className='searchWrapper'>
        <div>
          <input className='inputSearch' type="text" value={searchText} onChange={handleSearch} placeholder="Type a sport" />
        </div>
        
        <div>
          or
          <select className='selectSearch' value={selectedItem ? selectedItem.name : ""} onChange={handleSelect}>
            <option value="">Choose sport</option>
            {sportsTypes.map(sport => <option key={sport} value={sport}>{sport.charAt(0).toUpperCase() + sport.slice(1)}</option>)}
          </select>
        </div>
      </div>
      {items.length > 0 && (
        <div className='sportsPageContainer'>
          {items.map((item) => (
            <div key={item.phone}>
              <PlacesCard
                key={item.phone}
                image={item.image}
                name={item.name}
                site={item.site}
                address={item.address}
                phone={item.phone}
                workHours={item.workingHours}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}





// export default function PlacesPage() {
//   const [items, setItems] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);

  // const sportsTypes = [...new Set(placesData.map(place => place.type))].sort((a, b) => a.localeCompare(b));

  // const handleSelect = (event) => {
  //   const selectedType = event.target.value;
  //   if (selectedType === "") {
  //     setItems([]);
  //   } else {
  //     const filteredItems = placesData.filter((item) => item.type === selectedType);
  //     setItems(filteredItems);
  //     setSelectedItem(null);
  //   }
  // };

//   return (
//     <div>
//       <h2 style={{display: "flex", justifyContent: "center"}} className="siteSloganTitle">Choose your favorite sport and get suggestions where to play in Sofia</h2>
//       <div className='searchWrapper'>
//         <select className='selectSearch' value={selectedItem ? selectedItem.name : ""} onChange={handleSelect}>
//           <option value="">Search for a place</option>
//           {sportsTypes.map(sport => <option key={sport} value={sport}>{sport.charAt(0).toUpperCase() + sport.slice(1)}</option>)}
//         </select>
//       </div>
//       {items.length > 0 && (
//         <div className='sportsPageContainer'>
//           {items.map((item) => (
//             <div key={item.phone}>
//               <PlacesCard
//                 key={item.phone}
//                 image={item.image}
//                 name={item.name}
//                 site={item.site}
//                 address={item.address}
//                 phone={item.phone}
//                 workHours={item.workingHours}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

