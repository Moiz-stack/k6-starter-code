import { check } from 'k6';

export function basicChecks(res) {
  return check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 800ms": (r) => r.timings.duration < 800,
  });
}
