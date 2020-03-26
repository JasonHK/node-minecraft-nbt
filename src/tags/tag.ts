"use strict";

import { getVariableName } from "@jasonhk/variable-name";

import { TagStaticLike } from "./interfaces/tag-static-like";
import { TagStaticTypes } from "./interfaces/tag-static-types";

/**
 * An abstract representation of an NBT tag. All NBT tag implementations were inherited from this
 * class.
 */
export abstract class Tag
{
    /**
     * The type of the NBT tag this class represents.
     */
    public static readonly TYPE: string;

    /**
     * The ID of type of the NBT tag this class represents.
     */
    public static readonly TYPE_ID: number;

    /**
     * The type of this NBT tag instance.
     */
    public abstract readonly TYPE: string;

    /**
     * The ID of the type of this NBT tag instance.
     */
    public abstract readonly TYPE_ID: number;

    /**
     * The size in byte of the payload of this NBT tag instance.
     */
    public abstract readonly byteLength: number;

    /**
     * The identifier string that will be used as the default string description of this NBT tag
     * instance.
     */
    public abstract readonly [Symbol.toStringTag]: string;

    /**
     * Initialize a new NBT tag instance.
     */
    public constructor()
    {
        if (new.target === Tag)
        {
            throw new TypeError(`Cannot create an instance of the abstract class \`${ Tag.name }\`.`);
        }
    }

    //public abstract toString(name: string, space?: string | number): string;

    ///**
    // * Encode the value of the NBT tag to a binary stream and write it to a `DataView`.
    // * 
    // * @param view         The `DataView` which the binary stream will be written to.
    // * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
    // *                     encoded in big-endian by default.
    // * @return The size (in byte) of the binary stream which was written to the `DataView`.
    // */
    //public abstract writeDataView(view: DataView, littleEndian?: boolean): number;

    /**
     * Encode the value of the NBT tag to a binary stream and write it to a `DataView`.
     * 
     * @param view         The `DataView` which the binary stream will be written to.
     * @param byteOffset   The place in the buffer at which the binary stream should start writing.
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     encoded in big-endian by default.
     * @return The size (in byte) of the binary stream which was written to the `DataView`.
     */
    public abstract writeDataView(view: DataView, byteOffset?: number, littleEndian?: boolean): number;

    /**
     * Encode the value of the NBT tag to a binary stream and store it to an `ArrayBuffer`.
     * 
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     encoded in big-endian by default.
     */
    public toArrayBuffer(littleEndian?: boolean): ArrayBuffer
    {
        // Initialize a new `ArrayBuffer` instance with the byte length specified by the `Tag` instance.
        const buffer = new ArrayBuffer(this.byteLength);
        
        // Initialize a new `DataView` instance with that `ArrayBuffer` and write the encoded payload to
        // the `ArrayBuffer` using that `DataView`. After that, return the modified `ArrayBuffer`.
        this.writeDataView(new DataView(buffer), undefined, littleEndian);
        return buffer;
    }

    /**
     * Encode the value of the NBT tag to a binary stream and store it to an `Buffer`.
     * 
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     encoded in big-endian by default.
     */
    public toBuffer(littleEndian?: boolean): Buffer
    {
        return Buffer.from(this.toArrayBuffer(littleEndian));
    }

    /**
     * Encode the value of the NBT tag to a binary stream and store it to an `Uint8Array`.
     * 
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     encoded in big-endian by default.
     */
    public toUint8Array(littleEndian?: boolean): Uint8Array
    {
        return new Uint8Array(this.toArrayBuffer(littleEndian));
    }

    protected static getTagByID<T extends Extract<keyof TagStaticTypes, number>>(id: T): TagStaticTypes[T];
    protected static getTagByID(id: number): TagStaticLike | undefined;
    protected static getTagByID(id: number): TagStaticLike | undefined
    {
        throw new Error();
    }

    protected static getTagByName<T extends Extract<keyof TagStaticTypes, string>>(name: T): TagStaticTypes[T];
    protected static getTagByName(name: string): TagStaticLike | undefined;
    protected static getTagByName(name: string): TagStaticLike | undefined
    {
        throw new Error();
    }

    /**
     * Encode the binary stream of the NBT tag and store its value to a new `Tag` instance.
     * 
     * @param buffer       The binary stream of the NBT tag.
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     decoded in big-endian by default.
     */
    public static fromArrayBuffer(buffer: ArrayBuffer, littleEndian?: boolean): Tag
    {
        return this.readDataView(new DataView(buffer), undefined, littleEndian).tag;
    }

    /**
     * Encode the binary stream of the NBT tag and store its value to a new `Tag` instance.
     * 
     * @param buffer       The binary stream of the NBT tag.
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     decoded in big-endian by default.
     */
    public static fromBuffer(buffer: Buffer, littleEndian?: boolean): Tag
    {
        return this.fromArrayBuffer(buffer.buffer, littleEndian);
    }

    /**
     * Encode the binary stream of the NBT tag and store its value to a new `Tag` instance.
     * 
     * @param buffer       The binary stream of the NBT tag.
     * @param littleEndian Determine the endianness of the binary stream. If omitted, the value will be
     *                     decoded in big-endian by default.
     */
    public static fromUint8Array(array: Uint8Array, littleEndian?: boolean): Tag
    {
        return this.fromArrayBuffer(array.buffer, littleEndian);
    }

    public static readDataView(view: DataView, byteOffset?: number, littleEndian?: boolean): Tag.DecodeResult
    {
        throw new TypeError();
    }
}

export namespace Tag
{
    export interface DecodeResult<T extends Tag = Tag>
    {
        byteLength: number;
        tag: T;
    }
}
