import React from "react";

import {IfProps} from "../../../types/components/common/logic";

const If = ({ children, condition }: IfProps) => !condition ? null : <>{children}</>;

export default If;
