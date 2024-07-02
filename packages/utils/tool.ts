import {JSONDataType} from "../types";

class Tool {

    static handleExtractValueType(value: any): JSONDataType {
        if (typeof value === 'string') {
            return 'string';
        } else if (typeof value === 'boolean') {
            return 'boolean';
        } else if (Number.isInteger(value)) {
            return 'int';
        } else if (Array.isArray(value)) {
            return 'array';
        } else if (typeof value === 'object' && value !== null) {
            return 'object';
        } else if (typeof value === 'number' && !Number.isInteger(value)) {
            return 'float';
        } else {
            return 'null';
        }
    }


    static handleExtractJSONItem(data: string): {
        type: JSONDataType,
        label: string;
        value: string;
    } | null {
        try {
            const _data = data.replace(/,/g, "")
            const isObjectStart = ["[", "{",].some(item => _data.indexOf(item) > -1);
            const isObjectEnd = ["]", "}"].some(item => _data.indexOf(item) > -1);
            const isKeyValue = _data.indexOf(":") > -1
            if (isKeyValue && !isObjectStart && !isObjectEnd) {
                const label = _data.split(":")?.[0]
                const value = _data.split(":")?.[1]
                return {
                    type: this.handleExtractValueType(value),
                    label: JSON.parse(label),
                    value: JSON.parse(value),
                }
            }
        } catch (e) {
            return null
        }
    }
}

export default Tool
