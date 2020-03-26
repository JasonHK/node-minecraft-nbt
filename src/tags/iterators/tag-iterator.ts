"use strict";

import { getVariableName } from "@jasonhk/variable-name";
import OW from "ow";

const checkIterator = OW.create(OW.object.partialShape({ next: OW.function }));

export abstract class TagIterator<T> implements IterableIterator<T>
{
    public abstract readonly [Symbol.toStringTag]: string;
    
    private readonly _iterator: Iterator<T>;

    public constructor(iterator: Iterator<T>)
    {
        if (new.target === TagIterator)
        {
            throw new TypeError(`Cannot create an instance of the abstract class \`${ TagIterator.name }\`.`);
        }

        checkIterator(iterator, getVariableName({ iterator }));
        this._iterator = iterator;
    }

    public next(): IteratorResult<T>
    {
        return this._iterator.next();
    }

    public [Symbol.iterator](): TagIterator<T>
    {
        return this;
    }
}
