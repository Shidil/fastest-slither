/**
 * Ping a server and get latency
 * @param  {String} host host ip
 * @param  {Number} port host port
 * @param  {Function} pong callback method
 * @param  {Boolean} async flag
 * @return {Undefined} none
 */
let ping = (host, port, pong, async) => {
  let starTime = new Date().getTime();
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "http://" + host + ":" + port, async);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let endTime = new Date().getTime();
      let latancy = endTime - starTime;

      if (pong && typeof pong === 'function') {
        pong(latancy);
      }
    }
  };
  try {
    xhr.send(null);
  } catch(exception) {
    // this is expected
  }
};

let callback = (server, latancy) => {
  server.ping = latancy;
  pingList.push(server);

  // first and fastest
  if (pingList.length === 1) {
    console.log('fastest', server.ip, server.ping);
    setFastestServer();
  }
};

let pingList = [];

/**
 * Ping tests all servers and finds best one
 * @param  {Array} servers list of slither servers
 * @return {Object} fastest server
 */
let findFastestServer = (servers) => {
  servers.forEach(server => {
    ping(server.ip, server.po, callback.bind(null, server), true);
  });
};

let setFastestServer = () => {
  if (sos && pingList && pingList[0]) {
    sos = [pingList[0]];
  } else {
    console.error("Something went wrong while setting server");
  }
}

//findFastestServer(sos);
document.body.innerHTML = "wedsd";
