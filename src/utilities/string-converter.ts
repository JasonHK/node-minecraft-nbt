"use strict";

import { getVariableName } from "@jasonhk/variable-name";
import OW from "ow";

import { BYTE_BYTE_LENGTH, SHORT_BYTE_LENGTH } from "../constants";

import { checkBooleanOptional } from "../validators/boolean";
import { checkDataView } from "../validators/data-view";
import { checkByteOffsetOptional } from "../validators/number";

const CHAR_NULL                  = 0x0000;
const CHAR_CONTROL_0080          = 0x0080;
const CHAR_SAMARITAN_LETTER_ALAF = 0x0800;

const FLAG_NONE              = 0x00;
const FLAG_BYTE_FOLLOWING    = 0x80;
const MASK_BITS_LAST_SIX     = 0x3F;
const MASK_BYTE_LENGTH_TWO   = 0xC0;
const MASK_BYTE_LENGTH_THREE = 0xE0;

const checkString = OW.create(OW.string);

export namespace StringConverter
{
    export function fromArrayBuffer(buffer: ArrayBuffer, littleEndian?: boolean): DecodeResult
    {
        const view = new DataView(buffer);
        const length = view.getInt16(0, littleEndian ?? false);

        const charCodes: number[] = [];
        for (let i = 0; i < length; i++)
        {
            let octet: number = view.getUint8(i);
            if ((octet & FLAG_BYTE_FOLLOWING) === FLAG_NONE)
            {
                charCodes.push(octet);
            }
            //else if ()
        }

        return null;
    }

    export function fromUint8Array(array: Uint8Array): string
    {
        return null;
    }

    export function getByteLength(string: string): number
    {
        checkString(string, getVariableName({ string }));
        
        let length = 0;
        for (let i = 0; i < string.length; i++)
        {
            const charCode = string.charCodeAt(i);
            if ((charCode > CHAR_NULL) && (charCode < CHAR_CONTROL_0080))
            {
                length += 1;
            }
            else if ((charCode === CHAR_NULL) || (charCode < CHAR_SAMARITAN_LETTER_ALAF))
            {
                length += 2;
            }
            else
            {
                length += 3;
            }
        }

        return length;
    }

    export function readDataView(view: DataView, byteOffset?: number, littleEndian?: boolean): DecodeResult
    {
        checkDataView(view, getVariableName({ view }));
        checkByteOffsetOptional(byteOffset, getVariableName({ byteOffset }));
        checkBooleanOptional(littleEndian, getVariableName({ littleEndian }));

        byteOffset = byteOffset ?? 0;

        const startOffset = byteOffset;

        const byteLength = view.getInt16(0, littleEndian ?? false);
        byteOffset += SHORT_BYTE_LENGTH;

        const endOffset = byteOffset + byteLength;

        const charCodes: number[] = [];
        while (byteOffset < endOffset)
        {
            let octet: number = view.getUint8(byteOffset);
            if ((octet & FLAG_BYTE_FOLLOWING) === FLAG_NONE)
            {
                charCodes.push(octet);
            }
            //else if ()
        }

        return {
            byteLength: (byteOffset - startOffset),
            string: String.fromCharCode(...charCodes),
        };
    }

    export function toArrayBuffer(string: string, littleEndian?: boolean): ArrayBuffer
    {
        checkString(string, getVariableName({ string }));
        checkBooleanOptional(littleEndian, getVariableName({ littleEndian }));
        
        const array = toArray(string);

        const view = new DataView(new ArrayBuffer(SHORT_BYTE_LENGTH + array.length));
        view.setUint16(0, array.length, littleEndian ?? false);

        for (let i = 0; i < array.length; i++)
        {
            view.setUint8(SHORT_BYTE_LENGTH + i, array[i]);
        }

        return view.buffer;
    }

    export function writeDataView(string: string, view: DataView, byteOffset?: number, littleEndian?: boolean): number
    {
        checkString(string, getVariableName({ string }));
        checkDataView(view, getVariableName({ view }));
        checkByteOffsetOptional(byteOffset, getVariableName({ byteOffset }));
        checkBooleanOptional(littleEndian, getVariableName({ littleEndian }));

        byteOffset = byteOffset ?? 0;

        const array = toArray(string);
        const startOffset = byteOffset;

        view.setUint16(0, array.length, littleEndian ?? false);
        byteOffset += SHORT_BYTE_LENGTH;
        
        for (const octet of array)
        {
            view.setUint8(byteOffset, octet);
            byteOffset += 1;
        }

        return (byteOffset - startOffset);
    }

    function toArray(string: string): number[]
    {
        const array: number[] = [];
        for (let i = 0; i < string.length; i++)
        {
            const charCode: number = string.charCodeAt(i);
            if ((charCode > CHAR_NULL) && (charCode < CHAR_CONTROL_0080))
            {
                array.push(charCode);
            }
            else if ((charCode === CHAR_NULL) || (charCode < CHAR_SAMARITAN_LETTER_ALAF))
            {
                array.push(
                    MASK_BYTE_LENGTH_TWO | (charCode >>> 6),
                    FLAG_BYTE_FOLLOWING  | (charCode        & MASK_BITS_LAST_SIX));
            }
            else
            {
                array.push(
                    MASK_BYTE_LENGTH_THREE |  (charCode >>> 12),
                    FLAG_BYTE_FOLLOWING    | ((charCode >>>  6) & MASK_BITS_LAST_SIX),
                    FLAG_BYTE_FOLLOWING    |  (charCode         & MASK_BITS_LAST_SIX));
            }
        }

        return array;
    }

    export interface DecodeResult
    {
        byteLength: number;
        string: string;
    }
}
