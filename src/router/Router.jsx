import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from '../pages/Sign/Signin'
import Signup from '../pages/Sign/Signup'
import Home from '../components/Dashboard/Home'
import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'
import ForgotPassword from '../pages/Sign/ForgotPassword'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<AuthRoute><Signin/></AuthRoute>}/>
                <Route path='/signup' element={<AuthRoute><Signup/></AuthRoute>}/>
                <Route path='/forgotpassword' element={<AuthRoute><ForgotPassword/></AuthRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route path="/archive" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route path="/trash" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route path='*'>Error</Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router