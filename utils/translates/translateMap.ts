import {MenuCategory} from "../../openaip";

const CategoryTransMap = new Map([
    [MenuCategory.ALCOHOL_DRINKS, "Алкогольные напитки"],
    [MenuCategory.NON_ALCOHOL_DRINKS, "Безалкогольные напитки"],
    [MenuCategory.SNACKS, "Закуски"],
    [MenuCategory.PIZZA, "Пицца"],
    [MenuCategory.SUSHI, "Суши и Роллы"]
])

export {
    CategoryTransMap
}
