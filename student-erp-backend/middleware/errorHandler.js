// // With ES module standard

// function errorHandler(err, req, res, next) {
//   console.error('Global Error Handler:', err);

//   // If the error has a status code, use it; otherwise, 500
//   const status = err.status || 500;

//   res.status(status).json({
//     success: false,
//     message: err.message || 'Something went wrong',
//     // You can include stack only in development
//     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//   });
// }

// export default errorHandler;


function errorHandler(err, req, res, next) {
  console.error('Global Error Handler:', err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}

export default errorHandler; // ✅ If using ES Modules
// module.exports = errorHandler; // ✅ If using CommonJS
