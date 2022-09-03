import React from 'react';
import moment from "moment";
import { Routes, Route } from "react-router-dom";

import ApplicationLayout from "./views/layouts/ApplicationLayout";
import SignInPage from "./views/auth/SignInPage";

import AssessmentCreator from "./views/assessments/AssessmentCreator";
import AssessmentVisualizer from "./views/assessments/AssessmentVisualizer";

import Institutions from "./views/table-views/Institutions";
import Courses from "./views/table-views/courses";
import Assessments from "./views/table-views/Assessments";

function App() {
  return (
      <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route element={<ApplicationLayout />}>
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/assessment-creator/:id" element={<AssessmentCreator />} />
              <Route path="/assessment-creator" element={<AssessmentCreator />} />
              <Route path="/assessment-visualizer/:id" element={<AssessmentVisualizer />} />
              <Route path="/users" element={null} />
              <Route path="/requests" element={null} />
              <Route path="/verification" element={null} />
              <Route path="/administration" element={null} />
              <Route path="/profile" element={null} />
          </Route>
      </Routes>
  );
}

export default App;
