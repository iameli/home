#!/bin/bash

set -euo pipefail

./wol.sh '4e:1e:7f:94:02:01' 192.168.8.255
ssh longos.iameli.xyz screen -d -m caffeinate -u -t 3600
