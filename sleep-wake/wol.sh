#!/bin/bash

set -euo pipefail

MAC="$1"
broadcast="$2"
PortNumber=4000
echo -e $(echo $(printf 'f%.0s' {1..12}; printf "$(echo $MAC | sed 's/://g')%.0s" {1..16}) | sed -e 's/../\\x&/g') | nc -w1 -u -b $broadcast $PortNumber
