import toastr from "toastr";

const alertError = (message) => toastr.error(message, "Something went wrong");
// const alertSuccess = (message, action) => toastr.success(message, action);

const request = (userId, resource, successCallback, failCallback, action) => {
  const requestOptions = {
    crossDomain: true,
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  fetch(
    "https://localhost:7128/office/" + resource + "/" + userId,
    requestOptions
  )
    .then((response) => {
      const data = response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        alertError("Failed to " + action);

        if (failCallback) {
          failCallback();
        }

        return error;
      }

      if (successCallback) {
        successCallback();
      }
    })
    .catch((error) => {
      alertError("Failed to " + action);

      if (failCallback) {
        failCallback();
      }
    });
};

export default class OfficeService {
  async checkIn(userId, successCallback, failCallback) {
    return request(
      userId,
      "checkin",
      successCallback,
      failCallback,
      "Check In"
    );
  }
  async checkOut(userId, successCallback, failCallback) {
    return request(
      userId,
      "checkout",
      successCallback,
      failCallback,
      "Check Out"
    );
  }
}
