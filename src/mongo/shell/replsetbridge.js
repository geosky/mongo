ReplSetBridge = function(rst, from, to, delay) {
    var n = rst.nodes.length;

    var startPort = rst.startPort+n;
    this.port = (startPort+(from*n+to));
    this.host = rst.host+":"+this.port;

    this.dest = rst.host+":"+rst.ports[to];
    this.delay = typeof delay !== 'undefined' ? delay : 0;
    this.start();
};

ReplSetBridge.prototype.start = function() {
    var args = ["mongobridge", "--port", this.port, "--dest", this.dest, "--delay", this.delay];
    print("ReplSetBridge starting: "+tojson(args));
    this.bridge = startMongoProgram.apply( null , args );
    print("ReplSetBridge started " + this.bridge);
};

ReplSetBridge.prototype.stop = function() {
    print("ReplSetBridge stopping: " + this.port);
    stopMongod(this.port, 9);
};

ReplSetBridge.prototype.toString = function() {
    return this.host+" -> "+this.dest;
};
