//This is for types and interfaces definitions

// type dateUmuti = new Date

export interface UmutiSet {
    id : number;
    code_umuti : string;
    name_umuti : string;
    description_umuti : string;
    date_last_vente : Object;
    price_in : number;
    price_out : number;
    difference : number;
    qte_entrant_big : number;
    quantite_restant : number;
    ratio_type : number;
    type_in : string;
    type_out : string;
    type_umuti : string;
    location : string;
    lot : object[];
}

export interface PanierClient {
    code_umuti : string;
    name_umuti : string;
    qte : number;
    price_out : number;
}

export interface PanierAPI {
    code_umuti : string;
    // code_operation : string;
    qte : number;
}

 export type Lot = { date: Date, code_operation:String, qte:Number }

