import React from "react";

import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import {Permissions} from "../../types/auth";
import withPermission from "../../hoc/with-permission/withPermission";

const Report = () => {
  const embedConfig = {
    type: "report",
    id: "",
    embedUrl: "",
    accessToken: "",
    tokenType: models.TokenType.Embed
  };

  return (
      <PowerBIEmbed embedConfig={embedConfig} />
  )
};

export default withPermission(Report, Permissions.REPORT);
