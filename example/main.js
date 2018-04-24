/* eslint-disable */

const create = dag.default;

let dagFn = create('#dag');
let instance = dagFn(`parent,child
null,India
India,East India
India,West India
India,South India
India,North India
East India,Kolkata
West India,Pune
West India,Mumbai
Mumbai,Juhu
South India,Bengaluru
South India,Hyderabad
Hyderabad,Aamerpet
Bengaluru,Kormangala
North India,Delhi
Delhi,Karol Bagh
Pune,Khadakwasla
Kolkata,Salt Lake`,{parentColor: 'green'});
instance.render();
