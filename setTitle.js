import { phName } from "./src/views/hooks/pharma-info";

const titleId = "ttl";
const title = document.getElementById(titleId);
console.log("The title: ", phName);

if (title) {
  title.innerText = String(phName).toUpperCase();
}
