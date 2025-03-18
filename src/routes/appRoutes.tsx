import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "../components/layouts/publicLayout";
import Home from "../pages/Home";



const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<PublicLayout />} >
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Router>


    )

};

export default AppRoutes;