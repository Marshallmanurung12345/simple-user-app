import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // ramp up to 100 users
    { duration: '3m', target: 100 }, // maintain 100 users
    { duration: '1m', target: 0 },   // ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete within 100ms
  },
};

export default () => {
  const res = http.get('http://localhost:3000/getUsers');
  check(res, { '200': (r) => r.status === 200 });
  sleep(1);
};
