import React from "react";

import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

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

export default Report;
