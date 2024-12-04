

export interface PanierClient {
    'nom_med': string;
    'qte': number;
    'prix_vente': number
}

interface Lot {
    'code_operation': any [];
    'qte': number;
}

export interface PanierAPI {
    'nom_med': string;
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
    'nom_med': string;
    'prix_in': number;
    'prix_vente': number;
    'qte_entrant_big': number;
    'quantite_restant': number;
    'ratio_type': number;
    'type_in': string;
    'type_vente': string;
    'type_med': string;
}