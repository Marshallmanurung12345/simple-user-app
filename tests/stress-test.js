import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 200 }, // ramp up to 200 users
    { duration: '5m', target: 200 }, // maintain 200 users
    { duration: '1m', target: 800 }, // ramp up to 800 users
    { duration: '5m', target: 800 }, // maintain 800 users
    { duration: '1m', target: 1000 }, // ramp up to 1000 users
    { duration: '5m', target: 1000 }, // maintain 1000 users
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {
  const res = http.get('http://localhost:3000/getUsers');
  check(res, { '200': (r) => r.status === 200 });
  sleep(1);
};
