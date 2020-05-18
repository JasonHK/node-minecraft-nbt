"use strict";

import { StringConverter } from "src/utilities/string-converter";

const TEST_CASES = new Map<string, TestCase>(
    [
        [
            "Empty String",
            {
                string: "",
                array: [],
            }
        ],
    ]);

describe(
    "StringConverter",
    () =>
    {
        describe(
            "toArray(string: string): number[]",
            () =>
            {
                // const toArray = StringConverter.toArray;

                // for (const [name, { string, array }] of TEST_CASES)
                // {
                //     test(name, () => { expect(toArray(string)).toStrictEqual(array); });
                // }
            });
    });

interface TestCase
{
    string: string;
    array: number[];
}
