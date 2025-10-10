import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "194px",
  borderRadius: "8px",
};

const defaultCenter = {
  lat: 40.7128, // New York City
  lng: -74.006,
};

const libraries = ["places"];

const GoogleMapComponent = ({
  onLocationSelect,
  editAddress,
  distance = 1,
  showRadius = false,
  isDisabled = false,
  error,
  isClear = false,
}) => {
  const radiusInMeters = distance * 1609.34;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [marker, setMarker] = useState(defaultCenter);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue("");
  }, [isClear]);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (editAddress?.location?.coordinates?.length) {
      const [lng, lat] = editAddress.location.coordinates;
      setMapCenter({ lat, lng });
      setMarker({ lat, lng });
      setInputValue(editAddress.address || editAddress.clinicAddress);
    } else if (editAddress?.location?.length) {
      const [lng, lat] = editAddress?.location;
      setMapCenter({ lat, lng });
      setMarker({ lat, lng });
      setInputValue(editAddress.address || "");
    }
  }, [editAddress]);
  if (!isLoaded) return <div>Loading...</div>;

  const handlePlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    // @ts-ignore
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const addressComponents = place.address_components || [];

    const getComponent = (type) =>
      addressComponents.find((comp) => comp.types.includes(type))?.long_name ||
      "";

    const data = {
      country: getComponent("country"),
      city: getComponent("locality") || getComponent("sublocality"),
      state: getComponent("administrative_area_level_1"),
      zipCode: getComponent("postal_code"),
      address: place.formatted_address,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    };

    setMapCenter({ lat, lng });
    setMarker({ lat, lng });
    setInputValue(place.formatted_address);

    onLocationSelect(data);
  };

  return (
    <div className="relative w-full h-full">
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          value={inputValue}
          disabled={isDisabled}
          placeholder="Enter your street, city, state, zip?"
          className="w-full p-2 rounded-md border border-gray-300 mb-2"
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value);

            if (value === "") {
              onLocationSelect({
                address: "",
                city: "",
                country: "",
                state: "",
                zipCode: "",
                location: {
                  type: "Point",
                  coordinates: [],
                },
              });
            }
          }}
        />
      </Autocomplete>
      <div>
        <p className="text-red-500 text-[12px] font-[500]">{error}</p>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={showRadius ? 8 : 14}
      >
        {showRadius ? (
          <Circle
            center={mapCenter}
            radius={radiusInMeters}
            options={{
              fillColor: "#29ABE2",
              fillOpacity: 0.2,
              strokeColor: "#29ABE2",
              strokeOpacity: 0.5,
              strokeWeight: 1,
            }}
          />
        ) : (
          <Marker position={marker} />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
