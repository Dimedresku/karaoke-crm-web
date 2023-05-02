import React, {ReactElement, useState, useEffect} from 'react';
import styles from "../../styles/admin/Events.module.scss"
import DashboardLayout from "../../layouts/dashboard/layout";
import {CustomTable} from "../../components/customtable/customtable";
import {AuthJWTService} from "../../service/auth/authJWTService";
import {NextApiRequest, NextApiResponse} from "next";
// @ts-ignore
import Cookies from 'cookies'
import {
    Checkbox,
    Stack,
    Fab,
    TableRow,
    TableCell,
    TableHead,
    IconButton,
    Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlertDialog from "../../components/AlertModal/AlertModal";
import {useModalState} from "../../hooks/use-form-state";
import SimpleForm from "../../components/simpleForm/simpleForm";
import {getMenuItems, createMenuItem, deleteMenuItem, getMenuItemFilterTree} from "../../service/api/menuItemApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { publishRefreshTable } from "../../utils/tableEvent";
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuItemTreeFilter from "../../components/menuItemTreeFilter";
import {translateCategory} from "../../utils/translates/menuItemTranslate";
import TextInput from "../../components/formComponents/textInput";
import {SwitchInput} from "../../components/formComponents/switchInput";
import SelectInput from "../../components/formComponents/selectinput";
import {MenuCategory} from "../../openaip";


type MenuItemTableToolBarProps = {
    selected: Array<number>,
}

const MenuItemTableToolBar = ({selected}: MenuItemTableToolBarProps) => {

    const [showAlert, setShowAlert] = useState(false)

    const handleDelete = async () => {
        await deleteMenuItem(selected)
        publishRefreshTable()
    }

    return (
        <>
            <Stack direction="row" spacing={1}>
                <Tooltip title="Delete">
                    <IconButton sx={{'&:hover': {color: "#DC143C"}}} onClick={() => setShowAlert(true)} >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <AlertDialog showDialog={showAlert}
                         handleSubmit={handleDelete}
                         setShowDialog={setShowAlert}
                         message={"Delete selected reservations?"}
            />
        </>
    )
}

type MenuItemsTableUtilsProps = {
    setFilterQuery: Function
}

const MenuItemsTableUtils = ({setFilterQuery}: MenuItemsTableUtilsProps) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [filterState, setFilterState] = useState({})
    const [load, setLoad] = useState(true)

    useEffect(() => {
        getMenuItemFilterTree().then(result => {
            setFilterState(result)
            setLoad(false)
        })
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        let filterParams = {category: [] as Array<string>, subCategory: [] as Array<string>}
        if (!Object.values(filterState).every(treeState => treeState.state)) {
            const filters = Object.entries(filterState)
            for (const [parentName, treeState] of filters) {
                if (treeState.state) {
                    filterParams.category.push(parentName)
                } else {
                    for (const [childrenName, state] of Object.entries(treeState.children)) {
                        if (state) {filterParams.subCategory.push(childrenName)}
                    }
                }
            }
        }
        setFilterQuery(filterParams)
        setAnchorEl(null);
    };

    return (
        <>
        <Stack direction="row" spacing={1}>
            <Tooltip title="Filter list">
                <IconButton sx={{marginRight: 2}}
                            aria-describedby={id}
                            onClick={handleClick}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <MenuItemTreeFilter
                open={open}
                handleClose={handleClose}
                anchorEl={anchorEl}
                id={id}
                filterState={filterState}
                setFilterState={setFilterState}
                loading={load}
                nameTranslate={translateCategory}
            />
        </Stack>
        </>
    )
}

type MenuItemsTableHeadProps = {
    checked: boolean,
    indeterminate: boolean,
    recordsSelection: any,
    order: string,
    setOrder: Function
}

const MenuItemsTableHead = ({checked, indeterminate, recordsSelection, order, setOrder}: MenuItemsTableHeadProps) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={checked}
                        indeterminate={indeterminate}
                        onChange={(event) => {
                            if (event.target.checked) {
                                recordsSelection.handleSelectAll();
                            } else {
                                recordsSelection.handleDeselectAll();
                            }
                        }}
                    />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Sub Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub Category</TableCell>
                <TableCell>Main Unit</TableCell>
                <TableCell>Price</TableCell>
            </TableRow>
        </TableHead>
    )
}

const MenuItems = () => {

    const [alert, setAlert] = useState({show: false, message: "", description: ""})
    const formState = useModalState()

    const rowConf = [
        {
            fieldName: 'name',
            click: true,
            clickHandle: formState.handleClickOpen,
        },
        {fieldName: "sub_name"},
        {fieldName: "category", component: (item: any) => translateCategory(item.category)},
        {fieldName: 'sub_category'},
        {fieldName: 'main_unit'},
        {fieldName: 'main_price'},
    ]

    const defaultFormState = {
        id: "",
        category: "",
        sub_category: "",
        name: "",
        sub_name: "",
        main_unit: "",
        main_price: "",
        secondary_unit: "",
        secondary_price: "",
        special: false,
    }

    const handleSubmitForm = async (formData: any) => {
        await createMenuItem(formData)
        publishRefreshTable()
    }

    return (
        <>
            <div className={styles.events}>
                <CustomTable
                    rowsConf={rowConf}
                    // @ts-ignore
                    TableCustomHead={MenuItemsTableHead}
                    // @ts-ignore
                    TableAction={MenuItemTableToolBar}
                    fetchData={getMenuItems}
                    setError={setAlert}
                    tableName="Menu Item"
                    //@ts-ignore
                    TableUtils={MenuItemsTableUtils}
                />
                <Stack spacing={2}
                       direction="row"
                       sx={{
                           padding: 2
                       }}
                >
                    <Fab color="primary" aria-label="add" onClick={formState.handleNewOpen}>
                        <AddIcon />
                    </Fab>
                </Stack>
                <SimpleForm formState={formState} defaultState={defaultFormState} submit={handleSubmitForm} title="Menu Item">
                    <TextInput name="name"
                               label="Name"
                    />
                    <TextInput name="sub_name"
                               label="Sub name"
                    />
                    <SelectInput name="category"
                                 label="Category"
                                 selectValues={Object.fromEntries(Object.values(MenuCategory)
                                     .map(category => [category, translateCategory(category)]))} />
                    <TextInput name="sub_category"
                               label="Sub Category"
                    />
                    <TextInput name="main_unit"
                               label="Main Unit"
                    />
                    <TextInput name="main_price"
                               label="Main Price"
                    />
                    <TextInput name="secondary_unit"
                               label="Secondary Unit"
                    />
                    <TextInput name="secondary_price"
                               label="Secondary Price"
                    />
                    <SwitchInput name="special" label="Special" />
                </SimpleForm>
            </div>
        </>
    );
};

MenuItems.getLayout = (page: ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

type ServerSideProps = {
    req: NextApiRequest,
    res: NextApiResponse
}

export const getServerSideProps = async ({req, res}: ServerSideProps) => {
    const authService = AuthJWTService()
    const cookies = new Cookies(req, res)

    const redirectObject = {
        redirect: {
            destination: "/admin/login",
            permanent: false,
        }
    }

    const token = await authService.getAuthToken(cookies)
    if (!token) {
        return redirectObject
    }

    const user = await authService.getUser(token)

    return  {
        props: {
            profileUser: user,
        }
    }

}

export default MenuItems;
