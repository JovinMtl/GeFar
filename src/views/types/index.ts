

interface PanierClient {
    'name_umuti': string;
    'qte': number;
    'price_out': number
}

interface Lot {
    'code_operation': any [];
    'qte': number;
}

interface PanierAPI {
    'name_umuti': string;
    'qte': number;
    'lot': Lot [];
}