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

export type Assu = [string, number]
export interface DataAssurance{
    'assu': Assu[];
}



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
    'code_med': string;
    'qte': number;
    'lot': Lot [];
}

export interface ActiveLot {
    'date': string;
    'qte': number;
    'to_panier': number;
    'code_operation': any [];
}

export interface Medi {
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
    'famille_med': string;
}

export interface clInfo{
    'nom_client': string;
    'numero_tel': string;
    'categorie': string;
    'assureur': string;
    'numero_carte': string;
    'numero_bon': string;
    'date_bon': string;

}

export interface DataToAPI{
    'panier': PanierAPI [];
    'client': clInfo;
}
