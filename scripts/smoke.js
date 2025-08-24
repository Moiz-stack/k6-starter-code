import http from 'k6/http';
import { check } from 'k6';
import { urls } from '../config/urls.js';

export let options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  let res = http.get(urls.baseUrl);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
