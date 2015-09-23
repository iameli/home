# Okay here's this fish thing let's do it

# Colors are great
set fish_color_user green
set fish_color_cwd cyan
set fish_color_command magenta

# So is git
set __fish_git_prompt_showuntrackedfiles 1
set __fish_git_prompt_showdirtystate 1
set __fish_git_prompt_color yellow -o

# I set this on a per-computer basis, just remember to do something like this
# set -U my_emoji 🍕

# Need some more stuff on my path I suppose
set PATH $PATH $HOME/bin
set PATH $PATH $HOME/pear/bin
set PATH $PATH /usr/local/bin
set PATH $PATH /usr/local/sbin
set PATH $PATH $HOME/google-cloud-sdk/bin

set DOCKER_CERT_PATH "/Users/eli/.boot2docker/certs/boot2docker-vm"
set DOCKER_TLS_VERIFY "1"

# Aliases are pretty cool
alias apps "cd /Users/eli/code/apps"
alias ops "cd /Users/eli/code/ops"
alias tt "cd /Users/eli/code/apps/tealtown/packages/csats:tealtown"
alias c "cd /Users/eli/code"
alias http "python -m SimpleHTTPServer 8000"
alias git hub
alias g hub
alias kube kubectl
alias kubename "kubectl config use-context"
