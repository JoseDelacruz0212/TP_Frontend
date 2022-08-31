import React from "react";

import {Entity} from "../communication/responses/entity";

export type Convertor<T extends Entity> = (columnKeys: number, x: T) => React.ReactNode;
