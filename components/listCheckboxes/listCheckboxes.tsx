import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Checkbox from "@mui/material/Checkbox";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type ListCheckboxesProps = {
    state: object,
    changeState: Function,
    parentName: string,
    nameTranslate: Function
}


const ListCheckboxes = ({state, changeState, parentName, nameTranslate }: ListCheckboxesProps) => {

    const [open, setOpen] = useState(false)
    const [innerSate, setInnerState] = useState(state[parentName])

    const handleClick = () => {
        setOpen(prev => !prev)
    }

    const checkParent = () => {
        const newInnerState = {...innerSate}
        newInnerState.state = !innerSate.state
        newInnerState.children = Object.fromEntries(Object.entries(innerSate.children).map(el => [el[0], newInnerState.state]))

        setInnerState(newInnerState)
        changeState((prev) => {
            const newState = {...prev}
            newState[parentName] = newInnerState
            return newState
        })
    }

    const checkChildren = (childrenName: string) => {
        const newInnerState = {...innerSate}
        newInnerState.children[childrenName] = !innerSate.children[childrenName]
        newInnerState.state = Object.entries(newInnerState.children).every(elem => elem[1])

        setInnerState(newInnerState)
        changeState((prev) => {
            const newState = {...prev}
            newState[parentName] = newInnerState
            return newState
        })
    }

    const indeterminate = !innerSate.state && Object.values(innerSate.children).some(elem => elem)

    return (
        <>
            <ListItem sx={{paddingTop: 0, paddingBottom: 0}}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={innerSate.state}
                        indeterminate={indeterminate}
                        tabIndex={-1}
                        disableRipple
                        onClick={checkParent}
                    />
                </ListItemIcon>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={nameTranslate(parentName)} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {Object.keys(innerSate.children).map((child, idx) => {
                        return (
                            <ListItemButton sx={{ pl: 4 }} key={`${idx}_${child}`}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={innerSate.children[child]}
                                        tabIndex={-1}
                                        disableRipple
                                        onClick={() => checkChildren(child)}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={child} />
                            </ListItemButton>
                        )
                    })}
                </List>
            </Collapse>
            </>
    );
};

export default ListCheckboxes;
