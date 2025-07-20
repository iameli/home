#!/bin/bash

set -euo pipefail

ssh longos.iameli.xyz killall caffeinate || echo 'ok'
ssh longos.iameli.xyz osascript -e "'tell application \"System Events\" to sleep'"
