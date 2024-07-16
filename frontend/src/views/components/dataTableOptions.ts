export const DataTableOptions = {
        search: true,
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        selectableRowsHideCheckboxes: true,
        responsive: "vertical",
        tableBodyHeight: "auto",
        tableBodyMaxHeight: "auto",
        textLabels: {
            body: {
                noMatch: "Carregando informações...",
                toolTip: "Classificar",
            },
            pagination: {
                next: "Próxima Página",
                previous: "Página Anterior",
                rowsPerPage: "Registros por página",
                displayRows: "de",
            },
            toolbar: {
                search: "Pesquisar",
                viewColumns: "Olhar colunas",
                filterTable: "Filtrar Tabela",
            },
            filter: {
                all: "Todos",
                title: "Filtros",
                reset: "Redefinir",
            },
            viewColumns: {
                title: "Mostrar colunas",
            },
        },
};