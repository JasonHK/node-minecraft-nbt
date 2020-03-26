"use strict";

import OW from "ow";

export const checkByteOffsetOptional = OW.create(OW.optional.number.integer.greaterThanOrEqual(0));
