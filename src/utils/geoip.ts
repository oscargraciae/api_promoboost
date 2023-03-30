import geoip from 'geoip-lite';

const getGeoByIp = (ip: string) => {
  let geo;
  if (ip) {
    geo = geoip.lookup(ip.split(':')[0]);
  }
  return geo;
};

export default getGeoByIp;
