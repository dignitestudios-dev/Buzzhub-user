import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import DummyHome from "./pages/app/DummyHome";
import DummyLogin from "./pages/authentication/DummyLogin";
import AuthLayout from "./layouts/AuthLayout";
import ProductDetails from "./pages/app/products/ProductDetails";
import OrderHistory from "./pages/app/orders/OrderHistory";
import Cart from "./pages/app/orders/Cart";
import Profile from "./pages/app/profile/Profile";
import Chat from "./pages/app/chat/Chat";
import Notifications from "./pages/app/notifications/Notifications";
import Favorites from "./pages/app/favorites/Favorites";
import DispensaryProfile from "./pages/app/profile/DispensaryProfile";
import ReviewsPage from "./pages/app/reviews/ReviewsPage";
import OrderDetails from "./pages/app/orders/OrderDetails";
import ReviewOrder from "./pages/app/orders/ReviewOrder";
import OrderTracking from "./pages/app/orders/OrderTracking";
import Documents from "./pages/app/profile/Documents";
import Login from "./pages/onboarding/Login";
import Dispensaries from "./pages/app/dispensary/Dispensaries";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login />
        }
      />

      <Route path="app" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DummyHome />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="product-details" element={<ProductDetails />} />
      </Route>

        <Route path="app" element={<DashboardLayout />}>
        <Route path="orders" element={<OrderHistory />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="cart" element={<Cart />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="chat" element={<Chat />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="notifications" element={<Notifications />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="favorites" element={<Favorites />} />
      </Route>


      <Route path="app" element={<DashboardLayout />}>
        <Route path="dispensary-profile" element={<DispensaryProfile />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="reviews" element={<ReviewsPage />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="order-details" element={<OrderDetails />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="review-order" element={<ReviewOrder />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="order-tracking" element={<OrderTracking />} />
      </Route>


      <Route path="app" element={<DashboardLayout />}>
        <Route path="documents" element={<Documents />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="dispensaries" element={<Dispensaries />} />
      </Route>


      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
