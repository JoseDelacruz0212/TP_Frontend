import React from 'react';
import { Routes, Route } from "react-router-dom";

import ApplicationLayout from "./views/layouts/ApplicationLayout";
import ExternalLayout from "./views/layouts/ExternalLayout";
import SignInPage from "./views/auth/SignInPage";

import Institutions from "./views/table-views/Institutions";
import Courses from "./views/table-views/Courses";
import Assessments from "./views/table-views/Assessments";
import Users from "./views/table-views/Users";
import AssessmentCreator from "./views/assessments/AssessmentCreator";
import AssessmentVisualizer from "./views/assessments/AssessmentVisualizer";
import Verification from "./views/verification/Verification";
import Profile from "./views/profile/Profile";

function App() {
  return (
      <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route element={<ApplicationLayout />}>
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/assessment-creator/:id" element={<AssessmentCreator />} />
              <Route path="/assessment-visualizer/:id" element={<AssessmentVisualizer />} />
              <Route path="/users" element={<Users />} />
              <Route path="/requests" element={null} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/administration" element={null} />
              <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ExternalLayout />}>
              <Route path="/verification-external" element={<Verification />} />
          </Route>
      </Routes>
  );
}

export default App;
