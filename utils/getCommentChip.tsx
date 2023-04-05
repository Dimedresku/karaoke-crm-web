import React from 'react';
import {Chip, Stack} from "@mui/material";

type GetCommentChipProps = {
    comment: string,
    adminComment: string
}

const GetCommentChip = ({comment, adminComment}: GetCommentChipProps) => {
    return (
        <Stack direction="row" spacing={1}>
            {comment && <Chip label="Comment" color="success" size="small" />}
            {adminComment && <Chip label="Admin comment" color="primary" size="small" />}
        </Stack>
    );
};

export default GetCommentChip;
