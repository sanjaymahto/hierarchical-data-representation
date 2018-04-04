let dagFn = dag('div');
let instn = dagFn(`parent,name
India,East
India,West
India,South
India,North
East,Kolkata
West,Pune
West,Mumbai
South,Bengaluru
North,Delhi
Delhi,Karol Bagh
Pune,Khadakwasla
Kolkata,Salt Lake`);
instn.render();
