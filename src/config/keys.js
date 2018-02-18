import production from "./prod";
import development from "./dev";

let local = null

if (process.env.NODE_ENV === 'production')
  local = production;
else
  local = development

export default local;
