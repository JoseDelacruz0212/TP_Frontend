import React from "react";

import { Permissions } from "../../types/auth";
import withPermission from "../../hoc/with-permission/withPermission";

const Report = () => {
  return (
      <iframe className="flex-1"
              src="https://app.powerbi.com/view?r=eyJrIjoiMGI0NmI1Y2ItNWI0NC00NTFmLWFmMjItYTczZjYxNGU5OTgwIiwidCI6IjBlMGNiMDYwLTA5YWQtNDlmNS1hMDA1LTY4YjliNDlhYTFmNiIsImMiOjR9"
              allowFullScreen>
      </iframe>
  )
};

export default withPermission(Report, Permissions.REPORT);
