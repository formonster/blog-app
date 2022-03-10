import { get } from "lodash";

export function sortAscObjectItem(arr: any[], field: string) {
    function compare(path: string) {
        return function (a: object, b: object) {
            var value1 = path ? get(a, path) : a;
            var value2 = path ? get(b, path) : b;
            return value1 - value2;
        }
    }
    return arr.sort(compare(field))
}

export function sortAscArrayItem(arr: any[], index: number) {
    function compare(index: number) {
        return function (a: any[], b: any[]) {
            var value1 = a[index];
            var value2 = b[index];
            return value1 - value2;
        }
    }
    return arr.sort(compare(index))
}

export function sortDescObjectItem(arr: any[], field: string) {
    function compare(path: string) {
        return function (a: object, b: object) {
            var value1 = path ? get(a, path) : a;
            var value2 = path ? get(b, path) : b;
            return value2 - value1;
        }
    }
    return arr.sort(compare(field))
}

export function sortDescArrayItem(arr: any[], index: number) {
    function compare(index: number) {
        return function (a: any[], b: any[]) {
            var value1 = a[index];
            var value2 = b[index];
            return value2 - value1;
        }
    }
    return arr.sort(compare(index))
}