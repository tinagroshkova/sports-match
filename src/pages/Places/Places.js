import React, { useState } from 'react';
import placesData from "./placesData";
import PlacesCard from "../../components/PlacesCard/PlacesCard";
import "./Places.scss";

export default function PlacesPage() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

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
        <div>
            {/* <h2 className="siteNameTitle">Places</h2> */}
            {/* <h2 className="siteSloganTitle">Choose a place to play your favorite sport</h2> */}
            <div className='searchWrapper'>
                <select className='selectSearch' value={selectedItem ? selectedItem.name : ""} onChange={handleSelect}>
                    <option value="">Search for a place</option>
                    <option value="badminton">Бадминтон</option>
                    <option value="basketball">Баскетбол</option>
                    <option value="billiards">Билярд</option>
                    <option value="bowling">Боулинг</option>
                    <option value="darts">Дартс</option>
                    <option value="football">Футбол</option>
                    <option value="iceSkating">Кънки на лед</option>
                    <option value="karting">Картинг</option>
                    <option value="padel">Падел</option>
                    <option value="paintball">ПейнтБол</option>
                    <option value="running">Тичане</option>
                    <option value="ski">Ски</option>
                    <option value="snowboard">Сноуборд</option>
                    <option value="squash">Скуош</option>
                    <option value="tableTennis">Тенис на маса</option>
                    <option value="tennis">Тенис</option>
                    <option value="volleyball">Волейбол</option>
                    <option value="wallClimbing">Катерене</option>
                </select>
            </div>
            {items.length > 0 && (
                <div className='sportsPageContainer'>
                    {items.map((item) => (
                        <div key={item.phone}>
                            < PlacesCard
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

