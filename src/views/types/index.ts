

export interface PanierClient {
    'name_umuti': string;
    'qte': number;
    'price_out': number
}

interface Lot {
    'code_operation': any [];
    'qte': number;
}

export interface PanierAPI {
    'name_umuti': string;
    'qte': number;
    'lot': Lot [];
}

export interface ActiveLot {
    'date': string;
    'qte': number;
    'to_panier': number;
    'code_operation': any [];
}

