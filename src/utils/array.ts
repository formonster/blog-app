import { get } from "lodash";

export function sortAscObjectItem<T>(arr: T[], field: string): T[] {
    function compare(path: string): (a: T, b: T) => number {
        return function (a, b) {
            var value1 = path ? get(a, path) : a;
            var value2 = path ? get(b, path) : b;
            return value1 - value2;
        }
    }
    return arr.sort(compare(field))
}

export function sortAscArrayItem<T extends any[]>(arr: T[], index: number): T[] {
    function compare(index: number): (a: T, b: T) => number {
        return function (a, b) {
            var value1 = a[index];
            var value2 = b[index];
            return value1 - value2;
        }
    }
    return arr.sort(compare(index))
}

export function sortDescObjectItem<T>(arr: T[], field: string): T[] {
    function compare(path: string): (a: T, b: T) => number {
        return function (a, b) {
            var value1 = path ? get(a, path) : a;
            var value2 = path ? get(b, path) : b;
            return value2 - value1;
        }
    }
    return arr.sort(compare(field))
}

export function sortDescArrayItem<T extends any[]>(arr: T[], index: number): T[] {
    function compare(index: number): (a: T, b: T) => number {
        return function (a: any[], b: any[]) {
            var value1 = a[index];
            var value2 = b[index];
            return value2 - value1;
        }
    }
    return arr.sort(compare(index))
}