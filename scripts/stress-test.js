import http from 'k6/http';
import { sleep } from 'k6';
import { urls } from '../config/urls.js';

export let options = {
  stages: [
    { duration: '20s', target: 20 }, // ramp up
    { duration: '30s', target: 50 }, // stay
    { duration: '20s', target: 0 },  // ramp down
  ],
};

export default function () {
  http.get(urls.baseUrl);
  sleep(1);
}
