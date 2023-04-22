import React, { useState, useEffect } from 'react';
import placesData from "./placesData";
import PlacesCard from "../../components/PlacesCard/PlacesCard";
import "./Places.scss";
import useDebounce from '../../components/Utils/Debounce';

export default function PlacesPage() {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const sportsTypes = [...new Set(placesData.map(place => place.type))].sort((a, b) => a.localeCompare(b));

  const debouncedSearchText = useDebounce(searchText, 300);
  const debouncedSelectedItem = useDebounce(selectedItem, 300);

  useEffect(() => {
    if (debouncedSearchText === "") {
      setItems([]);
    } else {
      const filteredItems = placesData.filter((item) => item.type.toLowerCase().includes(debouncedSearchText.toLowerCase()));
      setItems(filteredItems);
    }
  }, [debouncedSearchText]);

  useEffect(() => {
    if (debouncedSelectedItem === null || debouncedSelectedItem === "") {
      setItems([]);
    } else {
      const filteredItems = placesData.filter((item) => item.type === debouncedSelectedItem);
      setItems(filteredItems);
    }
  }, [debouncedSelectedItem]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  // const handleSearch = (event) => {
  //   const searchText = event.target.value.toLowerCase();
  //   setSearchText(searchText);
  
  //   if (searchText === "") {
  //     setItems([]);
  //   } else {
  //     const filteredItems = placesData.filter((item) => {
  //       return Object.values(item).some(value =>
  //         value.toString().toLowerCase().includes(searchText)
  //       );
  //     });
  //     setItems(filteredItems);
  //   }
  // };
  const handleSelect = (event) => {
    setSelectedItem(event.target.value);
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
