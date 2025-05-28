import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../pages/homepage';
import ErrorPage from '../pages/error';
import Layout from "../layout/Layout";

export function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
