import db from './connection.js';
import response from './response.js';

// Show all reports
const getAllReports = (req, res) => {
    const query = `SELECT laporan.id, laporan.lokasi, laporan.keterangan, laporan.foto, laporan.status_penanganan, laporan.status_laporan, laporan.tingkat_kerusakan, laporan.tanggal_buat, laporan.tanggal_edit, users.nama as pelapor FROM laporan JOIN users ON laporan.user_id = users.id;`;
    db.query(query, (error, result) => {
        response(200, result, "success", res);
    })    
};

// Show all report based on search key
const getSearchReports = (req, res) => {
    let { search } = req.params;
    if (search === undefined){
        search = "";
    }
    const query = `SELECT laporan.id, laporan.lokasi, laporan.keterangan, laporan.foto, laporan.status_penanganan, laporan.status_laporan, laporan.tingkat_kerusakan, laporan.tanggal_buat, laporan.tanggal_edit, users.nama as pelapor FROM laporan JOIN users ON laporan.user_id = users.id WHERE laporan.lokasi LIKE "%${search}%" OR laporan.keterangan LIKE "%${search}%" OR users.nama LIKE "%${search}%";`;
    db.query(query, (error, result) => {
        response(200, result, "success", res);
    })    
};

// Show all reports based on user id
const getAllReportsByUser = (req, res) => {
    const { id } = req.params;
    const query = `SELECT laporan.id, laporan.lokasi, laporan.keterangan, laporan.foto, laporan.status_penanganan, laporan.status_laporan, laporan.tingkat_kerusakan, laporan.tanggal_buat, laporan.tanggal_edit, users.nama as pelapor FROM laporan JOIN users ON laporan.user_id = users.id WHERE users.id= ${id};`;
    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
            response(500, "Invalid", "Error", res);
            return;
        }
        if (result[0] !== undefined){
            response(200, result, "success", res);
        } else {
            response(404, "Detail not found", "Failed", res);
        }
    })
};

// Show detail of reports based on report id
const getDetailReport = (req, res) => {
    const { id } = req.params;
    const query = `SELECT laporan.id, laporan.lokasi, laporan.keterangan, laporan.foto, laporan.status_penanganan, laporan.status_laporan, laporan.tingkat_kerusakan, laporan.tanggal_buat, laporan.tanggal_edit, users.nama as pelapor FROM laporan JOIN users ON laporan.user_id = users.id WHERE laporan.id= ${id};`;
    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
            response(500, "Invalid", "Error", res);
            return;
        }
        if (result[0] !== undefined){
            response(200, result, "success", res);
        } else {
            response(404, "Detail not found", "Failed", res);
        }
    })
};

// Update report based on report id
const updateReport = (req, res) => {
    const tanggal_edit = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const { id } = req.params;
    const { lokasi, keterangan, foto, status_penanganan, status_laporan, tingkat_kerusakan} = req.body
    const query = `UPDATE laporan SET lokasi = '${lokasi}', tanggal_edit = '${tanggal_edit}', foto = '${foto}', keterangan = '${keterangan}', status_penanganan = '${status_penanganan}', status_laporan = '${status_laporan}', tingkat_kerusakan = '${tingkat_kerusakan}' WHERE id = ${id}`;
    
    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
            response(500, "Invalid", "Error", res);
            return;
        }
        if (result?.affectedRows){
            const data = {
                isSuccess: result.affectedRows,
                message: result.message,
            }
            response(200, data, "Update report successfully", res);
        } else {
            response("404", "Report not Found", "Failed", res);
        }
    });
};

// Delete report based on report id
const deleteReport = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM laporan WHERE id = ${id};`;

    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
            response(500, "Invalid", "Error", res);
            return;
        }
        if (result?.affectedRows){
            const data = {
                isDeleted: result.affectedRows,
                message: result.message,
            }
            response(200, data, "Report delete successfully", res);
        } else {
            response(404, "Report not found", "Failed", res);
        }
    });
};

// Create Report
const createReport = (req, res) => {
    const tanggal_buat = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const tanggal_edit = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const { lokasi, keterangan, foto, status_penanganan, status_laporan, tingkat_kerusakan, user_id } = req.body
    const query = `INSERT INTO laporan (lokasi, keterangan, foto, status_penanganan, status_laporan, tingkat_kerusakan, user_id, tanggal_buat, tanggal_edit) VALUES ('${lokasi}', '${keterangan}', '${foto}', '${status_penanganan}', '${status_laporan}', '${tingkat_kerusakan}', ${user_id}, ${tanggal_buat}, ${tanggal_edit});`;
    
    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
            response(500, "Invalid", "Error", res);
            return;
        }
        if (result?.affectedRows){
            const data = {
                isSuccess: result.affectedRows,
                message: result.message,
            }
            response(200, result, "Report created successfully", res);
        } else {
            response("404", "Failed to create user", "Failed", res);
        }
    });
}

// Create Users
const createUser = (req, res) => {
    const { nama, email, password, role } = req.body
    const query = `INSERT INTO users (nama, email, password, role) VALUES ('${nama}', '${email}', '${password}', '${role}');`;
    
    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
            response(500, "Invalid", "Error", res);
            return;
        }
        if (result?.affectedRows){
            const data = {
                isSuccess: result.affectedRows,
                message: result.message,
            }
            response(200, result, "User created successfully", res);
        } else {
            response(404, "Failed to create user", "Failed", res);
        }
    });
}

// Login Users
const loginUser = (req, res) => {
    const { email, password, role } = req.params;
    const query = `SELECT * FROM users WHERE email LIKE "${email}" AND password LIKE "${password}" AND role LIKE "${role}";`;
    db.query(query, (error, result) => {
        if (result.length > 0){
            response(200, result, "success", res);
        } else {
            response(404, "User not found", "failed", res);
        }
    })
};

// filter

export {
    getAllReports,
    getAllReportsByUser,
    getDetailReport,
    updateReport,
    deleteReport,
    createReport,
    createUser,
    loginUser,
    getSearchReports
}