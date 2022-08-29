import React from 'react';
import moment from "moment";
import { Routes, Route } from "react-router-dom";

import ApplicationLayout from "./views/layouts/ApplicationLayout";

import Courses from "./views/courses/Courses";
import AssessmentCreator from "./views/assessments/AssessmentCreator";
import Assessments from "./views/assessments/Assessments";
import AssessmentVisualizer from "./views/assessments/AssessmentVisualizer";

moment().locale('es');

function App() {
  return (
      <Routes>
          <Route path="/" element={null} />
          <Route element={<ApplicationLayout />}>
              <Route path="/courses" element={<Courses />} />
              <Route path="/assessments" element={<Assessments />} />
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
