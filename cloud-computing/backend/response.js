const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        status: statusCode,
        responseCode: message,
        datas: data,
    })
};

export default response;