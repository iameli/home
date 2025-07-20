#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

./sleep-jumbo.sh &
./sleep-fairway.sh &
./sleep-longos.sh &

wait
