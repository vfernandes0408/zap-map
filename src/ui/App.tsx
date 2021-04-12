import "leaflet/dist/leaflet.css";

import React, { FormEvent, useState } from "react";
import { MapContainer } from "react-leaflet";
import { Marker, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";
import { v4 as uuidv4 } from "uuid";
//import { uuidv1 } from 'node-uuid'

import { getImoveis, fetchLocalMapBox } from "../app/apiMapBox";
import AsyncSelect from "react-select/async";

import mapPackage from "../../src/imagens/package.svg";
import mapPin from "../../src/imagens/pin.svg";
import CustomPopup from "./component/popup";
import DatePicker from 'react-date-picker';

import "../../src/style/App.css";
import { useEffect } from "react";
import { getCurrentGps } from "src/app/position";

const initialPosition = { lat: -23.0152096, lng: -43.5519897 };

const mapPackageIcon = Leaflet.icon({
  iconUrl: mapPackage,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

interface Delivery {
  id: string;
  name: string;
  address: string;
  complement: string;
  date: string | null;
  latitude: number;
  longitude: number;
}

type Position = {
  longitude: number;
  latitude: number;
};

function App() {

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [position, setPosition] = useState<Position | null>(null);
  const [inputDate, setDate] = useState<Date | null>(null);


  const [isEditing, setIsEditing] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [complement, setComplement] = useState("");
  const [imoveis, setImoveis] = useState([])

  const [address, setAddress] = useState<{
    label: string;
    value: string;
  } | null>(null);

  interface Imoveis {
    id: string;
    lat: number;
    lon: number;
  }

  const loadImoveis = async () => {
    const position = await getCurrentGps();
    console.log(position)
    const imoveis = await getImoveis();
    setImoveis(imoveis);
  }

  useEffect(() => {
    
    loadImoveis();
  }, []);


  const [location, setLocation] = useState(initialPosition);


  return (
    <div id="page-map">
      <MapContainer
        center={location}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
        />

        {/* {imoveis && (
          <Marker
            icon={mapPinIcon}
            position={[imoveis.lat, imoveis.lon]}
          ></Marker>
        )} */}

        {imoveis.map((imoveis: Imoveis) => (
          <Marker
            key={imoveis.id}
            icon={mapPinIcon}
            position={[imoveis.lat, imoveis.lon]}
          >

          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
