export function applyPagination(documents: Array<any>, page: number, rowsPerPage: number) {
    return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
