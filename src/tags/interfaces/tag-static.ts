"use strict";

import { Tag } from "../tag";

/**
 * An interface which represents the static members of an NBT tag class.
 * 
 * @template T The type of an NBT tag instance.
 */
export interface ITagStatic<T extends Tag = Tag>
{
    /**
     * The type of the NBT tag this class represents.
     */
    readonly TYPE: string;

    /**
     * The ID of type of the NBT tag this class represents.
     */
    readonly TYPE_ID: number;

    /**
     * Initialize a new NBT tag instance.
     */
    new(...args: unknown[]): T;

    /**
     * Encode the binary stream of the NBT tag and store its value to a new `Tag` instance.
     * 
     * @param buffer       The binary stream of the NBT tag.
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     decoded in big-endian by default.
     */
    fromArrayBuffer(buffer: ArrayBuffer, littleEndian?: boolean): T;

    /**
     * Encode the binary stream of the NBT tag and store its value to a new `Tag` instance.
     * 
     * @param buffer       The binary stream of the NBT tag.
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     decoded in big-endian by default.
     */
    fromBuffer(buffer: Buffer, littleEndian?: boolean): T;

    /**
     * Encode the binary stream of the NBT tag and store its value to a new `Tag` instance.
     * 
     * @param buffer       The binary stream of the NBT tag.
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     decoded in big-endian by default.
     */
    fromUint8Array(array: Uint8Array, littleEndian?: boolean): T;

    readDataView(view: DataView, byteOffset?: number, littleEndian?: boolean): Tag.DecodeResult<T>;
}
