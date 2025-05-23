
# Colors are great
set fish_color_user green
set fish_color_cwd cyan
set fish_color_command magenta

# So is git
set __fish_git_prompt_showuntrackedfiles 1
set __fish_git_prompt_showdirtystate 1
set __fish_git_prompt_color yellow -o

set __fish_git_prompt_char_cleanstate '🌈 '
set __fish_git_prompt_char_dirtystate '* '
set __fish_git_prompt_char_stagedstate '+ '
set __fish_git_prompt_char_untrackedfiles '% '
set __fish_git_prompt_char_stashstate '👜 '
set __fish_git_prompt_char_upstream_ahead '🔼 '
set __fish_git_prompt_char_upstream_behind '🔽 '
set __fish_git_prompt_char_stateseparator ' '

# I set this on a per-computer basis, just remember to do something like this
# set -U my_emoji 🍕

set -x GOPATH $HOME/code/go

# Need some more stuff on my path I suppose
set PATH /opt/homebrew/bin $PATH 2>/dev/null
set PATH $HOME/bin $PATH 2>/dev/null
set PATH $PATH $HOME/code/livepeer-infra/bin 2>/dev/null
set PATH $PATH $HOME/code/home/bin 2>/dev/null
set PATH $PATH $HOME/code/go/bin 2>/dev/null
set PATH $PATH $HOME/.local/bin 2>/dev/null
set PATH $PATH $HOME/pear/bin 2>/dev/null
set PATH $PATH /usr/local/bin 2>/dev/null
set PATH $PATH /usr/local/sbin 2>/dev/null
set PATH $PATH $HOME/google-cloud-sdk/bin 2>/dev/null
set PATH $PATH /opt/google-cloud-sdk/bin 2>/dev/null
set PATH $PATH $HOME/go/bin 2>/dev/null
set PATH $PATH /Users/eli/.nvm/versions/node/v4.5.0/bin 2>/dev/null
set PATH $PATH $HOME/code/go/bin 2>/dev/null
set PATH $PATH $HOME/code/streamplace-ops/bin 2>/dev/null
set PATH $PATH $HOME/Library/Android/sdk/platform-tools 2>/dev/null
set PATH $PATH $HOME/.cargo/bin 2>/dev/null
set PATH $PATH $GOROOT/bin 2>/dev/null
set PATH $PATH $HOME/code/go/src/github.com/livepeer/go-livepeer 2>/dev/null
set PATH $PATH /usr/local/Cellar/node/12.1.0/bin 2>/dev/null
set PATH /Library/Java/JavaVirtualMachines/adoptopenjdk-12.jdk/Contents/Home/bin $PATH 2>/dev/null
set PATH $PATH /usr/local/Cellar/node/12.1.0/bin 2>/dev/null
set PATH $PATH /Users/iameli/Library/Python/3.8/bin 2>/dev/null
set PATH $PATH /Users/iameli/Library/Python/3.9/bin 2>/dev/null
set PATH $PATH /$HOME/code/catalyst/bin 2>/dev/null
set PATH $PATH /$HOME/.deno/bin 2>/dev/null
set PATH $PATH /$HOME/google-cloud-sdk/bin 2>/dev/null
set PATH $PATH /usr/local/go/bin
# ugh
set PATH $PATH $HOME/.local/share/solana/install/active_release/bin

set -x NODE_PATH '/home/root/code/streamkitchen/apps:/home/root/code/sk-internal/apps'
if [ (uname) = "Linux" ]
  set PATH $PATH $HOME/code/home/bin_linux 2>/dev/null
else
  alias ls "gls -F --color=auto"
  set PATH $PATH $HOME/code/home/bin_mac 2>/dev/null
end
set PATH $PATH $HOME/bin_local 2>/dev/null

# Aliases are pretty cool
alias c "cd ~/code"
alias r "cd (git rev-parse --show-toplevel)"
alias kube kubectl
alias kubename "kubectl config use-context"
alias spa "cd ~/code/streamplace"
alias spc "cd ~/code/cardcore"
alias spi "cd ~/code/streamplace-internal"
alias spo "cd ~/code/streamplace-ops"
alias spk "cd /keybase/team/streamplace_team/secrets"
alias swh "cd ~/code/wheelhouse"
alias l "ls -alhs"
alias dffmpeg "docker run -it -v /home/root:/home/root -w (pwd) --net=host gcr.io/stream-kitchen/sk-ffmpeg ffmpeg"
alias sk "node ~/code/pratty-apps/apps/sk-cli/dist/app.js"
alias bfg "java -jar ~/code/home/bin/bfg.jar"
alias ym "pygmentize -l yaml"

# livepeer
alias lpc "cd ~/code/studio"
alias lpf "cd ~/code/livepeerjs"
alias lpg "cd ~/code/go-livepeer"
alias lpk "cd ~/code/livepeer-infra"
alias lpb "cd ~/code/catalyst"
alias lpd "cd ~/code/devops"
alias lpw "cd $GOPATH/src/github.com/livepeer/livepeer-wowza"
alias lpms "cd ~/code/lpms"
alias mist "cd ~/code/mistserver"
alias cap "cd ~/code/catalyst-api"
alias aq "cd ~/code/aquareum"

# alias grc "python $HOME/code/home/homelinks/.config/fish/grc/grc"
# source $HOME/code/home/homelinks/.config/fish/grc/grc.fish
# # grc colourify stuff
# alias colourify "grc -es --colour=auto"
# alias configure 'colourify ./configure'
# alias diff 'colourify diff'
# alias make 'colourify make'
# alias gcc 'colourify gcc'
# alias as 'colourify as'
# alias gas 'colourify gas'
# alias ld 'colourify ld'
# alias netstat 'colourify netstat'
# alias ping 'colourify ping'
# alias traceroute 'colourify /usr/sbin/traceroute'
# alias head 'colourify head'
# alias tail 'colourify tail'
# alias dig 'colourify dig'
# alias mount 'colourify mount'
# alias ps 'colourify ps'
# alias mtr 'colourify mtr'
# alias df 'colourify df'

#? NVM wrapper. Félix Saparelli. Public Domain
#> https://github.com/passcod/nvm-fish-wrapper
#v 1.2.2

function nvm_set
  if test (count $argv) -gt 1
    #echo set: k: $argv[1] v: $argv[2..-1]
    set -gx $argv[1] $argv[2..-1]
  else
    #echo unset: k: $argv[1]
    set -egx $argv[1]
  end
end

function nvm_split_env
  set k (echo $argv | cut -d\= -f1)
  set v (echo $argv | cut -d\= -f2-)
  echo $k
  echo $v
end

function nvm_find_paths
  echo $argv | grep -oE '[^:]+' | grep -w '.nvm'
end

function nvm_set_path
  set k $argv[1]
  set r $argv[2..-1]

  set newpath
  for o in $$k
    if echo $o | grep -qvw '.nvm'
      set newpath $newpath $o
    end
  end

  set p (nvm_find_paths $r | head -n1)
  set newpath $p $newpath
  nvm_set $k $newpath
end

function nvm_mod_env
  set tmpnew $tmpdir/newenv

  bash -c "source ~/.nvm/nvm.sh && source $tmpold && nvm $argv && export status=\$? && env > $tmpnew && exit \$status"

  set nvmstat $status
  if test $nvmstat -gt 0
    return $nvmstat
  end

  for e in (cat $tmpnew)
    set p (nvm_split_env $e)

    if test (echo $p[1] | cut -d_ -f1) = NVM
      if test (count $p) -lt 2
        nvm_set $p[1] ''
        continue
      end

      nvm_set $p[1] $p[2..-1]
      continue
    end

    if test $p[1] = PATH
      nvm_set_path PATH $p[2..-1]
    else if test $p[1] = MANPATH
      set -l t (echo $p[2..-1] | cut -sd\: -f2-)
      if test '' = "$t"
        # We're assuming that if there's only one path
        # in the MANPATH, we should append the default
        # value. That may be wrong in some edge-cases.
        set -l m $p[2..-1]:(manpath -g)
        nvm_set MANPATH $m
      else
        nvm_set MANPATH $p[2..-1]
      end
    end
  end

  return $nvmstat
end

function nvm
  set -g tmpdir (mktemp -d 2>/dev/null; or mktemp -d -t 'nvm-wrapper') # Linux || OS X
  set -g tmpold $tmpdir/oldenv
  env | grep -E '^((NVM|NODE)_|(MAN)?PATH=)' > $tmpold

  set -l arg1 $argv[1]
  if echo $arg1 | grep -qE '^(use|install|deactivate)$'
    nvm_mod_env $argv
    set s $status
  else if test $arg1 = 'unload'
    functions -e (functions | grep -E '^nvm(_|$)')
  else
    bash -c "source ~/.nvm/nvm.sh && source $tmpold && nvm $argv"
    set s $status
  end

  command rm -r $tmpdir
  return $s
end
alias think 'cd ~/Dropbox/thinkful'
alias sub 'code -g'
# alias sub subl
which rvm; and rvm default

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/iameli/google-cloud-sdk/path.fish.inc' ]; . '/Users/iameli/google-cloud-sdk/path.fish.inc'; end

set fish_greeting
fish_add_path /opt/homebrew/opt/bison/bin
fish_add_path /opt/homebrew/opt/qt@5/bin
alias fixup="git commit --fixup HEAD"
source ~/code/livepeer-infra/hack/lp.fish

# Bun
set -Ux BUN_INSTALL "/Users/iameli/.bun"
set -px --path PATH "/Users/iameli/.bun/bin"


# pnpm
set -gx PNPM_HOME "/Users/iameli/Library/pnpm"
set -gx PATH "$PNPM_HOME" $PATH
# pnpm end