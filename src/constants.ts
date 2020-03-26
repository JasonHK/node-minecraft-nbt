"use strict";

export const BYTE_BYTE_LENGTH = 1;

export const SHORT_BYTE_LENGTH = 2;

export const INT_BYTE_LENGTH = 4;

export const LONG_BYTE_LENGTH = 8;

export const FLOAT_BYTE_LENGTH = 4;
export const FLOAT_MAX_VALUE = (2 - (2 ** -23)) * (2 ** 127);
export const FLOAT_MIN_VALUE = -FLOAT_MAX_VALUE;

export const DOUBLE_BYTE_LENGTH = 8;
export const DOUBLE_MAX_VALUE = Number.MAX_VALUE;
export const DOUBLE_MIN_VALUE = -DOUBLE_MAX_VALUE;

export const STRING_MIN_LENGTH = 0x0000;
export const STRING_MAX_LENGTH = 0xFFFF;

export const ARRAY_INDEX_PATTERN = /^\d+$/;
export const ARRAY_MIN_LENGTH = 0;
export const ARRAY_MAX_LENGTH = (2 ** 32) - 1;
export const ARRAY_MIN_INDEX = 0;
export const ARRAY_MAX_INDEX = ARRAY_MAX_LENGTH - 1;
