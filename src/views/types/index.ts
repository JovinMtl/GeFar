

export interface PanierClient {
    'name_med': string;
    'qte': number;
    'price_out': number
}

interface Lot {
    'code_operation': any [];
    'qte': number;
}

export interface PanierAPI {
    'name_med': string;
    'qte': number;
    'lot': Lot [];
}

export interface ActiveLot {
    'date': string;
    'qte': number;
    'to_panier': number;
    'code_operation': any [];
}

export interface Umuti {
    'code_med': string;
    'date_last_vente': Date;
    'description_med': string;
    'difference': number;
    'id': number;
    'location': string;
    'lot': Lot[];
    'name_med': string;
    'price_in': number;
    'price_out': number;
    'qte_entrant_big': number;
    'quantite_restant': number;
    'ratio_type': number;
    'type_in': string;
    'type_out': string;
    'type_med': string;
}