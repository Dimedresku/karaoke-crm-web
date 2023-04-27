import React, {useEffect, useState} from 'react';
import Popover from '@mui/material/Popover';
import ListCheckboxes from "./listCheckboxes/listCheckboxes";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";


type MenuItemTreeFilterProps = {
    open: boolean,
    anchorEl: HTMLElement | null,
    handleClose: Function,
    id: string | undefined,
    filterState: object,
    setFilterState: Function,
    loading: boolean,
    nameTranslate: Function
}

const MenuItemTreeFilter = (
    {
        open,
        anchorEl,
        id,
        handleClose,
        filterState,
        setFilterState,
        loading,
        nameTranslate
    }: MenuItemTreeFilterProps) => {

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            // @ts-ignore
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            sx={{maxHeight: "70%"}}
        >
            {loading ? <span>Loading</span> :
            <List
                sx={{ width: '100%', bgcolor: 'background.paper', padding: 0 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Menu Item Filter
                    </ListSubheader>
                }
            >
                {Object.keys(filterState).map((subTreeName) => (
                    <ListCheckboxes state={filterState}
                                    changeState={setFilterState}
                                    parentName={subTreeName}
                                    key={subTreeName}
                                    nameTranslate={nameTranslate}
                    />
                ))}
            </List> }
        </Popover>
    );
};

export default MenuItemTreeFilter;
