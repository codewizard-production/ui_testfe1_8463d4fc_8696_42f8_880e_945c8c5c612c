import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "screens/landing_page";
import {
SalesExecutiveCreate, SalesExecutiveEdit, SalesExecutiveView, 
SalesExecutiveList, 
SalesExecutives, 
SalesExecutiveTiles
} from "screens";

const Component = (props) => {

    return (
        <Routes>
            

                                                <Route path="/testfe1/html" element={<LandingPage {...props} title={'LandingPage'} nolistbar={true} />} />
                                                        <Route path="SalesExecutives/view/:id" element={<SalesExecutiveView {...props} title={'View SalesExecutive'} />} />
                        <Route path="SalesExecutives/edit/:id" element={<SalesExecutiveEdit {...props} title={'Edit SalesExecutive'} />} />
                        <Route path="SalesExecutives/create" element={<SalesExecutiveCreate {...props} title={'Create SalesExecutive'} />} />
                                                <Route path="/" element={<SalesExecutives {...props} title={'Table Layout'} nolistbar={true} />} />
                                                
                <Route path="/products2" element={<SalesExecutives {...props} title={'Table Layout'} />} />
                <Route path="/products1/list" element={<SalesExecutiveList {...props} title={'List'} />} />
                <Route path="/products3/tiles" element={<SalesExecutiveTiles {...props} title={'Tiles'} />} />
        </Routes>
    )

};

export default Component;
