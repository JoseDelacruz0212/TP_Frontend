export const Roles = Object.freeze({
   ADMIN: "admin",
   INSTITUTION: "institution",
   TEACHER: "teacher",
   STUDENT: "user"
});

export const Permissions = Object.freeze({
   INSTITUTIONS: "INSTITUTIONS",
   COURSES: "COURSES",
   COURSES_USERS: "COURSES-USERS",
   COURSES_ASSESSMENTS: "COURSES-ASSESSMENTS",
   COURSES_OBJECTIVES: "COURSES-OBJECTIVES",
   COURSES_ADD: "COURSES-ADD",
   COURSES_EDIT: "COURSES-EDIT",
   COURSES_DELETE: "COURSES-DELETE",
   COURSES_SELECT_INSTITUTION: "COURSES_SELECT_INSTITUTION",
   ASSESSMENT: "ASSESSMENT",
   ASSESSMENT_CREATOR: "ASSESSMENT-CREATOR",
   ASSESSMENT_SUBMIT: "ASSESSMENT-SUBMIT",
   ASSESSMENT_START: "ASSESSMENT-START",
   ASSESSMENT_ASSIGN_POINTS: "ASSESSMENT-ASSIGN-POINTS",
   ASSESSMENT_VISUALIZE: "ASSESSMENT-VISUALIZE",
   ASSESSMENT_DESIGN: "ASSESSMENT-DESIGN",
   ASSESSMENT_EDIT: "ASSESSMENT-EDIT",
   ASSESSMENT_DELETE: "ASSESSMENT-DELETE",
   ASSESSMENT_QUALIFICATIONS: "ASSESSMENT-QUALIFICATIONS",
   ASSESSMENT_ADD: "ASSESSMENT-ADD",
   ASSESSMENT_SET_STATUS: "ASSESSMENT-SET-STATUS",
   ASSESSMENT_DETAILS: "ASSESSMENT-DETAILS",
   USERS: "USERS",
   USERS_APPROVE: "USERS-APPROVE",
   USERS_REVOKE: "USERS-REVOKE",
   USERS_EDIT: "USERS-EDIT",
   USERS_DELETE: "USERS-DELETE",
   USERS_ADD: "USERS-ADD",
   USERS_ADD_ADMINISTRATOR: "USERS-ADD-ADMINISTRATOR",
   USERS_ADD_INSTITUTION: "USERS-ADD-INSTITUTION",
   USERS_SELECT_INSTITUTION: "USERS-SELECT-INSTITUTION",
   USERS_ASSIGN_COURSE: "USERS-ASSIGN-COURSE",
   REQUEST: "REQUEST",
   VERIFICATION: "VERIFICATION",
   MANAGEMENT: "MANAGEMENT",
   PROFILE: "PROFILE"
});

export const permissionsByRole: { [x: string]: string[] } = {
   [Roles.ADMIN]: [
      "INSTITUTIONS",
      "COURSES",
      "COURSES-USERS",
      "COURSES-ASSESSMENTS",
      "COURSES-OBJECTIVES",
      "COURSES-ADD",
      "COURSES-EDIT",
      "COURSES-DELETE",
      "COURSES_SELECT_INSTITUTION",
      "ASSESSMENT",
      "ASSESSMENT-CREATOR",
      "ASSESSMENT-VISUALIZE",
      "ASSESSMENT-DESIGN",
      "ASSESSMENT-EDIT",
      "ASSESSMENT-DELETE",
      "ASSESSMENT-QUALIFICATIONS",
      "ASSESSMENT-ADD",
      "ASSESSMENT-SET-STATUS",
      "ASSESSMENT-DETAILS",
      "USERS",
      "USERS-APPROVE",
      "USERS-REVOKE",
      "USERS-EDIT",
      "USERS-DELETE",
      "USERS-ADD",
      "USERS-ADD-ADMINISTRATOR",
      "USERS-ADD-INSTITUTION",
      "USERS-SELECT-INSTITUTION",
      "USERS-ASSIGN-COURSE",
      "REQUEST",
      "VERIFICATION",
      "MANAGEMENT",
      "PROFILE"
   ],
   [Roles.INSTITUTION]: [
      "COURSES",
      "COURSES-USERS",
      "COURSES-ASSESSMENTS",
      "COURSES-OBJECTIVES",
      "COURSES-ADD",
      "COURSES-EDIT",
      "COURSES-DELETE",
      "ASSESSMENT",
      "ASSESSMENT-CREATOR",
      "ASSESSMENT-DESIGN",
      "ASSESSMENT-EDIT",
      "ASSESSMENT-DELETE",
      "ASSESSMENT-ADD",
      "ASSESSMENT-QUALIFICATIONS",
      "ASSESSMENT-DETAILS",
      "USERS",
      "USERS-APPROVE",
      "USERS-REVOKE",
      "USERS-EDIT",
      "USERS-DELETE",
      "USERS-ADD",
      "VERIFICATION",
      "USERS-ASSIGN-COURSE",
      "PROFILE"
   ],
   [Roles.TEACHER]: [
      "COURSES",
      "COURSES-USERS",
      "COURSES-ASSESSMENTS",
      "COURSES-OBJECTIVES",
      "ASSESSMENT",
      "ASSESSMENT-ADD",
      "ASSESSMENT-DESIGN",
      "ASSESSMENT-PUBLISH",
      "ASSESSMENT-CREATOR",
      "ASSESSMENT-VISUALIZE",
      "ASSESSMENT-ASSIGN-POINTS",
      "ASSESSMENT-QUALIFICATIONS",
      "ASSESSMENT-DETAILS",
      "VERIFICATION",
      "USERS",
      "PROFILE"
   ],
   [Roles.STUDENT]: [
      "COURSES",
      "COURSES-ASSESSMENTS",
      "ASSESSMENT",
      "ASSESSMENT-START",
      "ASSESSMENT-VISUALIZE",
      "ASSESSMENT-SUBMIT",
      "ASSESSMENT-DETAILS",
      "VERIFICATION",
      "PROFILE"
   ]
};
