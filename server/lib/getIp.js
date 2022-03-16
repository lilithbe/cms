export const getIp=(_req)=> {
    var ip = _req.headers['x-forwarded-for'] ||
    _req.connection.remoteAddress ||
    _req.socket.remoteAddress ||
    _req.connection.socket.remoteAddress;
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip[0];
}