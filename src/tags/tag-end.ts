"use strict";

import { Tag } from "./tag";

/**
 * An NBT tag which represents the end of a `TAG_Compound` NBT tag.
 */
export class TagEnd extends Tag
{
    /**
     * The size in byte of the payload of the NBT tag this class represents.
     */
    public static get BYTE_LENGTH(): 0 { return 0; }

    public static get TYPE(): "TAG_End" { return "TAG_End"; }

    public static get TYPE_ID(): 0x00 { return 0x00; }

    public get TYPE(): typeof TagEnd.TYPE { return TagEnd.TYPE; }

    public get TYPE_ID(): typeof TagEnd.TYPE_ID { return TagEnd.TYPE_ID; }

    public get byteLength(): 0 { return 0; }

    public get [Symbol.toStringTag](): string { return "TagEnd"; }

    public toArrayBuffer(): ArrayBuffer
    {
        // Since `TAG_End`s don't have any payload, it's better to return the `ArrayBuffer` instance
        // directly.
        return new ArrayBuffer(this.byteLength);
    }

    public writeDataView(): number
    {
        return this.byteLength;
    }

    public static fromArrayBuffer(): TagEnd
    {
        return this.readDataView().tag;
    }

    public static fromBuffer(): TagEnd
    {
        return this.fromArrayBuffer();
    }

    public static fromUint8Array(): TagEnd
    {
        return this.fromArrayBuffer();
    }

    public static readDataView(): Tag.DecodeResult<TagEnd>
    {
        return {
            byteLength: this.BYTE_LENGTH,
            tag: new TagEnd(),
        };
    }
}
