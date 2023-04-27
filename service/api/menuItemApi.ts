import {MenuCategory, MenuItemCreateSchema, MenuItemsService, MenuItemUpdateSchema} from "../../openaip";
import {getCredentials} from "./common";

type getMenuItemsProps = {
    limit: number
    page: number
    order: string
    filterQuery: string
}

const getMenuItems = async ({limit, page, order = "", filterQuery = ""}: getMenuItemsProps) => {
    getCredentials()

    const filters = filterQuery?.split("&")
    const rawCategory = filters?.filter(elem => elem.includes("category="))
    const rawSubCategory = filters?.filter(elem => elem.includes("subCategory="))

    const category = rawCategory.map(elem => elem.replace("category=", ""))
    const subCategory = rawSubCategory.map(elem => elem.replace("subCategory=", ""))

    try {
        const response = await MenuItemsService.getMenuItemsApiMenuItemsGet(
            limit, page, order, category as Array<MenuCategory>, subCategory)
        return {result: response.menu_items, count: response.results}
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

type createMenuItemData = {
    id?: number,
    category?: MenuCategory;
    sub_category?: string;
    name?: string;
    sub_name?: string;
    main_unit?: string;
    main_price?: string;
    secondary_unit?: string;
    secondary_price?: string;
    special?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

const createMenuItem = async (data: createMenuItemData) => {
    getCredentials()

    try {
        if (data.id) {
            await MenuItemsService.updateMenuItemApiMenuItemsMenuItemIdPatch(data.id, data as MenuItemUpdateSchema)
        } else {
            await MenuItemsService.createMenuItemApiMenuItemsPost(data as MenuItemCreateSchema)
        }
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

const deleteMenuItem = async (idsArray: Array<number>) => {
    getCredentials()
    try {
        await Promise.all(
            idsArray.map(
                (reservationId: number) => MenuItemsService.deleteMenuItemApiMenuItemsMenuItemIdDelete(
                    reservationId)))
    } catch (e) {
        // @ts-ignore
        throw new Error(e)
    }
}

const getMenuItemFilterTree = async () => {
    getCredentials()

    try {
        const filterItems = await MenuItemsService.getMenuItemsFilterApiMenuItemsFiltersGet()
        const tree = {}
        filterItems.map(categoryItem => {
            tree[categoryItem.category] = {
                state: true,
                children: Object.fromEntries(categoryItem.sub_categories.map(name => [name, true]))}
        })
        return tree
    } catch (e) {
        throw new Error(e as string)
    }
}


export {
    getMenuItems,
    createMenuItem,
    deleteMenuItem,
    getMenuItemFilterTree
}
