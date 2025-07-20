#!/bin/bash

set -euo pipefail

ipmitool -P $IPMI_PASSWORD -U admin -H 10.173.245.146 power on
