const Invalid_Data_Error = 400;
const Not_Found_Error = 404;
const Internal_Server_Error = {
  status: 500,
  message: "An error has occurred on the server"
};

module.exports = {
  Invalid_Data_Error,
  Not_Found_Error,
  Internal_Server_Error
};