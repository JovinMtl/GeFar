//
// Based on use from different pharmas, it would be great
// to customize easily by adding or pointing the actual
// pharma text to be used across the app.
//
// June 15, 2026. Thierry Nsanzumukiza
//

// The States
const ph_name = {
  ubz: "Pharmacie Ubuzima",
  shn: "Shana Pharma",
};

const ph_address = {
  ubz: "13è Av, Q. Twinyoni, Kamenge. Ntahangwa - Bujumbura",
  shn: "7è Av, Q. Gikizi, Kamenge, Ntahangwa - Bujumbura",
};

const ph_address_zone = {
  ubz: "13è Av, Q. Twinyoni, Kamenge",
  shn: "7è Av, Q. Gikizi, Kamenge",
};
const ph_address_comm = {
  ubz: "Ntahangwa - Bujumbura",
  shn: "Ntahangwa - Bujumbura",
};

const ph_nif = {
  ubz: "4001411976",
  shn: "0000000000",
};
const ph_tel = {
  ubz: "69 332 288",
  shn: "0000000000",
};

// The target to be used.
const selectedPharma = "shn";
const emptyStr = " ";

// States to export
export const phName = ph_name[selectedPharma] ?? emptyStr;
export const phAddress = ph_address[selectedPharma] ?? emptyStr;
export const phNif = ph_nif[selectedPharma] ?? emptyStr;
export const phTel = ph_tel[selectedPharma] ?? emptyStr;
export const phAddressZone = ph_address_zone[selectedPharma] ?? emptyStr;
export const phAddressComm = ph_address_comm[selectedPharma] ?? emptyStr;
