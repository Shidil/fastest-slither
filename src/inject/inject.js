var script = `var ping = function (host, port, pong, async) {
  var starTime = new Date().getTime();
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://" + host + ":" + port, async);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var endTime = new Date().getTime();
      var latancy = endTime - starTime;

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

var callback = function (server, latancy) {
  server.ping = latancy;
  pingList.push(server);

  // first and fastest
  if (pingList.length === 1) {
    console.log('fastest', server.ip, server.ping);
    setFastestServer();
  }
};

var pingList = [];

/**
 * Ping tests all servers and finds best one
 * @param  {Array} servers list of slither servers
 * @return {Object} fastest server
 */
var findFastestServer = function (servers) {
  servers.forEach(server => {
    ping(server.ip, server.po, callback.bind(null, server), true);
  });
};

var setFastestServer = function () {
  if (sos && pingList && pingList[0]) {
    sos = [pingList[0]];
  } else {
    console.error("Something went wrong while setting server");
  }
}
findFastestServer(window.sos);`

function initializeParams() {
  if (typeof(Storage) !== "undefined") {
    var settings = localStorage.getItem("edttsg");
    var quality = localStorage.getItem("qual");

    if (settings != 1 || quality != 0) {
      localStorage.setItem("edttsg", 1);
      localStorage.setItem("qual", 0);
      localStorage.setItem("snakercv", 40);

      //TODO: This is bad. Use 'extensionious' way to reload page instead of location.reload call
      window.location.reload();
    }
  } else {
      console.log('Browser does not support localStorage');
  }
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "interactive") {
  		clearInterval(readyStateCheckInterval);

      initializeParams();
  		// ----------------------------------------------------------
  		// This part of the script triggers when page is done loading
  		console.log("Hello. This message was sent fastest slither server extension");
  		// ----------------------------------------------------------
  		var scriptEl = document.createElement('script');
  		scriptEl.innerHTML = script;
      document.body.appendChild(scriptEl);
  	}
	}, 10);
});
