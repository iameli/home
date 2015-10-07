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

# Aliases are pretty cool
alias apps "cd /Users/eli/code/apps"
alias ops "cd /Users/eli/code/ops"
alias tt "cd /Users/eli/code/apps/tealtown/packages/csats:tealtown"
alias c "cd /Users/eli/code"
alias http "python -m SimpleHTTPServer 8000"
alias kube kubectl
alias kubename "kubectl config use-context"

# grc colourify stuff
alias colourify "grc -es --colour=auto"
alias configure 'colourify ./configure'
alias diff 'colourify diff'
alias make 'colourify make'
alias gcc 'colourify gcc'
alias as 'colourify as'
alias gas 'colourify gas'
alias ld 'colourify ld'
alias netstat 'colourify netstat'
alias ping 'colourify ping'
alias traceroute 'colourify /usr/sbin/traceroute'
alias head 'colourify head'
alias tail 'colourify tail'
alias dig 'colourify dig'
alias mount 'colourify mount'
alias ps 'colourify ps'
alias mtr 'colourify mtr'
alias df 'colourify df'
