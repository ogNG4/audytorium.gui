import * as React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
    TableContainer,
    Select,
    HStack,
    IconButton,
    TableCaption,
    Text,
    Box,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { memo, useMemo } from 'react';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    PaginationState,
    getPaginationRowModel,
} from '@tanstack/react-table';
import { When } from 'react-if';

export type DataTableProps<Data extends object> = {
    data: Data[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<Data, any>[];
};

function DataTable<Data extends object>({ data, columns }: DataTableProps<Data>) {
    const tableData = useMemo(() => data ?? [], [data]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const table = useReactTable({
        columns,
        data: tableData,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
        },
    });

    return (
        <TableContainer border="1px" borderColor="gray.200" rounded={'md'}>
            <Box overflowY={'scroll'} maxH={'70vh'}>
                <Table>
                    <Thead position={'sticky'} top={0} bg={'gray.800'} zIndex={999}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}

                                            <chakra.span pl="4">
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() === 'desc' ? (
                                                        <TriangleDownIcon aria-label="sorted descending" />
                                                    ) : (
                                                        <TriangleUpIcon aria-label="sorted ascending" />
                                                    )
                                                ) : null}
                                            </chakra.span>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Tbody>
                    <TableCaption position={'sticky'} bottom={0} zIndex={999} bg={'gray.800'}>
                        <HStack p={1} w={'100%'} justifyContent={'space-between'}>
                            <HStack>
                                <When condition={data.length > pagination.pageSize}>
                                    <IconButton
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                        icon={<ChevronLeftIcon color={'white'} />}
                                        aria-label="Previous page"
                                        variant="outline"
                                    />
                                    <IconButton
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                        icon={<ChevronRightIcon color={'white'} />}
                                        aria-label="Next page"
                                        variant="outline"
                                    />
                                    <Text>
                                        Strona {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}
                                    </Text>
                                </When>
                                <Text ml={2}>
                                    Wyświetlono {table.getRowModel().rows.length} z {table.getRowCount()} rekordów
                                </Text>
                            </HStack>
                            <Select
                                justifySelf={'flex-end'}
                                w={'auto'}
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </Select>
                        </HStack>
                    </TableCaption>
                </Table>
            </Box>
        </TableContainer>
    );
}

export default memo(DataTable);
