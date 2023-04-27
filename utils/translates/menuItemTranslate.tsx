import {CategoryTransMap} from "./translateMap";

const translateCategory = (name: string) => {
    const translateName = CategoryTransMap.get(name)
    if (translateName !== undefined) {
        return translateName
    } else {
        return name
    }
}

export {
    translateCategory
}
