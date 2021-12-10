import toastr from "toastr";

const alertError = (message) => toastr.error(message, "Something went wrong");

const requestStatusChange = (userId, resource, successCallback, failCallback, action) => {
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
      if (!response.ok) {
        alertError("Failed to " + action);

        if (failCallback) {
          failCallback();
        }

        return;
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

const query = (resource, successCallback, failCallback, action) => {
  const requestOptions = {
    crossDomain: true,
    method: "GET"
  };

  fetch(
    "https://localhost:7128/office/" + resource,
    requestOptions
  )
    .then(async (response) => {
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        alertError("Failed to " + action);

        if (failCallback) {
          failCallback();
        }

        return error;
      }

      if (successCallback) {
        successCallback(data);
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
  checkIn(userId, successCallback, failCallback) {
    requestStatusChange(userId, "checkin", successCallback, failCallback, "Check In");
  }

  checkOut(userId, successCallback, failCallback) {
    requestStatusChange(userId, "checkout", successCallback, failCallback, "Check Out");
  }

  list(successCallback, failCallback) {
    query("list", successCallback, failCallback, "get who else in the office")
  }
}
