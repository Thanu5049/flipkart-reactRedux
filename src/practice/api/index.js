import Chance from "chance";

//3rd partyn npm package for fake date api
const chance=Chance();

export const fakeUserData=()=>{

    //console.log(chance.name({middle:true}));
    return chance.name({middle:true});
};
// fakeUserData();