import _ from "lodash";

export function checkParameters(query: any, whiteList: string[]): string[] {
    return _.difference(Object.keys(query), whiteList)
}