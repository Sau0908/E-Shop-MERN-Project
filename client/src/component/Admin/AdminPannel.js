import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllProduct from "../Product/AllProduct";

const AdminPannel = () => {
  const navigate = useNavigate();
  const [showProductComponent, setShowProductComponent] = useState(false);
  const handleProductBtn = () => {
    setShowProductComponent(!showProductComponent);
  };
  return (
    <div>
      <div className="flex-1 w-full h-1/2 mt-20 text-white p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, Admin!
          </h1>
          <p className="text-gray-700">
            From here, you can manage to add/ edit /delete product and view all
            user profiles.
          </p>
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleProductBtn}
            >
              {!showProductComponent
                ? "Go to Veiw All Product"
                : "Hide All Product"}
            </button>
          </div>
        </div>
      </div>
      {showProductComponent && (
        <div>
          <AllProduct />
        </div>
      )}
    </div>
  );
};

export default AdminPannel;
