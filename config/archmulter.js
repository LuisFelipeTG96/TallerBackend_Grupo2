import _multer from "multer";
import * as modelProduct from "../models/product.model.js";

const storage = _multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + getExtension(file.originalname));
    }
});

function getExtension(filename) {
    return filename.substring(filename.lastIndexOf('.'));
}

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo invalido'), false);
    }
};

export const upload = function(req, res) {
    console.log("------------multer------------");
    const uploadFile = _multer({ storage: storage, fileFilter: fileFilter,
        limits: { fileSize: 5*1024*1024 }
    });
    uploadFile.single('archivo')(req, res, (err) => {
        if (!err) {
            console.log(req.file);
            if (!req.file) {
                return res.status(400).json({ error: 'No se encontro archivo a cargar'});
            }
            res.json({ mensaje: 'Archivo cargado: ', file: req.file.filename });
        } else {
            console.log(err);
            if (err instanceof _multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'Archivo demasiado pesado' });
                }
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
    });
};

export const uploadProduct = async function(req, res) {
    console.log("------------multer------------");
    const uploadFile = _multer({ storage: storage, fileFilter: fileFilter,
        limits: { fileSize: 5*1024*1024 }
    });
    uploadFile.single('archivo')(req, res, async (err) => {
        if (!err) {
            console.log(req.file);
            console.log(req.body.id_product);
            if (!req.file) {
                return res.status(400).json({ error: 'No se encontro archivo a cargar'});
            }
            if ((await modelProduct.updateArchivo(req.body.id_product, req.file.filename)) > 0) {
                res.json({ mensaje: 'Archivo cargado: ', file: req.file.filename });
            } else {
                return res.status(500).json({ error: 'Error actualizando archivo'});
            }
        } else {
            console.log(err);
            if (err instanceof _multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'Archivo demasiado pesado' });
                }
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
    });
};
