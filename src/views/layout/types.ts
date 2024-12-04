//This is for types and interfaces definitions

// type dateUmuti = new Date

export interface UmutiSet {
    id : number;
    code_med : string;
    nom_med : string;
    description_med : string;
    date_last_vente : Object;
    prix_in : number;
    prix_out : number;
    difference : number;
    qte_entrant_big : number;
    quantite_restant : number;
    ratio_type : number;
    type_in : string;
    type_out : string;
    type_med : string;
    location : string;
    lot : object[];
}

export interface PanierClient {
    code_med : string;
    nom_med : string;
    qte : number;
    prix_out : number;
}

export interface PanierAPI {
    code_med : string;
    // code_operation : string;
    qte : number;
}

 export type Lot = { date: Date, code_operation:String, qte:Number }

