export const responseChecks = {
  'status is 200': (r) => r.status === 200,
  'response time < 500ms': (r) => r.timings.duration < 500,
  'response has body': (r) => r.body.length > 0,
  'content type is html': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('text/html'),
};
