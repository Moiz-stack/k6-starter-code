import http from "k6/http";
import { sleep, check } from "k6";
import { urls } from "../config/urls.js";
import { basicChecks } from "../utils/checks.js";

export let options = {
  vus: 5,             // 5 virtual users
  duration: "20s",    // run for 20s
  thresholds: {
    http_req_duration: ["p(95)<800"], // 95% of requests < 800ms
  },
};

export default function () {
  // 1. Get Users List (Page 1)
  let res = http.get(`${urls.apiBaseUrl}/users?page=1`);
  check(res, { 
    "users list status": (r) => r.status === 200,
    "users list has data": (r) => r.json("data") && r.json("data").length > 0
  });
  sleep(1);

  // 2. Get Users List (Page 2)
  res = http.get(`${urls.apiBaseUrl}/users?page=2`);
  check(res, { 
    "users page 2 status": (r) => r.status === 200,
    "users page 2 has data": (r) => r.json("data") && r.json("data").length > 0
  });
  sleep(1);

  // 3. Get Single User
  res = http.get(`${urls.apiBaseUrl}/users/1`);
  check(res, { 
    "single user status": (r) => r.status === 200,
    "single user has data": (r) => r.json("data") && r.json("data").id === 1
  });
  sleep(1);

  // 4. Get Single User (Different ID)
  res = http.get(`${urls.apiBaseUrl}/users/2`);
  check(res, { 
    "single user 2 status": (r) => r.status === 200,
    "single user 2 has data": (r) => r.json("data") && r.json("data").id === 2
  });
  sleep(1);

  // 5. Test Resource Endpoint
  res = http.get(`${urls.apiBaseUrl}/unknown`);
  check(res, { 
    "unknown resource status": (r) => r.status === 200,
    "unknown resource has data": (r) => r.json("data") && r.json("data").length > 0
  });
  sleep(1);

  // 6. Test Resource Endpoint
  res = http.get(`${urls.apiBaseUrl}/unknown`);
  check(res, { 
    "unknown resource status": (r) => r.status === 200,
    "unknown resource has data": (r) => r.json("data") && r.json("data").length > 0
  });
  sleep(1);
}
