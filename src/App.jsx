import { Route, Routes } from "react-router";
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
import ChangePassword from "./pages/app/profile/ChangePassword";
import DeleteAccount from "./pages/app/profile/DeleteAccount";
import EditProfile from "./pages/app/profile/EditProfile";
import SignUp from "./pages/onboarding/Signup";
import Verification from "./pages/onboarding/Verification";
import VerifyOtp from "./pages/onboarding/VerifyOtp";
import UserInfo from "./pages/onboarding/UserInfo";
import Feedback from "./pages/app/orders/Feedback";
import Products from "./pages/app/products/Products";
import ForgotPassword from "./pages/onboarding/ForgotPassword";
import UpdatePassword from "./pages/onboarding/UpdatePassword";
import VerifySignup from "./pages/onboarding/VerifySignup";

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
        <Route path="product-details/:productId" element={<ProductDetails />} />
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
        <Route path="/app/dispensary-profile/:dispensaryId" element={<DispensaryProfile />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="reviews" element={<ReviewsPage />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="order-details/:id" element={<OrderDetails />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="review-order" element={<ReviewOrder />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="order-tracking/:id" element={<OrderTracking />} />
      </Route>


      <Route path="app" element={<DashboardLayout />}>
        <Route path="documents" element={<Documents />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="dispensaries" element={<Dispensaries />} />
      </Route>


        <Route path="app" element={<DashboardLayout />}>
        <Route path="products" element={<Products />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="delete-account" element={<DeleteAccount />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>

       <Route path="app" element={<DashboardLayout />}>
        <Route path="feedback/:id" element={<Feedback />} />
      </Route>


      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

       <Route path="auth" element={<AuthLayout />}>
        <Route path="signup" element={<SignUp />} />
      </Route>

       <Route path="auth" element={<AuthLayout />}>
        <Route path="verification" element={<Verification />} />
      </Route>

         <Route path="auth" element={<AuthLayout />}>
        <Route path="verify-otp" element={<VerifyOtp />} />
      </Route>


      <Route path="auth">
        <Route path="user-info" element={<UserInfo />} />
      </Route>

          <Route path="auth">
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

        <Route path="auth">
        <Route path="update-password" element={<UpdatePassword />} />
      </Route>

       <Route path="auth">
        <Route path="verifyisgnup" element={<VerifySignup />} />
      </Route>

      

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
