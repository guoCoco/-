const dns = require('dns');

// 解析 baidu.com

// dns.lookup('baidu.com', (err, address, family) => {
//   console.log(address, family)
// })


dns.resolve4('baidu.com', (err, addresses) => {
  if (err) throw err;

  console.log(`地址: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`地址 ${a} 逆向解析到域名: ${JSON.stringify(hostnames)}`);
    });
  });
});