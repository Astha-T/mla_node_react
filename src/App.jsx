import React from 'react'
import { Route, Routes } from 'react-router-dom';
import DashBoard from './Components/DashBoard/dashboard';
import AnalyticalReport from './Components/Analytical Report/AnalyticalReport';
import MasterList from'./Components/Configure/MasterList';
import BlockList from'./Components/Configure/BlockList';
import MandalMaster from'./Components/Configure/MandalMaster'
import CasteList from'./Components/Configure/CasteList'
import SubCasteList from'./Components/Configure/SubCaste'
import DataCollectors from"./Components/DataCollector/Datacollector"
import Createdatacollectors from"./Components/DataCollector/Createdatacollector"
import Editdatacollector from"./Components/DataCollector/Editdatacollector"
import Viewdatacollector from"./Components/DataCollector/Viewdatacollector"
import Addcollector from"./Components/DataCollector/Addcollector"
import SignIn from'./Components/Login,Register/Login2'
import Registration from'./Components/Login,Register/Registration'
import SectorMaster from'./Components/Configure/SectorMaster'
import BoothMaster from'./Components/Configure/Boothmaster'
import ProfessionMaster from'./Components/Configure/ProfessionMaster'
import PrabhavshaaliMastrer from'./Components/Configure/PrabhavshaaliMastrer'
import EducationLevel from'./Components/Configure/EducationLevel'
import PartyNames from'./Components/Configure/PartyNames'
import Religion from'./Components/Configure/Religion'
import Financial from './Components/Configure/Financial';
import Import from'./Components/Import Data/Import'
import UserProfile from'./Components/Userprofile'
import Logout from'./Components/Logout/Logout'

import './App.css'
import Voter from './Components/Voters/Voter';
import Pastresult from './Components/Configure/pastresult';

const App = () => {
  return (
    <>

    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path='/analytical' element={<AnalyticalReport/>}/>
      <Route path="/datacollector" element={<DataCollectors/>}/>
      <Route path="/asign/:id" element={<Createdatacollectors/>}/>
      <Route path="/update/:id" element={<Editdatacollector/>}/>
      <Route path="/view/:id" element={<Viewdatacollector/>}/>
      <Route path="/add" element={<Addcollector/>}/>
      <Route path="/masterlist" element={<MasterList />} />
      <Route path="/blocklist" element={<BlockList />} />
      <Route path="/mandalmaster" element={<MandalMaster />} />
      <Route path="/castelist" element={<CasteList />} />
      <Route path="/subcastelist" element={<SubCasteList/>}/>
      <Route path="/login2" element={<SignIn />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/sectormaster" element={<SectorMaster />} />
      <Route path="/boothmaster" element={<BoothMaster />} />
      <Route path="/professionmaster" element={<ProfessionMaster />} />
      <Route path="/prabhavshaalimastrer" element={<PrabhavshaaliMastrer />} />
      <Route path="/educationlevel" element={<EducationLevel />} />
      <Route path="/partynames" element={<PartyNames />} />
      <Route path="/religion" element={<Religion/>}/>
      <Route path='/financial' element={<Financial/>}/>
      <Route path="/import" element={<Import />} />
      <Route path="/userprofile" element={<UserProfile/>}/>
      <Route path="/logout" element={<Logout />} />
      <Route path="/voter" element={<Voter />} />
      <Route path="/pastresult" element={<Pastresult />} />

    </Routes>
    </>
  );
}

export default App;

