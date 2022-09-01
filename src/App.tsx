import React from 'react';
import moment from "moment";
import { Routes, Route } from "react-router-dom";

import ApplicationLayout from "./views/layouts/ApplicationLayout";

import AssessmentCreator from "./views/assessments/AssessmentCreator";
import AssessmentVisualizer from "./views/assessments/AssessmentVisualizer";

import Institutions from "./views/institutions/Institutions";
import Courses from "./views/courses/courses";

moment().locale('es');

function App() {
  return (
      <Routes>
          <Route path="/" element={null} />
          <Route element={<ApplicationLayout />}>
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/assessments" element={null} />
              <Route path="/assessment-creator/:id" element={<AssessmentCreator />} />
              <Route path="/assessment-creator" element={<AssessmentCreator />} />
              <Route path="/assessment-visualizer/:id" element={<AssessmentVisualizer />} />
              <Route path="/students" element={null} />
              <Route path="/requests" element={null} />
              <Route path="/verification" element={null} />
              <Route path="/administration" element={null} />
              <Route path="/profile" element={null} />
          </Route>
      </Routes>
  );
}

export default App;
