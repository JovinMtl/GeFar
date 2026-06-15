//
// Based on use from different pharmas, it would be great
// to customize easily by adding or pointing the actual
// pharma text to be used across the app.
//
// June 15, 2026. Thierry Nsanzumukiza
//

const ph_name = {
  ubz: "Pharmacie Ubuzima",
  shn: "Shana Pharma",
};

const ph_address = {
  ubz: "13av. Twinyoni, Kamenge, Ntahangwa",
  shn: "7av, Gikizi, Kamenge, Ntahangwa",
};

const selectedPharma = "shn";
const emptyStr = " ";

// States to export
export const phName = ph_name[selectedPharma] ?? emptyStr;
export const phAddress = ph_address[selectedPharma] ?? emptyStr;
