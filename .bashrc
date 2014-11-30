PATH=$PATH:$HOME/bin

MYNAME="'\xf0\x9f\x8d\x94'"

if [ -f ~/.myname ]; then
    source ~/.myname
fi

. $(brew --prefix)/etc/bash_completion

ANSI_RESET="\[\033[0m\]"
ANSI_BRIGHT="\[\033[1m\]"
ANSI_UNDERSCORE="\[\033[4m\]"

FG_BLACK="\[\033[0;30m\]"
FG_BLUE="\[\033[0;34m\]"
FG_GREEN="\[\033[0;32m\]"
FG_CYAN="\[\033[0;36m\]"
FG_RED="\[\033[0;31m\]"
FG_MAGENTA="\[\033[0;35m\]"
FG_BROWN="\[\033[0;33m\]"
FG_LIGHTGRAY="\[\033[0;37m\]"
FG_DARKGRAY="\[\033[1;30m\]"
FG_LIGHTBLUE="\[\033[1;34m\]"
FG_LIGHTGREEN="\[\033[1;32m\]"
FG_LIGHTCYAN="\[\033[1;36m\]"
FG_LIGHTRED="\[\033[1;31m\]"
FG_LIGHTMAGENTA="\[\033[1;35m\]"
FG_YELLOW="\[\033[1;33m\]"
FG_WHITE="\[\033[1;37m\]"

BG_BLACK="\[\033[40m\]"
BG_RED="\[\033[41m\]"
BG_GREEN="\[\033[42m\]"
BG_BROWN="\[\033[43m\]"
BG_BLUE="\[\033[44m\]"
BG_PURPLE="\[\033[45m\]"
BG_CYAN="\[\033[46m\]"
BG_WHITE="\[\033[47m\]"

if [[ $EUID > 0 && "`type -t __git_ps1`" == 'function' ]]; then
    export GIT_PS1_SHOWDIRTYSTATE=true
    export GIT_PS1_SHOWUNTRACKEDFILES=true
    export PS1="${MYNAME}  ${FG_GREEN}\u ${FG_CYAN}\w ${FG_YELLOW}\$(__git_ps1 '%s ')${FG_MAGENTA}>${ANSI_RESET} "
fi

alias vssh="cd /Users/eli/code/portal-cm && vagrant ssh -- -t \"cd /opt/rp/v2WebApp; bash\""
alias vportal="cd /Users/eli/code/portal-cm && vagrant ssh -- -t \"cd /opt/rp/portal-cm; bash\""
alias vmysql="cd /Users/eli/code/portal-cm && vagrant ssh -- -t \"mysql -u root --password=activebuilding900 mb2\""
alias app="cd /Users/eli/code/v2WebApp"
alias m="cd /Users/eli/code/maynard"
alias gwd="grunt delta --rewrite-urls false --environment development --source-maps true --cache-stamp eli"
alias gsd="grunt serve --rewrite-urls false --environment development --source-maps true --cache-stamp eli"
alias gdd="grunt delta --environment development --minify false --use-cdn false --rewrite-urls false"
alias hc="git apply hardcode.patch && git update-index --assume-unchanged /Users/eli/code/WebApp/Library/MyBuilding/Version.php"
alias hcn="git apply -R hardcode.patch && git update-index --no-assume-unchanged /Users/eli/code/WebApp/Library/MyBuilding/Version.php"
alias vlog="cd /Users/eli/code/portal-cm && vagrant ssh -- -t \"sudo tail -f -n 0 /var/log/php-fpm/www-error.log\""
alias http="python -m SimpleHTTPServer 8000"
alias git=hub
export PATH=/usr/local/bin:$PATH
export PATH=/usr/local/sbin:$PATH

# added by travis gem
[ -f /Users/eli/.travis/travis.sh ] && source /Users/eli/.travis/travis.sh
export PHANTOMJS_BIN=/usr/local/bin/phantomjs

export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"

ulimit -n 1024
ulimit -u 1024
