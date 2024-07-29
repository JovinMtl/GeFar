

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

export interface Imiti {
    'code_umuti': string;
    'date_last_vente': Date;
    'description_umuti': string;
    'difference': number;
    'id': number;
    'location': string;
    'lot': Lot[];
    'name_umuti': string;
    'price_in': number;
    'price_out': number;
    'qte_entrant_big': number;
    'quantite_restant': number;
    'ratio_type': number;
    'type_in': string;
    'type_out': string;
    'type_umuti': string;
}