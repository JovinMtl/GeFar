//This is for types and interfaces definitions

// type dateUmuti = new Date

export interface UmutiSet {
    id : number;
    code_med : string;
    nom_med : string;
    description_med : string;
    date_last_vente : Object;
    prix_in : number;
    prix_vente : number;
    difference : number;
    qte_entrant_big : number;
    quantite_restant : number;
    ratio_type : number;
    type_in : string;
    type_vente : string;
    famille_med : string;
    location : string;
    lot : object[];
}

export interface PanierClient {
    code_med : string;
    nom_med : string;
    qte : number;
    prix_vente : number;
}

export interface PanierAPI {
    code_med : string;
    // code_operation : string;
    qte : number;
}

 export type Lot = { date: Date, code_operation:String, qte:Number }


export interface MedApprov {
    nom_med : string;
    classe_med: string;
    sous_classe_med : string;
    forme :string;
    qte: number;
    prix_achat: number;
    date_peremption: Date;
    type_achat: string; // carton
    type_vente: string; // piece ou plaquette
    ratio: number; // 1 if no detail, 10, ...
}

