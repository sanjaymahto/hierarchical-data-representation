/* eslint-disable */

const create = dag.default;

let dagFn = create('#dag');
let instance = dagFn(`parent,name
India,East
India,West
India,South
India,North
East,Kolkata
West,Pune
West,Mumbai
Mumbai,Juhu
South,Bengaluru
South,Hyderabad
Hyderabad,Aamerpet
Bengaluru,Kormangala
North,Delhi
Delhi,Karol Bagh
Pune,Khadakwasla
Kolkata,Salt Lake`);
instance.render();
