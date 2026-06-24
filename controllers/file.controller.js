import * as sfile from "../config/archmulter.js";
import * as sfilemem from "../config/archmemoriamulter.js";

export const upload = function(req, res) {
    console.log("------------controller------------");
    sfile.upload(req, res);
};

export const uploadmem = function(req, res) {
    console.log("------------controller------------");
    sfilemem.upload(req, res);
};
