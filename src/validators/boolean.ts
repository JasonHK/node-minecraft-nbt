"use strict";

import OW from "ow";

/**
 * A reusable validator used to validate `boolean` type parameters.
 */
export const checkBoolean = OW.create(OW.boolean);

/**
 * A reusable validator used to validate `boolean` type parameters. The value of the parameters
 * could be `undefined`.
 */
export const checkBooleanOptional = OW.create(OW.optional.boolean);
