import db from './connection.js';
import response from './response.js';
import ImgUpload from './imgUpload.js'; 
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage });

// Show all reports and based on search key
const getAllReports = (req, res) => {
    let { search } = req.body;
    if (search === undefined){
        search = "";
    }
    const query = `SELECT laporan.id, laporan.lokasi, laporan.keterangan, laporan.foto, laporan.status_penanganan, laporan.status_laporan, laporan.tingkat_kerusakan, laporan.tanggal_buat, laporan.tanggal_edit, users.nama as pelapor FROM laporan JOIN users ON laporan.user_id = users.id WHERE laporan.lokasi LIKE "%${search}%" OR laporan.keterangan LIKE "%${search}%";`;
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
    upload.single('attachment')(req, res, (error) => {
      if (error) {
        console.error(error);
        response(500, "Error uploading file", "Failed", res);
        return;
      }
  
      const { id } = req.params;
      const { lokasi, keterangan, status_penanganan, status_laporan, tingkat_kerusakan } = req.body;
      const file = req.file; // Get the uploaded file
  
      // Check if a file was uploaded
      if (file) {
        // Upload the file to GCS using the ImgUpload module
        ImgUpload.uploadToGcs(file, (error, imageUrl) => {
          if (error) {
            console.error(error);
            response(500, "Error uploading file to GCS", "Failed", res);
            return;
          }
  
          // Update the record in the database with the new image URL
          const query = `UPDATE laporan SET lokasi = ?, keterangan = ?, foto = ?, status_penanganan = ?, status_laporan = ?, tingkat_kerusakan = ? WHERE id = ?`;
          const values = [lokasi, keterangan, imageUrl, status_penanganan, status_laporan, tingkat_kerusakan, id];
  
          db.query(query, values, (error, result) => {
            if (error) {
              console.error(error);
              response(500, "Invalid", "Error", res);
              return;
            }
  
            if (result?.affectedRows) {
              const data = {
                isSuccess: result.affectedRows,
                message: result.message,
              };
              response(200, data, "Update report successfully", res);
            } else {
              response(404, "Report not found", "Failed", res);
            }
          });
        });
      } else {
        // No file was uploaded, update the record without changing the image
        const query = `UPDATE laporan SET lokasi = ?, keterangan = ?, status_penanganan = ?, status_laporan = ?, tingkat_kerusakan = ? WHERE id = ?`;
        const values = [lokasi, keterangan, status_penanganan, status_laporan, tingkat_kerusakan, id];
  
        db.query(query, values, (error, result) => {
          if (error) {
            console.error(error);
            response(500, "Invalid", "Error", res);
            return;
          }
  
          if (result?.affectedRows) {
            const data = {
              isSuccess: result.affectedRows,
              message: result.message,
            };
            response(200, data, "Update report successfully", res);
          } else {
            response(404, "Report not found", "Failed", res);
          }
        });
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
  upload.single('attachment')(req, res, (error) => {
    if (error) {
      console.error(error);
      response(500, "Error uploading file", "Failed", res);
      return;
    }

    const { lokasi, keterangan, status_penanganan, status_laporan, tingkat_kerusakan, user_id } = req.body;
    const file = req.file;

    if (!file) {
      response(400, "No file uploaded", "Failed", res);
      return;
    }

    // Upload the file to GCS using the ImgUpload module
    ImgUpload.uploadToGcs(file, (error, imageUrl) => {
      if (error) {
        console.error(error);
        response(500, "Error uploading file to GCS", "Failed", res);
        return;
      }

      // Insert the record into the database with the image URL
      const query = `INSERT INTO laporan (lokasi, keterangan, foto, status_penanganan, status_laporan, tingkat_kerusakan, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;
      const values = [lokasi, keterangan, imageUrl, status_penanganan, status_laporan, tingkat_kerusakan, user_id];

      db.query(query, values, (error, result) => {
        if (error) {
          console.error(error);
          response(500, "Invalid", "Error", res);
          return;
        }

        if (result?.affectedRows) {
          const data = {
            isSuccess: result.affectedRows,
            message: result.message,
          };
          response(200, result, "Report created successfully", res);
        } else {
          response(404, "Failed to create report", "Failed", res);
        }
      });
    });
  });
};



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
            response("404", "Failed to create user", "Failed", res);
        }
    });
}

// Login Users
const loginUser = (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email LIKE "${email}" AND password LIKE "${password}";`;
    db.query(query, (error, result) => {
        if (result.length > 0){
            response(200, result, "success", res);
            // return true;
        } else {
            response(404, "User not found", "failed", res);
            // return false;
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
}