"use strict";

import isInteger from "lodash.isinteger";
import isNumber from "lodash.isnumber";
import isString from "lodash.isstring";

import { ARRAY_MAX_INDEX, ARRAY_MIN_INDEX } from "../constants";

export function isIndexKey(key: string | number | symbol): boolean
{
    return (
        (
            isNumber(key) && isInteger(key) && 
            ((key >= ARRAY_MIN_INDEX) && (key <= ARRAY_MAX_INDEX))
        ) || (
            isString(key) && isIndexKey(Number(key))
        )
    );
}
