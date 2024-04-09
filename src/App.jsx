import AppLayout from "./AppLayout";
import GlobalStyled from "./styles/GlobalStyled"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Users from './pages/Users';
import Login from "./pages/Login";
import PageNotFound from './pages/PageNotFound'
import Booking from "./pages/Booking";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import ProtectedRoute from "./ui/ProtectedRoute";
import SignUp from "./pages/SignUp";
import { ThemeSwitch } from "./theme-switch/ThemeContext";

const App = () => {
      const queryClient = new QueryClient({
            defaultOptions: { queries: { staleTime: 0 } }
      })
      return (
            <ThemeSwitch>
                  <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools initialIsOpen={false} />
                        <GlobalStyled />
                        <BrowserRouter>
                              <Routes>
                                    <Route element={
                                          <ProtectedRoute>
                                                <AppLayout />
                                          </ProtectedRoute>}>
                                          <Route index element={<Navigate to='/dashboard' replace />} />
                                          <Route path="/dashboard" element={<Dashboard />} />
                                          <Route path="/account" element={<Account />} />
                                          <Route path="/bookings" element={<Bookings />} />
                                          <Route path="/booking/:bookingId" element={<Booking />} />
                                          <Route path="/check-in/:bookingId" element={<CheckinBooking />} />
                                          <Route path="/cabins" element={<Cabins />} />
                                          <Route path="/settings" element={<Settings />} />
                                          <Route path="/login" element={<Login />} />
                                          <Route path="/sign-up" element={<SignUp />} />
                                          <Route path="/users" element={<Users />} />
                                    </Route>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="*" element={<PageNotFound />} />
                              </Routes>
                        </BrowserRouter>
                  </QueryClientProvider>
            </ThemeSwitch>

      )
}

export default App;