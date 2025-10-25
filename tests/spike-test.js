import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 2000 }, // ramp up to 2000 users
    { duration: '2m', target: 2000 }, // maintain 2000 users
    { duration: '30s', target: 0 },   // ramp down to 0 users
  ],
};

export default () => {
  const res = http.get('http://localhost:3000/getUsers');
  check(res, { '200': (r) => r.status === 200 });
  sleep(1);
};
