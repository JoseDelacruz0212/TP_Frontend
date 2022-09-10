import React from 'react';
import { Routes, Route } from "react-router-dom";

import ApplicationLayout from "./views/layouts/ApplicationLayout";
import SignInPage from "./views/auth/SignInPage";

import Institutions from "./views/table-views/Institutions";
import Courses from "./views/table-views/Courses";
import Assessments from "./views/table-views/Assessments";
import Users from "./views/table-views/Users";
import Profile from "./views/profile/Profile";
import AssessmentCreator from "./views/assessments/AssessmentCreator";

function App() {
  return (
      <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route element={<ApplicationLayout />}>
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/assessment-creator/:id" element={null} />
              <Route path="/assessment-creator" element={<AssessmentCreator />} />
              <Route path="/assessment-visualizer/:id" element={null} />
              <Route path="/users" element={<Users />} />
              <Route path="/requests" element={null} />
              <Route path="/verification" element={null} />
              <Route path="/administration" element={null} />
              <Route path="/profile" element={<Profile />} />
          </Route>
      </Routes>
  );
}

export default App;
