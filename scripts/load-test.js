import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';
import { urls } from '../config/urls.js';
import { responseChecks } from '../utils/checks.js';

let responseTime = new Trend('response_time');

export let options = {
  vus: 5,            // virtual users
  duration: '10s',    // run time
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% responses < 500ms
  },
};

export default function () {
  let res = http.get(urls.baseUrl);

  // custom checks
  check(res, responseChecks);

  // custom metric
  responseTime.add(res.timings.duration);

  sleep(1);
}
