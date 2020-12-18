/**
 * Ping a server and get latency
 * @param  {Object} server: { ip: string, po: number}
 * @return {Promise}
 */
const pingServer = async (server) => {
  return new Promise((resolve, reject) => {
    const starTime = performance.now();
    let ws = new WebSocket("ws://" + server.ip + ":" + server.po);

    ws.onopen = () => {
      const endTime = performance.now();
      const latency = endTime - starTime;
      resolve({ server, latency });
      console.log(server, latency, starTime, endTime);
      ws.close();
      ws = null;
    };

    ws.onerror = (e) => {
      ws = null;
      reject(e);
    };
  });
};

/**
 * Ping tests all servers and finds best one
 * @param  {Array} servers list of slither servers
 * @return {Promise} fastest server and latency
 */
const findFastestServer = async (servers) => {
  return await Promise.all(servers.map(pingServer));
};

findFastestServer(window.sos)
  .then(({ server, latency }) => {
    console.info(
      `Fastest server found: ${server.ip}/${server.po}`,
      latency,
      "ms"
    );
    window.sos = [server];
  })
  .catch((e) => {
    console.warn("Could not set fastest server", e);
  });
