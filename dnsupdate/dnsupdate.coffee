
CONF = '/usr/local/etc/dnsmasq.conf'

os = require 'os'
fs = require 'fs'
path = require 'path'
handlebars = require 'handlebars'

template = handlebars.compile fs.readFileSync path.resolve(__dirname, 'dnsmasq.conf.mustache'), 'utf8'

ifaces = os.networkInterfaces()
ips = []
console.log "Current IPs"
for dname, device of ifaces
  for details in device
    if details.family == 'IPv4'
      console.log "#{dname}: #{details.address}"
      ips.push details.address

ips = ips.reverse().sort (a, b) ->
  if (a.indexOf "127") is 0
    return 100
  if (b.indexOf "127") is 0
    return -100
  return 0

ip = ips[0]
console.log "Arbitrarily deciding on #{ip}"

output = template
  ip: ip

fs.writeFileSync CONF, output

console.log "Wrote #{CONF}"