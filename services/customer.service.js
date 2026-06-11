import pool from "../config/db.js"

export const getCustomers = function() {
    return new Promise( (resolve, reject) => {
        pool.query(
                'SELECT C.customer_id, C.first_name, C.last_name, C.email, C.phone, C.created_at, C.is_active ' +
                'FROM customers C', (err, results, fields) =>{
                    if (err) reject(err);
                    else resolve(results);
                });
    });
};

export const getActiveCustomers = function() {
    return new Promise( (resolve, reject) => {
        pool.query(
                'SELECT C.customer_id, C.first_name, C.last_name, C.email, C.phone, C.created_at, C.is_active ' +
                'FROM customers C ' +
                'WHERE C.is_active = true', (err, results, fields) =>{
                   if (err) reject(err);
                    else resolve(results);
                }
        );
    });
};

export const getCustomerById = function(id) {
    return new Promise( (resolve, reject) => {
        pool.query(
                'SELECT C.customer_id, C.first_name, C.last_name, C.email, C.phone, C.created_at, C.is_active ' +
                'FROM customers C ' +
                'WHERE C.customer_id = ?', [id] , (err, results, fields) =>{
                   if (err) reject(err);
                    else resolve(results);
                }
        );
    });
};



export const createCustomer = function(req) {
    return new Promise( (resolve, reject) => {
        pool.query(
                'INSERT INTO customers (first_name, last_name, email, phone, created_at, is_active)' +
                'VALUES (?, ?, ?, ?, now(), true) ', [req.first_name, req.last_name, req.email, req.phone] , (err, results, fields) =>{
                    if (err) reject(err);
                    else resolve(results.insertId);
                }
        );
    });
};

export const updateCustomer = function(params, req) {
    return new Promise( (resolve, reject) => {
        pool.query(
                'UPDATE customers ' +
                'SET first_name = ?, last_name = ?, email = ?, phone = ? ' +
                'WHERE customer_id = ?', [req.first_name, req.last_name, req.email, req.phone, params.id] , (err, results, fields) =>{
                   if (err) reject(err);
                    else resolve(results);
                }
        );
    });
};

export const deleteCustomer = function(params) {
    return new Promise( (resolve, reject) => {
        pool.query(
                'UPDATE customers SET is_active = ? ' +
                'WHERE customer_id = ?', [false, params.id] , (err, results, fields) =>{
                   if (err) reject(err);
                    else resolve(results);
                });   
    });
};