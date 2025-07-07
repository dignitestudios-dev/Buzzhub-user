import React from "react";
import { FiHeart, FiSearch } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/app/product-details")}
      className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-300 w-full cursor-pointer"
    >
      <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm z-10">
        {item.distance}
      </div>
      <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
        <FaHeart className="text-gray-400 hover:text-red-500" />
      </div>
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[130px] object-cover rounded-t-xl"
      />
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>
          <div className="flex items-center text-yellow-500 text-xs">
            <FaStar className="mr-1" size={12} />
            {item.rating}
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">{item.type}</div>
        <div className="flex items-center mt-2">
          <img
            src={item.dispensaryImage}
            alt="Dispensary Profile"
            className="w-5 h-5 rounded-full object-cover mr-2"
          />
          <div className="flex justify-between w-full items-center text-xs">
            <span className="text-green-600">Dispensary</span>
            <span className="font-semibold text-gray-800">{item.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dispensaries = () => {
  const demoData = [
    {
      id: 1,
      name: "Herbal Health",
      price: "$40.00",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      dispensaryImage: "https://i.pravatar.cc/100?img=1",
      type: "Delivery/Pickup",
      distance: "8 Miles Away",
      rating: "4.8",
    },
    {
      id: 2,
      name: "Green Garden",
      price: "$24.00",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      dispensaryImage: "https://i.pravatar.cc/100?img=2",
      type: "Pickup",
      distance: "3 Miles Away",
      rating: "4.5",
    },
    {
      id: 3,
      name: "ZenLeaf",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      dispensaryImage: "https://i.pravatar.cc/100?img=3",
      type: "Delivery",
      distance: "12 Miles Away",
      rating: "4.9",
    },
    {
      id: 4,
      name: "Bud Express",
      price: "$35.00",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      dispensaryImage: "https://i.pravatar.cc/100?img=4",
      type: "Pickup",
      distance: "5 Miles Away",
      rating: "4.7",
    },
  ];


  const favoriteItems = [
  {
    id: "item1",
    name: "Hybrid Flower",
    weight: "50gram",
    price: "$40.00",
    location: "Toronto, Canada",
    type: "Delivery",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    distance: "3 Miles Away",
    rating: "4.8",
  },
  {
    id: "item2",
    name: "Gummies",
    weight: "10 pcs",
    price: "$25.00",
    location: "Toronto, Canada",
    type: "Pickup",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
    distance: "1.2 Miles Away",
    rating: "4.5",
  },
];

  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      {/* Header + Search */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Dispensaries Nearby</h2>

     <div className="flex sm:justify-between sm:items-center gap-4 mb-6">
  <div className="flex items-center gap-3 w-full sm:w-auto">
    {/* Search */}
    <div className="relative w-full sm:w-[250px]">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-[#F3F3F3] border-none focus:ring-2 focus:ring-green-500 focus:outline-none rounded-full py-2 pl-10 pr-4 text-sm placeholder-gray-400"
      />
    </div>
    {/* Filter */}
    <button className="flex items-center gap-2 bg-[#F3F3F3] text-gray-700 hover:text-green-600 px-4 py-2 rounded-full transition text-sm">
      <CiFilter className="text-lg" />
    </button>
  </div>
</div>



      {/* Dispensary Grid */}
       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 min-w-[168px] min-h-[212px] w-full h-full"
                  >
                    <div className="absolute top-2 left-2 bg-white text-[#1D7C42] text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm z-10">
                      {item.distance}
                    </div>
      
                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                      <FiHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                    </div>
      
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[130px] object-cover rounded-t-xl" // Keep the height fixed for the image
                    />
      
                    {/* Card Content */}
                    <div className="p-4">
                      {/* Item Name + Rating */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-[13px] font-semibold text-gray-900">{item.name}</h3>
                        <div className="flex items-center text-sm text-yellow-500 font-semibold">
                          <span className="mr-1">⭐</span> {item.rating}
                        </div>
                      </div>
      
                      {/* Item Type */}
                      <div className="text-sm text-gray-500 mt-1">{item.type}</div>
      
                      {/* Dispensary Section */}
                      <div className="flex items-center mt-1">
                        {/* Dispensary Profile Image */}
                        <img
                          src="https://randomuser.me/api/portraits/men/1.jpg" // Sample dispensary image
                          alt="Dispensary Profile"
                          className="w-[24px] h-[24px] rounded-full object-cover mr-2"
                        />
                        {/* Dispensary Name and Price */}
                        <div className="flex justify-between w-full items-center">
                          <div className="text-[12px] text-green-600">Dispensary</div>
                          <div className="text-gray-800 font-semibold text-[14px]">{item.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
    </div>
  );
};

export default Dispensaries;
